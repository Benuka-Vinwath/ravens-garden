<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import loginImage from '../assets/Login-image.avif'
import logo from '../assets/logo.png'
import logoDark from '../assets/logo-dark.png'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { setAuthUser } = useAuth()

const isDark = ref(document.documentElement.classList.contains('dark'))
const observer = new MutationObserver(() => {
  isDark.value = document.documentElement.classList.contains('dark')
})
onMounted(() => observer.observe(document.documentElement, { attributeFilter: ['class'] }))
onUnmounted(() => observer.disconnect())

const identifier = ref('')
const password = ref('')
const showPassword  = ref(false)
const isLoading     = ref(false)
const identifierError = ref('')
const passwordError = ref('')
const formFocused   = ref<string | null>(null)
const submitError = ref('')

// ── Computed input styles (avoids escaped quotes in template) ──────────────
const identifierInputStyle = computed(() => {
  const base = isDark.value
    ? 'background:rgba(255,255,255,0.05);color:#f0f0f0;'
    : 'background:#f3f7f4;color:#1a2e1f;'

  if (identifierError.value) return base + 'border:1.5px solid #ef4444;'
  if (formFocused.value === 'identifier') {
    return base + (isDark.value
      ? 'border:1.5px solid #4caf72;box-shadow:0 0 0 3px rgba(76,175,114,0.12);'
      : 'border:1.5px solid #174f2a;box-shadow:0 0 0 3px rgba(23,79,42,0.08);')
  }
  return base + (isDark.value
    ? 'border:1.5px solid rgba(255,255,255,0.08);'
    : 'border:1.5px solid #e5e7eb;')
})

const passwordInputStyle = computed(() => {
  const base = isDark.value
    ? 'background:rgba(255,255,255,0.05);color:#f0f0f0;'
    : 'background:#f3f7f4;color:#1a2e1f;'

  if (passwordError.value) return base + 'border:1.5px solid #ef4444;'
  if (formFocused.value === 'password') {
    return base + (isDark.value
      ? 'border:1.5px solid #4caf72;box-shadow:0 0 0 3px rgba(76,175,114,0.12);'
      : 'border:1.5px solid #174f2a;box-shadow:0 0 0 3px rgba(23,79,42,0.08);')
  }
  return base + (isDark.value
    ? 'border:1.5px solid rgba(255,255,255,0.08);'
    : 'border:1.5px solid #e5e7eb;')
})

// ── Validation ─────────────────────────────────────────────────────────────
const validate = () => {
  identifierError.value = ''
  passwordError.value = ''
  submitError.value = ''
  let valid = true
  if (!identifier.value.trim()) {
    identifierError.value = 'Please enter your username'
    valid = false
  }
  if (!password.value || password.value.length < 6) {
    passwordError.value = 'Password must be at least 6 characters'
    valid = false
  }
  return valid
}

const handleSubmit = async () => {
  if (!validate()) return
  isLoading.value = true

  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: identifier.value.trim(),
        password: password.value,
      }),
    })

    if (!response.ok) {
      submitError.value = 'Invalid username or password.'
      return
    }

    const data = (await response.json()) as {
      id: string | number
      username: string
      firstName: string
      lastName: string
      email: string
      accessToken?: string
      token?: string
    }

    const token = data.accessToken ?? data.token
    if (!token) {
      submitError.value = 'Login succeeded but token was missing.'
      return
    }

    setAuthUser({
      id: data.id,
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      token,
    })

    router.push('/')
  } catch (error) {
    console.error(error)
    submitError.value = 'Login failed. Please check your connection and try again.'
  } finally {
    isLoading.value = false
  }
}

