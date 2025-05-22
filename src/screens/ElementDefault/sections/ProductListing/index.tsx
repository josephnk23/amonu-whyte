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
  },
  {
    id: 3,
    name: "FANCY HAT",
    description: "Lorem ipsum dolor sit amet",
    price: "170.00$ – 250.00$",
    image: "/d.png",
    link: "https://elfrida.qodeinteractive.com/product/fancy-hat/",
  },
  {
    id: 4,
    name: "RED BAG",
    description: "Lorem ipsum dolor sit amet",
    price: "170.00$",
    image: "/f.png",
    link: "https://elfrida.qodeinteractive.com/product/red-bag-2/",
    badge: "New",
  },
  {
    id: 5,
    name: "GOLDEN WATCH",
    description: "Lorem ipsum dolor sit amet",
    price: "200.00$",
    image: "/p.png",
    link: "https://elfrida.qodeinteractive.com/product/red-bag/",
  },
  {
    id: 6,
    name: "GREEN EARRINGS",
    description: "Lorem ipsum dolor sit amet",
    price: "200.00$",
    image: "/h.png",
    link: "https://elfrida.qodeinteractive.com/product/green-earrings/",
  },
  {
    id: 7,
    name: "BEIGE SUNGLASSES",
    description: "Lorem ipsum dolor sit amet",
    price: "200.00$",
    image: "/g-1.png",
    link: "https://elfrida.qodeinteractive.com/product/beige-sunglasses/",
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
  },
  {
    id: 9,
    name: "LEOPARD BELT",
    description: "Lorem ipsum dolor sit amet",
    price: "120.00$",
    image: "/h-1.png",
    link: "https://elfrida.qodeinteractive.com/product/leopard-belt/",
  },
  {
    id: 10,
    name: "ENGAGEMENT RING",
    description: "Lorem ipsum dolor sit amet",
    price: "120.00$",
    image: "/f-1.png",
    link: "https://elfrida.qodeinteractive.com/product/golden-ring-copy/",
  },
  {
    id: 11,
    name: "PARTY PURSE",
    description: "Lorem ipsum dolor sit amet",
    price: "250.00$",
    image: "/f-2.png",
    link: "https://elfrida.qodeinteractive.com/product/party-purse/",
  },
  {
    id: 12,
    name: "BRONZE NECKLASSE",
    description: "Lorem ipsum dolor sit amet",
    price: "90.00$",
    image: "/s.png",
    link: "https://elfrida.qodeinteractive.com/product/bronze-necklasse/",
    badge: "Sold",
  },
];

// Filter categories
const filterCategories = [
  { id: "category", name: "CATEGORY" },
  { id: "color", name: "COLOR" },
  { id: "size", name: "SIZE" },
  { id: "discount", name: "DISCOUNT" },
];



export const ProductGridSection = (): JSX.Element => {
  const minPrice = 0;
  const maxPrice = 320;

  const [minValue, setMinValue] = useState(minPrice);
  const [maxValue, setMaxValue] = useState(maxPrice);

  const rangeRef = useRef<HTMLDivElement>(null);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxValue - 10);
    setMinValue(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minValue + 10);
    setMaxValue(value);
  };

  const applyFilter = () => {
    console.log("Filter: $", minValue, "-", maxValue);
    // Add your actual filter logic here
  };

  const getPercent = (value: number) => ((value - minPrice) / (maxPrice - minPrice)) * 100;

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
          
          {/* <BreadcrumbItem isCurrentPage>
            <span>{}</span>
          </BreadcrumbItem> */}
        </BreadcrumbList>
      </div>    
    </Breadcrumb>
    <section className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
      {/* Sidebar with filters */}

      <aside className="w-full md:w-80">
        {/* Search */}
      
        {/* Price filter */}
         <div className="mb-8">
      <h3 className="font-['Outfit',Helvetica] text-xl tracking-[0.50px] leading-7 text-[#18191a] mb-4">
        FILTER BY PRICE
      </h3>

      <div className="relative h-[87px]">
        <div className="relative mt-6">
          {/* Slider track container */}
          <div className="relative w-full h-px bg-[#d1d5db]"> {/* Light gray base track */}
            {/* Filled range */}
            <div
              ref={rangeRef}
              className="absolute h-[1px] bg-[#18191a]"
              style={{
                left: `${getPercent(minValue)}%`,
                width: `${getPercent(maxValue) - getPercent(minValue)}%`,
              }}
            ></div>

            {/* Left notch (thumb) */}
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
    // [&::-webkit-slider-thumb]:border-[1px]
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

          {filterCategories.map((category) => (
            <div
              key={category.id}
              className="flex items-center justify-between py-2 border-b border-transparent"
            >
              <span className="font-['Outfit',Helvetica] text-sm tracking-[0.35px] leading-[21px] text-[#18191a]">
                {category.name}
              </span>
              <img className="w-2.5 h-[21px]" alt="Expand" src="/svg-1.svg" />
            </div>
          ))}
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1">
        {/* Header with results count and sorting */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <p className="font-['DM_Sans',Helvetica] text-base text-neutral-800 leading-[27px]">
            Showing 1–12 of 48 results
          </p>

          {/* <Select>
            <SelectTrigger className="w-[330px] border-[#cccccc] font-['Outfit',Helvetica] text-sm text-neutral-800">
              <SelectValue placeholder="Default sorting" />
              <img
                className="w-2.5 h-[20.82px]"
                alt="Dropdown"
                src="/svg-2.svg"
              />
            </SelectTrigger>
          </Select> */}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
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

        {/* Pagination */}
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
      </main>
    </section>
    <FooterByAnima />
    <FooterWrapperByAnima />
    </>
  );
};
