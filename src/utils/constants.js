// App Information
export const APP_NAME = 'AlMajid Batik';
export const APP_TAGLINE = 'Koleksi Batik Berkualitas untuk Setiap Momen';

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest',
};

// Product Categories
export const CATEGORIES = {
  MENS: {
    id: 'mens-clothing',
    name: "Men's Clothing",
    slug: 'mens-clothing',
    icon: '👔',
  },
  WOMENS: {
    id: 'womens-clothing',
    name: "Women's Clothing",
    slug: 'womens-clothing',
    icon: '👗',
  },
};

// Product Sizes
export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

// Product Colors
export const COLORS = [
  { name: 'Coklat', hex: '#8B4513' },
  { name: 'Krem', hex: '#F5F5DC' },
  { name: 'Emas', hex: '#D4AF37' },
  { name: 'Hitam', hex: '#000000' },
  { name: 'Putih', hex: '#FFFFFF' },
  { name: 'Biru', hex: '#1E3A8A' },
  { name: 'Merah', hex: '#DC2626' },
  { name: 'Hijau', hex: '#166534' },
];

// Material Types
export const MATERIALS = [
  'Katun',
  'Sutra',
  'Rayon',
  'Katun Prima',
  'Katun Halus',
  'Dobby',
  'Satin',
];

// Batik Patterns
export const PATTERNS = [
  'Parang',
  'Kawung',
  'Megamendung',
  'Truntum',
  'Sekar Jagad',
  'Sogan',
  'Sido Mukti',
  'Sido Luhur',
  'Lereng',
  'Ceplok',
];

// Price Range for Filtering
export const PRICE_RANGES = [
  { label: 'Semua Harga', min: 0, max: Infinity },
  { label: 'Di bawah Rp 200.000', min: 0, max: 200000 },
  { label: 'Rp 200.000 - Rp 500.000', min: 200000, max: 500000 },
  { label: 'Rp 500.000 - Rp 1.000.000', min: 500000, max: 1000000 },
  { label: 'Di atas Rp 1.000.000', min: 1000000, max: Infinity },
];

// Sort Options
export const SORT_OPTIONS = [
  { label: 'Terbaru', value: 'newest' },
  { label: 'Harga: Rendah ke Tinggi', value: 'price_asc' },
  { label: 'Harga: Tinggi ke Rendah', value: 'price_desc' },
  { label: 'Nama: A-Z', value: 'name_asc' },
  { label: 'Rating Tertinggi', value: 'rating_desc' },
];

export const DEFAULT_ADMIN_EMAIL = 'admin@almajidbatik.com';