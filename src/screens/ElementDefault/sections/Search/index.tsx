import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { SearchIcon, Filter, Grid3X3, Grid2X2, LayoutGrid, List, X } from 'lucide-react';
import { useCart } from '../../../../contexts/CartContext';
import { Badge } from '../../../../components/ui/badge';
import { Button } from '../../../../components/ui/button';
import { Card, CardContent } from '../../../../components/ui/card';
import { Input } from '../../../../components/ui/input';
import { Checkbox } from '../../../../components/ui/checkbox';
import { Label } from '../../../../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '../../../../components/ui/breadcrumb';
import { BackgroundByAnima } from '../Header2';
import { FooterByAnima } from '../FooterByAnima';
import { FooterWrapperByAnima } from '../FooterWrapperByAnima/FooterWrapperByAnima';
import { QuickView } from "../../../../components/QuickView/QuickView";

// Mock product data - matching the ProductListing structure
const mockProducts = [
  {
    id: 1,
    name: "SUNGLASSES",
    description: "Lorem ipsum dolor sit amet",
    price: "120.00 ₵",
    originalPrice: 150,
    currentPrice: 120,
    image: "/j.png",
    category: "accessories",
    color: "black",
    size: "one-size",
    discount: 20,
    brand: "StyleCo",
    rating: 4.5,
    reviews: 123,
    inStock: true,
  },
  {
    id: 2,
    name: "PINK HANDBAG",
    description: "Lorem ipsum dolor sit amet",
    price: "90.00₵",
    originalPrice: 105,
    currentPrice: 90,
    image: "/g.png",
    colors: ["#17181d", "#106151", "#371f3c", "#c0a3a4", "white"],
    selectedColor: 3,
    category: "bags",
    color: "pink",
    size: "medium",
    discount: 14,
    brand: "LuxeBags",
    rating: 4.6,
    reviews: 89,
    inStock: true,
  },
  {
    id: 3,
    name: "FANCY HAT",
    description: "Lorem ipsum dolor sit amet",
    price: "170.00₵",
    originalPrice: 210,
    currentPrice: 170,
    image: "/d.png",
    category: "accessories",
    color: "beige",
    size: "large",
    discount: 19,
    brand: "HatCo",
    rating: 4.3,
    reviews: 67,
    inStock: true,
  },
  {
    id: 4,
    name: "RED BAG",
    description: "Lorem ipsum dolor sit amet",
    price: "170.00₵",
    originalPrice: 170,
    currentPrice: 170,
    image: "/f.png",
    badge: "New",
    category: "bags",
    color: "red",
    size: "small",
    brand: "BagCo",
    rating: 4.8,
    reviews: 34,
    inStock: false,
  },
  {
    id: 5,
    name: "GOLDEN WATCH",
    description: "Lorem ipsum dolor sit amet",
    price: "200.00₵",
    originalPrice: 250,
    currentPrice: 200,
    image: "/p.png",
    category: "jewelry",
    color: "gold",
    size: "one-size",
    discount: 20,
    brand: "TimeKeeper",
    rating: 4.7,
    reviews: 156,
    inStock: true,
  },
  {
    id: 6,
    name: "GREEN EARRINGS",
    description: "Lorem ipsum dolor sit amet",
    price: "200.00₵",
    originalPrice: 200,
    currentPrice: 200,
    image: "/h.png",
    category: "jewelry",
    color: "green",
    size: "one-size",
    brand: "JewelCraft",
    rating: 4.4,
    reviews: 78,
    inStock: true,
  },
];

