<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  id: number
  name: string
  price: string
  tag?: string
  image: string
  rating?: number
  reviewCount?: number
  description?: string
  isDark?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  tag: '',
  rating: 4.9,
  reviewCount: 128,
  description: 'A beautiful plant to brighten up your space.',
  isDark: false,
})

const emit = defineEmits<{
  (e: 'add-to-cart', id: number): void
  (e: 'toggle-wishlist', id: number): void
  (e: 'view-detail', id: number): void
}>()

const isWishlisted = ref(false)
const isAddingToCart = ref(false)

const tagStyles = {
  Popular: { bg: 'rgba(76,175,114,0.15)', color: '#4caf72', border: 'rgba(76,175,114,0.3)' },
  New:     { bg: 'rgba(59,130,246,0.15)', color: '#60a5fa', border: 'rgba(96,165,250,0.3)' },
  Sale:    { bg: 'rgba(245,158,11,0.15)', color: '#fbbf24', border: 'rgba(251,191,36,0.3)' },
}

const getTagStyle = (tag: string, dark: boolean) => {
  if (dark) {
    const s = tagStyles[tag as keyof typeof tagStyles] || tagStyles.Popular
    return `background:${s.bg};color:${s.color};border:1px solid ${s.border};backdrop-filter:blur(8px);`
  }
  return tag === 'Popular'
    ? 'background:rgba(23,79,42,0.1);color:#174f2a;border:1px solid rgba(23,79,42,0.18);'
    : tag === 'New'
    ? 'background:rgba(59,130,246,0.1);color:#2563eb;border:1px solid rgba(37,99,235,0.2);'
    : 'background:rgba(245,158,11,0.1);color:#d97706;border:1px solid rgba(217,119,6,0.2);'
}

const handleAddToCart = () => {
  isAddingToCart.value = true
  emit('add-to-cart', props.id)
  setTimeout(() => (isAddingToCart.value = false), 1200)
}

const handleWishlist = () => {
  isWishlisted.value = !isWishlisted.value
  emit('toggle-wishlist', props.id)
}
</script>

