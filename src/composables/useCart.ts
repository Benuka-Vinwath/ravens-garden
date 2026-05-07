import { computed, ref, watch } from 'vue'

export interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
  tag?: string
}

const STORAGE_KEY = 'ravens-garden-cart'
const cartItems = ref<CartItem[]>([])
let initialized = false

const loadCart = (): void => {
  if (initialized) return
  initialized = true

  if (typeof window === 'undefined') return
  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) return

  try {
    const parsed = JSON.parse(raw) as CartItem[]
    if (Array.isArray(parsed)) {
      cartItems.value = parsed
    }
  } catch {
    cartItems.value = []
  }
}

if (typeof window !== 'undefined') {
  loadCart()
  watch(
    cartItems,
    (items) => {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    },
    { deep: true },
  )
}

export const useCart = () => {
  loadCart()

  const itemCount = computed(() =>
    cartItems.value.reduce((count, item) => count + item.quantity, 0),
  )

  const subtotal = computed(() =>
    cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0),
  )

  const addToCart = (item: Omit<CartItem, 'quantity'>, quantity = 1): void => {
    const existing = cartItems.value.find((cartItem) => cartItem.id === item.id)
    if (existing) {
      existing.quantity += quantity
      return
    }
    cartItems.value.push({ ...item, quantity })
  }

  const updateQty = (id: number, delta: number): void => {
    const item = cartItems.value.find((cartItem) => cartItem.id === id)
    if (!item) return
    item.quantity = Math.max(1, item.quantity + delta)
  }

  const removeItem = (id: number): void => {
    cartItems.value = cartItems.value.filter((item) => item.id !== id)
  }

  return {
    cartItems,
    itemCount,
    subtotal,
    addToCart,
    updateQty,
    removeItem,
  }
}
