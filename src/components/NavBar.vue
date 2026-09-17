<script setup lang="ts">
import { ref, onUnmounted, watch, nextTick } from 'vue'
import logo from '../assets/logo.png'
import logoDark from '../assets/logo-dark.png'
import { useRoute, useRouter } from 'vue-router'
import { useCart } from '../composables/useCart'
import { useAuth } from '../composables/useAuth'
const router = useRouter()
const route = useRoute()
const { itemCount } = useCart()
const { authUser, logout } = useAuth()

const isMenuOpen = ref(false)
const isAccountMenuOpen = ref(false)
const activeDropdown = ref<string | null>(null)
const isDark = ref(document.documentElement.classList.contains('dark'))
let closeTimer: ReturnType<typeof setTimeout> | null = null
const desktopSearch = ref('')
const mobileSearch = ref('')

interface NavDropdownLink {
  label: string
  href: string
}

interface NavItem {
  label: string
  href: string
  dropdown: NavDropdownLink[] | null
  /** If set, clicking scrolls to this footer section instead of routing */
  footerAnchor?: string
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/', dropdown: null },
  {
    label: 'Plants', href: '/products',
    dropdown: [
      { label: 'Indoor Plants', href: '/products?category=indoor' },
      { label: 'Outdoor Plants', href: '/products?category=outdoor' },
      { label: 'Succulents', href: '/products?category=succulents' },
      { label: 'Herbs & Edibles', href: '/products?category=herbs' },
      { label: 'Flowering Plants', href: '/products?category=flowering' },
    ],
  },
  {
    label: 'Tools', href: '/tools',
    dropdown: [
      { label: 'Hand Tools', href: '/tools?category=hand-tools' },
      { label: 'Watering & Irrigation', href: '/tools?category=watering' },
      { label: 'Soil & Fertilizers', href: '/tools?category=soil' },
      { label: 'Pots & Planters', href: '/tools?category=pots' },
      { label: 'Plant Care Accessories', href: '/tools?category=care' },
    ],
  },
  {
    label: 'Blog', href: '/blog',
    dropdown: [
      { label: 'Gardening Tips', href: '/blog/tips' },
      { label: 'Plant Care Guides', href: '/blog/guides' },
      { label: 'Seasonal Advice', href: '/blog/seasonal' },
    ],
  },
  { label: 'About', href: '/about', dropdown: null, footerAnchor: 'footer-about' },
  { label: 'Contact', href: '/contact', dropdown: null, footerAnchor: 'footer-contact' },
]

function openDropdown(label: string) {
  if (closeTimer) clearTimeout(closeTimer)
  activeDropdown.value = label
}

function isItemActive(item: NavItem): boolean {
  if (item.footerAnchor) return route.hash === `#${item.footerAnchor}`
  if (item.href === '/') return route.path === '/'
  return route.path === item.href || route.path.startsWith(`${item.href}/`)
}

