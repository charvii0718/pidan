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
