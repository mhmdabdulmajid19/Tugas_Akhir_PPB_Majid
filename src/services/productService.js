import { supabase } from '../config/api';

/**
 * Get all products with optional filters
 * @param {Object} params Query parameters
 * @returns {Promise}
 */
export const getProducts = async (params = {}) => {
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

    // Filter by category using ID directly
    if (params.category_id) {
      query = query.eq('category_id', params.category_id);
    }

    // Filter by category using SLUG
    if (params.category_slug) {
      const { data: categoryData } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', params.category_slug)
        .single();
      
      if (categoryData) {
        query = query.eq('category_id', categoryData.id);
      }
    }

    // Filter by featured
    if (params.is_featured) {
      query = query.eq('is_featured', true);
    }

    // Search by name
    if (params.search) {
      query = query.ilike('name', `%${params.search}%`);
    }

    // Price range
    if (params.min_price) {
      query = query.gte('price', params.min_price);
    }
    if (params.max_price && params.max_price !== Infinity) {
      query = query.lte('price', params.max_price);
    }

    // Sorting
    if (params.sort) {
      switch (params.sort) {
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
    if (params.limit) {
      query = query.limit(params.limit);
    }
    if (params.offset) {
      query = query.range(params.offset, params.offset + (params.limit || 12) - 1);
    }

    const { data, error } = await query;

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching products:', error);
    return { data: null, error };
  }
};

/**
 * Get single product by ID
 * @param {string} id Product ID
 * @returns {Promise}
 */
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

/**
 * Create new product (admin only)
 * @param {Object} productData Product data
 * @returns {Promise}
 */
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

/**
 * Update product (admin only)
 * CRITICAL: Clean the updates object to remove any nested objects
 * @param {string} id Product ID
 * @param {Object} updates Product updates
 * @returns {Promise}
 */
export const updateProduct = async (id, updates) => {
  try {
    // CRITICAL: Remove nested objects that are NOT columns in products table
    // This is the key to fixing the "categories column not found" error
    const cleanUpdates = { ...updates };
    
    // Remove any nested objects that came from initial data
    delete cleanUpdates.categories; // Remove categories object
    delete cleanUpdates.id; // Remove id from updates
    delete cleanUpdates.created_at; // Don't update created_at
    
    // Ensure category_id is a valid UUID string
    if (cleanUpdates.category_id) {
      cleanUpdates.category_id = cleanUpdates.category_id.toString();
    }
    
    // Add updated_at timestamp
    cleanUpdates.updated_at = new Date().toISOString();

    console.log('Clean updates being sent:', cleanUpdates); // Debug log

    // Update the product
    const { data: updatedProduct, error: updateError } = await supabase
      .from('products')
      .update(cleanUpdates)
      .eq('id', id)
      .select()
      .single();

    if (updateError) {
      console.error('Update error:', updateError);
      throw updateError;
    }

    // Fetch complete product with categories
    const { data: completeProduct, error: fetchError } = await supabase
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

    if (fetchError) {
      console.error('Fetch error:', fetchError);
      throw fetchError;
    }

    return { data: completeProduct, error: null };
  } catch (error) {
    console.error('Error updating product:', error);
    return { data: null, error };
  }
};

/**
 * Delete product (admin only)
 * @param {string} id Product ID
 * @returns {Promise}
 */
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

/**
 * Get product count
 * @param {Object} filters Filters
 * @returns {Promise}
 */
export const getProductCount = async (filters = {}) => {
  try {
    let query = supabase
      .from('products')
      .select('id', { count: 'exact', head: true })
      .eq('is_available', true);

    if (filters.category_slug) {
      const { data: categoryData } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', params.category_slug)
        .single();
      
      if (categoryData) {
        query = query.eq('category_id', categoryData.id);
      }
    }

    const { count, error } = await query;

    if (error) throw error;
    return { count, error: null };
  } catch (error) {
    console.error('Error getting product count:', error);
    return { count: 0, error };
  }
};