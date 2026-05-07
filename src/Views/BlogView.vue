<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import NavBar from '../components/NavBar.vue'
import FooterBar from '../components/Footer.vue'
import { blogPosts } from '../data/blogPosts'

const route = useRoute()
const router = useRouter()
const isDark = ref(document.documentElement.classList.contains('dark'))

const observer = new MutationObserver(() => {
  isDark.value = document.documentElement.classList.contains('dark')
})

onMounted(() => observer.observe(document.documentElement, { attributeFilter: ['class'] }))
onUnmounted(() => observer.disconnect())

const activeFilter = computed(() => {
  const value = route.params.category
  return typeof value === 'string' ? value.toLowerCase() : ''
})

const filteredPosts = computed(() => {
  if (!activeFilter.value) return blogPosts
  return blogPosts.filter((post) => post.category === activeFilter.value)
})

const filterLabel = computed(() => {
  if (!activeFilter.value) return 'All Articles'
  return `${activeFilter.value.charAt(0).toUpperCase()}${activeFilter.value.slice(1)}`
})

const openPost = (id: string): void => {
  router.push(`/blog/post/${id}`)
}
</script>

<template>
  <div
    class="min-h-screen transition-colors duration-500"
    :style="isDark ? 'background-color:#121a14;color:#f0f0f0;' : 'background-color:#f8f7f2;color:#1a2e1f;'"
  >
    <NavBar />

    <section class="pt-32 pb-20 px-6 sm:px-10 lg:px-16">
      <div class="max-w-7xl mx-auto">
        <div class="mb-10">
          <p class="text-xs font-semibold tracking-widest uppercase mb-3" :class="isDark ? 'text-[#4caf72]' : 'text-[#174f2a]'">
            Blog
          </p>
          <h1
            class="text-4xl sm:text-5xl font-bold mb-3"
            :style="isDark ? 'color:#f0f0f0;' : 'color:#174f2a;'"
            style="font-family:'Montserrat',sans-serif"
          >
            Gardening Articles & Guides
          </h1>
          <p class="text-sm" :style="isDark ? 'color:#9ca3af;' : 'color:#6b7280;'">
            Explore practical tips to grow healthier plants and build your dream garden.
          </p>
        </div>

        <div
          class="mb-8 inline-flex items-center px-3 py-1.5 rounded-full border text-xs font-semibold tracking-wide"
          :style="isDark
            ? 'background:rgba(23,79,42,0.2);border-color:rgba(76,175,114,0.25);color:#4caf72;'
            : 'background:rgba(23,79,42,0.08);border-color:rgba(23,79,42,0.18);color:#174f2a;'"
        >
          Showing: {{ filterLabel }}
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article
            v-for="post in filteredPosts"
            :key="post.id"
            class="rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2"
            :style="isDark
              ? 'background:rgba(26,46,31,0.55);backdrop-filter:blur(18px);border:1px solid rgba(255,255,255,0.08);box-shadow:0 8px 28px rgba(0,0,0,0.28);'
              : 'background:rgba(255,255,255,0.72);backdrop-filter:blur(18px);border:1px solid rgba(255,255,255,0.95);box-shadow:0 8px 28px rgba(23,79,42,0.09);'"
          >
            <div
              class="h-32 px-6 py-5 flex items-end"
              :style="isDark
                ? 'background:linear-gradient(135deg,rgba(23,79,42,0.35) 0%,rgba(18,26,20,0.45) 100%);'
                : 'background:linear-gradient(135deg,rgba(200,230,208,0.55) 0%,rgba(232,244,235,0.4) 100%);'"
            >
              <span
                class="px-2.5 py-1 rounded-full text-xs font-semibold"
                :style="isDark
                  ? 'background:rgba(23,79,42,0.55);color:#4caf72;border:1px solid rgba(76,175,114,0.25);'
                  : 'background:rgba(23,79,42,0.1);color:#174f2a;border:1px solid rgba(23,79,42,0.18);'"
              >
                {{ post.category }}
              </span>
            </div>

            <div class="px-6 py-6">
              <h2 class="text-lg font-semibold mb-3" :style="isDark ? 'color:#f0f0f0;' : 'color:#1a2e1f;'">
                {{ post.title }}
              </h2>
              <p class="text-sm leading-relaxed mb-5" :style="isDark ? 'color:#9ca3af;' : 'color:#6b7280;'">
                {{ post.excerpt }}
              </p>
              <div class="flex items-center justify-between">
                <p class="text-xs font-medium" :style="isDark ? 'color:#6b7280;' : 'color:#4b5563;'">{{ post.readTime }}</p>
                <button
                  class="text-sm font-semibold inline-flex items-center gap-2 transition-all duration-200 hover:gap-3"
                  :class="isDark ? 'text-[#4caf72]' : 'text-[#174f2a]'"
                  @click="openPost(post.id)"
                >
                  Read Article
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          </article>
        </div>

        <div
          v-if="filteredPosts.length === 0"
          class="mt-8 p-6 rounded-2xl text-sm"
          :style="isDark
            ? 'background:rgba(255,255,255,0.04);color:#9ca3af;border:1px solid rgba(255,255,255,0.08);'
            : 'background:rgba(23,79,42,0.05);color:#4b5563;border:1px solid rgba(23,79,42,0.12);'"
        >
          No articles found for this category yet.
        </div>
      </div>
    </section>

    <FooterBar />
  </div>
</template>
