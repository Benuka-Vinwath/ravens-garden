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

const postId = computed(() => {
  const value = route.params.id
  return typeof value === 'string' ? value : ''
})

const post = computed(() => blogPosts.find((item) => item.id === postId.value))

const relatedPosts = computed(() => {
  if (!post.value) return []
  return blogPosts.filter((item) => item.category === post.value!.category && item.id !== post.value!.id).slice(0, 2)
})

const goBackToBlog = (): void => {
  router.push('/blog')
}

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
      <div class="max-w-4xl mx-auto">
        <template v-if="post">
          <button
            class="mb-8 text-sm font-semibold inline-flex items-center gap-2 transition-all duration-200 hover:gap-3"
            :class="isDark ? 'text-[#4caf72]' : 'text-[#174f2a]'"
            @click="goBackToBlog"
          >
            <svg class="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            Back to Blog
          </button>

          <div
            class="rounded-3xl overflow-hidden mb-8"
            :style="isDark
              ? 'background:rgba(26,46,31,0.55);backdrop-filter:blur(18px);border:1px solid rgba(255,255,255,0.08);'
              : 'background:rgba(255,255,255,0.72);backdrop-filter:blur(18px);border:1px solid rgba(255,255,255,0.95);'"
          >
            <div
              class="px-8 py-8"
              :style="isDark
                ? 'background:linear-gradient(135deg,rgba(23,79,42,0.35) 0%,rgba(18,26,20,0.45) 100%);'
                : 'background:linear-gradient(135deg,rgba(200,230,208,0.55) 0%,rgba(232,244,235,0.4) 100%);'"
            >
              <span
                class="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
                :style="isDark
                  ? 'background:rgba(23,79,42,0.55);color:#4caf72;border:1px solid rgba(76,175,114,0.25);'
                  : 'background:rgba(23,79,42,0.1);color:#174f2a;border:1px solid rgba(23,79,42,0.18);'"
              >
                {{ post.category.charAt(0).toUpperCase() + post.category.slice(1) }}
              </span>
              <h1
                class="text-3xl sm:text-4xl font-bold mb-4"
                :style="isDark ? 'color:#f0f0f0;' : 'color:#174f2a;'"
                style="font-family:'Montserrat',sans-serif"
              >
                {{ post.title }}
              </h1>
              <p class="text-sm" :style="isDark ? 'color:#9ca3af;' : 'color:#4b5563;'">
                {{ post.author }} • {{ post.publishedOn }} • {{ post.readTime }}
              </p>
            </div>

            <div class="px-8 py-8 space-y-6">
              <p
                v-for="paragraph in post.content"
                :key="paragraph"
                class="text-[15px] leading-8"
                :style="isDark ? 'color:#c7cdd4;' : 'color:#374151;'"
              >
                {{ paragraph }}
              </p>
            </div>
          </div>

          <div v-if="relatedPosts.length > 0">
            <h2 class="text-xl font-semibold mb-5" :style="isDark ? 'color:#f0f0f0;' : 'color:#1a2e1f;'">Related Articles</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <article
                v-for="related in relatedPosts"
                :key="related.id"
                class="p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1"
                :style="isDark
                  ? 'background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);'
                  : 'background:rgba(23,79,42,0.05);border:1px solid rgba(23,79,42,0.12);'"
              >
                <h3 class="text-base font-semibold mb-2" :style="isDark ? 'color:#f0f0f0;' : 'color:#1a2e1f;'">
                  {{ related.title }}
                </h3>
                <p class="text-sm mb-4" :style="isDark ? 'color:#9ca3af;' : 'color:#6b7280;'">
                  {{ related.excerpt }}
                </p>
                <button
                  class="text-sm font-semibold inline-flex items-center gap-2 transition-all duration-200 hover:gap-3"
                  :class="isDark ? 'text-[#4caf72]' : 'text-[#174f2a]'"
                  @click="openPost(related.id)"
                >
                  Open Post
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </article>
            </div>
          </div>
        </template>

        <div
          v-else
          class="rounded-2xl p-7 text-sm"
          :style="isDark
            ? 'background:rgba(255,255,255,0.04);color:#9ca3af;border:1px solid rgba(255,255,255,0.08);'
            : 'background:rgba(23,79,42,0.05);color:#4b5563;border:1px solid rgba(23,79,42,0.12);'"
        >
          This article is not available.
        </div>
      </div>
    </section>

    <FooterBar />
  </div>
</template>
