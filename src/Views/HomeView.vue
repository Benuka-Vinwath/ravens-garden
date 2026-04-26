<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import NavBar from '../components/NavBar.vue'
import heroImage from '../assets/hero-images/Home.png'
import heroImageDark from '../assets/hero-images/Home-dark.png'

const isDark = ref(document.documentElement.classList.contains('dark'))

const observer = new MutationObserver(() => {
  isDark.value = document.documentElement.classList.contains('dark')
})

onMounted(() => observer.observe(document.documentElement, { attributeFilter: ['class'] }))
onUnmounted(() => observer.disconnect())
</script>

<template>
  <div :class="isDark ? 'min-h-screen bg-[#0f1a12]' : 'min-h-screen bg-[#f5f5f0]'">
    <NavBar />

    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center overflow-hidden">

      <!-- Background image -->
      <div class="absolute inset-0">
        <img
          :src="isDark ? heroImageDark : heroImage"
          alt="Plants hero"
          class="w-full h-full object-cover object-center transition-all duration-500"
        />
        <!-- Gradient overlay -->
        <div
          class="absolute inset-0 transition-all duration-500"
          :class="isDark
            ? 'bg-gradient-to-r from-[#0f1a12] via-[#0f1a12]/80 to-transparent'
            : 'bg-gradient-to-r from-[#f5f5f0] via-[#f5f5f0]/80 to-transparent'"
        />
      </div>

      <!-- Content -->
      <div class="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-24 pb-16 w-full">
        <div class="max-w-lg">

          <!-- Tag line -->
          <div
            class="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border transition-all duration-300"
            :class="isDark
              ? 'bg-[#174f2a]/20 border-[#174f2a]/40'
              : 'bg-[#174f2a]/10 border-[#174f2a]/20'"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-[#4caf72]" />
            <span
              class="text-xs font-semibold tracking-widest uppercase transition-colors duration-300"
              :class="isDark ? 'text-[#4caf72]' : 'text-[#174f2a]'"
            >
              Garden Planner
            </span>
          </div>

          <!-- Heading -->
          <h1
            class="text-5xl sm:text-6xl font-bold leading-tight mb-6 transition-colors duration-300"
            :class="isDark ? 'text-white' : 'text-[#1a2e1f]'"
            style="font-family: 'Georgia', serif; letter-spacing: -0.02em;"
          >
            Make Your Space<br />
            <span :class="isDark ? 'text-[#4caf72]' : 'text-[#174f2a]'">Greener</span><br />
            With Plants
          </h1>

          <!-- Subtext -->
          <p
            class="text-base leading-relaxed mb-10 max-w-sm transition-colors duration-300"
            :class="isDark ? 'text-gray-400' : 'text-gray-500'"
          >
            Plan, grow, and manage your garden effortlessly with our Garden Planner.
          </p>

          <!-- CTA Buttons -->
          <div class="flex items-center gap-4">
            <button
              class="px-7 py-3.5 rounded-xl text-white text-sm font-semibold tracking-wide transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
              :class="isDark
                ? 'bg-[#1e6334] hover:bg-[#25753e] hover:shadow-[#1e6334]/30'
                : 'bg-[#174f2a] hover:bg-[#1e6334] hover:shadow-[#174f2a]/25'"
            >
              Shop Plants &amp; Tools
            </button>
            <button
              class="flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all duration-200"
              :class="isDark ? 'text-[#4caf72]' : 'text-[#174f2a]'"
            >
              Learn more
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>

          <!-- Stats row -->
          <div class="flex items-center gap-8 mt-14">
            <div>
              <p
                class="text-2xl font-bold transition-colors duration-300"
                :class="isDark ? 'text-white' : 'text-[#1a2e1f]'"
                style="font-family: 'Georgia', serif;"
              >500+</p>
              <p
                class="text-xs mt-0.5 transition-colors duration-300"
                :class="isDark ? 'text-gray-500' : 'text-gray-400'"
              >Plant varieties</p>
            </div>
            <div :class="isDark ? 'w-px h-8 bg-white/10' : 'w-px h-8 bg-gray-200'" />
            <div>
              <p
                class="text-2xl font-bold transition-colors duration-300"
                :class="isDark ? 'text-white' : 'text-[#1a2e1f]'"
                style="font-family: 'Georgia', serif;"
              >12k+</p>
              <p
                class="text-xs mt-0.5 transition-colors duration-300"
                :class="isDark ? 'text-gray-500' : 'text-gray-400'"
              >Happy gardeners</p>
            </div>
            <div :class="isDark ? 'w-px h-8 bg-white/10' : 'w-px h-8 bg-gray-200'" />
            <div>
              <p
                class="text-2xl font-bold transition-colors duration-300"
                :class="isDark ? 'text-white' : 'text-[#1a2e1f]'"
                style="font-family: 'Georgia', serif;"
              >4.9★</p>
              <p
                class="text-xs mt-0.5 transition-colors duration-300"
                :class="isDark ? 'text-gray-500' : 'text-gray-400'"
              >Average rating</p>
            </div>
          </div>

        </div>
      </div>

      <!-- Floating card -->
      <div
        class="absolute bottom-16 right-8 lg:right-24 z-10 flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl transition-all duration-300"
        :style="isDark
          ? 'background: rgba(15,30,18,0.75); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.1);'
          : 'background: rgba(255,255,255,0.85); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.9);'"
      >
        <div
          class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          :class="isDark ? 'bg-[#174f2a]/30' : 'bg-[#174f2a]/10'"
        >
          <svg
            class="w-5 h-5"
            :class="isDark ? 'text-[#4caf72]' : 'text-[#174f2a]'"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        </div>
        <div>
          <p
            class="text-xs font-semibold transition-colors duration-300"
            :class="isDark ? 'text-white' : 'text-gray-800'"
          >There are many</p>
          <p
            class="text-xs transition-colors duration-300"
            :class="isDark ? 'text-gray-400' : 'text-gray-500'"
          >different plants.</p>
        </div>
      </div>

    </section>
  </div>
</template>
