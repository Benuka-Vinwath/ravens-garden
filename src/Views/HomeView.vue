<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '../components/NavBar.vue'
import FooterBar from '../components/Footer.vue'
import heroImage from '../assets/hero-images/Home.png'
import heroImageDark from '../assets/hero-images/Home-dark.png'
import plant01 from '../assets/plants/plant-01.png'
import plant03 from '../assets/plants/plant-03.png'
import plant04 from '../assets/plants/plant-04.png'
import { blogPosts } from '../data/blogPosts'

const isDark = ref(document.documentElement.classList.contains('dark'))
const router = useRouter()

const observer = new MutationObserver(() => {
  isDark.value = document.documentElement.classList.contains('dark')
})

onMounted(() => observer.observe(document.documentElement, { attributeFilter: ['class'] }))
onUnmounted(() => observer.disconnect())

const plants = [
  { id: 1, name: 'Grass Ball Plant', price: 'Rs 2000.00', tag: 'Popular', image: plant01 },
  { id: 2, name: 'Bonsai Pine Tree', price: 'Rs 3100.00', tag: 'New',     image: plant04 },
  { id: 3, name: 'ZZ Plant',         price: 'Rs 2500.00', tag: 'Sale',    image: plant03 },
]

const goToProducts = (): void => {
  router.push('/products')
}

const goToProductDetail = (id: number): void => {
  router.push(`/products/${id}`)
}

const goToLogin = (): void => {
  router.push('/login')
}

const goToBlog = (): void => {
  router.push('/blog')
}

const scrollToBlog = (): void => {
  const section = document.getElementById('blog-section')
  if (section) section.scrollIntoView({ behavior: 'smooth' })
}

const goToBlogPost = (id: string): void => {
  router.push(`/blog/post/${id}`)
}
</script>