const goBack = () => router.back()
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center transition-colors duration-500 px-4 py-8"
    :style="isDark ? 'background-color:#0e1610;' : 'background-color:#f0f4f1;'"
  >

    <!-- Card -->
    <div
      class="relative w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl flex min-h-[520px] card-enter"
      :style="isDark
        ? 'background:rgba(18,26,20,0.95);border:1px solid rgba(255,255,255,0.07);box-shadow:0 32px 80px rgba(0,0,0,0.55);'
        : 'background:#ffffff;box-shadow:0 32px 80px rgba(23,79,42,0.12);'"
    >

      <!-- ── LEFT: Hero image panel ── -->
      <div class="relative hidden md:block w-5/12 overflow-hidden">
        <img
          :src="loginImage"
          alt="Raven's Garden plants"
          class="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div
          class="absolute inset-0"
          :style="isDark
            ? 'background:linear-gradient(to right,rgba(18,26,20,0.12) 0%,rgba(18,26,20,0.45) 100%);'
            : 'background:linear-gradient(to right,rgba(23,79,42,0.04) 0%,rgba(255,255,255,0.18) 100%);'"
        />
        <div class="absolute bottom-6 left-6 right-6">
          <div
            class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
            :style="isDark
              ? 'background:rgba(18,26,20,0.7);backdrop-filter:blur(10px);border:1px solid rgba(76,175,114,0.2);'
              : 'background:rgba(255,255,255,0.72);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.9);'"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-[#4caf72] animate-pulse" />
            <span
              class="text-xs font-semibold tracking-widest uppercase"
              :class="isDark ? 'text-[#4caf72]' : 'text-[#174f2a]'"
            >Raven's Garden</span>
          </div>
        </div>
      </div>

      <!-- ── RIGHT: Form panel ── -->
      <div class="flex-1 flex flex-col px-8 sm:px-12 py-10">

        <!-- Logo + back -->
        <div class="flex items-center justify-between mb-10">
          <img
            :src="isDark ? logoDark : logo"
            alt="Raven's Garden"
            class="h-10 w-auto object-contain"
          />
          <button
            class="flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
            :style="isDark
              ? 'background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.5);'
              : 'background:rgba(23,79,42,0.07);border:1px solid rgba(23,79,42,0.12);color:#174f2a;'"
            aria-label="Go back"
            @click="goBack"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        <!-- Heading -->
        <div class="mb-8">
          <h1
            class="text-3xl sm:text-[2rem] font-bold leading-tight mb-2"
            style="font-family:'Montserrat',sans-serif;letter-spacing:-0.02em;"
            :style="isDark ? 'color:#f0f0f0;' : 'color:#174f2a;'"
          >
            Login to Raven's<br />Garden account
          </h1>
          <p class="text-sm" :style="isDark ? 'color:#6b7280;' : 'color:#9ca3af;'">
            One account for all Garden products
          </p>
        </div>

        <!-- Form -->
        <form class="flex flex-col gap-5 flex-1" @submit.prevent="handleSubmit">

          <!-- Username -->
          <div class="flex flex-col gap-1.5">
            <label
              for="identifier"
              class="text-xs font-semibold tracking-wide"
              :style="isDark ? 'color:#9ca3af;' : 'color:#374151;'"
            >Username</label>
            <input
              id="identifier"
              v-model="identifier"
              type="text"
              autocomplete="username"
              placeholder="e.g. emilys"
              class="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
              :style="identifierInputStyle"
              @focus="formFocused = 'identifier'; identifierError = ''"
              @blur="formFocused = null"
            />
            <p v-if="identifierError" class="text-xs text-red-400 flex items-center gap-1">
              <svg class="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
              {{ identifierError }}
            </p>
          </div>

          <!-- Password -->
          <div class="flex flex-col gap-1.5">
            <label
              for="password"
              class="text-xs font-semibold tracking-wide"
              :style="isDark ? 'color:#9ca3af;' : 'color:#374151;'"
            >Password</label>
            <div class="relative">
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="current-password"
                placeholder="••••••••"
                class="w-full px-4 py-3 pr-11 rounded-xl text-sm outline-none transition-all duration-200"
                :style="passwordInputStyle"
                @focus="formFocused = 'password'; passwordError = ''"
                @blur="formFocused = null"
              />
              <button
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-100 transition-opacity duration-150"
                :style="isDark ? 'color:rgba(255,255,255,0.4);' : 'color:#9ca3af;'"
                tabindex="-1"
                @click="showPassword = !showPassword"
              >
                <svg v-if="!showPassword" class="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else class="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>
            <p v-if="passwordError" class="text-xs text-red-400 flex items-center gap-1">
              <svg class="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
              {{ passwordError }}
            </p>
            <div class="flex justify-end mt-0.5">
              <button
                type="button"
                class="text-xs font-medium hover:underline transition-colors duration-150"
                :class="isDark ? 'text-[#4caf72]' : 'text-[#174f2a]'"
              >
                Forgot your password?
              </button>
            </div>
          </div>

          <p v-if="submitError" class="text-xs text-red-400">
            {{ submitError }}
          </p>

          <!-- Submit -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full py-3.5 rounded-xl text-white text-sm font-semibold tracking-wide transition-all duration-300 hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 mt-1 disabled:opacity-70 disabled:cursor-not-allowed"
            :class="isDark ? 'bg-[#1e6334] hover:bg-[#25753e]' : 'bg-[#174f2a] hover:bg-[#1e6334]'"
            :style="isDark
              ? 'box-shadow:0 4px 20px rgba(23,79,42,0.35);'
              : 'box-shadow:0 4px 20px rgba(23,79,42,0.22);'"
          >
            <svg v-if="isLoading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span>{{ isLoading ? 'Signing in…' : 'Submit' }}</span>
          </button>

          <!-- Divider -->
          <div class="flex items-center gap-3 my-1">
            <div class="flex-1 h-px" :style="isDark ? 'background:rgba(255,255,255,0.07);' : 'background:#e5e7eb;'" />
            <span class="text-xs" :style="isDark ? 'color:#4b5563;' : 'color:#d1d5db;'">or</span>
            <div class="flex-1 h-px" :style="isDark ? 'background:rgba(255,255,255,0.07);' : 'background:#e5e7eb;'" />
          </div>

          <!-- Register link -->
          <p class="text-center text-xs" :style="isDark ? 'color:#6b7280;' : 'color:#9ca3af;'">
            Don't have an account?
            <router-link
              to="/register"
              class="font-semibold ml-1 hover:underline transition-colors duration-150"
              :class="isDark ? 'text-[#4caf72]' : 'text-[#174f2a]'"
            >Create account.</router-link>
          </p>

        </form>
      </div>

    </div>
  </div>
</template>

<style scoped>
.card-enter {
  animation: cardFadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes cardFadeUp {
  from {
    opacity: 0;
    transform: translateY(24px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

input::placeholder {
  color: #9ca3af;
}

input:-webkit-autofill,
input:-webkit-autofill:focus {
  transition: background-color 6000s ease-in-out 0s;
  -webkit-text-fill-color: inherit;
}
</style>
