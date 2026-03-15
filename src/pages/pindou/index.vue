<template>
  <view class="page">
    <view class="content">
      <view class="image-container">
        <image v-if="selectedImage" :src="selectedImage" class="preview-image" mode="aspectFit" />
        <view v-else class="placeholder">(◍•ᴗ•◍)</view>
      </view>
      <CustomButton text="选取图片" @click="chooseImage" />
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
      selectedImage: '' // 存储选择的图片路径
    }
  },
  methods: {
    chooseImage() {
      uni.chooseImage({
        count: 1, // 选择一张图片
        sourceType: ['album'], // 从相册选择
        success: (res) => {
          // res.tempFilePaths 是选择图片的本地路径数组
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
    }
  }
}
</script>

<style scoped>
.page { display:flex; flex-direction:column; height:100%; }
.content { flex:1; padding:16px; display: flex; flex-direction: column; align-items: center; }
.title { margin-bottom: 20px; font-size: 18px; }
.image-container {
  width: 200px;
  height: 200px;
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
</style>