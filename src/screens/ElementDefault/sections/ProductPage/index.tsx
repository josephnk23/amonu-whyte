
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
  // Product data
  const productData = {
    title: "DREAM IS FREE TWINSET 2.0",
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
  

  return (
    <>
    <BackgroundByAnima />
    <Breadcrumb className="w-full font-elfrida-qodeinteractive-com-semantic-label-upper font">
      <div className="max-w-[1526px] mt-20 mx-auto px-16 py-0">
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
      <div className="max-w-[1526px] mt-10 mx-auto px-16 py-0">
    

        <div className="flex gap-16">
          {/* Product Gallery */}
          <div className="w-full max-w-[855px]">
            <div className="grid grid-cols-2 gap-2">
              {productImages.slice(0, 6).map((image, index) => (
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
          </div>

          {/* Product Information */}
          <div className="flex-1 min-w-80">
            <div className="border-b border-white pb-4 mb-8">
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

            {/* Color Selection */}
            <div className="mb-6">
              <div className="flex items-start pt-[5px] pb-2.5">
                {colorOptions.map((color, index) => (
                  <div key={index} className="w-[30px] h-[30px] mr-1">
                    <div
                      className={`flex items-center justify-center p-[2.8px] rounded-full ${color.selected ? "border border-black" : "border border-white"}`}
                    >
                      <img
                        className="w-[25px] h-[25px]"
                        alt="Color option"
                        src={color.image}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Size Selection */}
              <p className="font-normal text-[#111111] text-sm leading-[21px] mb-2">
                Size
              </p>
              <div className="flex gap-3 mb-6">
                {sizeOptions.map((size, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className={`min-w-[50px] rounded-sm p-0 ${
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

            {/* Availability */}
            <div className="mb-6">
              <p className="font-normal text-[#111111] text-[12.6px] leading-[19.5px]">
                Availability
              </p>
              <p className="font-normal text-[#3c9342] text-[13.3px] leading-5 mb-2">
                {productData.availability.status}
              </p>
              {/* <Progress
                value={productData.availability.progress}
                className="h-1 bg-neutral-100"
                indicatorClassName="bg-[#3c9342]"
              /> */}
            </div>

            {/* Delivery Information */}
            <div className="mb-6">
              <p className="font-normal text-[13px] leading-[19.5px]">
                <span className="text-[#111111]">Order within the next </span>
                <span className="text-[#3c9342]">
                  {productData.delivery.countdown.hours} hours,{" "}
                  {productData.delivery.countdown.minutes} minutes,{" "}
                  {productData.delivery.countdown.seconds} seconds
                </span>
                <span className="text-[#111111]">
                  {" "}
                  for delivery by {productData.delivery.date}.
                </span>
              </p>

              {/* Add to Bag Button */}
              <div className="relative mt-5 mb-2.5 overflow-hidden">
                <Button className="w-full h-12 bg-[#444444] relative overflow-hidden">
                  <div className="absolute w-[626px] h-[57px] -top-1 left-[-72px] bg-[#111111] rotate-[-26.57deg]" />
                  <span className="relative font-normal text-white text-[11.7px] tracking-[0.58px] leading-[16.9px] z-10">
                    ADD TO BAG
                  </span>
                </Button>
              </div>

              <p className="font-normal text-[#111111] text-[13px] text-center leading-[19.5px]">
                💳 Buy this Product and earn {productData.points} points
              </p>
            </div>

            {/* Product Details Tabs */}
            <Tabs defaultValue="description" className="mt-8">
              <TabsList className="w-full justify-start border-b border-[#cccccc] bg-transparent p-0">
                <TabsTrigger
                  value="description"
                  className="px-4 py-3.5 pb-[15.6px] data-[state=active]:border-b-[1.6px] data-[state=active]:border-[#111111] data-[state=inactive]:opacity-40 rounded-none bg-transparent"
                >
                  <span className="font-semibold text-[#111111] text-sm">
                    Description
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="shipping"
                  className="px-4 py-[14.8px] data-[state=inactive]:opacity-40 rounded-none bg-transparent"
                >
                  <span className="font-semibold text-[#111111] text-sm">
                    Shipping
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="returns"
                  className="px-4 py-[14.8px] data-[state=inactive]:opacity-40 rounded-none bg-transparent"
                >
                  <span className="font-semibold text-[#111111] text-sm">
                    Returns
                  </span>
                </TabsTrigger>
              </TabsList>

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

              <TabsContent value="shipping">
                {/* Shipping content would go here */}
              </TabsContent>

              <TabsContent value="returns">
                {/* Returns content would go here */}
              </TabsContent>
            </Tabs>

            {/* Complete the Look */}
           
          </div>
        </div>
      </div>
    </section>
<RelatedProductsSection  />
<FooterByAnima />
<FooterWrapperByAnima/>
    </>
  );
};
