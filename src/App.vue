<template>
  <div id="app">
    <div class="app-content">
      <slot />
    </div>
    <custom-tabbar />
  </div>
</template>

<script>
import CustomTabbar from './components/CustomTabBar.vue'
export default {
  components: { CustomTabbar }
}
</script>

<style>
/* 全局注册像素字体 */
@font-face {
  font-family: 'PixelFont'; /* 自定义字体名称，后续代码中用这个名字 */
  src: url("~@/static/fonts/fusion-pixel-10px-proportional-zh_hans.ttf") format("truetype");
  font-weight: normal; /* 固定值，像素字体无粗细变化 */
  font-style: normal;  /* 固定值，无斜体 */
  font-display: swap;  /* 优化加载体验：先显示默认字体，加载完成后切换 */
}

/* 可选：全局默认使用像素字体（所有页面都生效） */
page, text, view, div {
  font-family: 'PixelFont', monospace;
}
/* app-content 预留与 tabbar 等高的底部空间，并兼容安全区 */
.app-content {
  min-height: 100vh;
  box-sizing: border-box;
  padding-bottom: calc(56px + env(safe-area-inset-bottom, 0px));
}

/* 小程序平台中有时需要给 page 根元素也加同样的 padding（按需调整） */
.page-with-tabbar {
  padding-bottom: calc(56px + env(safe-area-inset-bottom, 0px));
}
</style>
