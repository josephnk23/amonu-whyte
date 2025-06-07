import React, { useState, useEffect, useRef } from 'react';
import { SearchIcon, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Mock product data - replace with your actual product data
const mockProducts = [
  { id: 1, name: "Classic T-Shirt", category: "Men", price: 29.99, image: "/api/placeholder/100/100" },
  { id: 2, name: "Denim Jacket", category: "Women", price: 89.99, image: "/api/placeholder/100/100" },
  { id: 3, name: "Sneakers", category: "Accessories", price: 129.99, image: "/api/placeholder/100/100" },
  { id: 4, name: "Summer Dress", category: "Women", price: 79.99, image: "/api/placeholder/100/100" },
  { id: 5, name: "Polo Shirt", category: "Men", price: 45.99, image: "/api/placeholder/100/100" },
  { id: 6, name: "Handbag", category: "Accessories", price: 199.99, image: "/api/placeholder/100/100" },
];

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof mockProducts>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Focus search input when search opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 300); // Wait for animation to complete
    }
  }, [isOpen]);

  // Handle search functionality
  useEffect(() => {
    if (searchQuery.trim()) {
      setIsSearching(true);
      
      // Simulate API delay
      const searchTimeout = setTimeout(() => {
        const filtered = mockProducts.filter(product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filtered);
        setIsSearching(false);
      }, 300);

      return () => clearTimeout(searchTimeout);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  }, [searchQuery]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const handleClose = () => {
    onClose();
    setSearchQuery("");
    setSearchResults([]);
    document.body.style.overflow = 'unset';
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      handleClose();
      navigate(`/search?search=${encodeURIComponent(searchQuery.trim())}`); // Changed from /products to /search
    }
  };

  const handleProductClick = (productId: number) => {
    handleClose();
    navigate(`/product/${productId}`);
  };

  const handlePopularSearchClick = (term: string) => {
    setSearchQuery(term);
  };

  const formatPrice = (price: number) => `${price.toFixed(2)} ₵`;

  // Set body overflow when overlay opens
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 bg-black bg-opacity-50 z-[60] transition-all duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleClose}
    >
      <div 
        className={`fixed inset-x-0 top-0 bg-white transition-all duration-300 ease-out ${
          isOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="border-b border-gray-200 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-['Outfit',Helvetica] font-medium text-2xl text-[#111111]">
                Search Products
              </h2>
              <button 
                onClick={handleClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </div>

            {/* Search Form */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="relative">
                <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products, categories..."
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-none font-['Outfit',Helvetica] text-lg focus:outline-none focus:border-black transition-colors"
                />
              </div>
            </form>

            {/* Popular Searches */}
            {!searchQuery && (
              <div className="mt-6">
                <p className="font-['Outfit',Helvetica] text-sm text-gray-600 mb-3">Popular searches:</p>
                <div className="flex flex-wrap gap-2">
                  {['T-Shirts', 'Denim', 'Sneakers', 'Dresses', 'Accessories'].map((term) => (
                    <button
                      key={term}
                      onClick={() => handlePopularSearchClick(term)}
                      className="px-3 py-1 border border-gray-300 rounded-none font-['Outfit',Helvetica] text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Search Results */}
        <div className="max-w-4xl mx-auto p-6 max-h-[60vh] overflow-y-auto">
          {isSearching && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
              <p className="font-['Outfit',Helvetica] text-gray-600 mt-2">Searching...</p>
            </div>
          )}

          {!isSearching && searchQuery && searchResults.length === 0 && (
            <div className="text-center py-8">
              <p className="font-['Outfit',Helvetica] text-gray-600 text-lg mb-2">
                No results found for "{searchQuery}"
              </p>
              <p className="font-['Outfit',Helvetica] text-gray-500 text-sm">
                Try different keywords or browse our categories
              </p>
            </div>
          )}

          {!isSearching && searchResults.length > 0 && (
            <div>
              <p className="font-['Outfit',Helvetica] text-gray-600 mb-4">
                {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{searchQuery}"
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product.id)}
                    className="flex items-center gap-4 p-4 border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <div className="w-16 h-16 bg-gray-100 overflow-hidden flex-shrink-0">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-['Outfit',Helvetica] font-medium text-[#111111] truncate">
                        {product.name}
                      </h3>
                      <p className="font-['Outfit',Helvetica] text-sm text-gray-600">
                        {product.category}
                      </p>
                      <p className="font-['Outfit',Helvetica] font-medium text-[#111111] mt-1">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* View All Results */}
              <div className="text-center mt-8">
                <button
                  onClick={() => {
                    handleClose();
                    navigate(`/search?search=${encodeURIComponent(searchQuery)}`); // Changed from /products to /search
                  }}
                  className="bg-black text-white px-8 py-3 rounded-none font-['Outfit',Helvetica] text-sm hover:bg-gray-800 transition-colors"
                >
                  VIEW ALL RESULTS
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};