const scrollToFooterSection = (elementId: string): void => {
  document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const handleNavClick = async (item: NavItem): Promise<void> => {
  if (item.dropdown) {
    openDropdown(item.label)
    return
  }
  if (item.footerAnchor) {
    activeDropdown.value = null
    isMenuOpen.value = false

    if (document.getElementById(item.footerAnchor)) {
      scrollToFooterSection(item.footerAnchor)
      await router.replace({
        path: route.path,
        query: route.query,
        hash: `#${item.footerAnchor}`,
      })
      return
    }

    await router.push({ path: '/', hash: `#${item.footerAnchor}` })
    await nextTick()
    setTimeout(() => scrollToFooterSection(item.footerAnchor!), 200)
    return
  }

  router.push(item.href)
}

function scheduleClose() {
  closeTimer = setTimeout(() => { activeDropdown.value = null }, 150)
}

function cancelClose() {
  if (closeTimer) clearTimeout(closeTimer)
}

function toggleDark() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

const goToCart = (): void => {
  router.push('/cart')
}

const handleAuthAction = (): void => {
  if (!authUser.value) {
    router.push('/login')
    return
  }

  isAccountMenuOpen.value = !isAccountMenuOpen.value
}

const handleLogout = (): void => {
  logout()
  isAccountMenuOpen.value = false
  isMenuOpen.value = false
  router.push('/')
}

const submitSearch = (rawQuery: string): void => {
  const query = rawQuery.trim()
  router.push({
    path: '/products',
    query: query ? { q: query } : {},
  })
}

const syncSearchFromRoute = (): void => {
  const query = typeof route.query.q === 'string' ? route.query.q : ''
  desktopSearch.value = query
  mobileSearch.value = query
}

syncSearchFromRoute()
watch(() => route.query.q, syncSearchFromRoute)
watch(() => route.fullPath, () => { isAccountMenuOpen.value = false })

onUnmounted(() => { if (closeTimer) clearTimeout(closeTimer) })
</script>

<template>
  <header
    class="fixed top-0 left-0 w-full z-50"
    :style="{
      background: isDark
        ? 'rgba(10, 25, 15, 0.45)'
        : 'rgba(255, 255, 255, 0.18)',
      backdropFilter: 'blur(24px) saturate(180%)',
      WebkitBackdropFilter: 'blur(24px) saturate(180%)',
      borderBottom: isDark
        ? '1px solid rgba(255,255,255,0.08)'
        : '1px solid rgba(255,255,255,0.35)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
    }"
  >
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Top bar -->
      <div class="flex items-center justify-between h-20">

        <!-- Logo -->
        <a href="/" class="flex items-center shrink-0">
          <img
            :src="isDark ? logoDark : logo"
            alt="Raven's Garden Logo"
            class="w-28 sm:w-32 lg:w-36 h-auto object-contain transition-all duration-300 hover:scale-105 hover:drop-shadow-lg hover:brightness-110 cursor-pointer"
          />
        </a>

        <!-- Desktop nav links -->
        <div class="hidden md:flex items-center gap-1">
          <div
            v-for="item in navItems"
            :key="item.label"
            class="relative"
            @mouseenter="item.dropdown ? openDropdown(item.label) : null"
            @mouseleave="item.dropdown ? scheduleClose() : null"
          >
            <button
              class="relative flex items-center gap-1.5 px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-250 group"
              :style="
                activeDropdown === item.label || isItemActive(item)
                  ? {
                      background: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(23,79,42,0.15)',
                      color: isDark ? '#ffffff' : '#174f2a',
                    }
                  : {}
              "
              :class="isDark ? 'text-white/80 hover:text-white' : 'text-gray-800 hover:text-[#174f2a]'"
              @click="item.dropdown ? openDropdown(item.label) : handleNavClick(item)"
              @mouseover="(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.background = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(23,79,42,0.1)'
              }"
              @mouseleave="(e) => {
                const el = e.currentTarget as HTMLElement
                if (activeDropdown !== item.label) el.style.background = ''
              }"
            >
              <span class="relative">
                {{ item.label }}
                <span class="absolute -bottom-0.5 left-0 w-0 h-0.5 rounded-full transition-all duration-300 group-hover:w-full"
                  :style="{ background: isDark ? 'rgba(255,255,255,0.6)' : '#174f2a' }"
                />
              </span>
              <svg
                v-if="item.dropdown"
                class="w-3.5 h-3.5 transition-transform duration-200 opacity-50"
                :class="{ 'rotate-180': activeDropdown === item.label }"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Dropdown -->
            <Transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="opacity-0 translate-y-2 scale-95"
              enter-to-class="opacity-100 translate-y-0 scale-100"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="opacity-100 translate-y-0 scale-100"
              leave-to-class="opacity-0 translate-y-2 scale-95"
            >
              <div
                v-if="item.dropdown && activeDropdown === item.label"
                class="absolute top-full left-0 mt-2 w-52 rounded-2xl overflow-hidden"
                :style="{
                  background: isDark ? 'rgba(8,20,12,0.82)' : 'rgba(255,255,255,0.72)',
                  backdropFilter: 'blur(22px) saturate(170%)',
                  WebkitBackdropFilter: 'blur(22px) saturate(170%)',
                  border: isDark ? '1px solid rgba(255,255,255,0.16)' : '1px solid rgba(23,79,42,0.18)',
                  boxShadow: isDark ? '0 18px 44px rgba(0,0,0,0.35)' : '0 18px 44px rgba(23,79,42,0.2)',
                }"
                @mouseenter="cancelClose"
                @mouseleave="scheduleClose"
              >
                <div class="py-2 px-2">
                  <a
                    v-for="sub in item.dropdown"
                    :key="sub.label"
                    :href="sub.href"
                    class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-150 group/sub"
                    :class="isDark ? 'text-white/85 hover:text-white' : 'text-gray-800 hover:text-[#174f2a]'"
                    :style="{ transition: 'background 0.15s' }"
                    @mouseover="(e) => (e.currentTarget as HTMLElement).style.background = isDark ? 'rgba(255,255,255,0.14)' : 'rgba(23,79,42,0.14)'"
                    @mouseleave="(e) => (e.currentTarget as HTMLElement).style.background = ''"
                  >
                    <span
                      class="w-1.5 h-1.5 rounded-full shrink-0 opacity-0 group-hover/sub:opacity-100 transition-opacity duration-150"
                      :style="{ background: isDark ? 'rgba(255,255,255,0.7)' : '#174f2a' }"
                    />
                    {{ sub.label }}
                  </a>
                </div>
              </div>
            </Transition>
          </div>
        </div>

        <!-- Desktop actions -->
        <div class="hidden lg:flex items-center gap-3">

          <!-- Cart -->
          <button
            class="relative w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
            :style="{
              background: isDark ? 'rgba(23,79,42,0.6)' : 'rgba(23,79,42,0.85)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'white',
            }"
            aria-label="Cart"
            @click="goToCart"
          >
            <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span
              v-if="itemCount > 0"
              class="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center"
            >
              {{ itemCount }}
            </span>
          </button>

          <!-- Search -->
          <div
            class="flex items-center rounded-full overflow-hidden h-9 transition-all duration-200 focus-within:ring-2 focus-within:ring-white/30"
            :style="{
              background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.4)',
              backdropFilter: 'blur(10px)',
              border: isDark ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(255,255,255,0.6)',
            }"
          >
            <input
              type="text"
              placeholder="Search plants & tools..."
              class="w-32 xl:w-44 px-3.5 outline-none bg-transparent text-sm"
              :class="isDark ? 'text-white placeholder-white/40' : 'text-gray-800 placeholder-gray-500'"
              v-model="desktopSearch"
              @keydown.enter="submitSearch(desktopSearch)"
            />
            <button
              class="h-full px-3.5 flex items-center justify-center transition-colors duration-200"
              :style="{ background: isDark ? 'rgba(23,79,42,0.7)' : 'rgba(23,79,42,0.85)', color: 'white' }"
              aria-label="Search"
              @click="submitSearch(desktopSearch)"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          <!-- Account menu -->
          <div class="relative">
            <button
              class="flex items-center gap-1.5 text-sm font-medium transition-all duration-200 px-3 py-1.5 rounded-xl"
              :class="isDark ? 'text-white/80 hover:text-white' : 'text-gray-700 hover:text-[#174f2a]'"
              :aria-expanded="authUser ? isAccountMenuOpen : undefined"
              @mouseover="(e) => (e.currentTarget as HTMLElement).style.background = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(23,79,42,0.08)'"
              @mouseleave="(e) => (e.currentTarget as HTMLElement).style.background = ''"
              @click="handleAuthAction"
            >
              <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span class="max-w-[9rem] truncate">{{ authUser ? authUser.username : 'Log in' }}</span>
              <svg v-if="authUser" class="w-3 h-3 transition-transform" :class="{ 'rotate-180': isAccountMenuOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="m6 9 6 6 6-6" />
              </svg>
            </button>

            <Transition
              enter-active-class="transition duration-150 ease-out"
              enter-from-class="opacity-0 scale-95 -translate-y-1"
              enter-to-class="opacity-100 scale-100 translate-y-0"
              leave-active-class="transition duration-100 ease-in"
              leave-from-class="opacity-100 scale-100 translate-y-0"
              leave-to-class="opacity-0 scale-95 -translate-y-1"
            >
              <div v-if="authUser && isAccountMenuOpen" class="absolute right-0 top-full mt-2 p-1.5 rounded-xl bg-red-500/75 backdrop-blur-xl border border-red-200/30 shadow-lg shadow-red-950/25">
                <button
                  class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-white transition-colors hover:bg-red-950/20"
                  @click="handleLogout"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m-3-3h9m0 0l-3-3m3 3l-3 3" />
                  </svg>
                  Log out
                </button>
              </div>
            </Transition>
          </div>

          <!-- Dark mode toggle -->
          <button
            class="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
            :style="{
              background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
              border: isDark ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(0,0,0,0.08)',
              color: isDark ? '#facc15' : '#4b5563',
            }"
            @click="toggleDark"
            :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          >
            <svg v-if="isDark" class="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.166 17.834a.75.75 0 00-1.06 1.06l1.59 1.591a.75.75 0 001.061-1.06l-1.59-1.591zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.166 6.166a.75.75 0 00-1.06 1.06l1.59 1.591a.75.75 0 001.061-1.06L6.166 6.166z"/>
            </svg>
            <svg v-else class="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clip-rule="evenodd"/>
            </svg>
          </button>
        </div>

        <!-- Mobile menu button -->
        <button
          class="md:hidden w-9 h-9 flex items-center justify-center rounded-xl transition-colors duration-200"
          :class="isDark ? 'text-white/80 hover:text-white' : 'text-gray-700'"
          :style="{ background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }"
          @click="isMenuOpen = !isMenuOpen"
          aria-label="Toggle menu"
        >
          <svg v-if="!isMenuOpen" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile menu -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div
          v-if="isMenuOpen"
          class="md:hidden pb-4 border-t max-h-[calc(100vh-5rem)] overflow-y-auto"
          :style="{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.4)' }"
        >
          <div class="flex flex-col pt-2 gap-0.5">
            <div v-for="item in navItems" :key="item.label">
              <button
                class="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
                :class="isDark ? 'text-white/80 hover:text-white' : 'text-gray-700 hover:text-[#174f2a]'"
                :style="isItemActive(item)
                  ? (isDark
                      ? 'background:rgba(255,255,255,0.12);color:#ffffff;'
                      : 'background:rgba(23,79,42,0.15);color:#174f2a;')
                  : ''"
                @mouseover="(e) => (e.currentTarget as HTMLElement).style.background = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(23,79,42,0.08)'"
                @mouseleave="(e) => (e.currentTarget as HTMLElement).style.background = ''"
                @click="item.dropdown ? (activeDropdown === item.label ? activeDropdown = null : activeDropdown = item.label) : handleNavClick(item)"
              >
                {{ item.label }}
                <svg
                  v-if="item.dropdown"
                  class="w-4 h-4 transition-transform duration-200 opacity-50"
                  :class="{ 'rotate-180': activeDropdown === item.label }"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <Transition
                enter-active-class="transition duration-150 ease-out"
                enter-from-class="opacity-0 -translate-y-1"
                enter-to-class="opacity-100 translate-y-0"
              >
                <div v-if="item.dropdown && activeDropdown === item.label" class="ml-4 mb-1 flex flex-col gap-0.5 pr-2">
                  <a
                    v-for="sub in item.dropdown"
                    :key="sub.label"
                    :href="sub.href"
                    class="flex items-center gap-2 px-3 py-2 text-sm rounded-xl transition-all duration-150"
                    :class="isDark ? 'text-white/60 hover:text-white' : 'text-gray-500 hover:text-[#174f2a]'"
                    @mouseover="(e) => (e.currentTarget as HTMLElement).style.background = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(23,79,42,0.07)'"
                    @mouseleave="(e) => (e.currentTarget as HTMLElement).style.background = ''"
                  >
                    <span class="w-1 h-1 rounded-full bg-current opacity-50 shrink-0" />
                    {{ sub.label }}
                  </a>
                </div>
              </Transition>
            </div>
          </div>

          <!-- Mobile actions -->
          <div
            class="mt-3 mx-1 px-3 flex flex-col gap-3 border-t pt-3"
            :style="{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.4)' }"
          >
            <div
              class="flex items-center rounded-full overflow-hidden h-10"
              :style="{
                background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.5)',
                border: isDark ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(255,255,255,0.6)',
              }"
            >
              <input
                type="text"
                placeholder="Search plants..."
                class="flex-1 px-4 outline-none bg-transparent text-sm"
                :class="isDark ? 'text-white placeholder-white/40' : 'text-gray-800 placeholder-gray-500'"
                v-model="mobileSearch"
                @keydown.enter="submitSearch(mobileSearch)"
              />
              <button
                class="h-full px-4 text-white"
                :style="{ background: 'rgba(23,79,42,0.85)' }"
                @click="submitSearch(mobileSearch)"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
            <div class="flex items-center justify-between">
              <button
                @click="authUser ? handleLogout() : handleAuthAction()"
                class="flex items-center gap-2 text-sm font-medium"
                :class="isDark ? 'text-white/80' : 'text-gray-700'"
              >
                <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span class="max-w-[9rem] truncate">{{ authUser ? authUser.username : 'Log in' }}</span>
              </button>
              <button
                class="flex items-center gap-2 text-sm font-medium transition-colors duration-200"
                :class="isDark ? 'text-yellow-400' : 'text-gray-600'"
                @click="toggleDark"
              >
                <svg v-if="isDark" class="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0z"/>
                </svg>
                <svg v-else class="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clip-rule="evenodd"/>
                </svg>
                {{ isDark ? 'Light mode' : 'Dark mode' }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </nav>
  </header>
</template>
