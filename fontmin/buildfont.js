const Fontmin = require('fontmin');
const fs = require('fs');
const path = require('path');

// 配置项（可根据需要修改）
const CONFIG = {
  // 文字列表文件名称（同目录下）
  textFileName: 'text.txt',
  // 临时输出目录（子集化生成的文件存放处，不会删除）
  tempOutputDir: './font-temp',
  // 最终TTF文件输出到外层目录（脚本目录的上一级）
  targetDir: '../src/static/fonts/'
};  

/**
 * 创建目录（不存在则创建，递归支持）
 */
function createDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * 复制文件（原生fs实现）
 */
function copyFile(src, dest, overwrite = true) {
  if (fs.existsSync(dest) && !overwrite) {
    throw new Error(`目标文件已存在：${dest}`);
  }
  // 确保目标目录存在
  const destDir = path.dirname(dest);
  createDir(destDir);
  // 复制文件
  fs.copyFileSync(src, dest);
}

/**
 * 读取text-list.txt的文字内容
 */
function readTextList() {
  const textPath = path.resolve(__dirname, CONFIG.textFileName);
  if (!fs.existsSync(textPath)) {
    throw new Error(`❌ 未找到文字列表文件：${textPath}`);
  }
  // 读取并去除空行、多余空格
  const textContent = fs.readFileSync(textPath, 'utf8')
    .replace(/\n+/g, '')
    .replace(/\s+/g, '')
    .trim();
  if (!textContent) {
    throw new Error(`❌ ${CONFIG.textFileName} 文件内容为空`);
  }
  console.log(`✅ 读取到文字列表，共 ${textContent.length} 个字符`);
  return textContent;
}

/**
 * 获取同目录下唯一的TTF字体文件
 */
function getSingleTtfFile() {
  let ttfFile = null;
  let files = [];
  
  // 读取目录文件
  try {
    files = fs.readdirSync(__dirname);
  } catch (err) {
    throw new Error(`❌ 读取目录失败：${err.message}`);
  }
  
  // 直接找.ttf文件（仅找一个）
  files.forEach(file => {
    if (path.extname(file).toLowerCase() === '.ttf') {
      ttfFile = path.resolve(__dirname, file);
    }
  });

  if (!ttfFile) {
    throw new Error(`❌ 目录下未找到.ttf格式的字体文件！`);
  }
  console.log(`✅ 找到字体文件：${path.basename(ttfFile)}`);
  return ttfFile;
}

/**
 * 执行字体子集化（适配 fontmin 0.3.7 版本）
 */
function subsetFont(fontPath, textContent) {
  return new Promise((resolve, reject) => {
    // 确保临时目录存在
    createDir(CONFIG.tempOutputDir);

    const fontmin = new Fontmin()
      .src(fontPath) // 输入唯一的TTF字体
      .use(Fontmin.glyph({ text: textContent })) // 子集化（仅保留指定文字）
      // 移除 Fontmin.ttf() —— 0.3.7 版本处理TTF时无需显式调用该方法
      .dest(CONFIG.tempOutputDir); // 临时输出目录

    // 执行子集化
    fontmin.run((err, files) => {
      if (err) {
        reject(`❌ 子集化失败：${err.message}`);
        return;
      }
      // 过滤出TTF文件（避免其他格式干扰）
      const ttfFiles = files.filter(file => path.extname(file.path).toLowerCase() === '.ttf');
      if (ttfFiles.length === 0) {
        reject(`❌ 未生成子集化TTF字体文件`);
        return;
      }
      console.log(`✅ 子集化完成：${path.basename(fontPath)}`);
      resolve(ttfFiles[0].path); // 返回生成的TTF文件路径
    });
  });
}
/**
 * 递归删除目录及其中所有文件（原生fs实现）
 */
function deleteDirRecursive(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.readdirSync(dirPath).forEach(file => {
      const curPath = path.join(dirPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteDirRecursive(curPath); // 递归删除子目录
      } else {
        fs.unlinkSync(curPath); // 删除文件
      }
    });
    fs.rmdirSync(dirPath); // 删除空目录
  }
}
/**
 * 复制TTF到外层目录
 */
function copyTtfToOuter(tempTtfPath) {
  try {
    // 目标路径：外层目录 + 原文件名（带min后缀）
    const ttfName = path.basename(tempTtfPath);
    const targetPath = path.resolve(__dirname, CONFIG.targetDir, ttfName);
    
    // 复制文件（覆盖已存在的）
    copyFile(tempTtfPath, targetPath, true);
    console.log(`✅ TTF文件已复制到外层目录：${path.basename(targetPath)}`);


    // 3. 删除临时输出目录（核心新增逻辑）
    deleteDirRecursive(CONFIG.tempOutputDir);
    console.log(`✅ 临时目录已删除：${CONFIG.tempOutputDir}`);

    return targetPath;
  } catch (err) {
    throw new Error(`❌ 复制TTF文件失败：${err.message}`);
  }
}

/**
 * 主函数（极简流程）
 */
async function main() {
  try {
    // 步骤1：读取文字列表
    const textContent = readTextList();
    
    // 步骤2：获取唯一的TTF字体文件
    const ttfFile = getSingleTtfFile();

    // 步骤3：子集化 + 复制到外层
    const tempTtfPath = await subsetFont(ttfFile, textContent);
    copyTtfToOuter(tempTtfPath);

    console.log('\n🎉 字体子集化完成！');
    console.log(`📌 临时文件：${path.resolve(__dirname, CONFIG.tempOutputDir)}`);
    console.log(`📌 最终文件：${path.resolve(__dirname, CONFIG.targetDir)}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

// 执行脚本
main();