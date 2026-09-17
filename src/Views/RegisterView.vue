<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import loginImage from '../assets/Login-image.avif'
import logo from '../assets/logo.png'
import logoDark from '../assets/logo-dark.png'

const router = useRouter()

const isDark = ref(document.documentElement.classList.contains('dark'))
const observer = new MutationObserver(() => {
  isDark.value = document.documentElement.classList.contains('dark')
})
onMounted(() => observer.observe(document.documentElement, { attributeFilter: ['class'] }))
onUnmounted(() => observer.disconnect())

const firstName = ref('')
const lastName = ref('')
const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const isLoading = ref(false)
const formFocused = ref<string | null>(null)
const submitError = ref('')

const errors = ref({
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const fieldStyle = (field: keyof typeof errors.value) => {
  const base = isDark.value
    ? 'background:rgba(255,255,255,0.05);color:#f0f0f0;'
    : 'background:#f3f7f4;color:#1a2e1f;'

  if (errors.value[field]) return base + 'border:1.5px solid #ef4444;'
  if (formFocused.value === field) {
    return base + (isDark.value
      ? 'border:1.5px solid #4caf72;box-shadow:0 0 0 3px rgba(76,175,114,0.12);'
      : 'border:1.5px solid #174f2a;box-shadow:0 0 0 3px rgba(23,79,42,0.08);')
  }
  return base + (isDark.value
    ? 'border:1.5px solid rgba(255,255,255,0.08);'
    : 'border:1.5px solid #e5e7eb;')
}

const firstNameStyle = computed(() => fieldStyle('firstName'))
const lastNameStyle = computed(() => fieldStyle('lastName'))
const usernameStyle = computed(() => fieldStyle('username'))
const emailStyle = computed(() => fieldStyle('email'))
const passwordStyle = computed(() => fieldStyle('password'))
const confirmPasswordStyle = computed(() => fieldStyle('confirmPassword'))

const clearErrors = () => {
  errors.value = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  }
  submitError.value = ''
}

const validate = () => {
  clearErrors()
  let valid = true

  if (!firstName.value.trim()) {
    errors.value.firstName = 'Please enter your first name'
    valid = false
  }
  if (!lastName.value.trim()) {
    errors.value.lastName = 'Please enter your last name'
    valid = false
  }
  if (!username.value.trim()) {
    errors.value.username = 'Please choose a username'
    valid = false
  }
  if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    errors.value.email = 'Please enter a valid email address'
    valid = false
  }
  if (!password.value || password.value.length < 6) {
    errors.value.password = 'Password must be at least 6 characters'
    valid = false
  }
  if (password.value !== confirmPassword.value) {
    errors.value.confirmPassword = 'Passwords do not match'
    valid = false
  }

  return valid
}

