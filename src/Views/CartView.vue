<template>
  <div class="min-h-screen flex flex-col bg-[#f9faf9]">
    <NavBar />

    <main class="flex-grow container mx-auto px-4 py-12 max-w-3xl">
      <h1 class="text-3xl font-bold text-green-900 mb-8">Check out</h1>

      <div class="space-y-6">
        <!-- Delivery Method -->
        <section class="bg-white p-6 rounded-xl border border-gray-200">
          <div class="flex items-center gap-2 mb-4">
            <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>
            <h2 class="text-lg font-semibold text-gray-800">Delivery Method</h2>
          </div>
          
          <div class="flex bg-gray-100 p-1 rounded-full w-max mb-4">
            <button class="px-6 py-2 rounded-full bg-[#1b6b50] text-white font-medium text-sm transition-colors">Delivery</button>
            <button class="px-6 py-2 rounded-full text-gray-600 font-medium text-sm transition-colors">Collection</button>
          </div>
          <p class="text-xs text-gray-500 flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Delivery in 20-25 minutes
          </p>
        </section>

        <!-- Delivery Information -->
        <section class="bg-white p-6 rounded-xl border border-gray-200">
          <div class="flex items-center gap-2 mb-4">
            <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            <h2 class="text-lg font-semibold text-gray-800">Delivery Information</h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-wide">Full Name</label>
              <input type="text" placeholder="Asala Peris" class="w-full bg-gray-100 border border-transparent rounded-lg px-4 py-3 focus:bg-white focus:border-[#1b6b50] focus:ring-1 focus:ring-[#1b6b50] outline-none transition-all" />
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-wide">Phone Number</label>
              <input type="tel" placeholder="+94 155 155" class="w-full bg-gray-100 border border-transparent rounded-lg px-4 py-3 focus:bg-white focus:border-[#1b6b50] focus:ring-1 focus:ring-[#1b6b50] outline-none transition-all" />
            </div>
          </div>
          <div>
            <label class="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-wide">Delivery Address</label>
            <input type="text" placeholder="224/24, Piliyandala" class="w-full bg-gray-100 border border-transparent rounded-lg px-4 py-3 focus:bg-white focus:border-[#1b6b50] focus:ring-1 focus:ring-[#1b6b50] outline-none transition-all" />
          </div>
        </section>

        <!-- Payment Method -->
        <section class="bg-white p-6 rounded-xl border border-gray-200">
          <div class="flex items-center gap-2 mb-4">
            <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
            <h2 class="text-lg font-semibold text-gray-800">Payment Method</h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <label class="flex items-center gap-3 p-4 rounded-lg border-2 border-[#1b6b50] bg-[#1b6b50]/5 cursor-pointer">
              <input type="radio" name="payment" checked class="w-4 h-4 text-[#1b6b50] focus:ring-[#1b6b50] accent-[#1b6b50]" />
              <span class="font-medium text-gray-800 text-sm">Credit/Debit Card</span>
            </label>
            <label class="flex items-center gap-3 p-4 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50">
              <input type="radio" name="payment" class="w-4 h-4 text-gray-400 focus:ring-gray-400 accent-[#1b6b50]" />
              <span class="font-medium text-gray-800 text-sm">Cash on Delivery</span>
            </label>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-wide">Card Number</label>
              <div class="relative">
                <input type="text" placeholder="0000 0000 0000 0000" class="w-full bg-gray-100 border border-transparent rounded-lg px-4 py-3 focus:bg-white focus:border-[#1b6b50] focus:ring-1 focus:ring-[#1b6b50] outline-none transition-all" />
                <svg class="w-6 h-6 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
              </div>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-wide">Expiry Date</label>
                <input type="text" placeholder="MM/YY" class="w-full bg-gray-100 border border-transparent rounded-lg px-4 py-3 focus:bg-white focus:border-[#1b6b50] focus:ring-1 focus:ring-[#1b6b50] outline-none transition-all" />
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-wide">CVV</label>
                <input type="text" placeholder="***" class="w-full bg-gray-100 border border-transparent rounded-lg px-4 py-3 focus:bg-white focus:border-[#1b6b50] focus:ring-1 focus:ring-[#1b6b50] outline-none transition-all" />
              </div>
            </div>
          </div>
        </section>

        <!-- Order Notes -->
        <section class="bg-white p-6 rounded-xl border border-gray-200">
          <div class="flex items-center gap-2 mb-4">
            <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            <h2 class="text-lg font-semibold text-gray-800">Order Notes</h2>
          </div>
          
          <textarea rows="3" placeholder="Add special instructions for the restaurant or driver..." class="w-full bg-gray-100 border border-transparent rounded-lg px-4 py-3 focus:bg-white focus:border-[#1b6b50] focus:ring-1 focus:ring-[#1b6b50] outline-none resize-none transition-all"></textarea>
        </section>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import NavBar from '../components/NavBar.vue'
import Footer from '../components/Footer.vue'
</script>