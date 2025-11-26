// Format currency to IDR
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

// Format date to Indonesian format
export const formatDate = (date) => {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));
};

// Format datetime to Indonesian format
export const formatDateTime = (date) => {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
};

// Generate unique guest ID
export const generateGuestId = () => {
  return `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Get or create guest ID
export const getGuestId = () => {
  const STORAGE_KEY = 'almajid_guest_id';
  let guestId = localStorage.getItem(STORAGE_KEY);
  
  if (!guestId) {
    guestId = generateGuestId();
    localStorage.setItem(STORAGE_KEY, guestId);
  }
  
  return guestId;
};

// Truncate text with ellipsis
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Validate email format
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate phone number (Indonesian format)
export const isValidPhone = (phone) => {
  const phoneRegex = /^(\+62|62|0)[0-9]{9,12}$/;
  return phoneRegex.test(phone);
};

// Generate SKU
export const generateSKU = (category, name) => {
  const categoryCode = category.substring(0, 3).toUpperCase();
  const nameCode = name.substring(0, 3).toUpperCase();
  const timestamp = Date.now().toString().slice(-6);
  return `${categoryCode}-${nameCode}-${timestamp}`;
};

// Calculate average rating
export const calculateAverage = (ratings) => {
  if (!ratings || ratings.length === 0) return 0;
  const sum = ratings.reduce((acc, rating) => acc + rating, 0);
  return (sum / ratings.length).toFixed(1);
};

// Debounce function
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Image file validation
export const validateImageFile = (file) => {
  const MAX_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  
  if (!file) {
    return { valid: false, error: 'No file selected' };
  }
  
  if (!ALLOWED_TYPES.includes(file.type)) {
    return { valid: false, error: 'Invalid file type. Only JPG, PNG, and WEBP are allowed' };
  }
  
  if (file.size > MAX_SIZE) {
    return { valid: false, error: 'File size exceeds 5MB' };
  }
  
  return { valid: true };
};

// Get initials from name
export const getInitials = (name) => {
  if (!name) return '?';
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

// Check if user is admin
export const isAdmin = (user) => {
  return user?.user_metadata?.role === 'admin' || user?.email === 'admin@almajidbatik.com';
};

// Get user identifier (email or guest ID)
export const getUserIdentifier = (user) => {
  return user?.email || getGuestId();
};

// Slugify text for URLs
export const slugify = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

// Parse JSON safely
export const parseJSON = (jsonString, fallback = null) => {
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    return fallback;
  }
};

// Get color contrast (for text on colored backgrounds)
export const getContrastColor = (hexColor) => {
  const r = parseInt(hexColor.substr(1, 2), 16);
  const g = parseInt(hexColor.substr(3, 2), 16);
  const b = parseInt(hexColor.substr(5, 2), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? '#000000' : '#FFFFFF';
};