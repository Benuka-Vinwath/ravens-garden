<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import NavBar from '../components/NavBar.vue'
import FooterBar from '../components/Footer.vue'

const isDark = ref(document.documentElement.classList.contains('dark'))
const deliveryMethod = ref<'delivery' | 'collection'>('delivery')
const paymentMethod = ref<'card' | 'cash'>('card')

const form = ref({
  fullName: 'Julie Pines',
  phone: '+94 535 185',
  address: '23/4/A Pilyandala',
  cardNumber: '',
  expiryMonthYear: '',
  cvv: '',
  note: '',
})

const observer = new MutationObserver(() => {
  isDark.value = document.documentElement.classList.contains('dark')
})

watch(paymentMethod, (method) => {
  if (method === 'cash') {
    form.value.cardNumber = ''
    form.value.expiryMonthYear = ''
    form.value.cvv = ''
  }
})

onMounted(() => observer.observe(document.documentElement, { attributeFilter: ['class'] }))
onUnmounted(() => observer.disconnect())
</script>

<template>
  <div
    class="min-h-screen transition-colors duration-500"
    :style="isDark ? 'background-color:#121a14;color:#f0f0f0;' : 'background-color:#f8f7f2;color:#1a2e1f;'"
  >
    <NavBar />

    <section class="pt-30 pb-20 px-6 sm:px-10 lg:px-16 max-w-5xl mx-auto">
      <h1
        class="text-4xl font-bold mb-8"
        style="font-family:'Montserrat',sans-serif;letter-spacing:-0.02em;"
        :style="isDark ? 'color:#f0f0f0;' : 'color:#174f2a;'"
      >
        Check out
      </h1>

      <div class="flex flex-col gap-5">
        <!-- Delivery method -->
        <div
          class="rounded-2xl p-5"
          :style="isDark
            ? 'background:rgba(26,46,31,0.45);border:1px solid rgba(255,255,255,0.08);box-shadow:0 8px 32px rgba(0,0,0,0.28);'
            : 'background:rgba(255,255,255,0.88);border:1px solid rgba(23,79,42,0.12);box-shadow:0 8px 24px rgba(23,79,42,0.08);'"
        >
          <p class="text-sm font-semibold mb-4" :style="isDark ? 'color:#d1d5db;' : 'color:#1f2937;'">Delivery Method</p>
          <div class="inline-flex p-1 rounded-full" :style="isDark ? 'background:rgba(255,255,255,0.08);' : 'background:#f3f4f6;'">
            <button
              class="px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
              :style="deliveryMethod === 'delivery'
                ? (isDark ? 'background:#1e6334;color:white;' : 'background:#0f7a4e;color:white;')
                : (isDark ? 'color:#9ca3af;' : 'color:#6b7280;')"
              @click="deliveryMethod = 'delivery'"
            >
              Delivery
            </button>
            <button
              class="px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
              :style="deliveryMethod === 'collection'
                ? (isDark ? 'background:#1e6334;color:white;' : 'background:#0f7a4e;color:white;')
                : (isDark ? 'color:#9ca3af;' : 'color:#6b7280;')"
              @click="deliveryMethod = 'collection'"
            >
              Collection
            </button>
          </div>
          <p class="text-[11px] mt-3" :style="isDark ? 'color:#6b7280;' : 'color:#9ca3af;'">Delivery in 20-25 minutes.</p>
          <div
            v-if="deliveryMethod === 'collection'"
            class="mt-3 rounded-xl px-3 py-2.5 text-xs flex items-center gap-2"
            :style="isDark
              ? 'background:rgba(76,175,114,0.08);border:1px solid rgba(76,175,114,0.15);color:#d1d5db;'
              : 'background:rgba(23,79,42,0.06);border:1px solid rgba(23,79,42,0.12);color:#374151;'"
          >
            <svg class="w-3.5 h-3.5 shrink-0" :class="isDark ? 'text-[#4caf72]' : 'text-[#174f2a]'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Please collect your order from the shop.
          </div>
        </div>

        <!-- Delivery information -->
        <div
          v-if="deliveryMethod !== 'collection'"
          class="rounded-2xl p-5"
          :style="isDark
            ? 'background:rgba(26,46,31,0.45);border:1px solid rgba(255,255,255,0.08);box-shadow:0 8px 32px rgba(0,0,0,0.28);'
            : 'background:rgba(255,255,255,0.88);border:1px solid rgba(23,79,42,0.12);box-shadow:0 8px 24px rgba(23,79,42,0.08);'"
        >
          <p class="text-sm font-semibold mb-4" :style="isDark ? 'color:#d1d5db;' : 'color:#1f2937;'">Delivery Information</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-[10px] font-semibold tracking-wide uppercase mb-1.5" :style="isDark ? 'color:#6b7280;' : 'color:#9ca3af;'">Full Name</label>
              <input
                v-model="form.fullName"
                type="text"
                class="w-full h-10 rounded-full px-4 text-sm outline-none"
                :style="isDark
                  ? 'background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.11);color:#f0f0f0;'
                  : 'background:#f3f4f6;border:1px solid #e5e7eb;color:#374151;'"
              />
            </div>
            <div>
              <label class="block text-[10px] font-semibold tracking-wide uppercase mb-1.5" :style="isDark ? 'color:#6b7280;' : 'color:#9ca3af;'">Phone Number</label>
              <input
                v-model="form.phone"
                type="text"
                class="w-full h-10 rounded-full px-4 text-sm outline-none"
                :style="isDark
                  ? 'background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.11);color:#f0f0f0;'
                  : 'background:#f3f4f6;border:1px solid #e5e7eb;color:#374151;'"
              />
            </div>
            <div class="sm:col-span-2">
              <label class="block text-[10px] font-semibold tracking-wide uppercase mb-1.5" :style="isDark ? 'color:#6b7280;' : 'color:#9ca3af;'">Delivery Address</label>
              <input
                v-model="form.address"
                type="text"
                class="w-full h-10 rounded-full px-4 text-sm outline-none"
                :style="isDark
                  ? 'background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.11);color:#f0f0f0;'
                  : 'background:#f3f4f6;border:1px solid #e5e7eb;color:#374151;'"
              />
            </div>
          </div>
        </div>

        <!-- Payment method -->
        <div
          v-if="deliveryMethod !== 'collection'"
          class="rounded-2xl p-5"
          :style="isDark
            ? 'background:rgba(26,46,31,0.45);border:1px solid rgba(255,255,255,0.08);box-shadow:0 8px 32px rgba(0,0,0,0.28);'
            : 'background:rgba(255,255,255,0.88);border:1px solid rgba(23,79,42,0.12);box-shadow:0 8px 24px rgba(23,79,42,0.08);'"
        >
          <p class="text-sm font-semibold mb-4" :style="isDark ? 'color:#d1d5db;' : 'color:#1f2937;'">Payment Method</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <button
              class="h-11 rounded-xl border text-sm font-semibold text-left px-4 transition-all duration-200"
              :style="paymentMethod === 'card'
                ? (isDark ? 'background:rgba(30,99,52,0.35);border-color:rgba(76,175,114,0.45);color:#f0f0f0;' : 'background:#e6f4ee;border-color:#7cc7a3;color:#174f2a;')
                : (isDark ? 'background:rgba(255,255,255,0.03);border-color:rgba(255,255,255,0.12);color:#9ca3af;' : 'background:white;border-color:#e5e7eb;color:#4b5563;')"
              @click="paymentMethod = 'card'"
            >
              Credit/Debit Card
            </button>
            <button
              class="h-11 rounded-xl border text-sm font-semibold text-left px-4 transition-all duration-200"
              :style="paymentMethod === 'cash'
                ? (isDark ? 'background:rgba(30,99,52,0.35);border-color:rgba(76,175,114,0.45);color:#f0f0f0;' : 'background:#e6f4ee;border-color:#7cc7a3;color:#174f2a;')
                : (isDark ? 'background:rgba(255,255,255,0.03);border-color:rgba(255,255,255,0.12);color:#9ca3af;' : 'background:white;border-color:#e5e7eb;color:#4b5563;')"
              @click="paymentMethod = 'cash'"
            >
              Cash on Delivery
            </button>
          </div>

          <div v-if="paymentMethod === 'card'" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="sm:col-span-2">
              <label class="block text-[10px] font-semibold tracking-wide uppercase mb-1.5" :style="isDark ? 'color:#6b7280;' : 'color:#9ca3af;'">Card Number</label>
              <input
                v-model="form.cardNumber"
                type="text"
                placeholder="0000 0000 0000 0000"
                class="w-full h-10 rounded-full px-4 text-sm outline-none"
                :style="isDark
                  ? 'background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.11);color:#f0f0f0;'
                  : 'background:#f3f4f6;border:1px solid #e5e7eb;color:#374151;'"
              />
            </div>
            <div>
              <label class="block text-[10px] font-semibold tracking-wide uppercase mb-1.5" :style="isDark ? 'color:#6b7280;' : 'color:#9ca3af;'">Expiry Date</label>
              <input
                v-model="form.expiryMonthYear"
                type="text"
                placeholder="MM/YY"
                class="w-full h-10 rounded-full px-4 text-sm outline-none"
                :style="isDark
                  ? 'background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.11);color:#f0f0f0;'
                  : 'background:#f3f4f6;border:1px solid #e5e7eb;color:#374151;'"
              />
            </div>
            <div>
              <label class="block text-[10px] font-semibold tracking-wide uppercase mb-1.5" :style="isDark ? 'color:#6b7280;' : 'color:#9ca3af;'">CVV</label>
              <input
                v-model="form.cvv"
                type="password"
                placeholder="***"
                class="w-full h-10 rounded-full px-4 text-sm outline-none"
                :style="isDark
                  ? 'background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.11);color:#f0f0f0;'
                  : 'background:#f3f4f6;border:1px solid #e5e7eb;color:#374151;'"
              />
            </div>
          </div>
        </div>

        <!-- Order notes -->
        <div
          v-if="deliveryMethod !== 'collection'"
          class="rounded-2xl p-5"
          :style="isDark
            ? 'background:rgba(26,46,31,0.45);border:1px solid rgba(255,255,255,0.08);box-shadow:0 8px 32px rgba(0,0,0,0.28);'
            : 'background:rgba(255,255,255,0.88);border:1px solid rgba(23,79,42,0.12);box-shadow:0 8px 24px rgba(23,79,42,0.08);'"
        >
          <p class="text-sm font-semibold mb-3" :style="isDark ? 'color:#d1d5db;' : 'color:#1f2937;'">Order Notes</p>
          <textarea
            v-model="form.note"
            rows="3"
            placeholder="Add special instructions for the restaurant or driver..."
            class="w-full rounded-2xl px-4 py-3 text-sm outline-none resize-none"
            :style="isDark
              ? 'background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.11);color:#f0f0f0;'
              : 'background:#f3f4f6;border:1px solid #e5e7eb;color:#374151;'"
          />
        </div>

        <div class="flex justify-end" :class="deliveryMethod === 'collection' ? 'mt-0' : 'mt-1'">
          <button
            class="min-w-32 px-7 h-10 rounded-full text-white text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
            :class="isDark ? 'bg-[#1e6334] hover:bg-[#25753e]' : 'bg-[#0f7a4e] hover:bg-[#15855a]'"
          >
            Pay
          </button>
        </div>
      </div>
    </section>

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
