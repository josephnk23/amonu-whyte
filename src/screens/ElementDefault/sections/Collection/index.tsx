import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
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

// Collection data
const collections = [
  {
    id: 1,
    title: "Summer Essentials",
    subtitle: "Light & Breezy",
    description: "Discover our curated selection of summer must-haves, perfect for warm weather and vacation vibes.",
    image: "/j.png",
    itemCount: 24,
    featured: true,
    link: "/products?collection=summer"
  },
  {
    id: 2,
    title: "Urban Collection",
    subtitle: "City Style",
    description: "Sophisticated pieces designed for the modern urban lifestyle. Perfect for work and weekend.",
    image: "/g.png",
    itemCount: 18,
    featured: true,
    link: "/products?collection=urban"
  },
  {
    id: 3,
    title: "Luxury Accessories",
    subtitle: "Premium Quality",
    description: "Handcrafted accessories that add the perfect finishing touch to any outfit.",
    image: "/h.png",
    itemCount: 32,
    featured: false,
    link: "/product-category/accessories"
  },
  {
    id: 4,
    title: "Minimalist Bags",
    subtitle: "Less is More",
    description: "Clean lines and functional design meet in this collection of essential everyday bags.",
    image: "/f.png",
    itemCount: 15,
    featured: false,
    link: "/products?collection=minimalist"
  },
  {
    id: 5,
    title: "Statement Jewelry",
    subtitle: "Bold & Beautiful",
    description: "Make an impact with our collection of eye-catching jewelry pieces that speak volumes.",
    image: "/p.png",
    itemCount: 28,
    featured: true,
    link: "/products?collection=statement"
  },
  {
    id: 6,
    title: "Classic Timeless",
    subtitle: "Never Goes Out of Style",
    description: "Timeless pieces that transcend trends and seasons. Investment pieces for your wardrobe.",
    image: "/d.png",
    itemCount: 20,
    featured: false,
    link: "/products?collection=classic"
  }
];

export const CollectionPage = (): JSX.Element => {
  const navigate = useNavigate();

  // Generate breadcrumbs
  const generateBreadcrumbs = () => {
    return [
      { label: "Home", href: "/" },
      { label: "Collections", href: "/collections" }
    ];
  };

  // Handle collection click
  const handleCollectionClick = (collection: typeof collections[0]) => {
    navigate(collection.link);
  };

  // Featured collections for hero section
  const featuredCollections = collections.filter(c => c.featured);
  const regularCollections = collections.filter(c => !c.featured);

  return (
    <>
      <BackgroundByAnima />
      
      {/* Breadcrumb */}
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

      {/* Page Header */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="font-['Outfit',Helvetica] font-normal text-[#111111] text-4xl lg:text-5xl tracking-[0.05px] mb-6">
            Our Collections
          </h1>
          <p className="font-['DM_Sans',Helvetica] text-lg text-neutral-600 leading-relaxed">
            Discover our carefully curated collections, each telling a unique story through exceptional design and quality craftsmanship.
          </p>
        </div>
      </section>

      {/* Featured Collections Hero */}
      <section className="container mx-auto px-4 mb-16">
        <div className="grid grid-cols-1  lg:grid-cols-3 gap-8">
          {featuredCollections.map((collection, index) => (
            <Card
              key={collection.id}
              className={`relative overflow-hidden rounded-none border-none shadow-none group cursor-pointer ${
                index === 0 ? "lg:col-span-2  lg:row-span-2" : ""
              }`}
              onClick={() => handleCollectionClick(collection)}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <div
                    className={`w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105 ${
                      index === 0 ? "h-[612px]" : "h-[290px]"
                    }`}
                    style={{ backgroundImage: `url(${collection.image})` }}
                  >
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300"></div>
                    
                    {/* Content */}
                    <div className="absolute inset-0 flex items-end p-8">
                      <div className="text-white">
                        <Badge className="bg-white text-black rounded-none mb-4 px-3 py-1">
                          Featured Collection
                        </Badge>
                        <h2 className="font-['Outfit',Helvetica] font-normal text-2xl lg:text-3xl tracking-[0.05px] leading-tight mb-2">
                          {collection.title}
                        </h2>
                        <p className="font-['Outfit',Helvetica] font-light text-lg mb-4 opacity-90">
                          {collection.subtitle}
                        </p>
                        <p className="font-['DM_Sans',Helvetica] text-sm leading-relaxed mb-6 max-w-md opacity-80">
                          {collection.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className="font-['DM_Sans',Helvetica] text-sm">
                            {collection.itemCount} Items
                          </span>
                          <Button 
                            className="bg-white text-black hover:bg-gray-100 rounded-none px-6 py-2 font-['Outfit',Helvetica] text-sm font-medium"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCollectionClick(collection);
                            }}
                          >
                            EXPLORE
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Regular Collections Grid */}
      <section className="container mx-auto px-4 pb-16">
        <div className="mb-12">
          <h2 className="font-['Outfit',Helvetica] font-normal text-[#111111] text-3xl tracking-[0.05px] mb-4">
            More Collections
          </h2>
          <p className="font-['DM_Sans',Helvetica] text-lg text-neutral-600">
            Explore our additional curated collections
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularCollections.map((collection) => (
            <Card
              key={collection.id}
              className="rounded-none border-none shadow-none group cursor-pointer"
              onClick={() => handleCollectionClick(collection)}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <div
                    className="w-full h-[350px] bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                    style={{ backgroundImage: `url(${collection.image})` }}
                  >
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                    
                    {/* Hover button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button 
                        className="bg-white text-black hover:bg-gray-100 rounded-none px-6 py-2 font-['Outfit',Helvetica] text-sm font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCollectionClick(collection);
                        }}
                      >
                        VIEW COLLECTION
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-['Outfit',Helvetica] font-normal text-[#18191a] text-xl tracking-[0.50px] leading-7 group-hover:text-gray-600 transition-colors">
                      {collection.title}
                    </h3>
                    <span className="font-['DM_Sans',Helvetica] text-sm text-gray-500">
                      {collection.itemCount} items
                    </span>
                  </div>
                  
                  <p className="font-['Outfit',Helvetica] font-light text-gray-600 text-sm mb-3">
                    {collection.subtitle}
                  </p>
                  
                  <p className="font-['DM_Sans',Helvetica] font-normal text-[#4c4c4c] text-sm leading-relaxed">
                    {collection.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-['Outfit',Helvetica] font-normal text-[#111111] text-3xl lg:text-4xl tracking-[0.05px] mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="font-['DM_Sans',Helvetica] text-lg text-neutral-600 leading-relaxed mb-8 max-w-2xl mx-auto">
            Explore our complete product catalog or get in touch with our styling team for personalized recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-black text-white hover:bg-gray-800 rounded-none px-8 py-3 font-['Outfit',Helvetica] text-sm font-medium"
              onClick={() => navigate('/products')}
            >
              VIEW ALL PRODUCTS
            </Button>
            {/* <Button 
              variant="outline"
              className="bg-white text-black border-black hover:bg-gray-50 rounded-none px-8 py-3 font-['Outfit',Helvetica] text-sm font-medium"
              onClick={() => navigate('/contact')}
            >
              CONTACT US
            </Button> */}
          </div>
        </div>
      </section>

      <FooterByAnima />
      <FooterWrapperByAnima />
    </>
  );
};