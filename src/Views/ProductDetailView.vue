<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import NavBar from '../components/NavBar.vue'
import FooterBar from '../components/Footer.vue'
import { useCart } from '../composables/useCart'
import { plantProducts } from '../data/plants'

const route  = useRoute()
const router = useRouter()
const { addToCart } = useCart()

// ── Dark mode ──────────────────────────────────────────────────────────────
const isDark = ref(document.documentElement.classList.contains('dark'))
const observer = new MutationObserver(() => {
  isDark.value = document.documentElement.classList.contains('dark')
})
onMounted(() => observer.observe(document.documentElement, { attributeFilter: ['class'] }))
onUnmounted(() => observer.disconnect()  )

// ── Product data ────────────────────────────────────────────────────────────
const allProducts = plantProducts.map((product, index, source) => ({
  id: product.id,
  name: product.name,
  price: product.price,
  originalPrice: Math.round(product.price * 1.18),
  tag: product.rating >= 4.8 ? 'Popular' : product.stock <= 20 ? 'Sale' : 'New',
  sku: `RGP-${String(product.id).padStart(3, '0')}`,
  image: product.image,
  images: [product.image, source[(index + 1) % source.length].image, source[(index + 2) % source.length].image],
  rating: product.rating,
  reviewCount: product.reviewCount,
  inStock: product.stock > 0,
  category: product.category.replace(/(^\w)|-\w/g, match => match.replace('-', ' ').toUpperCase()),
  tags: [product.category, 'Healthy', 'Nursery Fresh'],
  description: product.description,
  features: [
    'Low maintenance care routine',
    'Best growth with indirect sunlight',
    'Delivered in secure eco-friendly packaging',
    'Healthy nursery-grown plant stock',
  ],
  related: source.filter(item => item.id !== product.id).slice(0, 3).map(item => item.id),
}))

const productId = computed(() => Number(route.params.id) || 1)
const product   = computed(() => allProducts.find(p => p.id === productId.value) ?? allProducts[0])
const related   = computed(() => allProducts.filter(p => product.value.related.includes(p.id)))

// ── UI State ───────────────────────────────────────────────────────────────
const activeImage   = ref(0)
const activeTab     = ref<'description' | 'info' | 'reviews'>('description')
const quantity      = ref(1)
const wishlisted    = ref(false)
const addedToCart   = ref(false)

const discount = computed(() =>
  Math.round(((product.value.originalPrice - product.value.price) / product.value.originalPrice) * 100)
)

const handleAddToCart = () => {
  addToCart(
    {
      id: product.value.id,
      name: product.value.name,
      price: product.value.price,
      image: product.value.image,
      tag: product.value.tag,
    },
    quantity.value,
  )
  addedToCart.value = true
  setTimeout(() => (addedToCart.value = false), 2000)
}

const handleAddRelatedToCart = (id: number) => {
  const selected = allProducts.find(item => item.id === id)
  if (!selected) return
  addToCart(
    {
      id: selected.id,
      name: selected.name,
      price: selected.price,
      image: selected.image,
      tag: selected.tag,
    },
    1,
  )
}

const goToProduct = (id: number) => {
  router.push(`/products/${id}`)
  activeImage.value = 0
  activeTab.value   = 'description'
  quantity.value    = 1
  wishlisted.value  = false
}
</script>

