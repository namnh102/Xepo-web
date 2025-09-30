


<template>
  <div class="product-detail">
    <button class="back-btn" @click="$router.back()">← Quay lại</button>
    <div class="main-info">
      <div class="thumb-wrap">
        <img v-if="activeImg" :src="activeImg" alt="Ảnh to" class="thumb" />
      </div>
      <div class="info-wrap">
        <h2 class="title">{{ post?.title }}</h2>
        <div class="price">Giá: <span>{{ post?.price ? post.price.toLocaleString() : 'Liên hệ' }}</span></div>
        <div class="desc-label">Mô tả sản phẩm</div>
        <div class="desc">{{ post?.description }}</div>
        <div v-if="post?.category" class="category">Chuyên mục: <span>{{ post.category }}</span></div>
      </div>
    </div>
    <div v-if="post?.images && post.images.length" class="gallery">
      <h3 class="gallery-title">Ảnh chi tiết</h3>
      <div class="gallery-list">
        <img
          v-for="img in post.images"
          :key="img"
          :src="img"
          class="gallery-img"
          :class="{active: img === activeImg}"
          @click="activeImg = img"
        />
      </div>
    </div>
  </div>
</template>




<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, onMounted, watch } from 'vue'
import { usePosts } from '../../composables/usePosts'

const route = useRoute()
const id = route.params.id as string
const post = ref<any>(null)
const activeImg = ref('')

onMounted(async () => {
  const { fetchPost } = usePosts()
  post.value = await fetchPost(id)
})

watch(post, (val) => {
  if (val) {
    activeImg.value = val.thumbnail || (val.images && val.images[0]) || ''
  }
})
</script>

<style scoped>
/* Trang chi tiết sản phẩm hiện đại */
.product-detail {
  max-width: 800px;
  margin: 2.5rem auto;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 32px rgba(0,0,0,0.10);
  padding: 2.5rem 2rem;
  border: 1px solid #f3f3f3;
}
.back-btn {
  background: linear-gradient(90deg, #f8fafc 0%, #ffe259 100%);
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  margin-bottom: 1.2rem;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: bold;
  color: #222;
  box-shadow: 0 1px 6px rgba(0,0,0,0.04);
  transition: background 0.2s;
}
.back-btn:hover {
  background: linear-gradient(90deg, #ffe259 0%, #ffd600 100%);
}
.main-info {
  display: flex;
  gap: 2.5rem;
  align-items: flex-start;
  flex-wrap: wrap;
}
.thumb-wrap {
  flex: 0 0 260px;
  background: #f8fafc;
  border-radius: 14px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.thumb {
  width: 220px;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  border: 1px solid #eee;
}
.info-wrap {
  flex: 1;
  min-width: 220px;
}
.title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.7rem;
  color: #1e293b;
}
.price {
  color: #d00;
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 1.2rem;
}
.price span {
  background: #ffeaea;
  padding: 0.2rem 0.7rem;
  border-radius: 8px;
  font-size: 1.1rem;
}
.desc-label {
  margin-bottom: 0.3rem;
  font-weight: bold;
  color: #555;
  font-size: 1.05rem;
}
.desc {
  color: #444;
  font-size: 1.08rem;
  margin-bottom: 1.2rem;
  background: #f8fafc;
  border-radius: 8px;
  padding: 0.7rem 1rem;
  border: 1px solid #f3f3f3;
}
.category {
  font-size: 1rem;
  color: #555;
  margin-bottom: 0.5rem;
}
.category span {
  font-weight: bold;
  color: #1e293b;
}
.gallery {
  margin-top: 2.5rem;
  background: #f8fafc;
  border-radius: 14px;
  padding: 1.2rem 1rem;
  box-shadow: 0 1px 8px rgba(0,0,0,0.04);
  border: 1px solid #f3f3f3;
}
.gallery-title {
  font-size: 1.15rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #222;
}
.gallery-list {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.gallery-img {
  width: 120px;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 1px 6px rgba(0,0,0,0.08);
  cursor: pointer;
  border: 2px solid transparent;
  transition: border 0.2s, transform 0.2s;
  background: #fff;
}
.gallery-img.active {
  border: 2px solid #d00;
  transform: scale(1.08);
  z-index: 2;
}
.gallery-img:hover {
  border: 2px solid #ffd600;
  transform: scale(1.05);
}
@media (max-width: 800px) {
  .main-info {
    flex-direction: column;
    gap: 1.2rem;
  }
  .thumb-wrap {
    flex: unset;
    width: 100%;
    text-align: center;
    margin-bottom: 1rem;
  }
  .thumb {
    width: 100%;
    max-width: 220px;
  }
  .info-wrap {
    min-width: unset;
  }
}
.back-btn {
  background: #eee;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  cursor: pointer;
  font-size: 1rem;
}
.main-info {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  flex-wrap: wrap;
}
.thumb-wrap {
  flex: 0 0 220px;
}
.thumb {
  width: 220px;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
}
.info-wrap {
  flex: 1;
}
.title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}
.price {
  color: #d00;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}
.price span {
  background: #ffeaea;
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
}
.desc {
  color: #444;
  font-size: 1rem;
  margin-bottom: 1rem;
}
.gallery {
  margin-top: 2rem;
}
.gallery-list {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}
.gallery-img {
  width: 120px;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 1px 6px rgba(0,0,0,0.06);
  cursor: pointer;
  border: 2px solid transparent;
  transition: border 0.2s;
}
.gallery-img.active {
  border: 2px solid #d00;
}
@media (max-width: 800px) {
  .main-info {
    flex-direction: column;
    gap: 1rem;
  }
  .thumb-wrap {
    flex: unset;
    width: 100%;
    text-align: center;
  }
  .thumb {
    width: 100%;
    max-width: 220px;
  }
}
</style>
