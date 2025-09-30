<template>
  <div class="home-page">
    <div class="home-banner">
      <div class="banner-content">
        <h1 class="banner-title">NK-NEWS</h1>
        <p class="banner-desc">Nền tảng đăng tin, mua bán sản phẩm nhanh chóng, uy tín.<br>Khám phá hàng ngàn sản phẩm mới mỗi ngày!</p>
      </div>
    </div>
    <div class="home-section">
      <h2 class="section-title">Tin Tức Sản Phẩm</h2>
      <PostsList />
    </div>
  </div>
</template>

<script setup lang="ts">
import PostsList from '../components/PostsList.vue'
</script>

<style scoped>
.home-page {
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
  min-height: 100vh;
}
.home-banner {
  width: 100%;
  background: linear-gradient(90deg, #ffe259 0%, #ffa751 100%);
  padding: 3rem 0 2rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 16px rgba(255,193,7,0.08);
  position: relative;
  overflow: hidden;
}
.home-banner::after {
  content: '';
  position: absolute;
  right: -80px; top: 10px;
  width: 180px; height: 180px;
  background: url('https://cdn.pixabay.com/photo/2017/01/31/13/14/yellow-2027610_1280.png') center/cover no-repeat;
  opacity: 0.13;
  z-index: 1;
}
.banner-content {
  text-align: center;
  position: relative;
  z-index: 2;
}
.banner-title {
  font-size: 2.8rem;
  font-weight: 900;
  color: #222;
  margin-bottom: 0.7rem;
  letter-spacing: 0.05em;
  text-shadow: 0 2px 12px rgba(255,193,7,0.12);
}
.banner-desc {
  font-size: 1.25rem;
  color: #333;
  margin-bottom: 0.5rem;
  text-shadow: 0 1px 6px rgba(255,193,7,0.08);
}
.home-section {
  max-width: 1100px;
  margin: 2.5rem auto;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 24px rgba(0,0,0,0.08);
  padding: 2rem 2rem 1rem 2rem;
}
.section-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1e293b;
  margin-bottom: 1.5rem;
  text-align: center;
}
@media (max-width: 800px) {
  .home-banner {
    padding: 2rem 0 1rem 0;
  }
  .banner-title {
    font-size: 2rem;
  }
  .home-section {
    padding: 1rem;
  }
}
</style>
