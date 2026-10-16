import orangeJuice from '../assets/orange-juice-product.webp'
import pineappleJuice from '../assets/pineapple-juice-product.webp'
import papayaJuice from '../assets/papaya-juice-product.webp'
import blueFruit from '../assets/Blue-Fruit-Left-Hero-Section.webp'
import avocado from '../assets/beat-summer-right-fruit.webp'
import pineapple from '../assets/pineapple-fav-section.webp'
import papaya from '../assets/Deliciously-Splatter-Fruit.webp'
import orange from '../assets/footer-fruit-bottom-right.webp'
import trio from '../assets/try-some-new-fruit.webp'

export const CATEGORIES = [
  { id: 'all', label: 'Everything' },
  { id: 'juice', label: 'Fresh juice' },
  { id: 'smoothie', label: 'Smoothies' },
  { id: 'shot', label: 'Shots & boxes' },
]

// prices are in cents to avoid floating point problems
export const PRODUCTS = [
  {
    id: 'orange-sunrise',
    name: 'Orange Sunrise',
    category: 'juice',
    price: 320,
    size: '350 ml',
    calories: 140,
    ingredients: ['Orange', 'Carrot', 'Ginger'],
    description: 'Fresh orange juice with carrot and a bit of ginger.',
    image: orangeJuice,
    tint: 'orange',
    tags: ['Bestseller'],
  },
  {
    id: 'pineapple-mint',
    name: 'Pineapple Mint',
    category: 'juice',
    price: 340,
    size: '350 ml',
    calories: 155,
    ingredients: ['Pineapple', 'Mint', 'Lime'],
    description: 'Pineapple juice with fresh mint and lime.',
    image: pineappleJuice,
    tint: 'yellow',
    tags: ['Vegan'],
  },
  {
    id: 'papaya-glow',
    name: 'Papaya Glow',
    category: 'juice',
    price: 360,
    size: '350 ml',
    calories: 130,
    ingredients: ['Papaya', 'Lime', 'Honey'],
    description: 'Papaya juice with lime and honey.',
    image: papayaJuice,
    tint: 'orange',
    tags: [],
  },
  {
    id: 'blueberry-cooler',
    name: 'Blueberry Cooler',
    category: 'juice',
    price: 380,
    size: '350 ml',
    calories: 120,
    ingredients: ['Blueberry', 'Green apple', 'Lemon'],
    description: 'Blueberry and green apple juice served over ice.',
    image: blueFruit,
    tint: 'teal',
    tags: ['New'],
  },
  {
    id: 'avocado-cream',
    name: 'Avocado Cream',
    category: 'smoothie',
    price: 490,
    size: '450 ml',
    calories: 310,
    ingredients: ['Avocado', 'Banana', 'Oat milk', 'Dates'],
    description: 'Thick and creamy avocado smoothie sweetened with dates.',
    image: avocado,
    tint: 'teal',
    tags: ['Bestseller', 'Vegan'],
  },
  {
    id: 'pina-colada',
    name: 'Piña Colada',
    category: 'smoothie',
    price: 450,
    size: '450 ml',
    calories: 280,
    ingredients: ['Pineapple', 'Coconut yoghurt', 'Mango'],
    description: 'Pineapple, mango and coconut yoghurt smoothie.',
    image: pineapple,
    tint: 'yellow',
    tags: [],
  },
  {
    id: 'papaya-banana',
    name: 'Papaya Banana',
    category: 'smoothie',
    price: 450,
    size: '450 ml',
    calories: 260,
    ingredients: ['Papaya', 'Banana', 'Almond milk'],
    description: 'Papaya and banana smoothie made with almond milk.',
    image: papaya,
    tint: 'orange',
    tags: ['Vegan'],
  },
  {
    id: 'ginger-orange-shot',
    name: 'Ginger Orange Shot',
    category: 'shot',
    price: 180,
    size: '60 ml',
    calories: 25,
    ingredients: ['Ginger', 'Orange', 'Turmeric'],
    description: 'A small shot of ginger, orange and turmeric.',
    image: orange,
    tint: 'orange',
    tags: [],
  },
  {
    id: 'trio-tasting-box',
    name: 'Trio Tasting Box',
    category: 'shot',
    price: 890,
    size: '3 × 250 ml',
    calories: 390,
    ingredients: ['Orange Sunrise', 'Blueberry Cooler', 'Papaya Glow'],
    description: 'Three of our juices in smaller bottles.',
    image: trio,
    tint: 'teal',
    tags: [],
  },
]

export const FEATURED_IDS = ['orange-sunrise', 'avocado-cream', 'pineapple-mint']

export const getProduct = (id) => PRODUCTS.find((p) => p.id === id)

// saved orders only keep the product id, so images always come from the current menu
export const productImage = (id) => getProduct(id)?.image ?? blueFruit
