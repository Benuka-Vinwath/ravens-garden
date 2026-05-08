<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import NavBar from '../components/NavBar.vue'
import FooterBar from '../components/Footer.vue'
import { useCart } from '../composables/useCart'
import { gardenTools } from '../data/tools'

const route = useRoute()
const router = useRouter()
const { addToCart } = useCart()

const isDark = ref(document.documentElement.classList.contains('dark'))
const observer = new MutationObserver(() => {
  isDark.value = document.documentElement.classList.contains('dark')
})
onMounted(() => observer.observe(document.documentElement, { attributeFilter: ['class'] }))
onUnmounted(() => observer.disconnect())

const formatCategory = (category: string): string =>
  category.replace(/(^\w)|-\w/g, (match) => match.replace('-', ' ').toUpperCase())

const allTools = gardenTools.map((tool, index, source) => ({
  id: tool.id,
  name: tool.name,
  price: tool.price,
  originalPrice: Math.round(tool.price * 1.15),
  tag: tool.rating >= 4.8 ? 'Popular' : tool.stock <= 20 ? 'Sale' : 'New',
  sku: `RGT-${String(tool.id).padStart(3, '0')}`,
  image: tool.image,
  images: [tool.image, source[(index + 1) % source.length].image, source[(index + 2) % source.length].image],
  rating: tool.rating,
  reviewCount: tool.reviewCount,
  inStock: tool.stock > 0,
  category: formatCategory(tool.category),
  categoryKey: tool.category,
  tags: [formatCategory(tool.category), 'Durable', 'Garden Essential'],
  description: tool.description,
  features: [
    'Built with durable materials for long-term use',
    'Comfortable grip suitable for daily gardening tasks',
    'Easy to clean and maintain after work',
    'Ideal for home gardens and balcony setups',
  ],
}))

const toolId = computed(() => Number(route.params.id) || allTools[0].id)
const tool = computed(() => allTools.find((item) => item.id === toolId.value) ?? allTools[0])
const related = computed(() =>
  allTools
    .filter((item) => item.id !== tool.value.id && item.categoryKey === tool.value.categoryKey)
    .slice(0, 3),
)

const activeImage = ref(0)
const activeTab = ref<'description' | 'info' | 'reviews'>('description')
const quantity = ref(1)
const wishlisted = ref(false)
const addedToCart = ref(false)

const discount = computed(() =>
  Math.round(((tool.value.originalPrice - tool.value.price) / tool.value.originalPrice) * 100),
)

const handleAddToCart = () => {
  addToCart(
    {
      id: tool.value.id,
      name: tool.value.name,
      price: tool.value.price,
      image: tool.value.image,
      tag: tool.value.tag,
    },
    quantity.value,
  )
  addedToCart.value = true
  setTimeout(() => (addedToCart.value = false), 2000)
}

