<template>
  <view class="page">
    <view class="content">拼豆 页面内容</view>
    <CustomTabbar />
  </view>
</template>

<script>
import CustomTabbar from '@/components/CustomTabbar.vue'
export default {
  components: { CustomTabbar }
}
</script>

<style scoped>
.page { display:flex; flex-direction:column; height:100%; }
.content { flex:1; padding:16px; }
</style>