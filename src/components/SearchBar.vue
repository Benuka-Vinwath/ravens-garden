<script setup lang="ts">
interface Props {
  modelValue: string
  isDark?: boolean
}

withDefaults(defineProps<Props>(), {
  isDark: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <div class="relative w-full">
    <svg
      class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
      :class="isDark ? 'text-gray-500' : 'text-gray-400'"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z" />
    </svg>

    <input
      :value="modelValue"
      type="text"
      placeholder="Search plants & tools..."
      class="w-full pl-11 pr-10 py-3 rounded-2xl text-sm outline-none transition-all duration-200"
      :style="isDark
        ? 'background:rgba(255,255,255,0.06);color:#f0f0f0;border:1px solid rgba(255,255,255,0.1);'
        : 'background:rgba(255,255,255,0.8);color:#1a2e1f;border:1px solid rgba(23,79,42,0.12);'"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />

    <button
      v-if="modelValue"
      class="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center text-xs transition-colors"
      :style="isDark
        ? 'background:rgba(255,255,255,0.08);color:#9ca3af;'
        : 'background:rgba(23,79,42,0.08);color:#174f2a;'"
      @click="emit('update:modelValue', '')"
    >
      x
    </button>
  </div>
</template>
