<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import NavBar from '../components/NavBar.vue'
import FooterBar from '../components/Footer.vue'
import ProductCard from '../components/ProductCard.vue'
import CategoryFilter from '../components/CategoryFilter.vue'
import SearchBar from '../components/SearchBar.vue'
import { useCart } from '../composables/useCart'
import { gardenTools, toolCategories } from '../data/tools'

interface ToolViewModel {
  id: number
  name: string
  price: string
  tag: string
  image: string
  rating: number
  reviewCount: number
  description: string
  category: string
}

const router = useRouter()
const route = useRoute()
const { addToCart } = useCart()

const isDark = ref(document.documentElement.classList.contains('dark'))
const observer = new MutationObserver(() => {
  isDark.value = document.documentElement.classList.contains('dark')
})
onMounted(() => observer.observe(document.documentElement, { attributeFilter: ['class'] }))
onUnmounted(() => observer.disconnect())

const categories = ref<{ id: string; label: string }[]>(toolCategories)
const activeCategory = ref('all')
const searchQuery = ref('')
const isLoading = ref(false)
const loadError = ref('')
const allTools = ref<ToolViewModel[]>([])

const getTag = (rating: number, stock: number): string => {
  if (rating >= 4.8) return 'Popular'
  if (stock <= 20) return 'Sale'
  return 'New'
}

const getCategoryLabel = (categoryId: string): string => {
  if (categoryId === 'all') return 'All'
  const selected = categories.value.find(category => category.id === categoryId)
  return selected?.label ?? 'Tools'
}

const syncFiltersFromRoute = (): void => {
  searchQuery.value = typeof route.query.q === 'string' ? route.query.q : ''
  const routeCategory = typeof route.query.category === 'string' ? route.query.category : 'all'
  const categoryExists = categories.value.some(category => category.id === routeCategory)
  activeCategory.value = categoryExists ? routeCategory : 'all'
}

