import React, { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import { Minus, Plus } from "lucide-react";
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

export const ProductsPage = (): JSX.Element => {
  const { id } = useParams<{ id?: string }>();

  // Add quantity state
  const [quantity, setQuantity] = useState(1);

  // Add quantity change handler
  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  // You can fetch product data based on the ID here
  // For now, we'll use the existing static data
  const productData = {
    title: id ? `Product ${id}` : "DREAM IS FREE TWINSET 2.0",
    color: "LIGHT GREY/GREY",
    price: "£75.00",
    availability: {
      status: "In stock, and ready to ship",
      progress: 82, // percentage of stock available
    },
    delivery: {
      countdown: {
        hours: 16,
        minutes: 12,
        seconds: 52,
      },
      date: "Friday, 23 May",
    },
    points: 375,
  };

  // Size options
  const sizeOptions = [
    { value: "XS", label: "XS", selected: true },
    { value: "S", label: "S", selected: false },
    { value: "M", label: "M", selected: false },
    { value: "L", label: "L", selected: false },
    { value: "XL", label: "XL", selected: false },
    { value: "XXL", label: "XXL", selected: false },
  ];

  // Color options
  const colorOptions = [
    { value: "color1", selected: false, image: "/image-background-border.svg" },
    {
      value: "color2",
      selected: false,
      image: "/image-background-border-1.svg",
    },
    {
      value: "color3",
      selected: true,
      image: "/image-background-border-2.svg",
    },
  ];

  // Product images
  const productImages = [
    { url: "/link---dream-is-free-twinset-2-0---light-grey-grey.png" },
    { url: "/link---dream-is-free-twinset-2-0---light-grey-grey-1.png" },
    { url: "/link---dream-is-free-twinset-2-0---light-grey-grey-2.png" },
    { url: "/link---dream-is-free-twinset-2-0---light-grey-grey-3.png" },
    { url: "/link---dream-is-free-twinset-2-0---light-grey-grey-4.png" },
    { url: "/link---dream-is-free-twinset-2-0---light-grey-grey-5.png" },
    { url: "/link---dream-is-free-twinset-2-0---light-grey-grey-6.png" },
  ];

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

  // Related products

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
                    className="border-0 rounded-none overflow-hidden"
                  >
                    <CardContent className="p-0 h-[636px]">
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
                        <Card className="border-0 rounded-none overflow-hidden mx-1">
                          <CardContent className="p-0 h-[400px]">
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
                  <p className="font-semibold text-[#111111] text-[12.2px] leading-[19.5px]">
                    {productData.price}
                  </p>
                </div>

                {/* Size Selection */}
                <div className="mb-6">
                  <p className="font-normal text-[#111111] text-sm leading-[21px] mb-2">
                    Size
                  </p>
                  <div className="flex flex-wrap gap-3 mb-6">
                    {sizeOptions.map((size, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className={`min-w-[50px] rounded-none p-0 ${
                          size.selected
                            ? "bg-[#292929] text-white border-[#292929]"
                            : "bg-white text-[#6a6a6a] border-[#cfcfcf]"
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
                    Quantity
                  </label>
                  <div className="flex items-center border border-[#cfcfcf] w-32">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-12 w-12 rounded-none border-0 hover:bg-gray-50 text-[#6a6a6a]"
                      onClick={() => handleQuantityChange(-1)}
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
                    <Button className="w-full h-12 rounded-none bg-[#444444] relative overflow-hidden hover:bg-[#333333] transition-colors">
                      <div className="absolute w-[626px] h-[57px] -top-1 left-[-72px] bg-[#111111]" />
                      <span className="relative font-normal text-white text-[11.7px] tracking-[0.58px] leading-[16.9px] z-10">
                        ADD TO CART
                      </span>
                    </Button>
                  </div>
                </div>

                {/* Product Details Tabs - Fixed position */}
                <Tabs defaultValue="description" className="mt-8">
                  <TabsList className="w-full h-auto justify-start border-b border-[#cccccc] bg-transparent p-0 rounded-none  bg-white z-10">
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

                  {/* Scrollable Tab Content */}
                  <div className="">
                    <TabsContent value="description" className="mt-7">
                      <div className="max-w-[457px]">
                        <p className="font-normal text-[#111111] text-[13px] leading-[23px] mb-4">
                          A signature look from our Dream Is Free 2.0 collection. This
                          twinset pairs the statement puff print tee with matching
                          heavyweight shorts, designed for everyday wear with a
                          premium feel. Finished in a clean Light Grey and Grey combo
                          for effortless styling.
                        </p>

                        <h3 className="font-bold text-[#111111] text-[13px] leading-[23px]">
                          Tee:
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

                        <h3 className="font-bold text-[#111111] text-[13px] leading-[23px] mt-3">
                          Short:
                        </h3>
                        <ul className="pl-10 mb-3">
                          {shortFeatures.map((feature, index) => (
                            <li
                              key={index}
                              className="font-normal text-[#111111] text-[13px] leading-[23px]"
                            >
                              {feature}
                            </li>
                          ))}
                        </ul>

                        <p className="font-normal text-[#111111] text-[13px] leading-[23px] mt-3">
                          Model is 6ft and wears a size M top and bottom.
                        </p>
                      </div>
                    </TabsContent>

                    <TabsContent value="shipping" className="mt-7">
                      <div className="max-w-[457px]">
                        <p className="font-normal text-[#111111] text-[13px] leading-[23px] mb-4">
                          We offer free standard shipping on all orders over £50. Orders are processed within 1-2 business days and typically arrive within 3-5 business days.
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