// Filter categories matching ProductListing
const filterOptions = {
  category: [
    { id: "accessories", name: "Accessories", count: 3 },
    { id: "bags", name: "Bags", count: 2 },
    { id: "jewelry", name: "Jewelry", count: 2 },
  ],
  color: [
    { id: "black", name: "Black", count: 1 },
    { id: "red", name: "Red", count: 1 },
    { id: "pink", name: "Pink", count: 1 },
    { id: "gold", name: "Gold", count: 1 },
    { id: "green", name: "Green", count: 1 },
    { id: "beige", name: "Beige", count: 1 },
  ],
  size: [
    { id: "small", name: "Small", count: 1 },
    { id: "medium", name: "Medium", count: 1 },
    { id: "large", name: "Large", count: 1 },
    { id: "one-size", name: "One Size", count: 3 },
  ],
  brand: [
    { id: "styleco", name: "StyleCo", count: 1 },
    { id: "luxebags", name: "LuxeBags", count: 1 },
    { id: "hatco", name: "HatCo", count: 1 },
    { id: "bagco", name: "BagCo", count: 1 },
    { id: "timekeeper", name: "TimeKeeper", count: 1 },
    { id: "jewelcraft", name: "JewelCraft", count: 1 },
  ],
};

// Helper function to format price
const formatPrice = (price: number) => {
  return `${price.toFixed(2)} ₵`;
};

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  
  // Price range states
  const minPrice = 0;
  const maxPrice = 300;
  const [minValue, setMinValue] = useState(minPrice);
  const [maxValue, setMaxValue] = useState(maxPrice);
  
  // Filter states
  const [expandedFilters, setExpandedFilters] = useState<string[]>([]);
  const [selectedFilters, setSelectedFilters] = useState({
    category: [] as string[],
    color: [] as string[],
    size: [] as string[],
    brand: [] as string[],
  });
  
  // View and sort states
  const [sortBy, setSortBy] = useState("relevance");
  const [viewMode, setViewMode] = useState("grid3");
  const [showFilters, setShowFilters] = useState(false);

  const rangeRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();

  // Apply filters and search
  useEffect(() => {
    let filtered = mockProducts;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Price range filter
    filtered = filtered.filter(product => 
      product.originalPrice >= minValue && product.originalPrice <= maxValue
    );

    // Category filter
    if (selectedFilters.category.length > 0) {
      filtered = filtered.filter(product => selectedFilters.category.includes(product.category));
    }

    // Brand filter
    if (selectedFilters.brand.length > 0) {
      filtered = filtered.filter(product => selectedFilters.brand.includes(product.brand.toLowerCase()));
    }

    // Color filter
    if (selectedFilters.color.length > 0) {
      filtered = filtered.filter(product => selectedFilters.color.includes(product.color));
    }

    // Size filter
    if (selectedFilters.size.length > 0) {
      filtered = filtered.filter(product => selectedFilters.size.includes(product.size));
    }

    setFilteredProducts(filtered);
  }, [searchQuery, selectedFilters, minValue, maxValue]);

  // Sort products function (matching ProductListing)
  const getSortedProducts = (products: any[]) => {
    const sorted = [...products];
    
    switch (sortBy) {
      case "price-low":
        return sorted.sort((a, b) => a.originalPrice - b.originalPrice);
      case "price-high":
        return sorted.sort((a, b) => b.originalPrice - a.originalPrice);
      case "name-asc":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case "newest":
        return sorted.sort((a, b) => b.id - a.id);
      case "rating":
        return sorted.sort((a, b) => b.rating - a.rating);
      default:
        return sorted; // relevance - keep original order
    }
  };

  const sortedAndFilteredProducts = getSortedProducts(filteredProducts);

  // Price range handlers
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxValue - 10);
    setMinValue(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minValue + 10);
    setMaxValue(value);
  };

  const getPercent = (value: number) => ((value - minPrice) / (maxPrice - minPrice)) * 100;

  // Filter handlers
  const toggleFilter = (filterId: string) => {
    setExpandedFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

  const handleFilterChange = (filterType: keyof typeof selectedFilters, value: string, checked: boolean) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: checked 
        ? [...prev[filterType], value]
        : prev[filterType].filter(item => item !== value)
    }));
  };

  const clearFilters = () => {
    setSelectedFilters({
      category: [],
      color: [],
      size: [],
      brand: [],
    });
    setMinValue(minPrice);
    setMaxValue(maxPrice);
  };

  const hasActiveFilters = Object.values(selectedFilters).some(arr => arr.length > 0) || minValue !== minPrice || maxValue !== maxPrice;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ search: searchQuery });
  };

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  const handleSelectOptions = (e: React.MouseEvent, productId: number) => {
    e.stopPropagation();
    navigate(`/product/${productId}`);
  };

  // Sort options
  const sortOptions = [
    { value: "relevance", label: "Most Relevant" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "name-asc", label: "Name: A to Z" },
    { value: "name-desc", label: "Name: Z to A" },
    { value: "newest", label: "Newest" },
    { value: "rating", label: "Highest Rated" },
  ];

  // View mode options
  const viewModes = [
    { value: "list", icon: List, label: "List View" },
    { value: "grid2", icon: Grid2X2, label: "2 Columns" },
    { value: "grid3", icon: Grid3X3, label: "3 Columns" },
    { value: "grid4", icon: LayoutGrid, label: "4 Columns" },
  ];

  // Get grid classes based on view mode
  const getGridClasses = () => {
    switch (viewMode) {
      case "list":
        return "grid grid-cols-1 gap-4";
      case "grid2":
        return "grid grid-cols-1 md:grid-cols-2 gap-8";
      case "grid3":
        return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8";
      case "grid4":
        return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6";
      default:
        return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8";
    }
  };

  const getCardClasses = () => {
    if (viewMode === "list") {
      return "rounded-none border-none shadow-none group cursor-pointer flex flex-row";
    }
    return "rounded-none border-none shadow-none group cursor-pointer";
  };

  const getImageClasses = () => {
    if (viewMode === "list") {
      return "w-48 h-48 bg-cover bg-center";
    }
    return "w-full h-[447.15px] bg-cover bg-center transition-transform duration-300 group-hover:scale-105";
  };

  return (
    <>
      <BackgroundByAnima />
      
      {/* Breadcrumb */}
      <Breadcrumb className="w-full text-black py-4 border-b-[1px] font-elfrida-qodeinteractive-com-semantic-label-upper font">
        <div className="w-full mt-20 container mx-auto px-4 py-0">
          <BreadcrumbList className="flex items-center gap-2">
            <BreadcrumbItem>
              <BreadcrumbLink className='text-base' href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <span className='text-base'>Search Results</span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </div>    
      </Breadcrumb>

      <section className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        
        {/* Sidebar with filters - Same as ProductListing */}
        <aside className="w-full md:w-80">
          
          {/* Search Bar */}
          <div className="mb-8">
            <h3 className="font-['Outfit',Helvetica] text-xl tracking-[0.50px] leading-7 text-[#18191a] mb-4">
              SEARCH
            </h3>
            <form onSubmit={handleSearchSubmit} className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="pl-10 rounded-none border-gray-300 font-['Outfit',Helvetica]"
              />
            </form>
          </div>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="mb-8">
              <h3 className="font-['Outfit',Helvetica] text-xl tracking-[0.50px] leading-7 text-[#18191a] mb-4">
                ACTIVE FILTERS
              </h3>
              <div className="flex flex-wrap gap-2">
                {Object.entries(selectedFilters).map(([filterId, values]) => 
                  values.map(value => (
                    <span key={`${filterId}-${value}`} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-none text-sm">
                      {value} 
                      <button 
                        className="ml-2 text-red-500" 
                        onClick={() => handleFilterChange(filterId as keyof typeof selectedFilters, value, false)}
                      >
                        &times;
                      </button>
                    </span>
                  ))
                )}
                {(minValue !== minPrice || maxValue !== maxPrice) && (
                  <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-none text-sm">
                    ₵{minValue} - ₵{maxValue}
                    <button 
                      className="ml-2 text-red-500" 
                      onClick={() => {
                        setMinValue(minPrice);
                        setMaxValue(maxPrice);
                      }}
                    >
                      &times;
                    </button>
                  </span>
                )}
                <Button
                  onClick={clearFilters}
                  variant="outline"
                  size="sm"
                  className="rounded-none border-gray-300 text-sm"
                >
                  Clear All
                </Button>
              </div>
            </div>
          )}

          {/* Price filter - Same as ProductListing */}
          <div className="mb-8">
            <h3 className="font-['Outfit',Helvetica] text-xl tracking-[0.50px] leading-7 text-[#18191a] mb-4">
              FILTER BY PRICE
            </h3>

            <div className="relative h-[87px]">
              <div className="relative mt-6">
                <div className="relative w-full h-px bg-[#d1d5db]">
                  <div
                    ref={rangeRef}
                    className="absolute h-[1px] bg-[#18191a]"
                    style={{
                      left: `${getPercent(minValue)}%`,
                      width: `${getPercent(maxValue) - getPercent(minValue)}%`,
                    }}
                  ></div>

                  <input
                    type="range"
                    min={minPrice}
                    max={maxPrice}
                    value={minValue}
                    onChange={handleMinChange}
                    className="absolute pointer-events-none appearance-none w-full h-0
                      [&::-webkit-slider-thumb]:appearance-none
                      [&::-webkit-slider-thumb]:w-[1px]
                      [&::-webkit-slider-thumb]:h-[25px]
                      [&::-webkit-slider-thumb]:-mt-[4px]
                      [&::-webkit-slider-thumb]:bg-black
                      [&::-webkit-slider-thumb]:border-l-[2px]
                      [&::-webkit-slider-thumb]:border-[#18191a]
                      [&::-webkit-slider-thumb]:transform
                      [&::-webkit-slider-thumb]:rotate-180
                      [&::-webkit-slider-thumb]:pointer-events-auto
                      [&::-webkit-slider-thumb]:cursor-pointer"
                  />

                  <input
                    type="range"
                    min={minPrice}
                    max={maxPrice}
                    value={maxValue}
                    onChange={handleMaxChange}
                    className="absolute pointer-events-none appearance-none w-full h-0
                      [&::-webkit-slider-thumb]:appearance-none
                      [&::-webkit-slider-thumb]:w-[1px]
                      [&::-webkit-slider-thumb]:h-[25px]
                      [&::-webkit-slider-thumb]:-mt-[4px]
                      [&::-webkit-slider-thumb]:bg-black
                      [&::-webkit-slider-thumb]:border-[#18191a]
                      [&::-webkit-slider-thumb]:transform
                      [&::-webkit-slider-thumb]:rotate-180
                      [&::-webkit-slider-thumb]:pointer-events-auto
                      [&::-webkit-slider-thumb]:cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex items-center mt-6 space-x-2">
                <span className="font-['Outfit',Helvetica] text-sm tracking-[0.35px] text-[#18191a]">
                  ₵{minValue} -
                </span>
                <span className="font-['Outfit',Helvetica] text-sm tracking-[0.35px] text-[#18191a]">
                  ₵{maxValue}
                </span>
              </div>
            </div>
          </div>
           
          {/* Other filters - Same as ProductListing */}
          <div className="mb-8">
            <h3 className="font-['Outfit',Helvetica] text-xl tracking-[0.50px] leading-7 text-[#18191a] mb-4">
              FILTER BY:
            </h3>

            {Object.entries(filterOptions).map(([filterId, options]) => (
              <div key={filterId} className="border-b border-gray-200 last:border-b-0">
                <div
                  className="flex items-center justify-between py-3 cursor-pointer hover:bg-gray-50"
                  onClick={() => toggleFilter(filterId)}
                >
                  <span className="font-['Outfit',Helvetica] text-sm tracking-[0.35px] leading-[21px] text-[#18191a] uppercase">
                    {filterId}
                  </span>
                  <img 
                    className={`w-2.5 h-[21px] transition-transform duration-200 ${
                      expandedFilters.includes(filterId) ? 'rotate-180' : ''
                    }`} 
                    alt="Expand" 
                    src="/svg-1.svg" 
                  />
                </div>

                {expandedFilters.includes(filterId) && (
                  <div className="pb-4 pl-2 space-y-2">
                    {options.map((option) => (
                      <div key={option.id} className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id={`${filterId}-${option.id}`}
                          checked={selectedFilters[filterId as keyof typeof selectedFilters].includes(option.id)}
                          onChange={(e) => 
                            handleFilterChange(filterId as keyof typeof selectedFilters, option.id, e.target.checked)
                          }
                          className="w-4 h-4 border border-gray-400 rounded-none"
                        />
                        <label 
                          htmlFor={`${filterId}-${option.id}`}
                          className="flex-1 flex justify-between items-center cursor-pointer text-sm text-gray-700 hover:text-black"
                        >
                          <span>{option.name}</span>
                          <span className="text-xs text-gray-500">({option.count})</span>
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </aside>

        {/* Main content - Same structure as ProductListing */}
        <main className="flex-1">
          
          {/* Header with results count, sorting, and view options */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="font-['Outfit',Helvetica] font-normal text-[#111111] text-2xl lg:text-3xl tracking-[0.05px] mb-2">
                {searchQuery ? `Search Results for "${searchQuery}"` : 'All Products'}
              </h1>
              <p className="font-['DM_Sans',Helvetica] text-base text-neutral-800 leading-[27px]">
                Showing {sortedAndFilteredProducts.length} {sortedAndFilteredProducts.length === 1 ? "result" : "results"}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2">
                <span className="font-['Outfit',Helvetica] text-sm text-gray-700 whitespace-nowrap">
                  Sort by:
                </span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[200px] h-9 border-gray-300 rounded-none bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-none border-gray-300">
                    {sortOptions.map((option) => (
                      <SelectItem 
                        key={option.value} 
                        value={option.value}
                        className="rounded-none hover:bg-gray-50"
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* View Mode Switcher */}
              <div className="flex items-center gap-1 border border-gray-300 rounded-none">
                {viewModes.map((mode) => {
                  const IconComponent = mode.icon;
                  return (
                    <Button
                      key={mode.value}
                      variant="ghost"
                      size="sm"
                      className={`px-3 py-2 rounded-none hover:bg-gray-100 ${
                        viewMode === mode.value 
                          ? "bg-black text-white hover:bg-black" 
                          : "bg-white text-gray-600"
                      }`}
                      onClick={() => setViewMode(mode.value)}
                      title={mode.label}
                    >
                      <IconComponent className="h-4 w-4" />
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Product grid/list - Same structure as ProductListing */}
          {sortedAndFilteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <SearchIcon className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="font-['Outfit',Helvetica] font-medium text-xl text-[#111111] mb-3">
                  No products found
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchQuery 
                    ? `No results found for "${searchQuery}". Try different keywords or adjust your filters.`
                    : "Try adjusting your filters to find what you're looking for."
                  }
                </p>
                <Button 
                  onClick={clearFilters}
                  className="bg-black text-white rounded-none px-6 py-2 font-['Outfit',Helvetica] text-sm hover:bg-gray-800"
                >
                  Clear All Filters
                </Button>
              </div>
            </div>
          ) : (
            <div className={getGridClasses()}>
              {sortedAndFilteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className={getCardClasses()}
                  onClick={() => handleProductClick(product.id)}
                >
                  <CardContent className={viewMode === "list" ? "p-0 flex flex-row w-full" : "p-0"}>
                    {viewMode === "list" ? (
                      // List view layout - Same as ProductListing
                      <>
                        <div className="relative overflow-hidden flex-shrink-0">
                          {/* Discount Badge */}
                          {product.discount && (
                            <Badge className="absolute top-3.5 left-4 bg-red-600 text-white font-['DM_Sans',Helvetica] text-[13px] font-normal z-20 px-2 py-1">
                              -{product.discount}%
                            </Badge>
                          )}
                          
                          {/* Product Badge */}
                          {product.badge && !product.discount && (
                            <Badge className="absolute top-3.5 left-4 bg-transparent text-black font-['DM_Sans',Helvetica] text-[13px] font-normal z-10 border border-black">
                              {product.badge}
                            </Badge>
                          )}
                          
                          {/* Both badges */}
                          {product.badge && product.discount && (
                            <Badge className="absolute top-12 left-4 bg-transparent text-black font-['DM_Sans',Helvetica] text-[13px] font-normal z-10 border border-black">
                              {product.badge}
                            </Badge>
                          )}

                          <div
                            className={getImageClasses()}
                            style={{ backgroundImage: `url(${product.image})` }}
                          />
                          
                          <QuickView product={product} />
                          
                          <button 
                            className="absolute bottom-0 left-0 right-0 bg-black text-white text-sm font-['Outfit',Helvetica] py-2 opacity-0 translate-y-[100%] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out hover:bg-gray-800"
                            onClick={(e) => handleSelectOptions(e, product.id)}
                          >
                            Select Options
                          </button>
                        </div>
                        
                        <div className="flex-1 p-6">
                          <h3 className="font-['Outfit',Helvetica] font-normal text-[#18191a] text-xl tracking-[0.50px] leading-7 hover:text-gray-600 transition-colors">
                            {product.name}
                          </h3>
                          <p className="font-['DM_Sans',Helvetica] font-normal text-[#4c4c4c] text-sm leading-[25px] mt-2">
                            {product.description}
                          </p>
                          
                          <div className="mt-3">
                            {product.discount ? (
                              <div className="flex items-center gap-2">
                                <span className="font-['Outfit',Helvetica] font-normal text-[#18191a] text-sm tracking-[0.35px] leading-[21px]">
                                  {formatPrice(product.currentPrice)}
                                </span>
                                <span className="font-['Outfit',Helvetica] font-normal text-gray-500 text-sm tracking-[0.35px] leading-[21px] line-through">
                                  {formatPrice(product.originalPrice)}
                                </span>
                                <span className="font-['Outfit',Helvetica] font-medium text-red-600 text-xs">
                                  Save {formatPrice(product.originalPrice - product.currentPrice)}
                                </span>
                              </div>
                            ) : (
                              <p className="font-['Outfit',Helvetica] font-normal text-[#18191a] text-sm tracking-[0.35px] leading-[21px]">
                                {product.price}
                              </p>
                            )}
                          </div>

                          {/* Add to Cart Button for List View */}
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              addItem({
                                id: product.id,
                                name: product.name,
                                price: product.currentPrice,
                                originalPrice: product.originalPrice,
                                currentPrice: product.currentPrice,
                                image: product.image,
                                quantity: 1
                              });
                            }}
                            disabled={!product.inStock}
                            className="mt-4 bg-black text-white rounded-none px-6 py-2 font-['Outfit',Helvetica] text-sm hover:bg-gray-800 disabled:bg-gray-400"
                          >
                            {product.inStock ? 'ADD TO CART' : 'OUT OF STOCK'}
                          </Button>
                        </div>
                      </>
                    ) : (
                      // Grid view layout - Same as ProductListing
                      <>
                        <div className="relative overflow-hidden">
                          {/* Discount Badge */}
                          {product.discount && (
                            <Badge className="absolute rounded-none top-3.5 left-4 bg-white border-red-600 text-black font-['DM_Sans',Helvetica] text-[13px] font-normal z-20 px-2 py-1">
                              -{product.discount}%
                            </Badge>
                          )}
                          
                          {/* Product Badge */}
                          {product.badge && !product.discount && (
                            <Badge className="absolute top-3.5 left-4 bg-white rounded-none text-black font-['DM_Sans',Helvetica] text-[13px] font-normal z-10 border border-black">
                              {product.badge}
                            </Badge>
                          )}
                          
                          {/* Both badges */}
                          {product.badge && product.discount && (
                            <Badge className="absolute top-12 left-4 bg-transparent text-black font-['DM_Sans',Helvetica] text-[13px] font-normal z-10 border border-black">
                              {product.badge}
                            </Badge>
                          )}
                          
                          <QuickView product={product} />
                          
                          <div
                            className={getImageClasses()}
                            style={{ backgroundImage: `url(${product.image})` }}
                          />
                          
                          <button 
                            className="absolute bottom-0 left-0 right-0 bg-black text-white text-sm font-['Outfit',Helvetica] py-3 opacity-0 translate-y-[100%] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out hover:bg-gray-800"
                            onClick={(e) => handleSelectOptions(e, product.id)}
                          >
                            Select Options
                          </button>
                        </div>

                        <div className="mt-4">
                          <h3 className="font-['Outfit',Helvetica] font-normal text-[#18191a] text-xl tracking-[0.50px] leading-7 hover:text-gray-600 transition-colors">
                            {product.name}
                          </h3>
                          <p className="font-['DM_Sans',Helvetica] font-normal text-[#4c4c4c] text-sm leading-[25px] mt-1">
                            {product.description}
                          </p>
                          
                          <div className="mt-2">
                            {product.discount ? (
                              <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-['Outfit',Helvetica] font-normal text-[#18191a] text-sm tracking-[0.35px] leading-[21px]">
                                    {formatPrice(product.currentPrice)}
                                  </span>
                                  <span className="font-['Outfit',Helvetica] font-normal text-gray-500 text-sm tracking-[0.35px] leading-[21px] line-through">
                                    {formatPrice(product.originalPrice)}
                                  </span>
                                </div>
                                <span className="font-['Outfit',Helvetica] font-medium text-red-600 text-xs">
                                  Save {formatPrice(product.originalPrice - product.currentPrice)}
                                </span>
                              </div>
                            ) : (
                              <p className="font-['Outfit',Helvetica] font-normal text-[#18191a] text-sm tracking-[0.35px] leading-[21px]">
                                {product.price}
                              </p>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Pagination - Same as ProductListing */}
          {sortedAndFilteredProducts.length > 0 && (
            <div className="flex items-center justify-center mt-12 gap-3.5">
              <div className="px-[7px] py-[1.7px] bg-[#18191a]">
                <span className="font-['Outfit',Helvetica] font-normal text-white text-sm tracking-[0.35px] leading-[21px]">
                  1
                </span>
              </div>
              <div className="px-[7px] py-[1.7px]">
                <span className="font-['Outfit',Helvetica] font-normal text-[#18191a] text-sm tracking-[0.35px] leading-[21px]">
                  2
                </span>
              </div>
              <div className="px-[7px] py-[1.7px]">
                <span className="font-['Outfit',Helvetica] font-normal text-neutral-800 text-sm tracking-[0.35px] leading-[21px]">
                  …
                </span>
              </div>
              <div className="px-[7px] py-[1.7px]">
                <span className="font-['Outfit',Helvetica] font-normal text-[#18191a] text-sm tracking-[0.35px] leading-[21px]">
                  4
                </span>
              </div>
              <div className="ml-2">
                <img
                  className="w-[12.62px] h-[24.24px]"
                  alt="Next page"
                  src="/svg-3.svg"
                />
              </div>
            </div>
          )}
        </main>
      </section>
      
      <FooterByAnima />
      <FooterWrapperByAnima />
    </>
  );
};