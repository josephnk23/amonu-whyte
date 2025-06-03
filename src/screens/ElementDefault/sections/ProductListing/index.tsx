import React, {useState, useRef} from "react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";

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

  return (<>
  <BackgroundByAnima />
    <Breadcrumb className="w-full text-black  py-4 border-b-[1px] font-elfrida-qodeinteractive-com-semantic-label-upper font">
      <div className="w-full mt-20 container mx-auto px-4 py-0">
        <BreadcrumbList className="flex items-center gap-2">
          <BreadcrumbItem>
            <BreadcrumbLink className="text-base" href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink className="text-base" href="/products">Products</BreadcrumbLink>
          </BreadcrumbItem>
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
        {/* Header with results count and sorting */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <p className="font-['DM_Sans',Helvetica] text-base text-neutral-800 leading-[27px]">
            Showing 1–{filteredProducts.length} of {filteredProducts.length} results
          </p>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="rounded-none border-none shadow-none"
            >
              <CardContent className="p-0">
                <div className="relative">
                  {product.badge && (
                    <Badge className="absolute top-3.5 left-4 bg-transparent text-black font-['DM_Sans',Helvetica] text-[13px] font-normal">
                      {product.badge}
                    </Badge>
                  )}
                  <div
                    className="w-full h-[447.15px] bg-cover bg-center"
                    style={{ backgroundImage: `url(${product.image})` }}
                  />
                </div>

                <div className="mt-4">
                  <a
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-['Outfit',Helvetica] font-normal text-[#18191a] text-xl tracking-[0.50px] leading-7"
                  >
                    {product.name}
                  </a>
                  <p className="font-['DM_Sans',Helvetica] font-normal text-[#4c4c4c] text-sm leading-[25px] mt-1">
                    {product.description}
                  </p>
                  <p className="font-['Outfit',Helvetica] font-normal text-[#18191a] text-sm tracking-[0.35px] leading-[21px] mt-2">
                    {product.price}
                  </p>

                  {product.colors && (
                    <div className="flex mt-4 gap-3.5">
                      {product.colors.map((color, index) => (
                        <div key={index} className="relative">
                          <div
                            className="w-[9px] h-[9px] rounded-[4.5px]"
                            style={{ backgroundColor: color }}
                          />
                          {product.selectedColor === index && (
                            <div className="absolute w-[17px] h-[17px] -top-1 -left-1 rounded-[8.5px] border border-solid border-black" />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
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
