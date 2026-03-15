<template>
  <view class="tabbar">
    <view class="top-indicator" />
    <view :class="['tab', active === 0 ? 'active' : '']" @click="switchTo(0)">
      <text class="icon">{{ active === 0 ? '🏠' : '🏡' }}</text>
      <text class="label">拼豆</text>
    </view>
    <view :class="['tab', active === 1 ? 'active' : '']" @click="switchTo(1)">
      <text class="icon">{{ active === 1 ? '⚙️' : '⚙' }}</text>
      <text class="label">其他</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      // 与 src/pages.json 中 pagePath 保持一致（去掉 src 前缀）
      paths: [
        '/pages/pindou/index',
        '/pages/other/index'
      ]
    }
  },
  mounted() {
    this.setActiveByRoute()
    if (typeof window !== 'undefined') window.addEventListener('popstate', this.setActiveByRoute)
  },
  beforeDestroy() {
    if (typeof window !== 'undefined') window.removeEventListener('popstate', this.setActiveByRoute)
  },
  methods: {
    getCurrentRoute() {
      try {
        if (typeof getCurrentPages === 'function') {
          const pages = getCurrentPages()
          if (pages && pages.length) return pages[pages.length - 1].route || ''
        }
      } catch (e) {}
      try {
        if (typeof location !== 'undefined') return location.pathname || ''
      } catch (e) {}
      return ''
    },
    setActiveByRoute() {
      const route = (this.getCurrentRoute() || '').replace(/^\//, '')
      if (route.indexOf('pindou') !== -1) this.active = 0
      else if (route.indexOf('other') !== -1) this.active = 1
      else this.active = 0
    },
    switchTo(index) {
      if (this.active === index) return
      this.active = index
      const url = this.paths[index] || this.paths[0]
      // 自定义 tabBar 使用 reLaunch（会重载页面）
      uni.reLaunch({ url })
    }
  }
}
</script>

<style scoped>
/* 固定在底部，支持安全区（iPhone X） */
.tabbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 56px;
  /* iOS 安全区 */
  padding-bottom: constant(safe-area-inset-bottom, 0px);
  padding-bottom: env(safe-area-inset-bottom, 0px);
  display: flex;
  flex-direction: row;
  background: #fff;
  z-index: 1000;
  box-sizing: border-box;
  /* 去掉上边框（已移除 border-top） */
}

/* 粉色矩形，宽度同 tabbar，高度 5px，位于 tabbar 之上 */
.top-indicator {
  position: absolute;
  top: -5px;
  left: 0;
  right: 0;
  height: 5px;
  background: #ff6ea6; /* 粉色，可按需调整 */
  z-index: 1001;
  border-radius: 2px 2px 0 0;
}

.tab {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 6px 0;
  color: #7A7E83;
}
.tab.active .label { color: #007AFF; }
.icon { font-size: 20px; margin-bottom: 4px; }
.label { font-size: 12px; }
</style>