export type BlogPost = {
  id: string
  title: string
  excerpt: string
  category: 'tips' | 'guides' | 'seasonal'
  readTime: string
  author: string
  publishedOn: string
  content: string[]
}

export const blogPosts: BlogPost[] = [
  {
    id: 'watering-plants-right-way',
    title: 'How To Water Plants The Right Way',
    excerpt: 'Simple watering routines to keep indoor and outdoor plants healthy throughout the week.',
    category: 'tips',
    readTime: '5 min read',
    author: 'Raven Garden Team',
    publishedOn: 'May 2026',
    content: [
      'Watering is less about a fixed schedule and more about observing your plant and soil. Insert your finger about one inch into the topsoil. If it feels dry, water deeply until moisture reaches the roots.',
      'Most plants struggle more from overwatering than underwatering. Always use pots with drainage holes and remove excess water from trays after fifteen minutes.',
      'Morning is the best time to water because roots absorb moisture before midday heat. Reduce watering frequency in cooler or rainy weeks to avoid root rot.',
    ],
  },
  {
    id: 'repot-houseplants-guide',
    title: 'When And How To Repot Houseplants',
    excerpt: 'Learn the signs your plant has outgrown its pot and how to repot without stressing roots.',
    category: 'guides',
    readTime: '7 min read',
    author: 'Raven Garden Team',
    publishedOn: 'May 2026',
    content: [
      'Plants usually need repotting when roots circle tightly at the bottom, water drains too quickly, or growth becomes slower than usual. Spring is generally the safest season to repot.',
      'Choose a new container only one to two inches wider than the current pot. Going too large can hold too much moisture and increase disease risk.',
      'After repotting, keep the plant in bright indirect light for one week and avoid fertilizer for at least ten to fourteen days while roots recover.',
    ],
  },
  {
    id: 'seasonal-gardening-checklist',
    title: 'Seasonal Gardening Checklist For Beginners',
    excerpt: 'Follow a month-by-month routine to keep your garden productive in every weather cycle.',
    category: 'seasonal',
    readTime: '4 min read',
    author: 'Raven Garden Team',
    publishedOn: 'May 2026',
    content: [
      'At the start of each month, inspect leaves, prune weak growth, and clear dead material. This keeps pests lower and improves airflow around stems.',
      'Align fertilizer and watering routines with climate changes. Warmer months need consistent moisture checks, while cool months usually require less frequent watering.',
      'Track what performs best in each season in a simple notebook. Those notes help you choose varieties, placements, and schedules more confidently next cycle.',
    ],
  },
]
