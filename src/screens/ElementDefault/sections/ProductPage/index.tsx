import React, { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import { Minus, Plus } from "lucide-react";
import { Badge } from "../../../../components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../../../../components/ui/breadcrumb";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../../components/ui/tabs";
import { RelatedProductsSection } from "../RelatedItems";
import { FooterByAnima } from "../FooterByAnima";
import { FooterWrapperByAnima } from "../FooterWrapperByAnima/FooterWrapperByAnima";
import { BackgroundByAnima } from "../Header2";
import { useCart } from "../../../../contexts/CartContext"; // Add this import

// Dummy product data with discount options
const productDatabase = {
  "1": {
    title: "SUNGLASSES",
    color: "BLACK/GOLD",
    price: "120.00 ₵",
    originalPrice: 150,
    currentPrice: 120,
    discount: 20,
    availability: {
      status: "In stock, and ready to ship",
      progress: 75,
    },
    delivery: {
      countdown: { hours: 12, minutes: 30, seconds: 45 },
      date: "Monday, 27 May",
    },
    points: 600,
    images: [
      "/j.png", "/j.png", "/j.png", "/j.png"
    ]
  },
  "2": {
    title: "PINK HANDBAG",
    color: "PINK/ROSE GOLD",
    price: "90.00 ₵",
    originalPrice: 105,
    currentPrice: 90,
    discount: 14,
    availability: {
      status: "In stock, and ready to ship", 
      progress: 60,
    },
    delivery: {
      countdown: { hours: 8, minutes: 15, seconds: 30 },
      date: "Tuesday, 28 May",
    },
    points: 450,
    images: [
      "/g.png", "/g.png", "/g.png", "/g.png"
    ]
  },
  "default": {
    title: "DREAM IS FREE TWINSET 2.0",
    color: "LIGHT GREY/GREY",
    price: "75.00 ₵",
    originalPrice: 75,
    currentPrice: 75,
    discount: null,
    availability: {
      status: "In stock, and ready to ship",
      progress: 82,
    },
    delivery: {
      countdown: { hours: 16, minutes: 12, seconds: 52 },
      date: "Friday, 23 May",
    },
    points: 375,
    images: [
      "/link---dream-is-free-twinset-2-0---light-grey-grey.png",
      "/link---dream-is-free-twinset-2-0---light-grey-grey-1.png",
      "/link---dream-is-free-twinset-2-0---light-grey-grey-2.png",
      "/link---dream-is-free-twinset-2-0---light-grey-grey-3.png",
      "/link---dream-is-free-twinset-2-0---light-grey-grey-4.png",
      "/link---dream-is-free-twinset-2-0---light-grey-grey-5.png",
      "/link---dream-is-free-twinset-2-0---light-grey-grey-6.png",
    ]
  }
};

// Helper function to format price
const formatPrice = (price: number) => {
  return `${price.toFixed(2)} ₵`;
};

export const ProductsPage = (): JSX.Element => {
  const { id } = useParams<{ id?: string }>();
  const { addItem, openCart } = useCart(); // Add cart context

  // Updated state - no default selections
  const [quantity, setQuantity] = useState(0); // Start at 0
  const [selectedSize, setSelectedSize] = useState<string>(""); // No default size
  const [error, setError] = useState<string>(""); // Error state for validation

  // Add quantity change handler
  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(0, prev + delta));
    if (error) setError(""); // Clear error when user makes changes
  };

  // Handle size selection
  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
    if (error) setError(""); // Clear error when user makes changes
  };

  // Handle add to cart
  const handleAddToCart = () => {
    // Validation
    if (!selectedSize) {
      setError("Please select a size");
      return;
    }
    
    if (quantity === 0) {
      setError("Please select quantity");
      return;
    }

    // Clear any previous errors
    setError("");

    // Add item to cart
    const cartItem = {
      id: parseInt(id || "1"),
      name: productData.title,
      price: productData.price,
      quantity: quantity,
      image: productData.images[0],
      currentPrice: productData.currentPrice,
      originalPrice: productData.originalPrice,
    };

    addItem(cartItem);
    
    // Optional: Open cart drawer after adding
    openCart();
    
    // Optional: Reset selections after adding to cart
    // setQuantity(0);
    // setSelectedSize("");
  };

  // Get product data based on ID
  const productData = productDatabase[id as keyof typeof productDatabase] || productDatabase.default;

  // Updated size options - no default selection
  const sizeOptions = [
    { value: "XS", label: "XS" },
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
    { value: "XL", label: "XL" },
    { value: "XXL", label: "XXL" },
  ];

  // Color options
  const colorOptions = [
    { value: "color1", selected: false, image: "/image-background-border.svg" },
    { value: "color2", selected: false, image: "/image-background-border-1.svg" },
    { value: "color3", selected: true, image: "/image-background-border-2.svg" },
  ];

  // Product images
  const productImages = productData.images.map(url => ({ url }));

  // Tee features
  const teeFeatures = [
    "Dropped shoulder seam",
    "Puff Print design", 
    "100% Cotton Jersey",
    "260 GSM",
  ];

  // Short features
  const shortFeatures = [
    "Elasticated waistband with drawcord",
    "Puff Print design",
    "Side seam pockets",
    "Back patch pocket", 
    "100% Cotton",
    "360 GSM",
  ];

  // Carousel for mobile
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <>
      <BackgroundByAnima />
      <Breadcrumb className="w-full font-elfrida-qodeinteractive-com-semantic-label-upper font">
        <div className="max-w-[1526px] mt-20 mx-auto px-4 md:px-8 lg:px-16 py-0">
          <BreadcrumbList className="flex items-center gap-2">
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="/products">Products</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <span>{productData.title}</span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </div>    
      </Breadcrumb>

      <section className="w-full font-elfrida-qodeinteractive-com-semantic-heading-3-upper font">
        <div className="max-w-[1526px] mt-10 mx-auto px-4 md:px-8 lg:px-16 py-0">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            
            {/* Product Gallery */}
            <div className="w-full lg:max-w-[855px]">
              {/* Desktop Grid View */}
              <div className="hidden md:grid grid-cols-2 gap-2">
                {productImages.map((image, index) => (
                  <Card
                    key={index}
                    className="border-0 rounded-none overflow-hidden relative"
                  >
                    <CardContent className="p-0 h-[636px]">
                      {/* Discount Badge - Only show on first image */}
                      {index === 0 && productData.discount && (
                        <Badge className="absolute top-4 left-4 bg-white text-red-600 border border-red-600 font-['DM_Sans',Helvetica] text-[13px] font-normal z-20 px-2 py-1 rounded-none">
                          -{productData.discount}%
                        </Badge>
                      )}
                      <div
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${image.url})` }}
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Mobile Carousel View */}
              <div className="md:hidden">
                <div className="overflow-hidden" ref={emblaRef}>
                  <div className="flex">
                    {productImages.map((image, index) => (
                      <div key={index} className="flex-[0_0_100%] min-w-0">
                        <Card className="border-0 rounded-none overflow-hidden mx-1 relative">
                          <CardContent className="p-0 h-[400px]">
                            {/* Discount Badge - Only show on first image */}
                            {index === 0 && productData.discount && (
                              <Badge className="absolute top-4 left-4 bg-white text-red-600 border border-red-600 font-['DM_Sans',Helvetica] text-[13px] font-normal z-20 px-2 py-1 rounded-none">
                                -{productData.discount}%
                              </Badge>
                            )}
                            <div
                              className="w-full h-full bg-cover bg-center"
                              style={{ backgroundImage: `url(${image.url})` }}
                            />
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Carousel Dots */}
                <div className="flex justify-center mt-4 gap-2">
                  {productImages.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === selectedIndex ? "bg-black" : "bg-gray-300"
                      }`}
                      onClick={() => emblaApi?.scrollTo(index)}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Product Information - Simple Sticky */}
            <div className="flex-1 lg:min-w-80">
              <div className="lg:sticky lg:top-20">
                
                <div className="border-b border-white pb-4 mb-0">
                  <h1 className="font-normal text-[#111111] text-[23px] leading-[25.3px] mb-4">
                    {productData.title}
                  </h1>
                  <p className="font-normal text-[#111111] text-base leading-[17.6px] mb-3">
                    {productData.color}
                  </p>
                  
                  {/* Price with Discount Display */}
                  <div className="flex items-center gap-3 mb-2">
                    <p className="font-semibold text-[#111111] text-sm leading-[19.5px]">
                      {formatPrice(productData.currentPrice)}
                    </p>
                    {productData.discount && (
                      <>
                        <p className="font-normal text-gray-500 text-sm leading-[19.5px] line-through">
                          {formatPrice(productData.originalPrice)}
                        </p>
                        <Badge className="bg-white text-red-600 border border-red-600 text-[10px] px-1 py-0 rounded-none">
                          -{productData.discount}%
                        </Badge>
                      </>
                    )}
                  </div>
                  
                  {/* Savings Amount */}
                  {productData.discount && (
                    <p className="font-medium text-red-600 text-[11px] leading-[16px]">
                      You save {formatPrice(productData.originalPrice - productData.currentPrice)}
                    </p>
                  )}
                </div>

                {/* Error Message */}
                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-none">
                    <p className="font-normal text-red-600 text-sm">{error}</p>
                  </div>
                )}

                {/* Size Selection */}
                <div className="mb-6">
                  <p className="font-normal text-[#111111] text-sm leading-[21px] mb-2">
                    Size {!selectedSize && <span className="text-red-600">*</span>}
                  </p>
                  <div className="flex flex-wrap gap-3 mb-6">
                    {sizeOptions.map((size, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        onClick={() => handleSizeSelect(size.value)}
                        className={`min-w-[50px] rounded-none p-0 transition-colors ${
                          selectedSize === size.value
                            ? "bg-[#292929] text-white border-[#292929]"
                            : "bg-white text-[#6a6a6a] border-[#cfcfcf] hover:border-[#292929]"
                        }`}
                      >
                        <span className="font-normal text-xs py-2 px-[9px]">
                          {size.label}
                        </span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="mb-6">
                  <label className="block font-normal text-[#111111] text-sm leading-[21px] mb-3">
                    Quantity {quantity === 0 && <span className="text-red-600">*</span>}
                  </label>
                  <div className="flex items-center border border-[#cfcfcf] w-32">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-12 w-12 rounded-none border-0 hover:bg-gray-50 text-[#6a6a6a] disabled:opacity-50"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity === 0}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="flex-1 text-center font-normal text-[#111111] text-sm">
                      {quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-12 w-12 rounded-none border-0 hover:bg-gray-50 text-[#6a6a6a]"
                      onClick={() => handleQuantityChange(1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Availability */}
                <div className="mb-6">
                  <p className="font-normal text-[#111111] text-[12.6px] leading-[19.5px]">
                    Availability
                  </p>
                  <p className="font-normal text-[#3c9342] text-[13.3px] leading-5 mb-2">
                    {productData.availability.status}
                  </p>
                </div>

                {/* Add to Cart Button */}
                <div className="mb-6">
                  <div className="relative mt-5 mb-2.5 overflow-hidden">
                    <Button 
                      onClick={handleAddToCart}
                      disabled={!selectedSize || quantity === 0}
                      className="w-full h-12 rounded-none bg-[#444444] relative overflow-hidden hover:bg-[#333333] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      <div className="absolute w-[626px] h-[57px] -top-1 left-[-72px] bg-[#111111]" />
                      <span className="relative font-normal text-white text-[11.7px] tracking-[0.58px] leading-[16.9px] z-10">
                        {!selectedSize || quantity === 0 ? "ADD TO CART" : "ADD TO CART"}
                      </span>
                    </Button>
                  </div>
                </div>

                {/* Product Details Tabs */}
                <Tabs defaultValue="description" className="mt-8">
                  <TabsList className="w-full h-auto justify-start border-b border-[#cccccc] bg-transparent p-0 rounded-none bg-white z-10">
                    <TabsTrigger
                      value="description"
                      className="px-4 py-3.5 pb-[15.6px] data-[state=active]:border-b-[1.6px] data-[state=active]:border-[#111111] data-[state=active]:bg-transparent data-[state=active]:text-[#111111] data-[state=active]:shadow-none data-[state=inactive]:opacity-40 rounded-none bg-transparent hover:bg-transparent"
                    >
                      <span className="font-semibold text-[#111111] text-sm">
                        Description
                      </span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="shipping"
                      className="px-4 py-[14.8px] data-[state=active]:border-b-[1.6px] data-[state=active]:border-[#111111] data-[state=active]:bg-transparent data-[state=active]:text-[#111111] data-[state=active]:shadow-none data-[state=inactive]:opacity-40 rounded-none bg-transparent hover:bg-transparent"
                    >
                      <span className="font-semibold text-[#111111] text-sm">
                        Shipping
                      </span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="returns"
                      className="px-4 py-[14.8px] data-[state=active]:border-b-[1.6px] data-[state=active]:border-[#111111] data-[state=active]:bg-transparent data-[state=active]:text-[#111111] data-[state=active]:shadow-none data-[state=inactive]:opacity-40 rounded-none bg-transparent hover:bg-transparent"
                    >
                      <span className="font-semibold text-[#111111] text-sm">
                        Returns
                      </span>
                    </TabsTrigger>
                  </TabsList>

                  {/* Tab Content */}
                  <div className="">
                    <TabsContent value="description" className="mt-7">
                      <div className="max-w-[457px]">
                        <p className="font-normal text-[#111111] text-[13px] leading-[23px] mb-4">
                          {productData.discount ? 
                            `Special discount on this premium ${productData.title.toLowerCase()}! Limited time offer with ${productData.discount}% off the regular price.` :
                            "A signature look from our Dream Is Free 2.0 collection. This twinset pairs the statement puff print tee with matching heavyweight shorts, designed for everyday wear with a premium feel."
                          }
                        </p>

                        <h3 className="font-bold text-[#111111] text-[13px] leading-[23px]">
                          Features:
                        </h3>
                        <ul className="pl-10 mb-3">
                          {teeFeatures.map((feature, index) => (
                            <li
                              key={index}
                              className="font-normal text-[#111111] text-[13px] leading-[23px]"
                            >
                              {feature}
                            </li>
                          ))}
                        </ul>

                        <p className="font-normal text-[#111111] text-[13px] leading-[23px] mt-3">
                          Model is 6ft and wears a size M.
                        </p>
                      </div>
                    </TabsContent>

                    <TabsContent value="shipping" className="mt-7">
                      <div className="max-w-[457px]">
                        <p className="font-normal text-[#111111] text-[13px] leading-[23px] mb-4">
                          We offer free standard shipping on all orders over ₵50. Orders are processed within 1-2 business days and typically arrive within 3-5 business days.
                        </p>
                        <p className="font-normal text-[#111111] text-[13px] leading-[23px]">
                          Express shipping options are available at checkout for faster delivery.
                        </p>
                      </div>
                    </TabsContent>

                    <TabsContent value="returns" className="mt-7">
                      <div className="max-w-[457px]">
                        <p className="font-normal text-[#111111] text-[13px] leading-[23px] mb-4">
                          We accept returns within 30 days of purchase. Items must be in original condition with tags attached.
                        </p>
                        <p className="font-normal text-[#111111] text-[13px] leading-[23px]">
                          Return shipping is free for exchanges and store credit. Refunds will be processed within 5-7 business days.
                        </p>
                      </div>
                    </TabsContent>
                  </div>
                </Tabs>

              </div>
            </div>
          </div>
        </div>
      </section>
      
      <RelatedProductsSection />
      <FooterByAnima />
      <FooterWrapperByAnima />
    </>
  );
};
