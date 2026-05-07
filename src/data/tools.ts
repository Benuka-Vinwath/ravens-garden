import tool01 from '../assets/tools/tool-01.png'
import tool02 from '../assets/tools/tool-02.png'
import tool03 from '../assets/tools/tool-03.png'
import tool04 from '../assets/tools/tool-04.png'
import tool05 from '../assets/tools/tool-05.png'
import tool06 from '../assets/tools/tool-06.png'
import tool07 from '../assets/tools/tool-07.png'
import tool08 from '../assets/tools/tool-08.png'
import tool09 from '../assets/tools/tool-09.png'
import tool10 from '../assets/tools/tool-10.png'
import tool11 from '../assets/tools/tool-11.png'
import tool12 from '../assets/tools/tool-12.png'

export interface GardenTool {
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

export const toolCategories: { id: string; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'hand-tools', label: 'Hand Tools' },
  { id: 'watering', label: 'Watering & Irrigation' },
  { id: 'soil', label: 'Soil & Fertilizers' },
  { id: 'pots', label: 'Pots & Planters' },
  { id: 'care', label: 'Plant Care Accessories' },
]

export const gardenTools: GardenTool[] = [
  {
    id: 101,
    name: 'Stainless Pruning Shear',
    price: 1450,
    rating: 4.8,
    reviewCount: 94,
    stock: 19,
    category: 'hand-tools',
    description: 'Precision shears for clean cuts on stems, flowers, and small branches.',
    image: tool01,
  },
  {
    id: 102,
    name: 'Garden Hand Trowel',
    price: 780,
    rating: 4.7,
    reviewCount: 121,
    stock: 42,
    category: 'hand-tools',
    description: 'Strong carbon-steel trowel for digging, transplanting, and pot filling.',
    image: tool02,
  },
  {
    id: 103,
    name: '3-Piece Hand Tool Set',
    price: 1890,
    rating: 4.6,
    reviewCount: 76,
    stock: 26,
    category: 'hand-tools',
    description: 'Essential set with trowel, cultivator, and weeder for daily gardening.',
    image: tool03,
  },
  {
    id: 104,
    name: 'Adjustable Spray Nozzle',
    price: 920,
    rating: 4.7,
    reviewCount: 88,
    stock: 35,
    category: 'watering',
    description: 'Multi-pattern spray nozzle for gentle misting or focused watering.',
    image: tool04,
  },
  {
    id: 105,
    name: '2L Watering Can',
    price: 1150,
    rating: 4.8,
    reviewCount: 103,
    stock: 31,
    category: 'watering',
    description: 'Balanced watering can with long spout for indoor and balcony plants.',
    image: tool05,
  },
  {
    id: 106,
    name: 'Drip Irrigation Starter Kit',
    price: 3200,
    rating: 4.5,
    reviewCount: 49,
    stock: 14,
    category: 'watering',
    description: 'Easy setup kit for efficient water-saving irrigation in home gardens.',
    image: tool06,
  },
  {
    id: 107,
    name: 'Organic Potting Mix 10kg',
    price: 1650,
    rating: 4.9,
    reviewCount: 167,
    stock: 28,
    category: 'soil',
    description: 'Nutrient-rich ready mix for healthy roots and strong plant growth.',
    image: tool07,
  },
  {
    id: 108,
    name: 'Vermicompost 5kg',
    price: 980,
    rating: 4.8,
    reviewCount: 132,
    stock: 47,
    category: 'soil',
    description: 'Natural compost that improves soil structure and supports flowering.',
    image: tool08,
  },
  {
    id: 109,
    name: 'Liquid Plant Food',
    price: 690,
    rating: 4.6,
    reviewCount: 84,
    stock: 39,
    category: 'soil',
    description: 'Balanced NPK liquid formula for quick nutrient boost and greener leaves.',
    image: tool09,
  },
  {
    id: 110,
    name: 'Ceramic Planter Set',
    price: 2550,
    rating: 4.7,
    reviewCount: 59,
    stock: 18,
    category: 'pots',
    description: 'Modern planter set with drainage holes for stylish indoor displays.',
    image: tool10,
  },
  {
    id: 111,
    name: 'Self-Watering Pot',
    price: 1350,
    rating: 4.8,
    reviewCount: 97,
    stock: 23,
    category: 'pots',
    description: 'Smart pot design with water reservoir for consistent moisture control.',
    image: tool11,
  },
  {
    id: 112,
    name: 'Moisture Meter',
    price: 890,
    rating: 4.5,
    reviewCount: 70,
    stock: 33,
    category: 'care',
    description: 'Instant soil moisture reading tool to prevent overwatering your plants.',
    image: tool12,
  },
]
