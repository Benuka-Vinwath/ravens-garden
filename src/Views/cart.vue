<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '../components/NavBar.vue'
import FooterBar from '../components/Footer.vue'
import { useCart } from '../composables/useCart'

const router = useRouter()

const isDark = ref(document.documentElement.classList.contains('dark'))
const observer = new MutationObserver(() => {
  isDark.value = document.documentElement.classList.contains('dark')
})
onMounted(() => observer.observe(document.documentElement, { attributeFilter: ['class'] }))
onUnmounted(() => observer.disconnect())

const { cartItems, subtotal, updateQty, removeItem } = useCart()

// ── Computed totals ────────────────────────────────────────────────────────
const shipping  = computed(() => subtotal.value > 50 ? 0 : 5.99)
const total     = computed(() => subtotal.value + shipping.value)

const fmt = (n: number) => `$${n.toFixed(2)}`
</script>

<template>
  <div
    class="min-h-screen transition-colors duration-500"
    :style="isDark ? 'background-color:#121a14;color:#f0f0f0;' : 'background-color:#f8f7f2;color:#1a2e1f;'"
  >
    <NavBar />

    <!-- ───── PAGE HEADER ───── -->
    <div class="pt-28 pb-6 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto">
      <h1
        class="text-3xl sm:text-4xl font-bold text-center"
        style="font-family:'Montserrat',sans-serif;letter-spacing:-0.02em;"
        :style="isDark ? 'color:#f0f0f0;' : 'color:#174f2a;'"
      >My Shopping Cart</h1>
    </div>

    <!-- ───── CART CONTENT ───── -->
    <section class="px-6 sm:px-10 lg:px-16 pb-20 max-w-7xl mx-auto">

      <!-- Empty state -->
      <div v-if="cartItems.length === 0" class="py-24 flex flex-col items-center gap-5">
        <div
          class="w-24 h-24 rounded-full flex items-center justify-center text-4xl"
          :style="isDark ? 'background:rgba(255,255,255,0.05);' : 'background:rgba(23,79,42,0.07);'"
        >🛒</div>
        <p class="text-lg font-semibold" :style="isDark ? 'color:#9ca3af;' : 'color:#6b7280;'">
          Your cart is empty
        </p>
        <button
          class="px-7 py-3 rounded-xl text-white text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
          :class="isDark ? 'bg-[#1e6334]' : 'bg-[#174f2a]'"
          @click="router.push('/products')"
        >Browse Plants</button>
      </div>

      <!-- Cart grid -->
      <div v-else class="flex flex-col lg:flex-row gap-8 mt-2">

        <!-- ── LEFT: Items table ── -->
        <div class="flex-1">
          <div
            class="rounded-2xl overflow-hidden"
            :style="isDark
              ? 'background:rgba(26,46,31,0.45);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.07);box-shadow:0 8px 32px rgba(0,0,0,0.28);'
              : 'background:rgba(255,255,255,0.85);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.9);box-shadow:0 8px 32px rgba(23,79,42,0.07);'"
          >

            <!-- Table header -->
            <div
              class="hidden sm:grid grid-cols-[2fr_1fr_1.2fr_1fr_auto] gap-4 px-6 py-3 text-xs font-bold tracking-widest uppercase"
              :style="isDark
                ? 'border-bottom:1px solid rgba(255,255,255,0.06);color:#6b7280;background:rgba(0,0,0,0.15);'
                : 'border-bottom:1px solid rgba(23,79,42,0.07);color:#9ca3af;background:rgba(23,79,42,0.03);'"
            >
              <span>Product</span>
              <span class="text-center">Price</span>
              <span class="text-center">Quantity</span>
              <span class="text-center">Subtotal</span>
              <span />
            </div>
            <div :style="isDark ? 'height:1px;background:rgba(255,255,255,0.06);' : 'height:1px;background:rgba(23,79,42,0.07);'" />

            <!-- Cart rows -->
            <div
              v-for="(item, idx) in cartItems"
              :key="item.id"
            >
              <!-- Mobile + Desktop row -->
              <div class="px-6 py-5 flex flex-col sm:grid sm:grid-cols-[2fr_1fr_1.2fr_1fr_auto] sm:items-center gap-4">

                <!-- Product info -->
                <div class="flex items-center gap-4">
                  <div
                    class="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden"
                    :style="isDark
                      ? 'background:linear-gradient(135deg,rgba(23,79,42,0.3) 0%,rgba(18,26,20,0.4) 100%);'
                      : 'background:linear-gradient(135deg,rgba(200,230,208,0.5) 0%,rgba(232,244,235,0.4) 100%);'"
                  >
                    <img :src="item.image" :alt="item.name" class="w-12 h-12 object-contain drop-shadow" />
                  </div>
                  <div>
                    <p class="text-sm font-semibold leading-snug" :style="isDark ? 'color:#f0f0f0;' : 'color:#1a2e1f;'">
                      {{ item.name }}
                    </p>
                    <span
                      v-if="item.tag"
                      class="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
                      :style="isDark
                        ? 'background:rgba(23,79,42,0.45);color:#4caf72;border:1px solid rgba(76,175,114,0.2);'
                        : 'background:rgba(23,79,42,0.08);color:#174f2a;border:1px solid rgba(23,79,42,0.15);'"
                    >{{ item.tag }}</span>
                  </div>
                </div>

                <!-- Price -->
                <div class="flex sm:justify-center items-center gap-2">
                  <span class="sm:hidden text-xs font-semibold" :style="isDark ? 'color:#6b7280;' : 'color:#9ca3af;'">Price:</span>
                  <span class="text-sm font-semibold" :style="isDark ? 'color:#f0f0f0;' : 'color:#1a2e1f;'">
                    {{ fmt(item.price) }}
                  </span>
                </div>

                <!-- Quantity stepper -->
                <div class="flex sm:justify-center items-center gap-2">
                  <span class="sm:hidden text-xs font-semibold" :style="isDark ? 'color:#6b7280;' : 'color:#9ca3af;'">Qty:</span>
                  <div
                    class="flex items-center rounded-xl overflow-hidden"
                    :style="isDark
                      ? 'background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);'
                      : 'background:rgba(23,79,42,0.06);border:1px solid rgba(23,79,42,0.12);'"
                  >
                    <button
                      class="w-8 h-8 flex items-center justify-center text-lg font-bold transition-all duration-150 hover:scale-110 active:scale-95"
                      :style="isDark ? 'color:rgba(255,255,255,0.6);' : 'color:#174f2a;'"
                      @click="updateQty(item.id, -1)"
                    >−</button>
                    <span
                      class="w-9 text-center text-sm font-semibold select-none"
                      :style="isDark ? 'color:#f0f0f0;' : 'color:#1a2e1f;'"
                    >{{ item.quantity }}</span>
                    <button
                      class="w-8 h-8 flex items-center justify-center text-lg font-bold transition-all duration-150 hover:scale-110 active:scale-95"
                      :style="isDark ? 'color:rgba(255,255,255,0.6);' : 'color:#174f2a;'"
                      @click="updateQty(item.id, +1)"
                    >+</button>
                  </div>
                </div>

                <!-- Subtotal -->
                <div class="flex sm:justify-center items-center gap-2">
                  <span class="sm:hidden text-xs font-semibold" :style="isDark ? 'color:#6b7280;' : 'color:#9ca3af;'">Subtotal:</span>
                  <span class="text-sm font-bold" :class="isDark ? 'text-[#4caf72]' : 'text-[#174f2a]'">
                    {{ fmt(item.price * item.quantity) }}
                  </span>
                </div>

                <!-- Remove -->
                <button
                  class="self-start sm:self-center w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 hover:bg-red-500/10"
                  :style="isDark ? 'color:rgba(255,255,255,0.3);' : 'color:#9ca3af;'"
                  @click="removeItem(item.id)"
                  title="Remove item"
                >
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <!-- Row divider (not after last) -->
              <div
                v-if="idx < cartItems.length - 1"
                :style="isDark ? 'margin:0 1.5rem;height:1px;background:rgba(255,255,255,0.05);' : 'margin:0 1.5rem;height:1px;background:rgba(23,79,42,0.06);'"
              />
            </div>

            <!-- Bottom actions -->
            <div
              class="px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3"
              :style="isDark ? 'border-top:1px solid rgba(255,255,255,0.06);' : 'border-top:1px solid rgba(23,79,42,0.07);'"
            >
              <button
                class="flex items-center gap-2 text-sm font-medium transition-all duration-200 hover:-translate-x-0.5 px-4 py-2 rounded-xl"
                :style="isDark
                  ? 'color:#9ca3af;border:1px solid rgba(255,255,255,0.08);'
                  : 'color:#6b7280;border:1px solid rgba(23,79,42,0.1);'"
                @click="router.push('/products')"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
                Return to shop
              </button>

              <button
                class="flex items-center gap-2 text-sm font-semibold transition-all duration-200 px-4 py-2 rounded-xl"
                :style="isDark
                  ? 'background:rgba(23,79,42,0.2);color:#4caf72;border:1px solid rgba(76,175,114,0.18);'
                  : 'background:rgba(23,79,42,0.07);color:#174f2a;border:1px solid rgba(23,79,42,0.12);'"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Update Cart
              </button>
            </div>
          </div>
        </div>

        <!-- ── RIGHT: Order summary ── -->
        <div class="w-full lg:w-80 shrink-0">
          <div
            class="rounded-2xl overflow-hidden sticky top-28"
            :style="isDark
              ? 'background:rgba(26,46,31,0.45);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.07);box-shadow:0 8px 32px rgba(0,0,0,0.28);'
              : 'background:rgba(255,255,255,0.85);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.9);box-shadow:0 8px 32px rgba(23,79,42,0.07);'"
          >
            <!-- Header -->
            <div
              class="px-6 py-4"
              :style="isDark
                ? 'border-bottom:1px solid rgba(255,255,255,0.06);background:rgba(0,0,0,0.12);'
                : 'border-bottom:1px solid rgba(23,79,42,0.07);background:rgba(23,79,42,0.02);'"
            >
              <h2
                class="text-base font-bold"
                style="font-family:'Montserrat',sans-serif;"
                :style="isDark ? 'color:#f0f0f0;' : 'color:#174f2a;'"
              >Cart Total</h2>
            </div>

            <!-- Line items -->
            <div class="px-6 py-5 flex flex-col gap-4">

              <div class="flex items-center justify-between">
                <span class="text-sm" :style="isDark ? 'color:#9ca3af;' : 'color:#6b7280;'">Subtotal</span>
                <span class="text-sm font-semibold" :style="isDark ? 'color:#f0f0f0;' : 'color:#1a2e1f;'">{{ fmt(subtotal) }}</span>
              </div>

              <div :style="isDark ? 'height:1px;background:rgba(255,255,255,0.05);' : 'height:1px;background:rgba(23,79,42,0.06);'" />

              <div class="flex items-center justify-between">
                <span class="text-sm" :style="isDark ? 'color:#9ca3af;' : 'color:#6b7280;'">Shipping</span>
                <span
                  class="text-sm font-semibold"
                  :style="shipping === 0
                    ? (isDark ? 'color:#4caf72;' : 'color:#174f2a;')
                    : (isDark ? 'color:#f0f0f0;' : 'color:#1a2e1f;')"
                >{{ shipping === 0 ? 'Free' : fmt(shipping) }}</span>
              </div>

              <div :style="isDark ? 'height:1px;background:rgba(255,255,255,0.05);' : 'height:1px;background:rgba(23,79,42,0.06);'" />

              <div class="flex items-center justify-between">
                <span class="text-sm font-bold" :style="isDark ? 'color:#f0f0f0;' : 'color:#1a2e1f;'">Total</span>
                <span class="text-lg font-bold" :class="isDark ? 'text-[#4caf72]' : 'text-[#174f2a]'">{{ fmt(total) }}</span>
              </div>

              <!-- Free shipping notice -->
              <div
                v-if="shipping > 0"
                class="rounded-xl px-3 py-2.5 text-xs flex items-center gap-2"
                :style="isDark
                  ? 'background:rgba(76,175,114,0.08);border:1px solid rgba(76,175,114,0.15);color:#6b7280;'
                  : 'background:rgba(23,79,42,0.05);border:1px solid rgba(23,79,42,0.1);color:#9ca3af;'"
              >
                <svg class="w-3.5 h-3.5 shrink-0" :class="isDark ? 'text-[#4caf72]' : 'text-[#174f2a]'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Add {{ fmt(50 - subtotal) }} more for free shipping!
              </div>

              <!-- Checkout button -->
              <button
                class="w-full py-3.5 rounded-2xl text-white text-sm font-semibold tracking-wide transition-all duration-300 hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 mt-1"
                :class="isDark ? 'bg-[#1e6334] hover:bg-[#25753e]' : 'bg-[#174f2a] hover:bg-[#1e6334]'"
                :style="isDark
                  ? 'box-shadow:0 4px 20px rgba(23,79,42,0.35);'
                  : 'box-shadow:0 4px 20px rgba(23,79,42,0.22);'"
                @click="router.push('/checkout')"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Proceed to checkout
              </button>

              <!-- Secure badge -->
              <p class="text-center text-xs flex items-center justify-center gap-1.5 mt-1" :style="isDark ? 'color:#4b5563;' : 'color:#d1d5db;'">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Secure checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ───── ABOUT BANNER ───── -->
    <section class="relative overflow-hidden py-16 px-6 sm:px-10 lg:px-16">
      <div
        class="absolute inset-0"
        style="background:linear-gradient(135deg,#0a1f0d 0%,#142a17 60%,#0a1f0d 100%);"
      />
      <div
        class="absolute inset-0 opacity-20"
        style="background:url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22><circle cx=%2220%22 cy=%2220%22 r=%221%22 fill=%22%234caf72%22/></svg>') repeat;"
      />
      <div class="relative z-10 max-w-3xl mx-auto text-center">
        <p class="text-sm leading-relaxed mb-4" style="color:rgba(255,255,255,0.8);">
          Raven's Garden is your all-in-one destination for everything gardening. We understand how frustrating
          it can be to search endlessly for the right plants, tools, or reliable information.
        </p>
        <p class="text-sm leading-relaxed" style="color:rgba(255,255,255,0.8);">
          From exotic plants to essential gardening tools, Raven's Garden helps you design, grow, and maintain
          your perfect green space. Whether you're a beginner or an experienced gardener, we provide trusted
          products and a smooth shopping experience to support your journey.
        </p>
      </div>
    </section>

    <FooterBar />
  </div>
</template>