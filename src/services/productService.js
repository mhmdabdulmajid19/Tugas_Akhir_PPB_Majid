import { supabase } from '../config/api';

// Get all products with optional filters
export const getProducts = async (filters = {}) => {
  try {
    let query = supabase
      .from('products')
      .select(`
        *,
        categories (
          id,
          name,
          slug,
          icon
        )
      `)
      .eq('is_available', true);

    // Filter by category
    if (filters.category_id) {
      query = query.eq('category_id', filters.category_id);
    }

    // Filter by featured
    if (filters.is_featured) {
      query = query.eq('is_featured', true);
    }

    // Search by name
    if (filters.search) {
      query = query.ilike('name', `%${filters.search}%`);
    }

    // Price range
    if (filters.min_price) {
      query = query.gte('price', filters.min_price);
    }
    if (filters.max_price && filters.max_price !== Infinity) {
      query = query.lte('price', filters.max_price);
    }

    // Sorting
    if (filters.sort) {
      switch (filters.sort) {
        case 'price_asc':
          query = query.order('price', { ascending: true });
          break;
        case 'price_desc':
          query = query.order('price', { ascending: false });
          break;
        case 'name_asc':
          query = query.order('name', { ascending: true });
          break;
        case 'rating_desc':
          query = query.order('average_rating', { ascending: false });
          break;
        case 'newest':
        default:
          query = query.order('created_at', { ascending: false });
          break;
      }
    } else {
      query = query.order('created_at', { ascending: false });
    }

    // Pagination
    if (filters.limit) {
      query = query.limit(filters.limit);
    }
    if (filters.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 12) - 1);
    }

    const { data, error } = await query;

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching products:', error);
    return { data: null, error };
  }
};

// Get single product by ID
export const getProductById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories (
          id,
          name,
          slug,
          icon
        )
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching product:', error);
    return { data: null, error };
  }
};

// Create new product (admin only)
export const createProduct = async (productData) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .insert(productData)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating product:', error);
    return { data: null, error };
  }
};

// Update product (admin only)
export const updateProduct = async (id, updates) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating product:', error);
    return { data: null, error };
  }
};

// Delete product (admin only)
export const deleteProduct = async (id) => {
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error deleting product:', error);
    return { error };
  }
};

// Get product count
export const getProductCount = async (filters = {}) => {
  try {
    let query = supabase
      .from('products')
      .select('id', { count: 'exact', head: true })
      .eq('is_available', true);

    if (filters.category_id) {
      query = query.eq('category_id', filters.category_id);
    }

    const { count, error } = await query;

    if (error) throw error;
    return { count, error: null };
  } catch (error) {
    console.error('Error getting product count:', error);
    return { count: 0, error };
  }
};