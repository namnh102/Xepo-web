<template>
  <div>
    <!-- Xoá banner header, chỉ giữ <nuxt-page /> -->
    <nuxt-page />
  </div>
</template>

<script setup lang="ts"></script>
<style>
/* Banner header kiểu mới */
.banner-header {
  position: relative;
  background: linear-gradient(90deg, #ffe259 0%, #ffa751 100%);
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.banner-title {
  font-size: 2.5rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  color: #222;
  text-align: center;
  background: none;
  margin: 0;
  z-index: 2;
}
/* Hình nền minh hoạ (SVG hoặc PNG) */
.banner-header::before {
  content: '';
  position: absolute;
  left: 0; right: 0; top: 0; bottom: 0;
  background: url('https://cdn.pixabay.com/photo/2017/01/31/13/14/yellow-2027610_1280.png') center/cover no-repeat;
  opacity: 0.18;
  z-index: 1;
}
body {
  margin: 0;
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
}
/* ...các style khác giữ nguyên... */
</style>