<template>
  <div
    class="min-h-screen transition-colors duration-500"
    :style="isDark ? 'background-color:#121a14;color:#f0f0f0;' : 'background-color:#f8f7f2;color:#1a2e1f;'"
  >
    <NavBar />

    <!-- ───── HERO SECTION ───── -->
    <section class="relative min-h-[90vh] sm:min-h-screen flex items-center overflow-hidden">
      <div class="absolute inset-0">
        <img
          :src="isDark ? heroImageDark : heroImage"
          alt="Plants hero"
          class="w-full h-full object-cover object-center transition-all duration-500"
        />
        <div
          class="absolute inset-0 transition-all duration-500"
          :style="isDark
            ? 'background:linear-gradient(to right, #121a14 0%, rgba(18,26,20,0.88) 45%, transparent 100%);'
            : 'background:linear-gradient(to right, #f8f7f2 0%, rgba(248,247,242,0.88) 45%, transparent 100%);'"
        />
      </div>

      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-10 lg:px-16 pt-24 sm:pt-28 pb-12 sm:pb-16 w-full">
        <div class="max-w-lg">
          <div
            class="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border"
            :class="isDark ? 'bg-[#174f2a]/20 border-[#174f2a]/40' : 'bg-[#174f2a]/10 border-[#174f2a]/20'"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-[#4caf72]" />
            <span class="text-xs font-semibold tracking-widest uppercase" :class="isDark ? 'text-[#4caf72]' : 'text-[#174f2a]'">
              Garden Planner
            </span>
          </div>

          <h1
            class="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 transition-colors duration-300"
            :style="isDark ? 'color:#f0f0f0;' : 'color:#1a2e1f;'"
            style="font-family:'Montserrat',sans-serif;letter-spacing:-0.02em;"
          >
            Make Your Space<br />
            <span :class="isDark ? 'text-[#4caf72]' : 'text-[#174f2a]'">Greener</span><br />
            With Plants
          </h1>

          <p
            class="text-base leading-relaxed mb-10 max-w-sm"
            :style="isDark ? 'color:#9ca3af;' : 'color:#6b7280;'"
          >
            Plan, grow, and manage your garden effortlessly with our Garden Planner.
          </p>

          <div class="flex flex-col sm:flex-row sm:items-center items-start gap-3 sm:gap-4">
            <button
              class="px-7 py-3.5 rounded-xl text-white text-sm font-semibold tracking-wide transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
              :class="isDark ? 'bg-[#1e6334] hover:bg-[#25753e]' : 'bg-[#174f2a] hover:bg-[#1e6334]'"
              @click="goToProducts"
            >Shop Plants &amp; Tools</button>
            <button
              class="flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all duration-200"
              :class="isDark ? 'text-[#4caf72]' : 'text-[#174f2a]'"
              @click="scrollToBlog"
            >
              Learn more
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Floating card -->
      <div
        class="hidden sm:flex absolute bottom-10 sm:bottom-16 right-4 sm:right-8 lg:right-24 z-10 items-center gap-3 px-4 py-3 rounded-2xl shadow-xl"
        :style="isDark
          ? 'background:rgba(18,26,20,0.75);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.08);'
          : 'background:rgba(255,255,255,0.85);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.9);'"
      >
        <div
          class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          :class="isDark ? 'bg-[#174f2a]/30' : 'bg-[#174f2a]/10'"
        >
          <svg class="w-5 h-5" :class="isDark ? 'text-[#4caf72]' : 'text-[#174f2a]'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        </div>
        <div>
          <p class="text-xs font-semibold" :style="isDark ? 'color:#f0f0f0;' : 'color:#1f2937;'">There are many</p>
          <p class="text-xs" :style="isDark ? 'color:#9ca3af;' : 'color:#6b7280;'">different plants.</p>
        </div>
      </div>
    </section>

    <!-- ───── BEST SELLING SECTION ───── -->
    <section
      class="py-14 sm:py-20 px-4 sm:px-10 lg:px-16 transition-colors duration-500"
      :style="isDark ? 'background-color:#121a14;' : 'background-color:#ffffff;'"
    >
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-14">
          <h2
            class="text-3xl sm:text-4xl font-bold mb-3"
            :style="isDark ? 'color:#f0f0f0;' : 'color:#174f2a;'"
            style="font-family:'Montserrat',sans-serif"
          >Best Selling Plant Collection</h2>
          <p class="text-sm" :style="isDark ? 'color:#9ca3af;' : 'color:#6b7280;'">
            Check out our collection. We got every plant you need!
          </p>
          <p class="text-sm font-semibold mt-1" :class="isDark ? 'text-[#4caf72]' : 'text-[#174f2a]'">
            Let's Grow it together!
          </p>
        </div>

        <!-- Glassy plant cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="plant in plants"
            :key="plant.id"
            class="group relative rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-3 cursor-pointer"
            :style="isDark
              ? 'background:rgba(26,46,31,0.55);backdrop-filter:blur(20px) saturate(180%);-webkit-backdrop-filter:blur(20px) saturate(180%);border:1px solid rgba(255,255,255,0.07);box-shadow:0 8px 32px rgba(0,0,0,0.35);'
              : 'background:rgba(255,255,255,0.7);backdrop-filter:blur(20px) saturate(180%);-webkit-backdrop-filter:blur(20px) saturate(180%);border:1px solid rgba(255,255,255,0.9);box-shadow:0 8px 32px rgba(23,79,42,0.07);'"
            @click="goToProductDetail(plant.id)"
          >
            <!-- Tag badge -->
            <div class="absolute top-4 left-4 z-10">
              <span
                class="px-2.5 py-1 rounded-full text-xs font-semibold"
                :style="isDark
                  ? 'background:rgba(23,79,42,0.55);color:#4caf72;border:1px solid rgba(76,175,114,0.25);backdrop-filter:blur(8px);'
                  : 'background:rgba(23,79,42,0.1);color:#174f2a;border:1px solid rgba(23,79,42,0.18);'"
              >{{ plant.tag }}</span>
            </div>

            <!-- Heart button -->
            <button
              class="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
              :style="isDark
                ? 'background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.1);backdrop-filter:blur(8px);'
                : 'background:rgba(255,255,255,0.75);border:1px solid rgba(255,255,255,0.95);backdrop-filter:blur(8px);'"
              @click.stop="goToLogin"
            >
              <svg class="w-4 h-4" :style="isDark ? 'color:rgba(255,255,255,0.5);' : 'color:#9ca3af;'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>

            <!-- Plant image area -->
            <div
              class="h-52 flex items-center justify-center relative overflow-hidden"
              :style="isDark
                ? 'background:linear-gradient(135deg,rgba(23,79,42,0.28) 0%,rgba(18,26,20,0.4) 100%);'
                : 'background:linear-gradient(135deg,rgba(200,230,208,0.45) 0%,rgba(232,244,235,0.3) 100%);'"
            >
              <img
                :src="plant.image"
                :alt="plant.name"
                class="h-44 w-auto object-contain transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1 drop-shadow-lg"
              />
              <div
                class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style="background:linear-gradient(135deg,rgba(255,255,255,0.04) 0%,rgba(255,255,255,0.1) 50%,rgba(255,255,255,0.04) 100%);"
              />
            </div>

            <!-- Divider -->
            <div :style="isDark ? 'margin:0 1.25rem;height:1px;background:rgba(255,255,255,0.06);' : 'margin:0 1.25rem;height:1px;background:rgba(23,79,42,0.07);'" />

            <!-- Card content -->
            <div class="px-5 py-5">
              <div class="flex items-start justify-between mb-5">
                <div>
                  <h3 class="text-base font-semibold mb-1" :style="isDark ? 'color:#f0f0f0;' : 'color:#1a2e1f;'">{{ plant.name }}</h3>
                  <span class="text-lg font-bold" :class="isDark ? 'text-[#4caf72]' : 'text-[#174f2a]'">{{ plant.price }}</span>
                  <div class="flex items-center gap-0.5 mt-1.5">
                    <svg v-for="i in 5" :key="i" class="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span class="text-xs ml-1" :style="isDark ? 'color:#9ca3af;' : 'color:#6b7280;'">(4.9)</span>
                  </div>
                </div>
              </div>

              <button
                class="w-full py-3 rounded-2xl text-white text-sm font-semibold tracking-wide transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
                :style="isDark
                  ? 'background:rgba(23,79,42,0.75);border:1px solid rgba(76,175,114,0.18);backdrop-filter:blur(8px);box-shadow:0 4px 15px rgba(23,79,42,0.28);'
                  : 'background:#174f2a;box-shadow:0 4px 15px rgba(23,79,42,0.18);'"
                @mouseover="(e) => (e.currentTarget as HTMLElement).style.background = isDark ? 'rgba(30,99,52,0.88)' : '#1e6334'"
                @mouseleave="(e) => (e.currentTarget as HTMLElement).style.background = isDark ? 'rgba(23,79,42,0.75)' : '#174f2a'"
                @click.stop="goToProductDetail(plant.id)"
              >Buy Now</button>
            </div>
          </div>
        </div>

        <!-- View all -->
        <div class="text-center mt-12">
          <button
            class="px-8 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
            :style="isDark
              ? 'background:rgba(23,79,42,0.18);color:#4caf72;border:1px solid rgba(76,175,114,0.22);backdrop-filter:blur(8px);'
              : 'background:rgba(255,255,255,0.7);color:#174f2a;border:1px solid rgba(23,79,42,0.18);backdrop-filter:blur(8px);'"
            @click="goToProducts"
          >View All Plants →</button>
        </div>
      </div>
    </section>

    <!-- ───── BLOG SECTION ───── -->
    <section
      id="blog-section"
      class="py-14 sm:py-20 px-4 sm:px-10 lg:px-16 transition-colors duration-500"
      :style="isDark ? 'background-color:#121a14;' : 'background-color:#ffffff;'"
    >
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col sm:flex-row sm:items-end items-start justify-between gap-4 mb-12">
          <div>
            <p class="text-xs font-semibold tracking-widest uppercase mb-3" :class="isDark ? 'text-[#4caf72]' : 'text-[#174f2a]'">
              Our Blog
            </p>
            <h2
              class="text-3xl sm:text-4xl font-bold"
              :style="isDark ? 'color:#f0f0f0;' : 'color:#174f2a;'"
              style="font-family:'Montserrat',sans-serif"
            >
              Latest Gardening Stories
            </h2>
          </div>
          <button
            class="px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
            :style="isDark
              ? 'background:rgba(23,79,42,0.18);color:#4caf72;border:1px solid rgba(76,175,114,0.22);backdrop-filter:blur(8px);'
              : 'background:rgba(255,255,255,0.7);color:#174f2a;border:1px solid rgba(23,79,42,0.18);backdrop-filter:blur(8px);'"
            @click="goToBlog"
          >
            View All Articles
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article
            v-for="post in blogPosts"
            :key="post.id"
            class="group rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2"
            :style="isDark
              ? 'background:rgba(26,46,31,0.55);backdrop-filter:blur(18px);border:1px solid rgba(255,255,255,0.08);box-shadow:0 8px 28px rgba(0,0,0,0.28);'
              : 'background:rgba(255,255,255,0.72);backdrop-filter:blur(18px);border:1px solid rgba(255,255,255,0.95);box-shadow:0 8px 28px rgba(23,79,42,0.09);'"
          >
            <div
              class="h-36 px-6 py-5 flex flex-col justify-between"
              :style="isDark
                ? 'background:linear-gradient(135deg,rgba(23,79,42,0.35) 0%,rgba(18,26,20,0.45) 100%);'
                : 'background:linear-gradient(135deg,rgba(200,230,208,0.55) 0%,rgba(232,244,235,0.4) 100%);'"
            >
              <span
                class="w-fit px-2.5 py-1 rounded-full text-xs font-semibold"
                :style="isDark
                  ? 'background:rgba(23,79,42,0.55);color:#4caf72;border:1px solid rgba(76,175,114,0.25);'
                  : 'background:rgba(23,79,42,0.1);color:#174f2a;border:1px solid rgba(23,79,42,0.18);'"
              >
                {{ post.category.charAt(0).toUpperCase() + post.category.slice(1) }}
              </span>
              <p class="text-xs" :style="isDark ? 'color:#9ca3af;' : 'color:#4b5563;'">{{ post.readTime }}</p>
            </div>
            <div class="px-6 py-6">
              <h3 class="text-lg font-semibold mb-3 leading-snug" :style="isDark ? 'color:#f0f0f0;' : 'color:#1a2e1f;'">
                {{ post.title }}
              </h3>
              <p class="text-sm leading-relaxed mb-5" :style="isDark ? 'color:#9ca3af;' : 'color:#6b7280;'">
                {{ post.excerpt }}
              </p>
              <button
                class="text-sm font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-all duration-200"
                :class="isDark ? 'text-[#4caf72]' : 'text-[#174f2a]'"
                @click="goToBlogPost(post.id)"
              >
                Read Article
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ───── START GARDENING CTA ───── -->
    <section
      class="py-14 sm:py-20 px-4 sm:px-10 lg:px-16 transition-colors duration-500"
      :style="isDark ? 'background-color:#0e1610;' : 'background-color:#f8f7f2;'"
    >
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col md:flex-row items-center gap-8 md:gap-12">

          <!-- Decorative plant cluster -->
          <div class="flex-1 flex items-center justify-center relative min-h-56 sm:min-h-64">
            <div
              class="absolute w-64 h-64 rounded-full opacity-10 pointer-events-none"
              :style="isDark ? 'background:#4caf72;' : 'background:#174f2a;'"
            />
            <div class="relative flex items-end justify-center gap-4">
              <div
                class="w-28 h-28 rounded-full flex items-center justify-center shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
                :style="isDark ? 'background:#1e3524;' : 'background:#d4e8d4;'"
              >
                <img src="../assets/plants/plant-01.png" alt="Plant 01" class="w-24 h-24 object-contain drop-shadow-md" />
              </div>
              <div
                class="w-24 h-24 rounded-full flex items-center justify-center shadow-lg overflow-hidden -mb-3 transition-transform duration-300 hover:scale-105"
                :style="isDark ? 'background:#1a2e1f;' : 'background:#c8e0c8;'"
              >
                <img src="../assets/plants/plant-02.png" alt="Plant 02" class="w-20 h-20 object-contain drop-shadow-md" />
              </div>
              <div
                class="w-32 h-32 rounded-full flex items-center justify-center shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
                :style="isDark ? 'background:#1e3524;' : 'background:#daeeda;'"
              >
                <img src="../assets/plants/plant-03.png" alt="Plant 03" class="w-28 h-28 object-contain drop-shadow-md" />
              </div>
            </div>
          </div>

          <!-- Text & CTA -->
          <div class="flex-1 max-w-lg">
            <h2
              class="text-3xl sm:text-4xl font-bold leading-tight mb-6"
              :style="isDark ? 'color:#f0f0f0;font-family:Montserrat,sans-serif;' : 'color:#174f2a;font-family:Montserrat,sans-serif;'"
            >Start Gardening &amp; Grow Your Own Plant!</h2>
            <p class="text-sm leading-relaxed mb-8" :style="isDark ? 'color:#9ca3af;' : 'color:#6b7280;'">
              Discover the joy of growing your own plants. From seeds to blooms, we have everything you need to get started on your gardening journey.
            </p>
            <button
              class="px-8 py-3.5 rounded-xl text-white text-sm font-semibold tracking-wide transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
              :class="isDark ? 'bg-[#1e6334] hover:bg-[#25753e]' : 'bg-[#174f2a] hover:bg-[#1e6334]'"
              @click="goToProducts"
            >Shop Plants</button>
          </div>
        </div>
      </div>
    </section>

    <!-- ───── FOOTER ───── -->
    <FooterBar />

  </div>
</template>