const handleAddRelatedToCart = (id: number) => {
  const selected = allTools.find((item) => item.id === id)
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

const goToTool = (id: number) => {
  router.push(`/tools/${id}`)
  activeImage.value = 0
  activeTab.value = 'description'
  quantity.value = 1
  wishlisted.value = false
}
</script>

<template>
  <div
    class="min-h-screen transition-colors duration-500"
    :style="isDark ? 'background-color:#121a14;color:#f0f0f0;' : 'background-color:#f8f7f2;color:#1a2e1f;'"
  >
    <NavBar />

    <div class="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-28 pb-4">
      <nav class="flex items-center gap-2 text-xs">
        <button class="transition-colors duration-200 hover:underline" :style="isDark ? 'color:#6b7280;' : 'color:#9ca3af;'" @click="router.push('/')">Home</button>
        <span :style="isDark ? 'color:#374151;' : 'color:#d1d5db;'">/</span>
        <button class="transition-colors duration-200 hover:underline" :style="isDark ? 'color:#6b7280;' : 'color:#9ca3af;'" @click="router.push('/tools')">Tools</button>
        <span :style="isDark ? 'color:#374151;' : 'color:#d1d5db;'">/</span>
        <span class="font-semibold" :class="isDark ? 'text-[#4caf72]' : 'text-[#174f2a]'">{{ tool.name }}</span>
      </nav>
    </div>

    <section class="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div class="flex flex-col gap-4">
          <div
            class="relative rounded-3xl overflow-hidden flex items-center justify-center"
            style="height: 460px;"
            :style="isDark
              ? 'background:linear-gradient(135deg,rgba(23,79,42,0.28) 0%,rgba(18,26,20,0.5) 100%);border:1px solid rgba(255,255,255,0.07);'
              : 'background:linear-gradient(135deg,rgba(200,230,208,0.45) 0%,rgba(232,244,235,0.55) 100%);border:1px solid rgba(23,79,42,0.08);'"
          >
            <div class="absolute top-5 left-5 z-10">
              <span
                class="px-3 py-1 rounded-full text-xs font-bold tracking-wide"
                :style="isDark
                  ? 'background:rgba(23,79,42,0.6);color:#4caf72;border:1px solid rgba(76,175,114,0.25);backdrop-filter:blur(8px);'
                  : 'background:rgba(23,79,42,0.1);color:#174f2a;border:1px solid rgba(23,79,42,0.2);'"
              >{{ tool.tag }}</span>
            </div>
            <div class="absolute top-5 right-5 z-10">
              <span class="px-2.5 py-1 rounded-full text-xs font-bold" style="background:rgba(239,68,68,0.15);color:#ef4444;border:1px solid rgba(239,68,68,0.25);">
                -{{ discount }}% OFF
              </span>
            </div>
            <button
              class="absolute bottom-5 right-5 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
              :style="isDark
                ? 'background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.12);backdrop-filter:blur(8px);'
                : 'background:rgba(255,255,255,0.8);border:1px solid rgba(23,79,42,0.15);backdrop-filter:blur(8px);'"
              @click="wishlisted = !wishlisted"
            >
              <svg class="w-5 h-5 transition-all duration-200" :style="wishlisted ? 'color:#ef4444;fill:#ef4444;' : (isDark ? 'color:rgba(255,255,255,0.4);' : 'color:#9ca3af;')" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <img :src="tool.images[activeImage]" :alt="tool.name" class="h-80 w-auto object-contain drop-shadow-2xl transition-all duration-500" style="filter:drop-shadow(0 20px 40px rgba(23,79,42,0.2));" />
          </div>
        </div>

        <div class="flex flex-col gap-6 pt-2">
          <div class="flex items-center gap-3 flex-wrap">
            <span class="px-3 py-1 rounded-full text-xs font-semibold" :style="isDark ? 'background:rgba(23,79,42,0.3);color:#4caf72;border:1px solid rgba(76,175,114,0.2);' : 'background:rgba(23,79,42,0.08);color:#174f2a;border:1px solid rgba(23,79,42,0.15);'">{{ tool.category }}</span>
            <span class="text-xs" :style="isDark ? 'color:#4b5563;' : 'color:#9ca3af;'">SKU: {{ tool.sku }}</span>
            <span class="ml-auto px-2.5 py-1 rounded-full text-xs font-semibold" :style="tool.inStock ? 'background:rgba(34,197,94,0.12);color:#22c55e;border:1px solid rgba(34,197,94,0.2);' : 'background:rgba(239,68,68,0.12);color:#ef4444;border:1px solid rgba(239,68,68,0.2);'">
              {{ tool.inStock ? 'In Stock' : 'Out of Stock' }}
            </span>
          </div>

          <h1 class="text-4xl sm:text-5xl font-bold leading-tight" style="font-family:'Montserrat',sans-serif;letter-spacing:-0.02em;" :style="isDark ? 'color:#f0f0f0;' : 'color:#1a2e1f;'">{{ tool.name }}</h1>

          <div class="flex items-center gap-3">
            <div class="flex items-center gap-0.5">
              <svg v-for="i in 5" :key="i" class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <span class="text-sm font-semibold" :style="isDark ? 'color:#f0f0f0;' : 'color:#1a2e1f;'">{{ tool.rating }}</span>
            <span class="text-sm" :style="isDark ? 'color:#6b7280;' : 'color:#9ca3af;'">({{ tool.reviewCount }} reviews)</span>
          </div>

          <div class="flex items-end gap-3">
            <span class="text-4xl font-bold" style="font-family:'Montserrat',sans-serif;" :class="isDark ? 'text-[#4caf72]' : 'text-[#174f2a]'">Rs {{ tool.price.toLocaleString() }}.00</span>
            <span class="text-xl line-through mb-1" :style="isDark ? 'color:#374151;' : 'color:#d1d5db;'">Rs {{ tool.originalPrice.toLocaleString() }}.00</span>
          </div>

          <p class="text-sm leading-relaxed" :style="isDark ? 'color:#9ca3af;' : 'color:#6b7280;'">{{ tool.description }}</p>

          <div :style="isDark ? 'height:1px;background:rgba(255,255,255,0.07);' : 'height:1px;background:rgba(23,79,42,0.08);'" />

          <div class="flex flex-wrap gap-2">
            <span v-for="tag in tool.tags" :key="tag" class="px-3 py-1 rounded-full text-xs" :style="isDark ? 'background:rgba(255,255,255,0.05);color:#6b7280;border:1px solid rgba(255,255,255,0.08);' : 'background:rgba(23,79,42,0.05);color:#6b7280;border:1px solid rgba(23,79,42,0.1);'">{{ tag }}</span>
          </div>

          <div class="flex items-center gap-4 mt-2">
            <div class="flex items-center rounded-2xl overflow-hidden" :style="isDark ? 'background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);' : 'background:rgba(255,255,255,0.7);border:1px solid rgba(23,79,42,0.12);'">
              <button class="w-11 h-11 flex items-center justify-center text-xl font-light transition-all duration-200 hover:opacity-70" :style="isDark ? 'color:#4caf72;' : 'color:#174f2a;'" @click="quantity > 1 && quantity--">−</button>
              <span class="w-10 text-center text-sm font-semibold" :style="isDark ? 'color:#f0f0f0;' : 'color:#1a2e1f;'">{{ quantity }}</span>
              <button class="w-11 h-11 flex items-center justify-center text-xl font-light transition-all duration-200 hover:opacity-70" :style="isDark ? 'color:#4caf72;' : 'color:#174f2a;'" @click="quantity++">+</button>
            </div>
            <button
              class="flex-1 py-3.5 rounded-2xl text-white text-sm font-semibold tracking-wide transition-all duration-300 hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2"
              :style="addedToCart
                ? 'background:#22c55e;box-shadow:0 4px 20px rgba(34,197,94,0.3);'
                : (isDark ? 'background:#1e6334;box-shadow:0 4px 20px rgba(23,79,42,0.35);' : 'background:#174f2a;box-shadow:0 4px 20px rgba(23,79,42,0.2);')"
              @click="handleAddToCart"
            >
              {{ addedToCart ? 'Added to Cart!' : 'Add to cart →' }}
            </button>
          </div>

          <div class="grid grid-cols-3 gap-3 mt-2">
            <div v-for="badge in [{ icon: '🚚', label: 'Free Shipping' }, { icon: '🔄', label: '30-day Returns' }, { icon: '🛠️', label: 'Tool Warranty' }]" :key="badge.label" class="flex flex-col items-center gap-1.5 py-3 rounded-2xl text-center" :style="isDark ? 'background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);' : 'background:rgba(255,255,255,0.6);border:1px solid rgba(23,79,42,0.08);'">
              <span class="text-xl">{{ badge.icon }}</span>
              <span class="text-xs font-medium" :style="isDark ? 'color:#6b7280;' : 'color:#9ca3af;'">{{ badge.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12 transition-colors duration-500">
      <div class="flex gap-1 p-1 rounded-2xl w-fit mb-10" :style="isDark ? 'background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);' : 'background:rgba(23,79,42,0.06);border:1px solid rgba(23,79,42,0.1);'">
        <button v-for="tab in [{ id: 'description', label: 'Descriptions' }, { id: 'info', label: 'Additional Information' }, { id: 'reviews', label: 'Customer Feedback' }]" :key="tab.id" class="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200" :style="activeTab === tab.id ? (isDark ? 'background:#174f2a;color:#4caf72;' : 'background:#174f2a;color:#ffffff;') : (isDark ? 'color:#6b7280;' : 'color:#6b7280;')" @click="activeTab = (tab.id as any)">
          {{ tab.label }}
        </button>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div>
          <div v-if="activeTab === 'description'">
            <p class="text-sm leading-relaxed mb-6" :style="isDark ? 'color:#9ca3af;' : 'color:#6b7280;'">{{ tool.description }}</p>
            <ul class="space-y-3">
              <li v-for="feat in tool.features" :key="feat" class="flex items-center gap-3 text-sm" :style="isDark ? 'color:#9ca3af;' : 'color:#6b7280;'">
                <span class="w-5 h-5 rounded-full flex items-center justify-center shrink-0" :style="isDark ? 'background:rgba(23,79,42,0.5);' : 'background:rgba(23,79,42,0.1);'">
                  <svg class="w-3 h-3" :class="isDark ? 'text-[#4caf72]' : 'text-[#174f2a]'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                {{ feat }}
              </li>
            </ul>
          </div>
          <div v-else-if="activeTab === 'info'">
            <table class="w-full text-sm">
              <tbody class="divide-y" :class="isDark ? 'divide-white/5' : 'divide-[#174f2a]/05'">
                <tr v-for="row in [{ label: 'Category', value: tool.category }, { label: 'SKU', value: tool.sku }, { label: 'Material', value: 'High-quality steel / polymer blend' }, { label: 'Usage', value: 'Home and balcony gardening' }, { label: 'Warranty', value: '6 months' }]" :key="row.label">
                  <td class="py-3 pr-8 font-semibold" :style="isDark ? 'color:#6b7280;' : 'color:#9ca3af;'">{{ row.label }}</td>
                  <td class="py-3" :style="isDark ? 'color:#f0f0f0;' : 'color:#1a2e1f;'">{{ row.value }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else class="space-y-5">
            <div v-for="review in [{ name: 'Ravindu M.', stars: 5, date: '16 Mar 2026', text: 'Great tool quality and very handy for daily garden work.' }, { name: 'Ishara D.', stars: 5, date: '2 Mar 2026', text: 'Value for money. Strong build and looks exactly like photos.' }]" :key="review.name" class="p-5 rounded-2xl" :style="isDark ? 'background:rgba(26,46,31,0.45);border:1px solid rgba(255,255,255,0.06);backdrop-filter:blur(12px);' : 'background:rgba(255,255,255,0.6);border:1px solid rgba(23,79,42,0.08);backdrop-filter:blur(12px);'">
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

    <section class="py-16 px-6 sm:px-10 lg:px-16 transition-colors duration-500" :style="isDark ? 'background-color:#0e1610;' : 'background-color:#f8f7f2;'">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-10">
          <h2 class="text-3xl font-bold mb-2" style="font-family:'Montserrat',sans-serif;" :style="isDark ? 'color:#f0f0f0;' : 'color:#174f2a;'">Related Tools</h2>
          <p class="text-sm" :style="isDark ? 'color:#6b7280;' : 'color:#9ca3af;'">You might also like these tool picks</p>
        </div>

        <div class="flex flex-wrap justify-center gap-6">
          <div
            v-for="rel in related"
            :key="rel.id"
            class="group relative rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-3 cursor-pointer flex-none w-full sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-72px)/4)]"
            :style="isDark
              ? 'background:rgba(26,46,31,0.55);backdrop-filter:blur(20px) saturate(180%);border:1px solid rgba(255,255,255,0.07);box-shadow:0 8px 32px rgba(0,0,0,0.35);'
              : 'background:rgba(255,255,255,0.7);backdrop-filter:blur(20px) saturate(180%);border:1px solid rgba(255,255,255,0.9);box-shadow:0 8px 32px rgba(23,79,42,0.07);'"
            @click="goToTool(rel.id)"
          >
            <div class="absolute top-4 left-4 z-10">
              <span class="px-2.5 py-1 rounded-full text-xs font-semibold" :style="isDark ? 'background:rgba(23,79,42,0.55);color:#4caf72;border:1px solid rgba(76,175,114,0.25);backdrop-filter:blur(8px);' : 'background:rgba(23,79,42,0.1);color:#174f2a;border:1px solid rgba(23,79,42,0.18);'">{{ rel.tag }}</span>
            </div>
            <div class="h-44 flex items-center justify-center overflow-hidden" :style="isDark ? 'background:linear-gradient(135deg,rgba(23,79,42,0.28) 0%,rgba(18,26,20,0.4) 100%);' : 'background:linear-gradient(135deg,rgba(200,230,208,0.45) 0%,rgba(232,244,235,0.3) 100%);'">
              <img :src="rel.image" :alt="rel.name" class="h-36 w-auto object-contain transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1 drop-shadow-lg" />
            </div>
            <div :style="isDark ? 'margin:0 1.25rem;height:1px;background:rgba(255,255,255,0.06);' : 'margin:0 1.25rem;height:1px;background:rgba(23,79,42,0.07);'" />
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

    <FooterBar />
  </div>
</template>
