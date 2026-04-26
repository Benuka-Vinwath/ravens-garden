<script setup lang="ts">
import { ref } from 'vue'
import logo from '../assets/logo.png'

const isMenuOpen = ref(false)

const navItems = ['Home', 'Plants', 'Tools', 'Blog', 'About', 'Contact']
</script>

<template>
  <header class="fixed top-0 left-0 w-full bg-#c4c6c4/90 backdrop-blur-md z-50">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center">
          <img
            :src="logo"
            alt="Raven's Garden Logo"
            class="w-28 sm:w-32 md:w-36 h-auto object-contain"
          />
        </div>

        <!-- Desktop nav links -->
        <div class="hidden md:flex items-center gap-6 lg:gap-8 text-sm text-gray-700">
          <button
            v-for="item in navItems"
            :key="item"
            class="transition-colors duration-200 hover:text-[#174f2a] hover:underline hover:decoration-[#174f2a] underline-offset-4"
          >
            {{ item }}
          </button>
        </div>

        <!-- Desktop actions -->
        <div class="hidden lg:flex items-center gap-4">
          <button class="w-8 h-8 rounded-md bg-[#174f2a] text-white flex items-center justify-center">
            🛒
          </button>

          <div class="flex items-center border border-gray-400 rounded-full overflow-hidden h-8">
            <input
              type="text"
              class="w-32 xl:w-40 px-3 outline-none bg-transparent text-sm"
            />
            <button class="h-full px-4 bg-[#174f2a] text-white">
              🔍
            </button>
          </div>

          <button class="px-5 h-8 rounded-full bg-[#174f2a] text-white text-sm font-medium">
            Get Started
          </button>

          <button class="flex items-center gap-2 text-sm text-[#174f2a]">
            <span>◎</span>
            Log in
          </button>

          <button class="text-[#174f2a] text-xl">
            ◐
          </button>
        </div>

        <!-- Mobile menu button -->
        <button
          class="md:hidden text-[#174f2a] text-3xl leading-none"
          @click="isMenuOpen = !isMenuOpen"
          aria-label="Toggle menu"
        >
          <span v-if="!isMenuOpen">☰</span>
          <span v-else>×</span>
        </button>
      </div>

      <!-- Mobile / tablet menu -->
      <div
        v-if="isMenuOpen"
        class="md:hidden mt-4 flex flex-col gap-4 border-t border-gray-200 pt-4 text-sm text-gray-700"
      >
        <button
          v-for="item in navItems"
          :key="item"
          class="text-left transition-colors duration-200 hover:text-[#174f2a] hover:underline hover:decoration-[#174f2a] underline-offset-4"
        >
          {{ item }}
        </button>

        <div class="flex items-center border border-gray-400 rounded-full overflow-hidden h-9 mt-2">
          <input
            type="text"
            class="w-full px-3 outline-none bg-transparent text-sm"
            placeholder="Search"
          />
          <button class="h-full px-4 bg-[#174f2a] text-white">
            🔍
          </button>
        </div>

        <button class="w-full h-10 rounded-full bg-[#174f2a] text-white text-sm font-medium">
          Get Started
        </button>

        <button class="flex items-center gap-2 text-sm text-[#174f2a]">
          <span>◎</span>
          Log in
        </button>
      </div>
    </nav>
  </header>
</template>
