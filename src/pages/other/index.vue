<template>
  <view class="page">
    <view class="content">其他 页面内容</view>
    <custom-tab-bar />
  </view>
</template>

<script>
import CustomTabBar from '@/components/CustomTabBar.vue'
export default {
  components: { CustomTabBar }
}
</script>

<style scoped>
.page { display:flex; flex-direction:column; height:100%; }
.content { flex:1; padding:16px; }
</style>