import { useState } from 'react';
import { Filter, ChevronDown, ChevronUp, X } from 'lucide-react';
import { PRICE_RANGES, SORT_OPTIONS, SIZES, MATERIALS, PATTERNS } from '../../utils/constants';

const FilterPanel = ({ onFilterChange, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    size: false,
    material: false,
    pattern: false,
  });
  
  const [filters, setFilters] = useState({
    priceRange: null,
    sizes: [],
    materials: [],
    patterns: [],
  });

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  const handlePriceChange = (range) => {
    const newFilters = { ...filters, priceRange: range };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleMultiSelect = (category, value) => {
    const current = filters[category];
    const newValues = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    
    const newFilters = { ...filters, [category]: newValues };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const emptyFilters = {
      priceRange: null,
      sizes: [],
      materials: [],
      patterns: [],
    };
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  const activeFilterCount = 
    (filters.priceRange ? 1 : 0) +
    filters.sizes.length +
    filters.materials.length +
    filters.patterns.length;

  return (
    <div className="bg-white rounded-xl shadow-sm">
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden w-full flex items-center justify-between p-4 font-semibold"
      >
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5" />
          <span>Filter & Urutkan</span>
          {activeFilterCount > 0 && (
            <span className="bg-batik-brown text-white text-xs px-2 py-1 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>

      {/* Filter Content */}
      <div className={`p-4 space-y-6 ${isOpen ? 'block' : 'hidden'} lg:block`}>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b">
          <h3 className="font-bold text-lg flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Filter</span>
          </h3>
          {activeFilterCount > 0 && (
            <button
              onClick={clearFilters}
              className="text-sm text-red-500 hover:text-red-600 flex items-center space-x-1"
            >
              <X className="w-4 h-4" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Sort */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Urutkan
          </label>
          <select
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-batik-brown focus:ring-2 focus:ring-batik-brown/20"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div>
          <button
            onClick={() => toggleSection('price')}
            className="w-full flex items-center justify-between text-sm font-semibold text-gray-700 mb-2"
          >
            <span>Rentang Harga</span>
            {expandedSections.price ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {expandedSections.price && (
            <div className="space-y-2">
              {PRICE_RANGES.map((range, index) => (
                <label key={index} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="priceRange"
                    checked={filters.priceRange?.label === range.label}
                    onChange={() => handlePriceChange(range)}
                    className="w-4 h-4 text-batik-brown focus:ring-batik-brown"
                  />
                  <span className="text-sm text-gray-600">{range.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Sizes */}
        <div>
          <button
            onClick={() => toggleSection('size')}
            className="w-full flex items-center justify-between text-sm font-semibold text-gray-700 mb-2"
          >
            <span>Ukuran</span>
            {expandedSections.size ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {expandedSections.size && (
            <div className="flex flex-wrap gap-2">
              {SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => handleMultiSelect('sizes', size)}
                  className={`px-3 py-1 rounded-lg border-2 text-sm font-medium transition-all ${
                    filters.sizes.includes(size)
                      ? 'border-batik-brown bg-batik-brown text-white'
                      : 'border-gray-300 hover:border-batik-brown'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Materials */}
        <div>
          <button
            onClick={() => toggleSection('material')}
            className="w-full flex items-center justify-between text-sm font-semibold text-gray-700 mb-2"
          >
            <span>Material</span>
            {expandedSections.material ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {expandedSections.material && (
            <div className="space-y-2">
              {MATERIALS.map((material) => (
                <label key={material} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.materials.includes(material)}
                    onChange={() => handleMultiSelect('materials', material)}
                    className="w-4 h-4 text-batik-brown focus:ring-batik-brown rounded"
                  />
                  <span className="text-sm text-gray-600">{material}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Patterns */}
        <div>
          <button
            onClick={() => toggleSection('pattern')}
            className="w-full flex items-center justify-between text-sm font-semibold text-gray-700 mb-2"
          >
            <span>Motif Batik</span>
            {expandedSections.pattern ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {expandedSections.pattern && (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {PATTERNS.map((pattern) => (
                <label key={pattern} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.patterns.includes(pattern)}
                    onChange={() => handleMultiSelect('patterns', pattern)}
                    className="w-4 h-4 text-batik-brown focus:ring-batik-brown rounded"
                  />
                  <span className="text-sm text-gray-600">{pattern}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;