// RelatedProductsSection.tsx
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { HeartIcon } from "lucide-react";

// UI Components (adjust paths to your project)
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

// 1. Product Data
const baseProducts = [
  {
    brand: "Lorenzo Veratti",
    name: "General Cargo Short 2.0 - Black Camo",
    price: "£48.00",
    image: "/1226526255-webp.png",
    url: "https://www.lorenzo.world/products/general-b-short-black-charcoal",
    discount: null,
  },
  {
    brand: "Lorenzo Veratti",
    name: "Al Jean - Black",
    price: "£65.00",
    image: "/1737613922-webp.png",
    url: "https://www.lorenzo.world/products/al-jean2-black",
    discount: null,
  },
  {
    brand: "Lorenzo Veratti",
    name: "World Tour Twinset - Khaki",
    price: "£75.00",
    image: "/1887860905-webp.png",
    url: "https://www.lorenzo.world/products/world-tour-twinset-brown",
    discount: null,
  },
  {
    brand: "Lorenzo",
    name: "Atelier Short - Off White",
    price: "£15.00",
    image: "/1737613922-webp-1.png",
    url: "https://www.lorenzo.world/products/atelier-shorts-off-white",
    discount: {
      originalPrice: "£40.00",
      saveAmount: "£25.00",
    },
  },
];

// 2. Duplicate Products
const recommendedProducts = [
  ...baseProducts.map((p, i) => ({ ...p, id: i + 1 })),
  ...baseProducts.map((p, i) => ({ ...p, id: i + baseProducts.length + 1 })),
];

type DotButtonProps = {
  selected: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const DotButton: React.FC<DotButtonProps> = ({ selected, onClick }) => (

  <button
    type="button"
    onClick={onClick}
    className={`w-3 h-3 rounded-full mx-1 transition-colors duration-300 ${
      selected ? "bg-black" : "bg-gray-300"
    }`}
    aria-label="carousel dot"
  />
);

// 4. Main Carousel Component
export const RelatedProductsSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    setScrollSnaps(emblaApi.scrollSnapList());
  }, [emblaApi, onSelect]);

  return (
    <>
    <section className="flex font-elfrida-qodeinteractive-com-semantic-heading-3-upper mb-5 flex-col w-full gap-2.5">
      <div className="w-full overflow-hidden">
        <div className="flex flex-col items-center pt-2.5">
          <div className="w-full max-w-[1526px] mt-10  mx-auto px-16 py-0">
            <div className="flex flex-col items-center py-2.5">
              <h2 className="font-normal text-xl text-center text-black">
                You May Also Like
              </h2>
            </div>

            {/* Embla Carousel Viewport */}
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {recommendedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex-[0_0_25%] p-2.5 min-w-[250px]"
                  >
                    <Card className="border-0 shadow-none">
                      <div className="relative">
                        <Button
                          variant="outline"
                          size="icon"
                          className="absolute top-2 left-2 z-10 bg-[#ffffffe6] rounded-md border border-solid border-[#00000012] w-8 h-8"
                        >
                          <HeartIcon className="w-5 h-[18px]" />
                        </Button>
                        <div
                          className="w-full h-[344px] bg-cover bg-center"
                          style={{ backgroundImage: `url(${product.image})` }}
                        />
                      </div>
                      <CardContent className="p-2.5">
                        <div className="flex flex-col items-center gap-2.5">
                          <a
                            href={product.url}
                            rel="noopener noreferrer"
                            target="_blank"
                            className="font-semibold text-[13px] text-black text-center w-full"
                          >
                            {product.brand}
                          </a>
                          <a
                            href={product.url}
                            rel="noopener noreferrer"
                            target="_blank"
                            className="font-normal text-[13px] text-black text-center w-full"
                          >
                            {product.name}
                          </a>
                          <div className="flex flex-wrap items-baseline justify-center w-full gap-0">
                            <a
                              href={product.url}
                              rel="noopener noreferrer"
                              target="_blank"
                              className="font-bold text-base text-black text-center flex-1"
                            >
                              {product.price}
                            </a>
                            {product.discount && (
                              <a
                                href={product.url}
                                rel="noopener noreferrer"
                                target="_blank"
                                className="font-bold text-xs text-[#888888] text-center ml-2.5"
                              >
                                SAVE {product.discount.saveAmount}
                              </a>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center mt-4">
              {scrollSnaps.map((_, index) => (
                <DotButton
                  key={index}
                  selected={index === selectedIndex}
                  onClick={() => emblaApi && emblaApi.scrollTo(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
    
    </>
  );
};
