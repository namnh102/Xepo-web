
<template>
  <div>
    <div class="search-bar">
      <div class="search-input-wrap main-search">
        <svg class="search-icon" width="22" height="22" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" stroke="#888" stroke-width="2" fill="none"/><line x1="21" y1="21" x2="16.5" y2="16.5" stroke="#888" stroke-width="2"/></svg>
        <input v-model="search" placeholder="Tìm kiếm sản phẩm, từ khoá..." class="search-input" />
      </div>
      <div class="category-select">
        <span class="cat-label">Danh mục</span>
        <select v-model="category">
          <option value="">Tất cả chuyên mục</option>
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>
      <div class="filter-group">
        <div class="price-filter">
          <input v-model.number="minPrice" type="number" min="0" placeholder="Giá từ" class="price-input" />
          <span style="margin:0 4px">-</span>
          <input v-model.number="maxPrice" type="number" min="0" placeholder="Đến" class="price-input" />
        </div>
        <select v-model="sortBy" class="sort-select">
          <option value="createdAt">Mới nhất</option>
          <option value="title">A-Z</option>
          <option value="price">Giá</option>
        </select>
        <select v-model="sortOrder" class="sort-select">
          <option value="desc">Giảm dần</option>
          <option value="asc">Tăng dần</option>
        </select>
      </div>
      <button class="search-btn" @click="loadPosts">Tìm kiếm</button>
    </div>

    <div v-if="loading">Đang tải...</div>

     <div v-if="posts.length" class="posts-grid">
  <div v-for="p in posts" :key="p.id" class="post-card">
    <NuxtLink :to="`/posts/${p.id}`" class="card-link">
      <img v-if="p.thumbnail" :src="p.thumbnail" alt="Ảnh sản phẩm" class="card-thumb" />
      <div class="card-info">
        <div class="card-title">{{ p.title }}</div>
        <div class="card-price">{{ p.price ? p.price.toLocaleString() + ' ₫' : 'Liên hệ' }}</div>
      </div>
    </NuxtLink>
  </div>
</div>

<div class="pagination">
  <button @click="prev" :disabled="page===1" class="page-btn">Trước</button>
  <span class="page-num">Trang {{ page }}</span>
  <button v-if="page * limit < total" @click="next" class="page-btn">Sau</button>
</div>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { usePosts } from '../composables/usePosts'
import { useRuntimeConfig } from 'nuxt/app'

const search = ref('')
const category = ref('')
const page = ref(1)
const limit = 10

const posts = ref<any[]>([])
const total = ref(0)
const categories = ref<any[]>([])
const loading = ref(false)
const minPrice = ref()
const maxPrice = ref()
const sortBy = ref('createdAt')
const sortOrder = ref('desc')

async function loadCategories() {
  try {
    const config = useRuntimeConfig()
    const res = await fetch(`${config.public.apiBase}/posts/categories/list`)
    if (!res.ok) throw new Error('Không lấy được danh sách chuyên mục')
    categories.value = await res.json()
  } catch (e) {
  categories.value = []
  }
}

async function loadPosts() {
  loading.value = true
  const { fetchPosts } = usePosts()
  const result = await fetchPosts(
    category.value,
    search.value,
    page.value,
    limit,
    minPrice.value,
    maxPrice.value,
    sortBy.value,
    sortOrder.value
  )
  posts.value = result.data
  total.value = result.total
  loading.value = false
}

function next() {
  page.value++
  loadPosts()
}
function prev() {
  if (page.value > 1) page.value--
  loadPosts()
}

onMounted(() => {
  loadCategories()
  loadPosts()
})
</script>
<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  padding: 1rem 2rem;
  gap: 1.2rem;
  margin-bottom: 2rem;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  flex-wrap: wrap;
}
.main-search {
  flex: 2;
  min-width: 220px;
  background: #fff;
  border-radius: 12px;
  padding: 0.5rem 1rem;
  box-shadow: 0 1px 6px rgba(0,0,0,0.04);
  display: flex;
  align-items: center;
}
.search-input {
  border: none;
  background: transparent;
  font-size: 1.1rem;
  color: #222;
  outline: none;
  width: 100%;
  font-weight: 500;
}
.search-left {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex: 1;
}
.category-select {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #fff;
  border-radius: 12px;
  padding: 0.5rem 1rem;
  box-shadow: 0 1px 6px rgba(0,0,0,0.04);
}
.cat-label {
  font-weight: bold;
  color: #222;
}
.category-select select {
  border: none;
  background: transparent;
  font-size: 1rem;
  color: #222;
  outline: none;
}
.search-input-wrap {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 12px;
  padding: 0.5rem 1rem;
  box-shadow: 0 1px 6px rgba(0,0,0,0.04);
  flex: 1;
}
.search-icon {
  margin-right: 0.5rem;
}
.search-input {
  border: none;
  background: transparent;
  font-size: 1.1rem;
  color: #222;
  outline: none;
  width: 100%;
}
.search-btn {
  background: linear-gradient(90deg, #ffd600 0%, #ffb300 100%);
  color: #222;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  padding: 0.7rem 2rem;
  font-size: 1.1rem;
  cursor: pointer;
  box-shadow: 0 1px 6px rgba(0,0,0,0.04);
  transition: background 0.2s;
}
.search-btn:hover {
  background: linear-gradient(90deg, #ffb300 0%, #ffd600 100%);
}
.search-bar {
  flex-wrap: wrap;
}
.search-left {
  min-width: 0;
}
@media (max-width: 600px) {
  .search-bar {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
  .search-left {
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }
  .search-btn {
    width: 100%;
    padding: 0.7rem 0;
  }
}
.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}
.post-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  overflow: hidden;
  transition: box-shadow 0.2s;
}
.post-card:hover {
  box-shadow: 0 4px 24px rgba(0,0,0,0.16);
}
.card-link {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  height: 100%;
}
.card-thumb {
  width: 100%;
  height: 180px;
  object-fit: cover;
  background: #f6f6f6;
}
.card-info {
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.card-title {
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  min-height: 2.5em;
  color: #222;
}
.card-price {
  color: #d00;
  font-weight: bold;
  font-size: 1.1rem;
  margin-top: auto;
}
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 2rem 0;
}
.page-btn {
  background: #eee;
  border: none;
  padding: 0.5rem 1.2rem;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.page-btn:disabled {
  background: #f6f6f6;
  color: #aaa;
  cursor: not-allowed;
}
.page-num {
  font-weight: bold;
  font-size: 1.1rem;
}
@media (max-width: 600px) {
  .posts-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  .card-thumb {
    height: 140px;
  }
}
/* Bộ lọc giá và sắp xếp */
.filter-group {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: 1rem;
}
.price-filter {
  display: flex;
  align-items: center;
  gap: 0.2rem;
}
.price-input {
  width: 80px;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 0.3rem 0.7rem;
  font-size: 1rem;
  background: #fafafa;
}
.sort-select {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 0.3rem 0.7rem;
  font-size: 1rem;
  background: #fafafa;
}
</style>