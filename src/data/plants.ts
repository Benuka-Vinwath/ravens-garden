import plant02 from '../assets/plants/plant-02.png'
import plant03 from '../assets/plants/plant-03.png'
import plant04 from '../assets/plants/plant-04.png'
import plant05 from '../assets/plants/plant-05.png'
import plant06 from '../assets/plants/plant-06.png'
import plant07 from '../assets/plants/plant-07.png'
import plant08 from '../assets/plants/plant-08.png'
import plant09 from '../assets/plants/plant-09.png'
import plant10 from '../assets/plants/plant-10.png'
import plant11 from '../assets/plants/plant-11.png'
import plant12 from '../assets/plants/plant-12.png'
import plant13 from '../assets/plants/plant-13.png'
import plant14 from '../assets/plants/plant-14.png'
export interface PlantProduct {
  id: number
  name: string
  price: number
  rating: number
  reviewCount: number
  stock: number
  category: string
  description: string
  image: string
}

export const plantCategories: { id: string; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'indoor', label: 'Indoor Plants' },
  { id: 'outdoor', label: 'Outdoor Plants' },
  { id: 'succulents', label: 'Succulents' },
  { id: 'herbs', label: 'Herbs & Edibles' },
  { id: 'flowering', label: 'Flowering Plants' },
]

export const plantProducts: PlantProduct[] = [
  {
    id: 1,
    name: 'ZZ Plant',
    price: 2500,
    rating: 4.8,
    reviewCount: 128,
    stock: 18,
    category: 'indoor',
    description: 'A hardy indoor plant that thrives in low light and needs very little water.',
    image: plant03,
  },
  {
    id: 2,
    name: 'Peace Lily',
    price: 2800,
    rating: 4.7,
    reviewCount: 96,
    stock: 24,
    category: 'indoor',
    description: 'Elegant white blooms and deep green leaves make it perfect for cozy interiors.',
    image: plant04,
  },
  {
    id: 3,
    name: 'Snake Plant',
    price: 2200,
    rating: 4.9,
    reviewCount: 174,
    stock: 30,
    category: 'indoor',
    description: 'Air-purifying and beginner friendly with upright architectural foliage.',
    image: plant02,
  },
  {
    id: 4,
    name: 'Areca Palm',
    price: 3400,
    rating: 4.6,
    reviewCount: 82,
    stock: 12,
    category: 'outdoor',
    description: 'A tropical palm that brings a lush resort feel to balconies and patios.',
    image: plant05,
  },
  {
    id: 5,
    name: 'Hibiscus',
    price: 1900,
    rating: 4.5,
    reviewCount: 63,
    stock: 27,
    category: 'outdoor',
    description: 'Vibrant flowering shrub that loves sunlight and adds color to your garden.',
    image: plant06,
  },
  {
    id: 6,
    name: 'Bougainvillea',
    price: 2300,
    rating: 4.7,
    reviewCount: 71,
    stock: 16,
    category: 'outdoor',
    description: 'Fast-growing climber with bright bracts for walls, trellises, and fences.',
    image: plant07,
  },
  {
    id: 7,
    name: 'Jade Plant',
    price: 1600,
    rating: 4.8,
    reviewCount: 112,
    stock: 35,
    category: 'succulents',
    description: 'Compact succulent with thick leaves, ideal for desks and sunny windows.',
    image: plant09,
  },
  {
    id: 8,
    name: 'Aloe Vera',
    price: 1450,
    rating: 4.9,
    reviewCount: 221,
    stock: 40,
    category: 'succulents',
    description: 'Low-maintenance medicinal succulent known for its soothing gel.',
    image: plant10,
  },
  {
    id: 9,
    name: 'Haworthia',
    price: 1300,
    rating: 4.6,
    reviewCount: 74,
    stock: 22,
    category: 'succulents',
    description: 'Small striped succulent that fits perfectly in minimalist decor themes.',
    image: plant11,
  },
  {
    id: 10,
    name: 'Holy Basil (Tulsi)',
    price: 900,
    rating: 4.8,
    reviewCount: 143,
    stock: 44,
    category: 'herbs',
    description: 'Sacred aromatic herb, great for home gardens and everyday wellness use.',
    image: plant12,
  },
  {
    id: 11,
    name: 'Mint',
    price: 750,
    rating: 4.7,
    reviewCount: 109,
    stock: 50,
    category: 'herbs',
    description: 'Refreshing edible herb that grows quickly in pots and kitchen gardens.',
    image: plant13,
  },
  {
    id: 12,
    name: 'Marigold',
    price: 850,
    rating: 4.5,
    reviewCount: 88,
    stock: 37,
    category: 'flowering',
    description: 'Bright seasonal flowering plant that keeps beds and borders lively.',
    image: plant14,
  },
  {
    id: 13,
    name: 'Topiary Plant',
    price: 1200,
    rating: 4.4,
    reviewCount: 65,
    stock: 37,
    category: 'outdoor',
    description: 'A topiary plant is a plant that is shaped like a tree or a shrub.',
    image: plant08,
  },
]
