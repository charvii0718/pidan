<template>
  <view class="page">
    <view class="content">拼豆 页面内容</view>
    <CustomTabBar />
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