const handleSubmit = async () => {
  if (!validate()) return
  isLoading.value = true

  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: firstName.value.trim(),
        lastName: lastName.value.trim(),
        username: username.value.trim(),
        email: email.value.trim(),
        password: password.value,
      }),
    })

    if (!response.ok) {
      const data = (await response.json()) as { message?: string }
      submitError.value = data.message ?? 'Could not create account. Please try different details.'
      return
    }

    router.push('/login')
  } catch (error) {
    console.error(error)
    submitError.value = 'Registration failed. Please check your connection and try again.'
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
    <div
      class="relative w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl flex min-h-[520px] card-enter"
      :style="isDark
        ? 'background:rgba(18,26,20,0.95);border:1px solid rgba(255,255,255,0.07);box-shadow:0 32px 80px rgba(0,0,0,0.55);'
        : 'background:#ffffff;box-shadow:0 32px 80px rgba(23,79,42,0.12);'"
    >
      <!-- LEFT: Hero image panel -->
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

      <!-- RIGHT: Form panel -->
      <div class="flex-1 flex flex-col px-8 sm:px-12 py-10 overflow-y-auto max-h-[90vh]">
        <div class="flex items-center justify-between mb-8">
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

        <div class="mb-6">
          <h1
            class="text-3xl sm:text-[2rem] font-bold leading-tight mb-2"
            style="font-family:'Montserrat',sans-serif;letter-spacing:-0.02em;"
            :style="isDark ? 'color:#f0f0f0;' : 'color:#174f2a;'"
          >
            Create your Raven's<br />Garden account
          </h1>
          <p class="text-sm" :style="isDark ? 'color:#6b7280;' : 'color:#9ca3af;'">
            One account for all Garden products
          </p>
        </div>

        <form class="flex flex-col gap-4 flex-1" @submit.prevent="handleSubmit">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="flex flex-col gap-1.5">
              <label for="firstName" class="text-xs font-semibold tracking-wide" :style="isDark ? 'color:#9ca3af;' : 'color:#374151;'">First Name</label>
              <input
                id="firstName"
                v-model="firstName"
                type="text"
                autocomplete="given-name"
                placeholder="Julie"
                class="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                :style="firstNameStyle"
                @focus="formFocused = 'firstName'; errors.firstName = ''"
                @blur="formFocused = null"
              />
              <p v-if="errors.firstName" class="text-xs text-red-400">{{ errors.firstName }}</p>
            </div>

            <div class="flex flex-col gap-1.5">
              <label for="lastName" class="text-xs font-semibold tracking-wide" :style="isDark ? 'color:#9ca3af;' : 'color:#374151;'">Last Name</label>
              <input
                id="lastName"
                v-model="lastName"
                type="text"
                autocomplete="family-name"
                placeholder="Pines"
                class="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                :style="lastNameStyle"
                @focus="formFocused = 'lastName'; errors.lastName = ''"
                @blur="formFocused = null"
              />
              <p v-if="errors.lastName" class="text-xs text-red-400">{{ errors.lastName }}</p>
            </div>
          </div>

          <div class="flex flex-col gap-1.5">
            <label for="username" class="text-xs font-semibold tracking-wide" :style="isDark ? 'color:#9ca3af;' : 'color:#374151;'">Username</label>
            <input
              id="username"
              v-model="username"
              type="text"
              autocomplete="username"
              placeholder="e.g. juliepines"
              class="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
              :style="usernameStyle"
              @focus="formFocused = 'username'; errors.username = ''"
              @blur="formFocused = null"
            />
            <p v-if="errors.username" class="text-xs text-red-400">{{ errors.username }}</p>
          </div>

          <div class="flex flex-col gap-1.5">
            <label for="email" class="text-xs font-semibold tracking-wide" :style="isDark ? 'color:#9ca3af;' : 'color:#374151;'">Email</label>
            <input
              id="email"
              v-model="email"
              type="email"
              autocomplete="email"
              placeholder="you@example.com"
              class="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
              :style="emailStyle"
              @focus="formFocused = 'email'; errors.email = ''"
              @blur="formFocused = null"
            />
            <p v-if="errors.email" class="text-xs text-red-400">{{ errors.email }}</p>
          </div>

          <div class="flex flex-col gap-1.5">
            <label for="password" class="text-xs font-semibold tracking-wide" :style="isDark ? 'color:#9ca3af;' : 'color:#374151;'">Password</label>
            <div class="relative">
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="new-password"
                placeholder="••••••••"
                class="w-full px-4 py-3 pr-11 rounded-xl text-sm outline-none transition-all duration-200"
                :style="passwordStyle"
                @focus="formFocused = 'password'; errors.password = ''"
                @blur="formFocused = null"
              />
              <button
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 transition-opacity duration-150"
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
            <p v-if="errors.password" class="text-xs text-red-400">{{ errors.password }}</p>
          </div>

          <div class="flex flex-col gap-1.5">
            <label for="confirmPassword" class="text-xs font-semibold tracking-wide" :style="isDark ? 'color:#9ca3af;' : 'color:#374151;'">Confirm Password</label>
            <div class="relative">
              <input
                id="confirmPassword"
                v-model="confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                autocomplete="new-password"
                placeholder="••••••••"
                class="w-full px-4 py-3 pr-11 rounded-xl text-sm outline-none transition-all duration-200"
                :style="confirmPasswordStyle"
                @focus="formFocused = 'confirmPassword'; errors.confirmPassword = ''"
                @blur="formFocused = null"
              />
              <button
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 transition-opacity duration-150"
                :style="isDark ? 'color:rgba(255,255,255,0.4);' : 'color:#9ca3af;'"
                tabindex="-1"
                @click="showConfirmPassword = !showConfirmPassword"
              >
                <svg v-if="!showConfirmPassword" class="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else class="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>
            <p v-if="errors.confirmPassword" class="text-xs text-red-400">{{ errors.confirmPassword }}</p>
          </div>

          <p v-if="submitError" class="text-xs text-red-400">
            {{ submitError }}
          </p>

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
            <span>{{ isLoading ? 'Creating account…' : 'Create account' }}</span>
          </button>

          <div class="flex items-center gap-3 my-1">
            <div class="flex-1 h-px" :style="isDark ? 'background:rgba(255,255,255,0.07);' : 'background:#e5e7eb;'" />
            <span class="text-xs" :style="isDark ? 'color:#4b5563;' : 'color:#d1d5db;'">or</span>
            <div class="flex-1 h-px" :style="isDark ? 'background:rgba(255,255,255,0.07);' : 'background:#e5e7eb;'" />
          </div>

          <p class="text-center text-xs pb-1" :style="isDark ? 'color:#6b7280;' : 'color:#9ca3af;'">
            Already have an account?
            <router-link
              to="/login"
              class="font-semibold ml-1 hover:underline transition-colors duration-150"
              :class="isDark ? 'text-[#4caf72]' : 'text-[#174f2a]'"
            >Log in here.</router-link>
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
