<script setup lang="ts">
interface CategoryItem {
  id: string
  label: string
}

interface Props {
  categories: CategoryItem[]
  activeCategory: string
  isDark?: boolean
}

withDefaults(defineProps<Props>(), {
  isDark: false,
})

const emit = defineEmits<{
  (e: 'update:activeCategory', value: string): void
}>()
</script>

<template>
  <div class="flex items-center gap-2 overflow-x-auto scrollbar-hide">
    <button
      v-for="category in categories"
      :key="category.id"
      class="shrink-0 px-4 py-2 rounded-2xl text-sm font-semibold whitespace-nowrap transition-all duration-200 hover:-translate-y-0.5"
      :style="activeCategory === category.id
        ? (isDark
            ? 'background:#174f2a;color:#4caf72;border:1px solid rgba(76,175,114,0.3);'
            : 'background:#174f2a;color:#ffffff;border:1px solid #174f2a;')
        : (isDark
            ? 'background:rgba(255,255,255,0.05);color:#9ca3af;border:1px solid rgba(255,255,255,0.08);'
            : 'background:rgba(255,255,255,0.75);color:#6b7280;border:1px solid rgba(23,79,42,0.1);')"
      @click="emit('update:activeCategory', category.id)"
    >
      {{ category.label }}
    </button>
  </div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
