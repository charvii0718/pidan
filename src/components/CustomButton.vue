<template>
  <button class="custom-button" @click="$emit('click')">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'CustomButton',
  props: {
    // 按钮文本，必传
    text: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.custom-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  color: #fff;
  background: #000;
  border: 2px solid #fff;
  border-radius: 0;
  white-space: nowrap;
  font-family: 'PixelFont', monospace;
  font-size: 14px;
  line-height: 1;
  cursor: pointer;
  box-shadow: 2px 2px 0px #fff;
}
</style>
