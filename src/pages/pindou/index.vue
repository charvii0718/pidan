<template>
  <view class="page">
    <view class="content">
      <view class="image-container">
        <image v-if="selectedImage" :src="selectedImage" class="preview-image" mode="aspectFit" />
        <view v-else class="placeholder">(◍•ᴗ•◍)</view>
      </view>

      <!-- 按钮组 - 同一行 -->
      <view class="button-group">
        <!-- 仅主体 checkbox -->
        <view class="checkbox-wrapper" @click="toggleOnlySubject">
          <view class="pixel-checkbox" :class="{ checked: onlySubject }">
            <view class="check-mark"></view>
          </view>
          <text class="checkbox-label">仅主体</text>
        </view>
        
        <CustomButton text="选取图片" @click.stop="chooseImage" />
        <CustomButton text="生成拼豆图" @click.stop="generatePinDou" />
      </view>
      
      <!-- 像素化滑动选择器区域 - 同一行 -->
      <view class="pixel-slider-group">
        <!-- 滑块 1: 色数选择 -->
        <view class="pixel-slider">
          <view class="slider-track">
            <view 
              class="slider-fill"
              :style="{ 
                left: (colorIndex * (100 / colorOptions.length)) + '%',
                width: (100 / colorOptions.length) + '%'
              }"
            ></view>
            <view 
              v-for="(option, index) in colorOptions" 
              :key="index"
              class="slider-option"
              :class="{ active: colorIndex === index }"
              @click="onColorClick(index)"
            >
              <text>{{ option }}</text>
            </view>
          </view>
        </view>
        
        <!-- 滑块 2: 规格选择 -->
        <view class="pixel-slider">
          <view class="slider-track">
            <view 
              class="slider-fill"
              :style="{ 
                left: (sizeIndex * (100 / sizeOptions.length)) + '%',
                width: (100 / sizeOptions.length) + '%'
              }"
            ></view>
            <view 
              v-for="(option, index) in sizeOptions" 
              :key="index"
              class="slider-option"
              :class="{ active: sizeIndex === index }"
              @click="onSizeClick(index)"
            >
              <text>{{ option }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <CustomTabbar />
  </view>
</template>

<script>
import CustomTabbar from '@/components/CustomTabbar.vue'
import CustomButton from '@/components/CustomButton.vue'
export default {
  components: { CustomTabbar, CustomButton },
  data() {
    return {
      selectedImage: '',
      colorOptions: ['24 色', '48 色', '72 色', '120 色'],
      sizeOptions: ['48*48', '108*108'],
      colorIndex: 0,
      sizeIndex: 0,
      onlySubject: true // 仅主体勾选状态
    }
  },
  methods: {
    toggleOnlySubject() {
      this.onlySubject = !this.onlySubject
      console.log('仅主体:', this.onlySubject)
    },
    chooseImage() {
      uni.chooseImage({
        count: 1,
        sourceType: ['album'],
        success: (res) => {
          this.selectedImage = res.tempFilePaths[0]
        },
        fail: (err) => {
          console.log('选择图片失败', err)
          uni.showToast({
            title: '选择图片失败',
            icon: 'none'
          })
        }
      })
    },
    generatePinDou() {
      return;
    },
    onColorClick(index) {
      this.colorIndex = index
      console.log('选择色数:', this.colorOptions[this.colorIndex])
    },
    onSizeClick(index) {
      this.sizeIndex = index
      console.log('选择规格:', this.sizeOptions[this.sizeIndex])
    }
  }
}
</script>

<style scoped>
.page { display:flex; flex-direction:column; height:100%; }
.content { flex:1; padding:16px; display: flex; flex-direction: column; align-items: center; }
.title { margin-bottom: 20px; font-size: 18px; }
.image-container {
  width: 80vw; /* 屏幕宽度的 80% */
  height: 80vw; /* 与宽度相等，保持正方形 */
  border: 5px dashed #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  background: #f9f9f9;
}
.preview-image {
  width: 100%;
  height: 100%;
}
.placeholder {
  color: #999;
  font-size: 14px;
}

/* 按钮组样式 - 居中 */
.button-group {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

/* 像素化 checkbox 样式 - 圆形 */
.checkbox-wrapper {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

.pixel-checkbox {
  width: 16px; /* 改小 */
  height: 16px; /* 改小 */
  background: #2a2a2a;
  border: 2px solid #000; /* 边框调细 */
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 
    2px 2px 0px #000,
    inset 1px 1px 0px rgba(255,255,255,0.1);
  position: relative;
}

.pixel-checkbox.checked {
  background: linear-gradient(145deg, #ffd700, #ffaa00);
}

/* CSS 实现的对勾图标 */
.check-mark {
  display: none; /* 默认隐藏 */
  width: 8px;
  height: 4px;
  border-left: 2px solid #000;
  border-bottom: 2px solid #000;
  transform: rotate(-45deg) translateY(-2px);
}

.pixel-checkbox.checked .check-mark {
  display: block; /* 选中时显示 */
}

.checkbox-label {
  font-size: 14px;
  color: #333;
  font-weight: bold;
}

.button-group /deep/ .custom-button {
  flex: 0 0 auto;
  min-width: 120px;
}

/* 像素化滑动选择器样式 - 同一行 */
.pixel-slider-group {
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 12px;
}

.pixel-slider {
  flex: 1;
  display: flex;
  justify-content: flex-start;
}

.slider-track {
  position: relative;
  height: 36px;
  background: #2a2a2a;
  border: 3px solid #000;
  border-radius: 0;
  box-shadow: 
    3px 3px 0px #000,
    inset 2px 2px 0px rgba(255,255,255,0.1);
  display: flex;
  width: 100%;
}

.slider-fill {
  position: absolute;
  top: 3px;
  height: 30px;
  background: linear-gradient(145deg, #ffd700, #ffaa00);
  border: 2px solid #000;
  border-radius: 0;
  transition: left 0.3s ease;
  box-shadow: inset 1px 1px 0px rgba(255,255,255,0.3);
}

.slider-option {
  flex: 1;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1;
  border-left: 1px solid rgba(255,255,255,0.1);
}

.slider-option:first-child {
  border-left: none;
}

.slider-option text {
  color: #fff;
  font-size: 11px;
  letter-spacing: 1px;
  transition: color 0.3s ease;
}

.slider-option.active text {
  color: #000;
  font-weight: bold;
}

/* 点击反馈效果 */
.slider-option:active {
  opacity: 0.8;
}
</style>