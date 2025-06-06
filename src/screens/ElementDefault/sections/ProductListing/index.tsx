import React, {useState, useRef} from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { 
  Grid3X3, 
  Grid2X2, 
  LayoutGrid, 
  List
} from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../../../../components/ui/breadcrumb";
import { FooterByAnima } from "../FooterByAnima";
import { FooterWrapperByAnima } from "../FooterWrapperByAnima/FooterWrapperByAnima";
import { BackgroundByAnima } from "../Header2";
import { QuickView } from "../../../../components/QuickView/QuickView";

// Product data for mapping
const products = [
  {
    id: 1,
    name: "SUNGLASSES",
    description: "Lorem ipsum dolor sit amet",
    price: "120.00$",
    image: "/j.png",
    link: "https://elfrida.qodeinteractive.com/product/red-sunglasses/",
    category: "accessories",
    color: "black",
    size: "one-size",
    originalPrice: 120,
  },
  {
    id: 2,
    name: "PINK HANDBAG",
    description: "Lorem ipsum dolor sit amet",
    price: "90.00$ – 120.00$",
    image: "/g.png",
    link: "https://elfrida.qodeinteractive.com/product/pink-handbag-2/",
    colors: ["#17181d", "#106151", "#371f3c", "#c0a3a4", "white"],
    selectedColor: 3,
    category: "bags",
    color: "pink",
    size: "medium",
    originalPrice: 105,
  },
  {
    id: 3,
    name: "FANCY HAT",
    description: "Lorem ipsum dolor sit amet",
    price: "170.00$ – 250.00$",
    image: "/d.png",
    link: "https://elfrida.qodeinteractive.com/product/fancy-hat/",
    category: "accessories",
    color: "beige",
    size: "large",
    originalPrice: 210,
  },
  {
    id: 4,
    name: "RED BAG",
    description: "Lorem ipsum dolor sit amet",
    price: "170.00$",
    image: "/f.png",
    link: "https://elfrida.qodeinteractive.com/product/red-bag-2/",
    badge: "New",
    category: "bags",
    color: "red",
    size: "small",
    originalPrice: 170,
  },
  {
    id: 5,
    name: "GOLDEN WATCH",
    description: "Lorem ipsum dolor sit amet",
    price: "200.00$",
    image: "/p.png",
    link: "https://elfrida.qodeinteractive.com/product/red-bag/",
    category: "jewelry",
    color: "gold",
    size: "one-size",
    originalPrice: 200,
  },
  {
    id: 6,
    name: "GREEN EARRINGS",
    description: "Lorem ipsum dolor sit amet",
    price: "200.00$",
    image: "/h.png",
    link: "https://elfrida.qodeinteractive.com/product/green-earrings/",
    category: "jewelry",
    color: "green",
    size: "one-size",
    originalPrice: 200,
  },
  {
    id: 7,
    name: "BEIGE SUNGLASSES",
    description: "Lorem ipsum dolor sit amet",
    price: "200.00$",
    image: "/g-1.png",
    link: "https://elfrida.qodeinteractive.com/product/beige-sunglasses/",
    category: "accessories",
    color: "beige",
    size: "one-size",
    originalPrice: 200,
  },
  {
    id: 8,
    name: "PARTY BAG",
    description: "Lorem ipsum dolor sit amet",
    price: "220.00$",
    image: "/j-1.png",
    link: "https://elfrida.qodeinteractive.com/product/party-bag/",
    colors: ["#482929", "#c6ceb6"],
    selectedColor: 1,
    category: "bags",
    color: "brown",
    size: "small",
    originalPrice: 220,
  },
  {
    id: 9,
    name: "LEOPARD BELT",
    description: "Lorem ipsum dolor sit amet",
    price: "120.00$",
    image: "/h-1.png",
    link: "https://elfrida.qodeinteractive.com/product/leopard-belt/",
    category: "accessories",
    color: "leopard",
    size: "medium",
    originalPrice: 120,
  },
  {
    id: 10,
    name: "ENGAGEMENT RING",
    description: "Lorem ipsum dolor sit amet",
    price: "120.00$",
    image: "/f-1.png",
    link: "https://elfrida.qodeinteractive.com/product/golden-ring-copy/",
    category: "jewelry",
    color: "gold",
    size: "one-size",
    originalPrice: 120,
  },
  {
    id: 11,
    name: "PARTY PURSE",
    description: "Lorem ipsum dolor sit amet",
    price: "250.00$",
    image: "/f-2.png",
    link: "https://elfrida.qodeinteractive.com/product/party-purse/",
    category: "bags",
    color: "black",
    size: "small",
    originalPrice: 250,
  },
  {
    id: 12,
    name: "BRONZE NECKLASSE",
    description: "Lorem ipsum dolor sit amet",
    price: "90.00$",
    image: "/s.png",
    link: "https://elfrida.qodeinteractive.com/product/bronze-necklasse/",
    badge: "Sold",
    category: "jewelry",
    color: "bronze",
    size: "one-size",
    originalPrice: 90,
  },
];