<template>
  <div
    class="min-h-screen transition-colors duration-500"
    :style="isDark ? 'background-color:#121a14;color:#f0f0f0;' : 'background-color:#f8f7f2;color:#1a2e1f;'"
  >
    <NavBar />

    <!-- ───── BREADCRUMB ───── -->
    <div class="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-28 pb-4">
      <nav class="flex items-center gap-2 text-xs">
        <button
          class="transition-colors duration-200 hover:underline"
          :style="isDark ? 'color:#6b7280;' : 'color:#9ca3af;'"
          @click="router.push('/')"
        >Home</button>
        <span :style="isDark ? 'color:#374151;' : 'color:#d1d5db;'">/</span>
        <button
          class="transition-colors duration-200 hover:underline"
          :style="isDark ? 'color:#6b7280;' : 'color:#9ca3af;'"
          @click="router.push('/products')"
        >Plants</button>
        <span :style="isDark ? 'color:#374151;' : 'color:#d1d5db;'">/</span>
        <span :class="isDark ? 'text-[#4caf72]' : 'text-[#174f2a]'" class="font-semibold">
          {{ product.name }}
        </span>
      </nav>
    </div>

    <!-- ───── MAIN PRODUCT SECTION ───── -->
    <section class="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

        <!-- LEFT: Image Gallery -->
        <div class="flex flex-col gap-4">
          <!-- Main image -->
          <div
            class="relative rounded-3xl overflow-hidden flex items-center justify-center"
            style="height: 460px;"
            :style="isDark
              ? 'background:linear-gradient(135deg,rgba(23,79,42,0.28) 0%,rgba(18,26,20,0.5) 100%);border:1px solid rgba(255,255,255,0.07);'
              : 'background:linear-gradient(135deg,rgba(200,230,208,0.45) 0%,rgba(232,244,235,0.55) 100%);border:1px solid rgba(23,79,42,0.08);'"
          >
            <!-- Tag badge -->
            <div class="absolute top-5 left-5 z-10">
              <span
                class="px-3 py-1 rounded-full text-xs font-bold tracking-wide"
                :style="isDark
                  ? 'background:rgba(23,79,42,0.6);color:#4caf72;border:1px solid rgba(76,175,114,0.25);backdrop-filter:blur(8px);'
                  : 'background:rgba(23,79,42,0.1);color:#174f2a;border:1px solid rgba(23,79,42,0.2);'"
              >{{ product.tag }}</span>
            </div>

            <!-- Discount badge -->
            <div class="absolute top-5 right-5 z-10">
              <span
                class="px-2.5 py-1 rounded-full text-xs font-bold"
                style="background:rgba(239,68,68,0.15);color:#ef4444;border:1px solid rgba(239,68,68,0.25);"
              >-{{ discount }}% OFF</span>
            </div>

            <!-- Wishlist -->
            <button
              class="absolute bottom-5 right-5 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
              :style="isDark
                ? 'background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.12);backdrop-filter:blur(8px);'
                : 'background:rgba(255,255,255,0.8);border:1px solid rgba(23,79,42,0.15);backdrop-filter:blur(8px);'"
              @click="wishlisted = !wishlisted"
            >
              <svg
                class="w-5 h-5 transition-all duration-200"
                :style="wishlisted ? 'color:#ef4444;fill:#ef4444;' : (isDark ? 'color:rgba(255,255,255,0.4);' : 'color:#9ca3af;')"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>

            <!-- Plant image -->
            <img
              :src="product.images[activeImage]"
              :alt="product.name"
              class="h-80 w-auto object-contain drop-shadow-2xl transition-all duration-500"
              style="filter:drop-shadow(0 20px 40px rgba(23,79,42,0.2));"
            />

            <!-- Subtle shimmer overlay on hover -->
            <div
              class="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style="background:linear-gradient(135deg,rgba(255,255,255,0.03) 0%,rgba(255,255,255,0.07) 50%,rgba(255,255,255,0.03) 100%);"
            />
          </div>

        </div>

        <!-- RIGHT: Product Info -->
        <div class="flex flex-col gap-6 pt-2">

          <!-- Category + SKU -->
          <div class="flex items-center gap-3 flex-wrap">
            <span
              class="px-3 py-1 rounded-full text-xs font-semibold"
              :style="isDark
                ? 'background:rgba(23,79,42,0.3);color:#4caf72;border:1px solid rgba(76,175,114,0.2);'
                : 'background:rgba(23,79,42,0.08);color:#174f2a;border:1px solid rgba(23,79,42,0.15);'"
            >{{ product.category }}</span>
            <span class="text-xs" :style="isDark ? 'color:#4b5563;' : 'color:#9ca3af;'">
              SKU: {{ product.sku }}
            </span>
            <span
              class="ml-auto px-2.5 py-1 rounded-full text-xs font-semibold"
              :style="product.inStock
                ? 'background:rgba(34,197,94,0.12);color:#22c55e;border:1px solid rgba(34,197,94,0.2);'
                : 'background:rgba(239,68,68,0.12);color:#ef4444;border:1px solid rgba(239,68,68,0.2);'"
            >{{ product.inStock ? 'In Stock' : 'Out of Stock' }}</span>
          </div>

          <!-- Name -->
          <h1
            class="text-4xl sm:text-5xl font-bold leading-tight"
            style="font-family:'Montserrat',sans-serif;letter-spacing:-0.02em;"
            :style="isDark ? 'color:#f0f0f0;' : 'color:#1a2e1f;'"
          >{{ product.name }}</h1>

          <!-- Rating -->
          <div class="flex items-center gap-3">
            <div class="flex items-center gap-0.5">
              <svg v-for="i in 5" :key="i" class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <span class="text-sm font-semibold" :style="isDark ? 'color:#f0f0f0;' : 'color:#1a2e1f;'">{{ product.rating }}</span>
            <span class="text-sm" :style="isDark ? 'color:#6b7280;' : 'color:#9ca3af;'">({{ product.reviewCount }} reviews)</span>
          </div>

          <!-- Price -->
          <div class="flex items-end gap-3">
            <span
              class="text-4xl font-bold"
              style="font-family:'Montserrat',sans-serif;"
              :class="isDark ? 'text-[#4caf72]' : 'text-[#174f2a]'"
            >Rs {{ product.price.toLocaleString() }}.00</span>
            <span
              class="text-xl line-through mb-1"
              :style="isDark ? 'color:#374151;' : 'color:#d1d5db;'"
            >Rs {{ product.originalPrice.toLocaleString() }}.00</span>
          </div>

          <!-- Short description -->
          <p class="text-sm leading-relaxed" :style="isDark ? 'color:#9ca3af;' : 'color:#6b7280;'">
            {{ product.description }}
          </p>

          <!-- Divider -->
          <div :style="isDark ? 'height:1px;background:rgba(255,255,255,0.07);' : 'height:1px;background:rgba(23,79,42,0.08);'" />

          <!-- Tags -->
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in product.tags"
              :key="tag"
              class="px-3 py-1 rounded-full text-xs"
              :style="isDark
                ? 'background:rgba(255,255,255,0.05);color:#6b7280;border:1px solid rgba(255,255,255,0.08);'
                : 'background:rgba(23,79,42,0.05);color:#6b7280;border:1px solid rgba(23,79,42,0.1);'"
            >{{ tag }}</span>
          </div>

          <!-- Quantity + Add to Cart -->
          <div class="flex items-center gap-4 mt-2">
            <!-- Quantity selector -->
            <div
              class="flex items-center rounded-2xl overflow-hidden"
              :style="isDark
                ? 'background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);'
                : 'background:rgba(255,255,255,0.7);border:1px solid rgba(23,79,42,0.12);'"
            >
              <button
                class="w-11 h-11 flex items-center justify-center text-xl font-light transition-all duration-200 hover:opacity-70"
                :style="isDark ? 'color:#4caf72;' : 'color:#174f2a;'"
                @click="quantity > 1 && quantity--"
              >−</button>
              <span
                class="w-10 text-center text-sm font-semibold"
                :style="isDark ? 'color:#f0f0f0;' : 'color:#1a2e1f;'"
              >{{ quantity }}</span>
              <button
                class="w-11 h-11 flex items-center justify-center text-xl font-light transition-all duration-200 hover:opacity-70"
                :style="isDark ? 'color:#4caf72;' : 'color:#174f2a;'"
                @click="quantity++"
              >+</button>
            </div>

            <!-- Add to Cart button -->
            <button
              class="flex-1 py-3.5 rounded-2xl text-white text-sm font-semibold tracking-wide transition-all duration-300 hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2"
              :style="addedToCart
                ? 'background:#22c55e;box-shadow:0 4px 20px rgba(34,197,94,0.3);'
                : (isDark
                    ? 'background:#1e6334;box-shadow:0 4px 20px rgba(23,79,42,0.35);'
                    : 'background:#174f2a;box-shadow:0 4px 20px rgba(23,79,42,0.2);')"
              @click="handleAddToCart"
            >
              <svg v-if="!addedToCart" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              {{ addedToCart ? 'Added to Cart!' : `Add to cart →` }}
            </button>
          </div>

          <!-- Trust badges -->
          <div class="grid grid-cols-3 gap-3 mt-2">
            <div
              v-for="badge in [
                { icon: '🚚', label: 'Free Shipping' },
                { icon: '🔄', label: '30-day Returns' },
                { icon: '🌱', label: '100% Organic' },
              ]"
              :key="badge.label"
              class="flex flex-col items-center gap-1.5 py-3 rounded-2xl text-center"
              :style="isDark
                ? 'background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);'
                : 'background:rgba(255,255,255,0.6);border:1px solid rgba(23,79,42,0.08);'"
            >
              <span class="text-xl">{{ badge.icon }}</span>
              <span class="text-xs font-medium" :style="isDark ? 'color:#6b7280;' : 'color:#9ca3af;'">{{ badge.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ───── TABS: Description / Info / Reviews ───── -->
    <section
      class="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12 transition-colors duration-500"
    >
      <!-- Tab bar -->
      <div
        class="flex gap-1 p-1 rounded-2xl w-fit mb-10"
        :style="isDark
          ? 'background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);'
          : 'background:rgba(23,79,42,0.06);border:1px solid rgba(23,79,42,0.1);'"
      >
        <button
          v-for="tab in [
            { id: 'description', label: 'Descriptions' },
            { id: 'info',        label: 'Additional Information' },
            { id: 'reviews',     label: 'Customer Feedback' },
          ]"
          :key="tab.id"
          class="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
          :style="activeTab === tab.id
            ? (isDark ? 'background:#174f2a;color:#4caf72;' : 'background:#174f2a;color:#ffffff;')
            : (isDark ? 'color:#6b7280;' : 'color:#6b7280;')"
          @click="activeTab = (tab.id as any)"
        >{{ tab.label }}</button>
      </div>

      <!-- Tab content -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

        <!-- LEFT text -->
        <div>
          <!-- Description tab -->
          <div v-if="activeTab === 'description'">
            <p class="text-sm leading-relaxed mb-6" :style="isDark ? 'color:#9ca3af;' : 'color:#6b7280;'">
              {{ product.description }}
            </p>
            <p class="text-sm leading-relaxed mb-6" :style="isDark ? 'color:#9ca3af;' : 'color:#6b7280;'">
              These plants grow slowly and require very little care, making them ideal for beginners and busy plant lovers. With proper sunlight and minimal watering, they can live for many years and even produce small beautiful flowers.
            </p>
            <ul class="space-y-3">
              <li
                v-for="feat in product.features"
                :key="feat"
                class="flex items-center gap-3 text-sm"
                :style="isDark ? 'color:#9ca3af;' : 'color:#6b7280;'"
              >
                <span
                  class="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                  :style="isDark ? 'background:rgba(23,79,42,0.5);' : 'background:rgba(23,79,42,0.1);'"
                >
                  <svg class="w-3 h-3" :class="isDark ? 'text-[#4caf72]' : 'text-[#174f2a]'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                {{ feat }}
              </li>
            </ul>
          </div>

          <!-- Info tab -->
          <div v-else-if="activeTab === 'info'">
            <table class="w-full text-sm">
              <tbody class="divide-y" :class="isDark ? 'divide-white/5' : 'divide-[#174f2a]/05'">
                <tr v-for="row in [
                  { label: 'Category',         value: product.category },
                  { label: 'SKU',              value: product.sku },
                  { label: 'Light Requirement', value: 'Indirect sunlight' },
                  { label: 'Watering',          value: 'Once a week' },
                  { label: 'Soil Type',         value: 'Well-draining potting mix' },
                  { label: 'Growth Rate',       value: 'Slow to moderate' },
                  { label: 'Pet Friendly',      value: 'Yes' },
                ]" :key="row.label">
                  <td class="py-3 pr-8 font-semibold" :style="isDark ? 'color:#6b7280;' : 'color:#9ca3af;'">{{ row.label }}</td>
                  <td class="py-3" :style="isDark ? 'color:#f0f0f0;' : 'color:#1a2e1f;'">{{ row.value }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Reviews tab -->
          <div v-else class="space-y-5">
            <div
              v-for="review in [
                { name: 'Amal P.',  stars: 5, date: '12 Mar 2025', text: 'Absolutely love this plant! It arrived in perfect condition and looks stunning in my living room.' },
                { name: 'Nisha K.', stars: 5, date: '2 Feb 2025',  text: 'Very healthy plant. The packaging was great and the plant is exactly as described. Highly recommend!' },
                { name: 'Ravi S.', stars: 4, date: '18 Jan 2025',  text: 'Good quality plant, easy to care for. Delivery was a bit slow but worth the wait.' },
              ]"
              :key="review.name"
              class="p-5 rounded-2xl"
              :style="isDark
                ? 'background:rgba(26,46,31,0.45);border:1px solid rgba(255,255,255,0.06);backdrop-filter:blur(12px);'
                : 'background:rgba(255,255,255,0.6);border:1px solid rgba(23,79,42,0.08);backdrop-filter:blur(12px);'"
            >
              <div class="flex items-start justify-between mb-3">
                <div>
                  <p class="text-sm font-bold" :style="isDark ? 'color:#f0f0f0;' : 'color:#1a2e1f;'">{{ review.name }}</p>
                  <div class="flex items-center gap-0.5 mt-1">
                    <svg v-for="s in review.stars" :key="s" class="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
                <span class="text-xs" :style="isDark ? 'color:#4b5563;' : 'color:#9ca3af;'">{{ review.date }}</span>
              </div>
              <p class="text-xs leading-relaxed" :style="isDark ? 'color:#9ca3af;' : 'color:#6b7280;'">{{ review.text }}</p>
            </div>
          </div>
        </div>

      
      </div>
    </section>

    <!-- ───── RELATED PRODUCTS ───── -->
    <section
      class="py-16 px-6 sm:px-10 lg:px-16 transition-colors duration-500"
      :style="isDark ? 'background-color:#0e1610;' : 'background-color:#f8f7f2;'"
    >
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-10">
          <h2
            class="text-3xl font-bold mb-2"
            style="font-family:'Montserrat',sans-serif;"
            :style="isDark ? 'color:#f0f0f0;' : 'color:#174f2a;'"
          >Related Products</h2>
          <p class="text-sm" :style="isDark ? 'color:#6b7280;' : 'color:#9ca3af;'">
            You might also like these curated picks
          </p>
        </div>

        <div class="flex flex-wrap justify-center gap-6">
          <div
            v-for="rel in related"
            :key="rel.id"
            class="group relative rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-3 cursor-pointer flex-none w-full sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-72px)/4)]"
            :style="isDark
              ? 'background:rgba(26,46,31,0.55);backdrop-filter:blur(20px) saturate(180%);border:1px solid rgba(255,255,255,0.07);box-shadow:0 8px 32px rgba(0,0,0,0.35);'
              : 'background:rgba(255,255,255,0.7);backdrop-filter:blur(20px) saturate(180%);border:1px solid rgba(255,255,255,0.9);box-shadow:0 8px 32px rgba(23,79,42,0.07);'"
            @click="goToProduct(rel.id)"
          >
            <!-- Tag -->
            <div class="absolute top-4 left-4 z-10">
              <span
                class="px-2.5 py-1 rounded-full text-xs font-semibold"
                :style="isDark
                  ? 'background:rgba(23,79,42,0.55);color:#4caf72;border:1px solid rgba(76,175,114,0.25);backdrop-filter:blur(8px);'
                  : 'background:rgba(23,79,42,0.1);color:#174f2a;border:1px solid rgba(23,79,42,0.18);'"
              >{{ rel.tag }}</span>
            </div>

            <!-- Image area -->
            <div
              class="h-44 flex items-center justify-center overflow-hidden"
              :style="isDark
                ? 'background:linear-gradient(135deg,rgba(23,79,42,0.28) 0%,rgba(18,26,20,0.4) 100%);'
                : 'background:linear-gradient(135deg,rgba(200,230,208,0.45) 0%,rgba(232,244,235,0.3) 100%);'"
            >
              <img
                :src="rel.image"
                :alt="rel.name"
                class="h-36 w-auto object-contain transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1 drop-shadow-lg"
              />
            </div>

            <!-- Divider -->
            <div :style="isDark ? 'margin:0 1.25rem;height:1px;background:rgba(255,255,255,0.06);' : 'margin:0 1.25rem;height:1px;background:rgba(23,79,42,0.07);'" />

            <!-- Info -->
            <div class="px-5 py-4">
              <h3 class="text-sm font-semibold mb-1" :style="isDark ? 'color:#f0f0f0;' : 'color:#1a2e1f;'">{{ rel.name }}</h3>
              <div class="flex items-center justify-between">
                <span class="text-base font-bold" :class="isDark ? 'text-[#4caf72]' : 'text-[#174f2a]'">Rs {{ rel.price.toLocaleString() }}.00</span>
                <div class="flex items-center gap-0.5">
                  <svg class="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span class="text-xs ml-0.5" :style="isDark ? 'color:#9ca3af;' : 'color:#6b7280;'">{{ rel.rating }}</span>
                </div>
              </div>

              <!-- Add to cart row -->
              <button
                class="w-full mt-3 py-2.5 rounded-2xl text-white text-xs font-semibold tracking-wide transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
                :style="isDark
                  ? 'background:rgba(23,79,42,0.75);border:1px solid rgba(76,175,114,0.18);backdrop-filter:blur(8px);box-shadow:0 4px 15px rgba(23,79,42,0.28);'
                  : 'background:#174f2a;box-shadow:0 4px 15px rgba(23,79,42,0.18);'"
                @click.stop="handleAddRelatedToCart(rel.id)"
              >Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ───── FOOTER ───── -->
    <FooterBar />
  </div>
</template>
