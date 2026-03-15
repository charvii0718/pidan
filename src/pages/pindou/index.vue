<template>
  <view class="page">
    <view class="content">
      <view class="image-container">
        <image v-if="selectedImage" :src="selectedImage" class="preview-image" mode="aspectFit" />
        <view v-else class="placeholder">(◍•ᴗ•◍)</view>
      </view>
      <CustomButton text="选取图片" @click="chooseImage" />
      
      <!-- 像素化滑动选择器区域 -->
      <view class="pixel-slider-group">
        <!-- 滑块 1: 色数选择 -->
        <view class="slider-item">
          <text class="slider-label">色数</text>
          <view class="pixel-slider">
            <view 
              class="slider-track" 
              :style="{ width: (colorOptions.length * 60) + 'px' }"
            >
              <view 
                class="slider-fill"
                :style="{ 
                  left: (colorIndex * 60) + 'px',
                  width: '60px'
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
        </view>
        
        <!-- 滑块 2: 规格选择 -->
        <view class="slider-item">
          <text class="slider-label">规格</text>
          <view class="pixel-slider">
            <view 
              class="slider-track" 
              :style="{ width: (sizeOptions.length * 80) + 'px' }"
            >
              <view 
                class="slider-fill"
                :style="{ 
                  left: (sizeIndex * 80) + 'px',
                  width: '80px'
                }"
              ></view>
              <view 
                v-for="(option, index) in sizeOptions" 
                :key="index"
                class="slider-option wide"
                :class="{ active: sizeIndex === index }"
                @click="onSizeClick(index)"
              >
                <text>{{ option }}</text>
              </view>
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
      sizeIndex: 0
    }
  },
  methods: {
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

/* 像素化滑动选择器样式 */
.pixel-slider-group {
  width: 100%;
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.slider-item {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
}

.slider-label {
  font-size: 14px;
  color: #333;
  font-weight: bold;
  min-width: 50px;
  margin-right: 12px;
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
  position: relative;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1;
}

.slider-option text {
  color: #fff;
  font-size: 12px;
  letter-spacing: 1px;
  transition: color 0.3s ease;
}

.slider-option.active text {
  color: #000;
  font-weight: bold;
}

.slider-option.wide {
  width: 80px;
}

.slider-option:not(.wide) {
  width: 60px;
}

/* 点击反馈效果 */
.slider-option:active {
  opacity: 0.8;
}
</style>