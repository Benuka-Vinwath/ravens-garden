<script setup lang="ts">
import logo from '../assets/logo.png'
</script>

<template>
  <header class="w-full bg-white shadow-sm">
    <nav class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      
      <!-- Logo area -->
      <div class="flex items-center gap-3">
        <img 
          :src="logo" 
          alt="Raven's Garden Logo" 
          class="w-100 h-118 object-contain"
        />
      </div>

      <!-- Menu links -->
      <ul class="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
        <li class="text-green-900 font-semibold cursor-pointer">Home</li>
        <li class="hover:text-green-800 cursor-pointer">Plants</li>
        <li class="hover:text-green-800 cursor-pointer">About</li>
        <li class="hover:text-green-800 cursor-pointer">Contact</li>
      </ul>

      <!-- Right button -->
      <button class="hidden md:block bg-green-900 text-white px-5 py-2 rounded-full hover:bg-green-800">
        Shop Now
      </button>

      <!-- Mobile menu icon -->
      <button class="md:hidden text-3xl text-green-900">
        ☰
      </button>

    </nav>
  </header>
</template>