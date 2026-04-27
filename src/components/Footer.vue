<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import logoDark from '../assets/logo-dark.png'
import logoLight from '../assets/logo.png'

const isDark = ref(document.documentElement.classList.contains('dark'))

const observer = new MutationObserver(() => {
  isDark.value = document.documentElement.classList.contains('dark')
})

onMounted(() => observer.observe(document.documentElement, { attributeFilter: ['class'] }))
onUnmounted(() => observer.disconnect())

const quickLinks = ['Home', 'Plants', 'Tools', 'Blog', 'About', 'Contact', 'Login']
const aboutLinks = ['Our Company', 'Privacy Policy', 'Product', 'How to buy']
</script>

<template>
  <footer
    class="transition-colors duration-500"
    :style="isDark
      ? 'background-color:#0e1610;border-top:1px solid rgba(255,255,255,0.06);'
      : 'background-color:#142019;border-top:1px solid rgba(0,0,0,0.08);'"
  >
    <!-- Main footer grid -->
    <div class="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

        <!-- ── Col 1: Brand ── -->
        <div class="lg:col-span-1">
          <!-- Logo -->
          <div class="flex items-center gap-2 mb-5">
            <div
              class="flex items-center gap-2 px-3 py-1.5 rounded-xl"
              :style="isDark
                ? 'background:rgba(76,175,114,0.08);border:1px solid rgba(76,175,114,0.15);'
                : 'background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.2);'"
            >
              <!-- Decorative "R" monogram matching the screenshot logo style -->
              <img
                :src="isDark ? logoDark : logoLight"
                alt="Raven's Garden"
                class="h-20 w-auto object-contain"
              />
              
            </div>
          </div>

          <p
            class="text-sm leading-relaxed mb-6 max-w-[220px]"
            :style="isDark ? 'color:#9ca3af;' : 'color:rgba(255,255,255,0.72);'"
          >
            At Raven's Garden, we make gardening simple and enjoyable by offering quality plants and trusted tools for every green enthusiast.
          </p>

          <!-- Social icons -->
          <div class="flex items-center gap-3">
            <!-- Facebook -->
            <a
              href="#"
              class="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
              :style="isDark
                ? 'background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.55);'
                : 'background:rgba(255,255,255,0.15);border:1px solid rgba(255,255,255,0.25);color:rgba(255,255,255,0.85);'"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
              </svg>
            </a>
            <!-- LinkedIn -->
            <a
              href="#"
              class="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
              :style="isDark
                ? 'background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.55);'
                : 'background:rgba(255,255,255,0.15);border:1px solid rgba(255,255,255,0.25);color:rgba(255,255,255,0.85);'"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
            <!-- Twitter / X -->
            <a
              href="#"
              class="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
              :style="isDark
                ? 'background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.55);'
                : 'background:rgba(255,255,255,0.15);border:1px solid rgba(255,255,255,0.25);color:rgba(255,255,255,0.85);'"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- ── Col 2: Quick Links ── -->
        <div>
          <h4
            class="text-sm font-bold tracking-widest uppercase mb-6"
            :style="isDark ? 'color:#f0f0f0;' : 'color:#ffffff;'"
          >Quick Links</h4>
          <ul class="space-y-3">
            <li v-for="link in quickLinks" :key="link">
              <a
                href="#"
                class="text-sm transition-all duration-200 hover:translate-x-1 inline-flex items-center gap-1.5 group"
                :style="isDark ? 'color:#9ca3af;' : 'color:rgba(255,255,255,0.7);'"
              >
                <span
                  class="w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 shrink-0"
                  :style="isDark ? 'background:#4caf72;' : 'background:rgba(255,255,255,0.8);'"
                />
                <span
                  class="group-hover:translate-x-0.5 transition-transform duration-200"
                  :style="isDark ? '' : ''"
                  @mouseover="(e) => { if (!isDark) (e.currentTarget as HTMLElement).style.color = '#ffffff' }"
                  @mouseleave="(e) => { if (!isDark) (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)' }"
                >{{ link }}</span>
              </a>
            </li>
          </ul>
        </div>

        <!-- ── Col 3: About Us ── -->
        <div>
          <h4
            class="text-sm font-bold tracking-widest uppercase mb-6"
            :style="isDark ? 'color:#f0f0f0;' : 'color:#ffffff;'"
          >About Us</h4>
          <ul class="space-y-3">
            <li v-for="link in aboutLinks" :key="link">
              <a
                href="#"
                class="text-sm transition-all duration-200 hover:translate-x-1 inline-flex items-center gap-1.5 group"
                :style="isDark ? 'color:#9ca3af;' : 'color:rgba(255,255,255,0.7);'"
              >
                <span
                  class="w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 shrink-0"
                  :style="isDark ? 'background:#4caf72;' : 'background:rgba(255,255,255,0.8);'"
                />
                <span class="group-hover:translate-x-0.5 transition-transform duration-200">{{ link }}</span>
              </a>
            </li>
          </ul>
        </div>

        <!-- ── Col 4: Contact ── -->
        <div>
          <h4
            class="text-sm font-bold tracking-widest uppercase mb-6"
            :style="isDark ? 'color:#f0f0f0;' : 'color:#ffffff;'"
          >Contact</h4>
          <ul class="space-y-4">
            <!-- Phone -->
            <li class="flex items-start gap-3">
              <div
                class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                :style="isDark
                  ? 'background:rgba(76,175,114,0.12);border:1px solid rgba(76,175,114,0.2);'
                  : 'background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.2);'"
              >
                <svg class="w-3.5 h-3.5" :style="isDark ? 'color:#4caf72;' : 'color:rgba(255,255,255,0.85);'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
              </div>
              <div>
                <p class="text-xs mb-0.5" :style="isDark ? 'color:#6b7280;' : 'color:rgba(255,255,255,0.5);'">Phone</p>
                <a
                  href="tel:+23144422"
                  class="text-sm transition-colors duration-200"
                  :style="isDark ? 'color:#d1d5db;' : 'color:rgba(255,255,255,0.85);'"
                >+23144422</a>
              </div>
            </li>

            <!-- Email -->
            <li class="flex items-start gap-3">
              <div
                class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                :style="isDark
                  ? 'background:rgba(76,175,114,0.12);border:1px solid rgba(76,175,114,0.2);'
                  : 'background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.2);'"
              >
                <svg class="w-3.5 h-3.5" :style="isDark ? 'color:#4caf72;' : 'color:rgba(255,255,255,0.85);'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <div>
                <p class="text-xs mb-0.5" :style="isDark ? 'color:#6b7280;' : 'color:rgba(255,255,255,0.5);'">Email</p>
                <a
                  href="mailto:info@gardenxyz.com"
                  class="text-sm transition-colors duration-200 break-all"
                  :style="isDark ? 'color:#d1d5db;' : 'color:rgba(255,255,255,0.85);'"
                >info@gardenxyz.com</a>
              </div>
            </li>

            <!-- Address -->
            <li class="flex items-start gap-3">
              <div
                class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                :style="isDark
                  ? 'background:rgba(76,175,114,0.12);border:1px solid rgba(76,175,114,0.2);'
                  : 'background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.2);'"
              >
                <svg class="w-3.5 h-3.5" :style="isDark ? 'color:#4caf72;' : 'color:rgba(255,255,255,0.85);'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <div>
                <p class="text-xs mb-0.5" :style="isDark ? 'color:#6b7280;' : 'color:rgba(255,255,255,0.5);'">Address</p>
                <p class="text-sm leading-relaxed" :style="isDark ? 'color:#d1d5db;' : 'color:rgba(255,255,255,0.85);'">
                  ABC, Main Boulevard,<br />Street ABC, State ABC.
                </p>
              </div>
            </li>
          </ul>
        </div>

      </div>
    </div>

    <!-- ── Divider ── -->
    <div
      class="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16"
      :style="isDark ? 'height:1px;background:rgba(255,255,255,0.07);' : 'height:1px;background:rgba(255,255,255,0.18);'"
    />

    <!-- ── Bottom bar ── -->
    <div class="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
      <p class="text-xs" :style="isDark ? 'color:#6b7280;' : 'color:rgba(255,255,255,0.55);'">
        © 2026. All Rights Reserved.
      </p>
      <div class="flex items-center gap-4">
        <a href="#" class="text-xs transition-colors duration-200"
          :style="isDark ? 'color:#6b7280;' : 'color:rgba(255,255,255,0.55);'">Privacy Policy</a>
        <span :style="isDark ? 'color:#374151;' : 'color:rgba(255,255,255,0.2);'">·</span>
        <a href="#" class="text-xs transition-colors duration-200"
          :style="isDark ? 'color:#6b7280;' : 'color:rgba(255,255,255,0.55);'">Terms of Service</a>
      </div>
    </div>
  </footer>
</template>