// Filter categories with options
const filterOptions = {
  category: [
    { id: "accessories", name: "Accessories", count: 4 },
    { id: "bags", name: "Bags", count: 4 },
    { id: "jewelry", name: "Jewelry", count: 4 },
  ],
  color: [
    { id: "black", name: "Black", count: 3 },
    { id: "red", name: "Red", count: 1 },
    { id: "pink", name: "Pink", count: 1 },
    { id: "gold", name: "Gold", count: 2 },
    { id: "green", name: "Green", count: 1 },
    { id: "beige", name: "Beige", count: 2 },
    { id: "brown", name: "Brown", count: 1 },
    { id: "bronze", name: "Bronze", count: 1 },
  ],
  size: [
    { id: "small", name: "Small", count: 3 },
    { id: "medium", name: "Medium", count: 2 },
    { id: "large", name: "Large", count: 1 },
    { id: "one-size", name: "One Size", count: 6 },
  ],
  discount: [
    { id: "10", name: "10% Off", count: 2 },
    { id: "20", name: "20% Off", count: 3 },
    { id: "30", name: "30% Off", count: 1 },
    { id: "50", name: "50% Off", count: 1 },
  ],
};

export const ProductGridSection = (): JSX.Element => {
  const location = useLocation();
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  // Determine page context based on URL slug
  const getPageContext = () => {
    if (slug) {
      // Handle /product-category/:slug routes
      switch (slug) {
        case 'men':
          return {
            gender: 'men',
            title: "Men's Collection",
            breadcrumb: "Men"
          };
        case 'women':
          return {
            gender: 'women',
            title: "Women's Collection",
            breadcrumb: "Women"
          };
        case 'accessories':
          return {
            category: 'accessories',
            title: "Accessories",
            breadcrumb: "Accessories"
          };
        default:
          return {
            title: "Products",
            breadcrumb: "Products"
          };
      }
    } else {
      // Handle /products route
      return {
        title: "All Products",
        breadcrumb: "Products"
      };
    }
  };

  const pageContext = getPageContext();

  // Generate breadcrumbs based on URL structure
  const generateBreadcrumbs = () => {
    const breadcrumbs = [
      { label: "Home", href: "/" },
      { label: "Products", href: "/products" }
    ];

    if (slug) {
      breadcrumbs.push({
        label: pageContext.breadcrumb || slug,
        href: `/product-category/${slug}`
      });
    }

    return breadcrumbs;
  };

  const minPrice = 0;
  const maxPrice = 320;

  const [minValue, setMinValue] = useState(minPrice);
  const [maxValue, setMaxValue] = useState(maxPrice);
  const [expandedFilters, setExpandedFilters] = useState<string[]>([]);
  const [selectedFilters, setSelectedFilters] = useState({
    category: [] as string[],
    color: [] as string[],
    size: [] as string[],
    discount: [] as string[],
  });
  // New state for sorting and view
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState("grid3"); // list, grid2, grid3, grid4

  const rangeRef = useRef<HTMLDivElement>(null);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxValue - 10);
    setMinValue(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minValue + 10);
    setMaxValue(value);
  };

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

  const applyFilter = () => {
    console.log("Filter: $", minValue, "-", maxValue);
    console.log("Selected filters:", selectedFilters);
    // Add your actual filter logic here
  };

  const clearFilters = () => {
    setSelectedFilters({
      category: [],
      color: [],
      size: [],
      discount: [],
    });
    setMinValue(minPrice);
    setMaxValue(maxPrice);
  };

  const getPercent = (value: number) => ((value - minPrice) / (maxPrice - minPrice)) * 100;

  // Filter products based on selected filters
  const filteredProducts = products.filter(product => {
    const withinPriceRange = product.originalPrice >= minValue && product.originalPrice <= maxValue;
    const matchesCategory = selectedFilters.category.length === 0 || selectedFilters.category.includes(product.category);
    const matchesColor = selectedFilters.color.length === 0 || selectedFilters.color.includes(product.color);
    const matchesSize = selectedFilters.size.length === 0 || selectedFilters.size.includes(product.size);
    
    return withinPriceRange && matchesCategory && matchesColor && matchesSize;
  });

  const hasActiveFilters = Object.values(selectedFilters).some(arr => arr.length > 0) || minValue !== minPrice || maxValue !== maxPrice;

  // Handle product click navigation
  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  // Handle select options button click
  const handleSelectOptions = (e: React.MouseEvent, productId: number) => {
    e.stopPropagation(); // Prevent card click event
    navigate(`/product/${productId}`);
  };

  // Sort options
  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "name-asc", label: "Name: A to Z" },
    { value: "name-desc", label: "Name: Z to A" },
    { value: "newest", label: "Newest" },
  ];

  // View mode options
  const viewModes = [
    { value: "list", icon: List, label: "List View" },
    { value: "grid2", icon: Grid2X2, label: "2 Columns" },
    { value: "grid3", icon: Grid3X3, label: "3 Columns" },
    { value: "grid4", icon: LayoutGrid, label: "4 Columns" },
  ];

  // Sort products function
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
      default:
        return sorted; // featured - keep original order
    }
  };

  // Apply sorting to filtered products
  const sortedAndFilteredProducts = getSortedProducts(filteredProducts);

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

  // Get card classes for list view
  const getCardClasses = () => {
    if (viewMode === "list") {
      return "rounded-none border-none shadow-none group cursor-pointer flex flex-row";
    }
    return "rounded-none border-none shadow-none group cursor-pointer";
  };

  // Get image classes for list view
  const getImageClasses = () => {
    if (viewMode === "list") {
      return "w-48 h-48 bg-cover bg-center";
    }
    return "w-full h-[447.15px] bg-cover bg-center transition-transform duration-300 group-hover:scale-105";
  };

  return (<>
    <BackgroundByAnima />
    <Breadcrumb className="w-full text-black py-4 border-b-[1px] font-elfrida-qodeinteractive-com-semantic-label-upper font">
      <div className="w-full mt-20 container mx-auto px-4 py-0">
        <BreadcrumbList className="flex items-center gap-2">
          {generateBreadcrumbs().map((crumb, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink className="text-base" href={crumb.href}>
                  {crumb.label}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {index < generateBreadcrumbs().length - 1 && <BreadcrumbSeparator>/</BreadcrumbSeparator>}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </div>    
    </Breadcrumb>
    
    <section className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
      {/* Sidebar with filters */}
      <aside className="w-full md:w-80">
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
                  ${minValue} - ${maxValue}
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
            </div>
          </div>
        )}

        {/* Price filter */}
        <div className="mb-8">
          <h3 className="font-['Outfit',Helvetica] text-xl tracking-[0.50px] leading-7 text-[#18191a] mb-4">
            FILTER BY PRICE
          </h3>

          <div className="relative h-[87px]">
            <div className="relative mt-6">
              {/* Slider track container */}
              <div className="relative w-full h-px bg-[#d1d5db]">
                {/* Filled range */}
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
                    [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-moz-range-thumb]:pointer-events-auto"
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
                    [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-moz-range-thumb]:pointer-events-auto"
                />
              </div>
            </div>

            {/* Price label */}
            <div className="flex items-center mt-6 space-x-2">
              <span className="font-['Outfit',Helvetica] text-sm tracking-[0.35px] text-[#18191a]">
                ${minValue} -
              </span>
              <span className="font-['Outfit',Helvetica] text-sm tracking-[0.35px] text-[#18191a]">
                ${maxValue}
              </span>
            </div>

            <Button
              onClick={applyFilter}
              className="absolute right-0 top-11 bg-black text-white rounded-none px-5 py-2 font-['Outfit',Helvetica] text-xs tracking-[0.66px] leading-[27px]"
            >
              FILTER
            </Button>
          </div>
        </div>
         
        {/* Other filters */}
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

      {/* Main content */}
      <main className="flex-1">
        {/* Header with results count, sorting, and view options */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <p className="font-['DM_Sans',Helvetica] text-base text-neutral-800 leading-[27px]">
            Showing {sortedAndFilteredProducts.length} {sortedAndFilteredProducts.length === 1 ? "result" : "results"}
          </p>
          
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

        {/* Product grid/list */}
        <div className={getGridClasses()}>
          {sortedAndFilteredProducts.map((product) => (
            <Card
              key={product.id}
              className={getCardClasses()}
              onClick={() => handleProductClick(product.id)}
            >
              <CardContent className={viewMode === "list" ? "p-0 flex flex-row w-full" : "p-0"}>
                {viewMode === "list" ? (
                  // List view layout
                  <>
                    <div className="relative overflow-hidden flex-shrink-0">
                      {product.badge && (
                        <Badge className="absolute top-3.5 left-4 bg-transparent text-black font-['DM_Sans',Helvetica] text-[13px] font-normal z-10">
                          {product.badge}
                        </Badge>
                      )}
                      <div
                        className={getImageClasses()}
                        style={{ backgroundImage: `url(${product.image})` }}
                      />
                      
                      {/* QuickView Eye Icon */}
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
                      <p className="font-['Outfit',Helvetica] font-normal text-[#18191a] text-sm tracking-[0.35px] leading-[21px] mt-3">
                        {product.price}
                      </p>
                    </div>
                  </>
                ) : (
                  // Grid view layout (existing)
                  <>
                    <div className="relative overflow-hidden">
                      {product.badge && (
                        <Badge className="absolute top-3.5 left-4 bg-transparent text-black font-['DM_Sans',Helvetica] text-[13px] font-normal z-10">
                          {product.badge}
                        </Badge>
                      )}
                      
                      {/* QuickView Eye Icon */}
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
                      <p className="font-['Outfit',Helvetica] font-normal text-[#18191a] text-sm tracking-[0.35px] leading-[21px] mt-2">
                        {product.price}
                      </p>

                     
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No results message */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your filters to see more results</p>
            <Button onClick={clearFilters} variant="outline">
              Clear All Filters
            </Button>
          </div>
        )}

        {/* Pagination */}
        {filteredProducts.length > 0 && (
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