const fetchTools = async (): Promise<void> => {
  isLoading.value = true
  loadError.value = ''
  try {
    allTools.value = gardenTools.map(tool => ({
      id: tool.id,
      name: tool.name,
      price: `Rs ${tool.price.toFixed(2)}`,
      tag: getTag(tool.rating, tool.stock),
      image: tool.image,
      rating: tool.rating,
      reviewCount: tool.reviewCount,
      description: tool.description,
      category: tool.category,
    }))
  } catch (error) {
    loadError.value = 'Unable to load tools right now. Please try again.'
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

const filteredTools = computed(() => {
  const categoryFiltered =
    activeCategory.value === 'all'
      ? allTools.value
      : allTools.value.filter(tool => tool.category === activeCategory.value)

  const normalizedQuery = searchQuery.value.trim().toLowerCase()
  if (!normalizedQuery) return categoryFiltered

  return categoryFiltered.filter(
    tool =>
      tool.name.toLowerCase().includes(normalizedQuery) ||
      tool.description.toLowerCase().includes(normalizedQuery),
  )
})

watch(
  () => route.query,
  () => syncFiltersFromRoute(),
  { immediate: true },
)

watch(activeCategory, (nextCategory) => {
  const currentCategory = typeof route.query.category === 'string' ? route.query.category : 'all'
  if (currentCategory === nextCategory || (currentCategory === '' && nextCategory === 'all')) return

  const nextQuery = { ...route.query }
  if (nextCategory === 'all') {
    delete nextQuery.category
  } else {
    nextQuery.category = nextCategory
  }

  router.replace({ path: '/tools', query: nextQuery })
})

const activeCategoryLabel = computed(() => `${getCategoryLabel(activeCategory.value)} Tools`)

const handleAddToCart = (id: number) => {
  const selected = allTools.value.find(tool => tool.id === id)
  if (!selected) return

  const parsedPrice = Number(selected.price.replace('Rs', '').trim())
  addToCart(
    {
      id: selected.id,
      name: selected.name,
      price: Number.isNaN(parsedPrice) ? 0 : parsedPrice,
      image: selected.image,
      tag: selected.tag,
    },
    1,
  )
}

const handleWishlist = (id: number) => console.log('Tool wishlist:', id)
const handleViewDetail = (id: number) => console.log('Tool detail requested:', id)

onMounted(fetchTools)
</script>

<template>
  <div
    class="min-h-screen transition-colors duration-500"
    :style="isDark ? 'background-color:#121a14;color:#f0f0f0;' : 'background-color:#f8f7f2;color:#1a2e1f;'"
  >
    <NavBar />

    <section class="relative h-72 sm:h-80 md:h-96 overflow-hidden flex items-center mt-20">
      <img src="../assets/hero-images/Products.png" class="absolute inset-0 w-full h-full object-cover" />
      <div class="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
        <div
          class="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full border"
          :class="isDark ? 'bg-[#174f2a]/20 border-[#174f2a]/40' : 'bg-[#174f2a]/10 border-[#174f2a]/20'"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-[#4caf72]" />
          <span class="text-xs font-semibold tracking-widest uppercase" :class="isDark ? 'text-[#4caf72]' : 'text-[#174f2a]'">
            Garden Tools
          </span>
        </div>

        <h1
          class="text-4xl sm:text-5xl font-bold leading-tight mb-3"
          style="font-family:'Montserrat',sans-serif;letter-spacing:-0.02em;"
          :style="isDark ? 'color:#f0f0f0;' : 'color:#1a2e1f;'"
        >
          Explore Garden Tools<br />
          <span :class="isDark ? 'text-[#4caf72]' : 'text-[#174f2a]'">for Every Need</span>
        </h1>
        <p class="text-sm max-w-sm" :style="isDark ? 'color:#9ca3af;' : 'color:#6b7280;'">
          Hand tools, watering kits, soil care, and planters curated for your gardening theme.
        </p>
      </div>
    </section>

    <section
      class="sticky top-20 z-30 transition-colors duration-500"
      :style="isDark
        ? 'background:rgba(18,26,20,0.85);backdrop-filter:blur(16px);border-bottom:1px solid rgba(255,255,255,0.06);'
        : 'background:rgba(248,247,242,0.9);backdrop-filter:blur(16px);border-bottom:1px solid rgba(23,79,42,0.08);'"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-10 lg:px-16 py-3 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-3 items-center">
        <CategoryFilter
          :categories="categories"
          :active-category="activeCategory"
          :is-dark="isDark"
          @update:active-category="activeCategory = $event"
        />
        <SearchBar v-model="searchQuery" :is-dark="isDark" />
      </div>
    </section>

    <section
      class="py-16 px-6 sm:px-10 lg:px-16 transition-colors duration-500"
      :style="isDark ? 'background-color:#121a14;' : 'background-color:#ffffff;'"
    >
      <div class="max-w-7xl mx-auto">
        <div class="flex items-center justify-between mb-10">
          <div>
            <h2
              class="text-2xl sm:text-3xl font-bold mb-1"
              style="font-family:'Montserrat',sans-serif;"
              :style="isDark ? 'color:#f0f0f0;' : 'color:#174f2a;'"
            >
              {{ activeCategoryLabel }}
            </h2>
            <p class="text-xs" :style="isDark ? 'color:#6b7280;' : 'color:#9ca3af;'">
              {{ filteredTools.length }} tools found
            </p>
          </div>
        </div>

        <div v-if="!isLoading && filteredTools.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProductCard
            v-for="tool in filteredTools"
            :key="tool.id"
            v-bind="tool"
            :is-dark="isDark"
            @add-to-cart="handleAddToCart"
            @toggle-wishlist="handleWishlist"
            @view-detail="handleViewDetail"
          />
        </div>

        <div v-else-if="isLoading" class="py-24 flex flex-col items-center gap-4">
          <p class="text-base font-semibold" :style="isDark ? 'color:#9ca3af;' : 'color:#6b7280;'">
            Loading tools...
          </p>
        </div>

        <div v-else-if="loadError" class="py-24 flex flex-col items-center gap-4">
          <p class="text-base font-semibold text-red-500">
            {{ loadError }}
          </p>
          <button class="text-sm font-medium underline" :class="isDark ? 'text-[#4caf72]' : 'text-[#174f2a]'" @click="fetchTools">
            Retry
          </button>
        </div>

        <div v-else class="py-24 flex flex-col items-center gap-4">
          <div class="w-20 h-20 rounded-full flex items-center justify-center text-3xl" :style="isDark ? 'background:rgba(255,255,255,0.05);' : 'background:rgba(23,79,42,0.07);'">
            🛠️
          </div>
          <p class="text-base font-semibold" :style="isDark ? 'color:#9ca3af;' : 'color:#6b7280;'">
            No tools found for this filter.
          </p>
          <button class="text-sm font-medium underline" :class="isDark ? 'text-[#4caf72]' : 'text-[#174f2a]'" @click="activeCategory = 'all'; searchQuery = ''">
            Reset filters
          </button>
        </div>
      </div>
    </section>

    <FooterBar />
  </div>
</template>
