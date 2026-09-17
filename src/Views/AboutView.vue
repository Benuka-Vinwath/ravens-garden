<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '../components/NavBar.vue'
import FooterBar from '../components/Footer.vue'
import gardenImage from '../assets/Login-image.avif'

const router = useRouter()
const isDark = ref(document.documentElement.classList.contains('dark'))
const observer = new MutationObserver(() => {
  isDark.value = document.documentElement.classList.contains('dark')
})

onMounted(() => observer.observe(document.documentElement, { attributeFilter: ['class'] }))
onUnmounted(() => observer.disconnect())

const values = [
  { title: 'Grow with confidence', text: 'We choose dependable plants and practical tools so every gardener can make progress.' },
  { title: 'Care made simple', text: 'Clear guidance and thoughtful essentials make plant care feel calm, not complicated.' },
  { title: 'Better, greener choices', text: 'We encourage lasting gardens, considered purchases, and a closer connection to nature.' },
]
</script>

<template>
  <div class="min-h-screen transition-colors duration-500" :style="isDark ? 'background:#121a14;color:#f0f0f0;' : 'background:#f8f7f2;color:#1a2e1f;'">
    <NavBar />

    <main>
      <section class="relative min-h-[560px] flex items-center overflow-hidden pt-20">
        <img :src="gardenImage" alt="Lush plants at Raven's Garden" class="absolute inset-0 w-full h-full object-cover" />
        <div class="absolute inset-0" :style="isDark ? 'background:linear-gradient(90deg,rgba(10,22,13,.95) 0%,rgba(10,22,13,.68) 54%,rgba(10,22,13,.3) 100%);' : 'background:linear-gradient(90deg,rgba(247,248,241,.96) 0%,rgba(247,248,241,.72) 52%,rgba(247,248,241,.18) 100%);'" />
        <div class="relative max-w-7xl mx-auto w-full px-6 sm:px-10 lg:px-16 py-20">
          <div class="max-w-2xl">
            <p class="text-xs font-bold tracking-[0.24em] uppercase mb-5" :class="isDark ? 'text-[#76cf96]' : 'text-[#174f2a]'">About Raven's Garden</p>
            <h1 class="text-4xl sm:text-6xl font-bold leading-[1.08] mb-6" style="font-family:'Montserrat',sans-serif">A happier home starts with something green.</h1>
            <p class="text-base sm:text-lg leading-relaxed max-w-xl" :style="isDark ? 'color:#c6d0c8;' : 'color:#405347;'">We are a neighbourhood garden shop for curious beginners and lifelong plant lovers—here to make every growing space feel more alive.</p>
            <button class="mt-8 px-6 py-3 rounded-xl text-sm font-bold text-white transition-transform hover:-translate-y-0.5" :style="isDark ? 'background:#2b8146;box-shadow:0 10px 28px rgba(0,0,0,.3);' : 'background:#174f2a;box-shadow:0 10px 28px rgba(23,79,42,.22);'" @click="router.push('/products')">Explore our collection</button>
          </div>
        </div>
      </section>

      <section id="our-story" class="scroll-mt-24 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-28">
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div>
            <p class="text-xs font-bold tracking-[0.2em] uppercase mb-4" :class="isDark ? 'text-[#76cf96]' : 'text-[#174f2a]'">Our story</p>
            <h2 class="text-3xl sm:text-4xl font-bold mb-6" style="font-family:'Montserrat',sans-serif">Helping more people enjoy the everyday magic of gardening.</h2>
            <div class="space-y-4 text-sm sm:text-base leading-relaxed" :style="isDark ? 'color:#b4c0b7;' : 'color:#55665a;'">
              <p>Raven's Garden began with a simple belief: plants make spaces—and people—feel better. What started as a love for sharing cuttings and growing advice has become a welcoming place to find plants, tools, and a little encouragement.</p>
              <p>Today, we serve gardeners across Sri Lanka from our home in Ganemulla. Whether you are choosing your first pothos or planning a full outdoor garden, we are here to help you grow at your own pace.</p>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="rounded-3xl p-6 sm:p-8" :style="isDark ? 'background:rgba(76,175,114,.12);border:1px solid rgba(118,207,150,.18);' : 'background:#e6f0e7;'">
              <p class="text-3xl sm:text-4xl font-bold mb-2" :class="isDark ? 'text-[#76cf96]' : 'text-[#174f2a]'">Local</p>
              <p class="text-sm leading-relaxed" :style="isDark ? 'color:#b4c0b7;' : 'color:#55665a;'">Rooted in Ganemulla and made for local homes.</p>
            </div>
            <div class="rounded-3xl p-6 sm:p-8 mt-8" :style="isDark ? 'background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08);' : 'background:#fffdf8;border:1px solid #e8e5dc;'">
              <p class="text-3xl sm:text-4xl font-bold mb-2" :class="isDark ? 'text-[#76cf96]' : 'text-[#174f2a]'">For all</p>
              <p class="text-sm leading-relaxed" :style="isDark ? 'color:#b4c0b7;' : 'color:#55665a;'">From a first plant to a flourishing garden.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="py-20 lg:py-24" :style="isDark ? 'background:#0e1610;' : 'background:#e9f1ea;'">
        <div class="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div class="max-w-2xl mb-10"><p class="text-xs font-bold tracking-[0.2em] uppercase mb-4" :class="isDark ? 'text-[#76cf96]' : 'text-[#174f2a]'">What guides us</p><h2 class="text-3xl sm:text-4xl font-bold" style="font-family:'Montserrat',sans-serif">Good gardening should feel possible for everyone.</h2></div>
          <div class="grid md:grid-cols-3 gap-5">
            <article v-for="(value, index) in values" :key="value.title" class="rounded-2xl p-7" :style="isDark ? 'background:rgba(255,255,255,.055);border:1px solid rgba(255,255,255,.08);' : 'background:rgba(255,255,255,.8);border:1px solid rgba(23,79,42,.08);'">
              <span class="inline-flex w-9 h-9 items-center justify-center rounded-full text-sm font-bold mb-6" :style="isDark ? 'background:rgba(118,207,150,.14);color:#76cf96;' : 'background:#dcecdf;color:#174f2a;'">0{{ index + 1 }}</span>
              <h3 class="text-lg font-bold mb-3">{{ value.title }}</h3><p class="text-sm leading-relaxed" :style="isDark ? 'color:#b4c0b7;' : 'color:#55665a;'">{{ value.text }}</p>
            </article>
          </div>
        </div>
      </section>

      <section id="how-to-buy" class="scroll-mt-24 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-28">
        <div class="text-center max-w-2xl mx-auto mb-12"><p class="text-xs font-bold tracking-[0.2em] uppercase mb-4" :class="isDark ? 'text-[#76cf96]' : 'text-[#174f2a]'">How to buy</p><h2 class="text-3xl sm:text-4xl font-bold" style="font-family:'Montserrat',sans-serif">Everything you need, in three easy steps.</h2></div>
        <div class="grid md:grid-cols-3 gap-8 text-center">
          <div><div class="w-12 h-12 mx-auto mb-5 rounded-full flex items-center justify-center font-bold" :style="isDark ? 'background:#1e6334;color:#fff;' : 'background:#174f2a;color:#fff;'">1</div><h3 class="font-bold mb-2">Browse</h3><p class="text-sm" :style="isDark ? 'color:#b4c0b7;' : 'color:#55665a;'">Find plants and tools that suit your space.</p></div>
          <div><div class="w-12 h-12 mx-auto mb-5 rounded-full flex items-center justify-center font-bold" :style="isDark ? 'background:#1e6334;color:#fff;' : 'background:#174f2a;color:#fff;'">2</div><h3 class="font-bold mb-2">Choose with care</h3><p class="text-sm" :style="isDark ? 'color:#b4c0b7;' : 'color:#55665a;'">Read useful details and add your favourites to cart.</p></div>
          <div><div class="w-12 h-12 mx-auto mb-5 rounded-full flex items-center justify-center font-bold" :style="isDark ? 'background:#1e6334;color:#fff;' : 'background:#174f2a;color:#fff;'">3</div><h3 class="font-bold mb-2">Grow</h3><p class="text-sm" :style="isDark ? 'color:#b4c0b7;' : 'color:#55665a;'">Receive your order and enjoy a greener everyday.</p></div>
        </div>
      </section>

      <section class="px-6 sm:px-10 lg:px-16 pb-20 lg:pb-28"><div class="max-w-7xl mx-auto rounded-3xl px-7 py-12 sm:p-14 text-center" :style="isDark ? 'background:linear-gradient(135deg,#174f2a,#0e2616);' : 'background:linear-gradient(135deg,#174f2a,#2e7645);'"><h2 class="text-3xl sm:text-4xl font-bold text-white mb-4" style="font-family:'Montserrat',sans-serif">Let’s grow something good together.</h2><p class="text-sm sm:text-base text-white/75 max-w-xl mx-auto mb-7">Have a question or need help picking the right plant? We would love to hear from you.</p><a href="mailto:ravensgarden@gmail.com" class="inline-flex px-6 py-3 rounded-xl text-sm font-bold text-[#174f2a] bg-white transition-transform hover:-translate-y-0.5">Contact Raven's Garden</a></div></section>
    </main>

    <FooterBar />
  </div>
</template>
