<template>
  <div class="test-container">
    <h1>✅ 环境测试页面</h1>
    <p>如果能看到这个页面，说明你的开发环境运行正常</p>
    
    <!-- 测试响应式数据 -->
    <div class="info-box">
      <p>计数：<span>{{ count }}</span></p>
      <button @click="increment">点击 +1</button>
    </div>
    
    <!-- 测试样式 -->
    <div class="status success">环境状态：正常</div>
  </div>
</template>