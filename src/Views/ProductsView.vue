<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import NavBar from '../components/NavBar.vue'
import FooterBar from '../components/Footer.vue'
import ProductCard from '../components/ProductCard.vue'
import CategoryFilter from '../components/CategoryFilter.vue'
import SearchBar from '../components/SearchBar.vue'
import { useCart } from '../composables/useCart'
import { plantCategories, plantProducts } from '../data/plants'

const router = useRouter()
const route = useRoute()
const { addToCart } = useCart()

const isDark = ref(document.documentElement.classList.contains('dark'))
const observer = new MutationObserver(() => {
  isDark.value = document.documentElement.classList.contains('dark')
})
onMounted(() => observer.observe(document.documentElement, { attributeFilter: ['class'] }))
onUnmounted(() => observer.disconnect())

interface ProductViewModel {
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

const categories = ref<{ id: string; label: string }[]>(plantCategories)
const activeCategory = ref('all')
const searchQuery = ref('')
const isLoading = ref(false)
const loadError = ref('')

const allProducts = ref<ProductViewModel[]>([])

const getTag = (rating: number, stock: number): string => {
  if (rating >= 4.8) return 'Popular'
  if (stock <= 20) return 'Sale'
  return 'New'
}

const syncFiltersFromRoute = (): void => {
  const querySearch = typeof route.query.q === 'string' ? route.query.q : ''
  searchQuery.value = querySearch

  const routeCategory = typeof route.query.category === 'string' ? route.query.category : 'all'
  const categoryExists = categories.value.some(category => category.id === routeCategory)
  activeCategory.value = categoryExists ? routeCategory : 'all'
}

const getCategoryLabel = (categoryId: string): string => {
  if (categoryId === 'all') return 'All'
  const selected = categories.value.find(category => category.id === categoryId)
  return selected?.label ?? 'Plants'
}

const fetchProducts = async (): Promise<void> => {
  isLoading.value = true
  loadError.value = ''
  try {
    allProducts.value = plantProducts.map(product => ({
      id: product.id,
      name: product.name,
      price: `Rs ${product.price.toFixed(2)}`,
      tag: getTag(product.rating, product.stock),
      image: product.image,
      rating: product.rating,
      reviewCount: product.reviewCount,
      description: product.description,
      category: product.category,
    }))
  } catch (error) {
    loadError.value = 'Unable to load products right now. Please try again.'
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

watch(
  () => route.query,
  () => {
    syncFiltersFromRoute()
  },
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

  router.replace({ path: '/products', query: nextQuery })
})

const activeCategoryLabel = computed(() => `${getCategoryLabel(activeCategory.value)} Plants`)

// ── Cart / Wishlist handlers ───────────────────────────────────────────────
const handleAddToCart = (id: number) => {
  const selected = allProducts.value.find(product => product.id === id)
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
const handleWishlist  = (id: number) => console.log('Wishlist:', id)
const handleViewDetail = (id: number) => router.push(`/products/${id}`)

onMounted(fetchProducts)

const filteredProducts = computed(() => {
  const categoryFiltered =
    activeCategory.value === 'all'
      ? allProducts.value
      : allProducts.value.filter(product => product.category === activeCategory.value)

  const normalizedQuery = searchQuery.value.trim().toLowerCase()
  if (!normalizedQuery) return categoryFiltered

  return categoryFiltered.filter(
    product =>
      product.name.toLowerCase().includes(normalizedQuery) ||
      product.description.toLowerCase().includes(normalizedQuery),
  )
})

</script>

<template>
  <div
    class="min-h-screen transition-colors duration-500"
    :style="isDark ? 'background-color:#121a14;color:#f0f0f0;' : 'background-color:#f8f7f2;color:#1a2e1f;'"
  >
    <NavBar />

    <!-- ───── HERO BANNER ───── -->
    <section class="relative h-72 sm:h-80 md:h-96 overflow-hidden flex items-center mt-20">
      <!-- Background — replace src with your uploaded hero image -->
      <!-- replace this div with: -->
        <img src="../assets/hero-images/Products.png" class="absolute inset-0 w-full h-full object-cover" />

      <!-- Content -->
      <div class="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
        <div
          class="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full border"
          :class="isDark ? 'bg-[#174f2a]/20 border-[#174f2a]/40' : 'bg-[#174f2a]/10 border-[#174f2a]/20'"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-[#4caf72]" />
          <span
            class="text-xs font-semibold tracking-widest uppercase"
            :class="isDark ? 'text-[#4caf72]' : 'text-[#174f2a]'"
          >Our Collection</span>
        </div>

        <h1
          class="text-4xl sm:text-5xl font-bold leading-tight mb-3"
          style="font-family:'Montserrat',sans-serif;letter-spacing:-0.02em;"
          :style="isDark ? 'color:#f0f0f0;' : 'color:#1a2e1f;'"
        >Explore Plant Details<br />
          <span :class="isDark ? 'text-[#4caf72]' : 'text-[#174f2a]'">and Pricing</span>
        </h1>
        <p class="text-sm max-w-sm" :style="isDark ? 'color:#9ca3af;' : 'color:#6b7280;'">
          Find the perfect plant for your space. Curated for every green enthusiast.
        </p>
      </div>
    </section>

    <!-- ───── FILTER BAR ───── -->
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

    <!-- ───── PRODUCTS GRID ───── -->
    <section
      class="py-16 px-6 sm:px-10 lg:px-16 transition-colors duration-500"
      :style="isDark ? 'background-color:#121a14;' : 'background-color:#ffffff;'"
    >
      <div class="max-w-7xl mx-auto">

        <!-- Section heading -->
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
              {{ filteredProducts.length }} products found
            </p>
          </div>

          <!-- Sort dropdown placeholder -->
          <!--<div
            class="flex items-center gap-2 px-3 py-2 rounded-xl text-sm cursor-pointer transition-all duration-200"
            :style="isDark
              ? 'background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);color:#9ca3af;'
              : 'background:rgba(255,255,255,0.7);border:1px solid rgba(23,79,42,0.1);color:#6b7280;'"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
            </svg>
            Sort by
          </div>-->
        </div>

        <!-- Grid -->
        <div
          v-if="!isLoading && filteredProducts.length"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <ProductCard
            v-for="product in filteredProducts"
            :key="product.id"
            v-bind="product"
            :is-dark="isDark"
            @add-to-cart="handleAddToCart"
            @toggle-wishlist="handleWishlist"
            @view-detail="handleViewDetail"
          />
        </div>

        <!-- Empty state -->
        <div v-else-if="isLoading" class="py-24 flex flex-col items-center gap-4">
          <p class="text-base font-semibold" :style="isDark ? 'color:#9ca3af;' : 'color:#6b7280;'">
            Loading products...
          </p>
        </div>

        <div v-else-if="loadError" class="py-24 flex flex-col items-center gap-4">
          <p class="text-base font-semibold text-red-500">
            {{ loadError }}
          </p>
          <button
            class="text-sm font-medium underline"
            :class="isDark ? 'text-[#4caf72]' : 'text-[#174f2a]'"
            @click="fetchProducts"
          >
            Retry
          </button>
        </div>

        <div v-else class="py-24 flex flex-col items-center gap-4">
          <div
            class="w-20 h-20 rounded-full flex items-center justify-center text-3xl"
            :style="isDark ? 'background:rgba(255,255,255,0.05);' : 'background:rgba(23,79,42,0.07);'"
          >🌿</div>
          <p class="text-base font-semibold" :style="isDark ? 'color:#9ca3af;' : 'color:#6b7280;'">
            No plants found for this filter.
          </p>
          <button
            class="text-sm font-medium underline"
            :class="isDark ? 'text-[#4caf72]' : 'text-[#174f2a]'"
            @click="activeCategory = 'all'; searchQuery = ''"
          >Reset filters</button>
        </div>

        <!-- Load more -->
        <!--<div v-if="!isLoading && !loadError && filteredProducts.length" class="text-center mt-12">
          <button
            class="px-8 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
            :style="isDark
              ? 'background:rgba(23,79,42,0.18);color:#4caf72;border:1px solid rgba(76,175,114,0.22);backdrop-filter:blur(8px);'
              : 'background:rgba(255,255,255,0.7);color:#174f2a;border:1px solid rgba(23,79,42,0.18);backdrop-filter:blur(8px);'"
          >
            Load More Plants →
          </button>
        </div>-->
      </div>
    </section>

    <!-- ───── SALE BANNER ───── -->
    <section class="relative overflow-hidden py-20 px-6 sm:px-10 lg:px-16">
      <!-- Dark leafy background -->
      <div
        class="absolute inset-0"
        style="background:linear-gradient(135deg,#0a1f0d 0%,#142a17 50%,#0a1f0d 100%);"
      />
      <!-- Decorative green circle -->
      <div
        class="absolute -left-20 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full opacity-15 blur-3xl pointer-events-none"
        style="background:#4caf72;"
      />
      <div
        class="absolute right-0 bottom-0 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none"
        style="background:#25753e;"
      />

      <div class="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
        <!-- Text side -->
        <div class="flex-1">
          <span
            class="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
            style="background:rgba(76,175,114,0.15);color:#4caf72;border:1px solid rgba(76,175,114,0.25);"
          >Summer Sale</span>
          <h2
            class="font-bold leading-none mb-4"
            style="font-family:'Montserrat',sans-serif;color:#ffffff;"
          >
            <span class="block text-lg font-normal opacity-70 mb-1">Get up to</span>
            <span class="text-7xl sm:text-8xl" style="color:#4caf72;">37%</span>
            <span class="text-4xl sm:text-5xl"> OFF</span>
          </h2>
          <p class="text-sm mb-2" style="color:rgba(255,255,255,0.6);">
            Free on all orders. Fast shipping still. 30-days money-back guarantee.
          </p>
          <div class="flex items-center gap-3 mt-6">
            <button
              class="px-7 py-3.5 rounded-xl text-white text-sm font-semibold tracking-wide transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
              style="background:#174f2a;box-shadow:0 4px 20px rgba(23,79,42,0.4);"
            >Shop the Sale</button>
            <button
              class="text-sm font-medium flex items-center gap-1.5 transition-all duration-200 hover:gap-2.5"
              style="color:#4caf72;"
            >
              View all deals
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Stats side -->
        <div class="flex-1 flex items-center justify-center gap-8">
          <div class="text-center">
            <p class="text-4xl font-bold" style="font-family:'Montserrat',sans-serif;color:#ffffff;">500+</p>
            <p class="text-xs mt-1" style="color:rgba(255,255,255,0.5);">Plant varieties</p>
          </div>
          <div style="width:1px;height:3rem;background:rgba(255,255,255,0.1);" />
          <div class="text-center">
            <p class="text-4xl font-bold" style="font-family:'Montserrat',sans-serif;color:#ffffff;">12k+</p>
            <p class="text-xs mt-1" style="color:rgba(255,255,255,0.5);">Happy gardeners</p>
          </div>
          <div style="width:1px;height:3rem;background:rgba(255,255,255,0.1);" />
          <div class="text-center">
            <p class="text-4xl font-bold" style="font-family:'Montserrat',sans-serif;color:#4caf72;">4.9★</p>
            <p class="text-xs mt-1" style="color:rgba(255,255,255,0.5);">Avg. rating</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ───── FOOTER ───── -->
    <FooterBar />
  </div>
</template>

<style scoped>
/* Hide scrollbar on category carousel */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