<template>
  <div
    class="group relative rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-3 cursor-pointer"
    :style="isDark
      ? 'background:rgba(26,46,31,0.55);backdrop-filter:blur(20px) saturate(180%);-webkit-backdrop-filter:blur(20px) saturate(180%);border:1px solid rgba(255,255,255,0.07);box-shadow:0 8px 32px rgba(0,0,0,0.35);'
      : 'background:rgba(255,255,255,0.7);backdrop-filter:blur(20px) saturate(180%);-webkit-backdrop-filter:blur(20px) saturate(180%);border:1px solid rgba(255,255,255,0.9);box-shadow:0 8px 32px rgba(23,79,42,0.07);'"
    @click="emit('view-detail', id)"
  >

    <!-- Tag badge -->
    <div v-if="tag" class="absolute top-4 left-4 z-10">
      <span
        class="px-2.5 py-1 rounded-full text-xs font-semibold"
        :style="getTagStyle(tag, isDark)"
      >{{ tag }}</span>
    </div>

    <!-- Wishlist button -->
    <button
      class="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
      :style="isDark
        ? 'background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.1);backdrop-filter:blur(8px);'
        : 'background:rgba(255,255,255,0.75);border:1px solid rgba(255,255,255,0.95);backdrop-filter:blur(8px);'"
      @click.stop="handleWishlist"
    >
      <svg
        class="w-4 h-4 transition-all duration-200"
        :style="isWishlisted
          ? 'color:#ef4444;'
          : isDark ? 'color:rgba(255,255,255,0.5);' : 'color:#9ca3af;'"
        :fill="isWishlisted ? 'currentColor' : 'none'"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    </button>

    <!-- Plant image area -->
    <div
      class="h-52 flex items-center justify-center relative overflow-hidden"
      :style="isDark
        ? 'background:linear-gradient(135deg,rgba(23,79,42,0.28) 0%,rgba(18,26,20,0.4) 100%);'
        : 'background:linear-gradient(135deg,rgba(200,230,208,0.45) 0%,rgba(232,244,235,0.3) 100%);'"
    >
      <img
        :src="image"
        :alt="name"
        class="h-44 w-auto object-contain transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1 drop-shadow-lg"
      />
      <!-- Shine overlay on hover -->
      <div
        class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style="background:linear-gradient(135deg,rgba(255,255,255,0.04) 0%,rgba(255,255,255,0.1) 50%,rgba(255,255,255,0.04) 100%);"
      />
      <!-- Quick-view pill (appears on hover) -->
      <div
        class="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
      >
        <span
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap"
          :style="isDark
            ? 'background:rgba(18,26,20,0.8);color:#4caf72;border:1px solid rgba(76,175,114,0.25);backdrop-filter:blur(8px);'
            : 'background:rgba(255,255,255,0.85);color:#174f2a;border:1px solid rgba(23,79,42,0.15);backdrop-filter:blur(8px);'"
        >
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          Quick View
        </span>
      </div>
    </div>

    <!-- Divider -->
    <div :style="isDark
      ? 'margin:0 1.25rem;height:1px;background:rgba(255,255,255,0.06);'
      : 'margin:0 1.25rem;height:1px;background:rgba(23,79,42,0.07);'"
    />

    <!-- Card content -->
    <div class="px-5 py-5">
      <div class="flex items-start justify-between mb-3">
        <div class="flex-1 min-w-0 pr-2">
          <h3
            class="text-base font-semibold mb-0.5 truncate"
            :style="isDark ? 'color:#f0f0f0;' : 'color:#1a2e1f;'"
          >{{ name }}</h3>
          <p
            class="text-xs leading-relaxed mb-2 line-clamp-1"
            :style="isDark ? 'color:#6b7280;' : 'color:#9ca3af;'"
          >{{ description }}</p>
          <span
            class="text-lg font-bold"
            :class="isDark ? 'text-[#4caf72]' : 'text-[#174f2a]'"
          >{{ price }}</span>
        </div>
      </div>

      <!-- Stars -->
      <div class="flex items-center gap-0.5 mb-5">
        <template v-for="i in 5" :key="i">
          <svg
            class="w-3 h-3"
            :class="i <= Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </template>
        <span class="text-xs ml-1" :style="isDark ? 'color:#9ca3af;' : 'color:#6b7280;'">
          ({{ rating }}) · {{ reviewCount }} reviews
        </span>
      </div>

      <!-- Action buttons -->
      <div class="flex items-center gap-2">
        <!-- Add to Cart -->
        <button
          class="flex-1 py-3 rounded-2xl text-white text-sm font-semibold tracking-wide transition-all duration-300 hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 overflow-hidden relative"
          :style="isDark
            ? 'background:rgba(23,79,42,0.75);border:1px solid rgba(76,175,114,0.18);backdrop-filter:blur(8px);box-shadow:0 4px 15px rgba(23,79,42,0.28);'
            : 'background:#174f2a;box-shadow:0 4px 15px rgba(23,79,42,0.18);'"
          @click.stop="handleAddToCart"
          @mouseover="(e) => (e.currentTarget as HTMLElement).style.background = isDark ? 'rgba(30,99,52,0.88)' : '#1e6334'"
          @mouseleave="(e) => (e.currentTarget as HTMLElement).style.background = isDark ? 'rgba(23,79,42,0.75)' : '#174f2a'"
        >
          <transition name="fade-swap" mode="out-in">
            <span v-if="!isAddingToCart" key="default" class="flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Add to Cart
            </span>
            <span v-else key="added" class="flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Added!
            </span>
          </transition>
        </button>

        <!-- Buy Now icon button -->
        <button
          class="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
          :style="isDark
            ? 'background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:#9ca3af;backdrop-filter:blur(8px);'
            : 'background:rgba(23,79,42,0.07);border:1px solid rgba(23,79,42,0.12);color:#174f2a;'"
          title="Buy Now"
          @click.stop="emit('view-detail', id)"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-swap-enter-active,
.fade-swap-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-swap-enter-from {
  opacity: 0;
  transform: translateY(6px);
}
.fade-swap-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
.line-clamp-1 {
  display: -webkit-box;
  line-clamp: 1;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
