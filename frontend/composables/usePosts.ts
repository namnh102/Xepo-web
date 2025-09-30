import { ref } from 'vue'
import { useRuntimeConfig } from 'nuxt/app'

const posts = ref([] as any[])
const total = ref(0)
const post = ref(null as any)
const loading = ref(false)

export function usePosts() {
  const config = useRuntimeConfig()
  const base = config.public.apiBase

  async function fetchPosts(
    category?: string,
    search?: string,
    page = 1,
    limit = 10,
    minPrice?: number,
    maxPrice?: number,
    sortBy?: string,
    sortOrder?: string
  ) {
    const params = new URLSearchParams()
    if (category) params.append('category', category)
    if (search) params.append('search', search)
    params.append('page', String(page))
    params.append('limit', String(limit))
    if (minPrice !== undefined && minPrice !== null) params.append('minPrice', String(minPrice))
    if (maxPrice !== undefined && maxPrice !== null) params.append('maxPrice', String(maxPrice))
    if (sortBy) params.append('sortBy', sortBy)
    if (sortOrder) params.append('sortOrder', sortOrder)

    const res = await fetch(`${base}/posts?${params.toString()}`)
    const json = await res.json()
    return {
      data: json.data || [],
      total: json.total || 0,
      categories: json.categories || [],
    }
  }

  async function fetchPost(id: string) {
    const res = await fetch(`${base}/posts/${id}`)
    return await res.json()
  }

  return { fetchPosts, fetchPost }
}
