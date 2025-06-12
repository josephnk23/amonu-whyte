import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Define data for product cards
const settings = {
  dots: false, // Disable dots
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
  pauseOnHover: true,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  // Enable arrows
  fade: true, 
  cssEase: "linear",
  // Disable fade for sliding
  // rtl: true, // Right-to-left sliding (images enter from right)
  responsive: [
    {
      breakpoint: 640,
      settings: {
        arrows: false, // Hide arrows on mobile
      },
    },
  ],
};

type ArrowProps = {
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

function SampleNextArrow(props: ArrowProps) {
  const {  onClick } = props;
  return (
    <div
      className="absolute right-5 top-1/2 -translate-y-1/2  flex items-center justify-center    transition-colors cursor-pointer z-10"
      onClick={onClick}
    >
      <svg
        className="w-20 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M9 5l7 7-7 7" />
      </svg>
    </div>
  );
}

// Custom Previous Arrow Component
function SamplePrevArrow(props: ArrowProps) {
  const {  onClick } = props;
  return (
    <div
      className="absolute left-5 top-1/2 -translate-y-1/2  flex items-center justify-center  hover:border-gray-200 transition-colors cursor-pointer z-10"
      onClick={onClick}
    >
      <svg
        className="w-20 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M15 19l-7-7 7-7" />
      </svg>
    </div>
  );
}

const images = [
  'https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
];

const jewelryProducts = [
  {
    id: 1,
    image: "/a.png",
    title: "GOLDEN NECKLASE",
    price: "260.00$",
  },
  {
    id: 2,
    image: "/home-1-shop-list-3jpg-jpg.png",
    title: "EARRINGS",
    price: "260.00$",
  },
  {
    id: 3,
    image: "/y.png",
    title: "WEDDING RING",
    price: "260.00$",
  },
];

const newArrivals = [
  {
    id: 1,
    image: "/r.png",
    title: "BORDEUX",
    description: "Lorem ipsum dolor sit amet",
    price: "320.00$",
  },
  {
    id: 2,
    image: "/g.png",
    title: "YELLOW BAG",
    description: "Lorem ipsum dolor sit amet",
    price: "250.00$",
  },
  {
    id: 3,
    image: "/g-1.png",
    title: "BROWN",
    description: "Lorem ipsum dolor sit amet",
    price: "320.00$",
  },
  {
    id: 4,
    image: "/f.png",
    title: "BORDEUX BAG",
    description: "Lorem ipsum dolor sit amet",
    price: "320.00$",
  },
];

const clientLogos = [
  { id: 1, image: "/clients-img-1-png.png" },
  { id: 2, image: "/clients-img-2-png.png" },
  { id: 3, image: "/clients-img-3-png.png" },
  { id: 4, image: "/clients-img-4-png.png" },
  { id: 5, image: "/clients-img-5-png.png" },
  { id: 6, image: "/clients-img-6-png.png" },
];

const blogPosts = [
  {
    id: 1,
    image: "/j.png",
    date: "JUNE 19, 2024",
    category: "SUMMER",
    title:
      "THE LATEST FASHION TRENDS REDEFINE ELEGANCE, BLENDING STYLE WITH BEAUTY",
  },
  {
    id: 2,
    image: "/g-2.png",
    date: "JUNE 19, 2024",
    category: "SUMMER",
    title:
      "BEAUTY ROUTINES ENHANCE CONFIDENCE, COMPLEMENTING YOUR FASHION CHOICES",
  },
  {
    id: 3,
    image: "/g-3.png",
    date: "JUNE 19, 2024",
    category: "SUMMER",
    title:
      "FASHION AND BEAUTY EVOLVE, REFLECTING CULTURAL INFLUENCES AND CREATIVITY",
  },
];

export const MainByAnima = () => {
  return (
    <section className="w-full">
      {/* Hero Section */}
      <div className="w-full h-screen xl:h-[600px]">
        <style>{`
          .carousel-image {
            transition: transform 4s ease-in-out;
            transform-origin: center;
          }
          .slick-current .carousel-image {
            transform: scale(1.1);
          }
        `}</style>
        <div className="w-full mx-auto h-screen xl:h-[600px]">
          <Slider {...settings}>
            {images.map((image, index) => (
              <div key={index} className="relative h-screen xl:h-[600px]">
                <img
                  src={image}
                  alt={`Fashion Slide ${index + 1}`}
                  className="carousel-image w-full h-full object-cover"
                />
                <div className="absolute inset-0 font-elfrida-qodeinteractive-com-semantic-heading-3-upper flex items-center justify-center">
                  <div className="text-center text-white">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                      New Collection
                    </h1>
                    <p className="text-lg md:text-xl mb-6">
                      Discover the Latest Fashion Trends
                    </p>
      <button className="relative overflow-hidden border border-white text-white font-semibold px-6 py-3 group">
  <span className="relative z-10 font-elfrida-qodeinteractive-com-semantic-heading-3-upper transition-colors duration-300 group-hover:text-black">
   SHOP NOW
  </span>
  <span className="absolute inset-0 bg-white translate-y-[-100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0"></span>
</button>

                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* Heading Section */}
      <div className="w-full flex justify-center mt-24 mb-16">
        <div className="text-center font-elfrida-qodeinteractive-com-semantic-heading-3-upper font-[number:var(--elfrida-qodeinteractive-com-semantic-heading-3-upper-font-weight)] text-[#18191a] text-[length:var(--elfrida-qodeinteractive-com-semantic-heading-3-upper-font-size)] tracking-[var(--elfrida-qodeinteractive-com-semantic-heading-3-upper-letter-spacing)] leading-[var(--elfrida-qodeinteractive-com-semantic-heading-3-upper-line-height)] [font-style:var(--elfrida-qodeinteractive-com-semantic-heading-3-upper-font-style)]">
          ELEGANCE EXPRESS:
          <br />
          CLASSIC AND
          <br />
          CONTEMPORARY STYLES
        </div>
      </div>

      {/* Jewelry Features Section */}
      <div className="w-full flex flex-col md:flex-row justify-center gap-8 px-6 md:px-20 lg:px-[100px] mb-20">
        {/* Featured Image */}
        <div className="relative w-full md:w-[600px] h-[748px] bg-[url(/s.png)] bg-cover bg-center">
          <div className="absolute w-[245px] top-[618px] left-1/2 -translate-x-1/2 font-elfrida-qodeinteractive-com-semantic-heading-4-upper font-[number:var(--elfrida-qodeinteractive-com-semantic-heading-4-upper-font-weight)] text-wwwmacofalltradescomwhite text-[length:var(--elfrida-qodeinteractive-com-semantic-heading-4-upper-font-size)] text-center tracking-[var(--elfrida-qodeinteractive-com-semantic-heading-4-upper-letter-spacing)] leading-[var(--elfrida-qodeinteractive-com-semantic-heading-4-upper-line-height)] whitespace-nowrap [font-style:var(--elfrida-qodeinteractive-com-semantic-heading-4-upper-font-style)]">
            FINE JEWELRY FEATURES
          </div>

          <div className="absolute top-[658px] left-1/2 -translate-x-1/2">
         <button className="relative overflow-hidden border border-white text-white  px-6 py-3 group">
  <span className="relative z-10 font-elfrida-qodeinteractive-com-semantic-heading-3-upper transition-colors duration-300 group-hover:text-black">
   SHOP NOW
  </span>
  <span className="absolute inset-0 bg-white translate-y-[-100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0"></span>
</button>
          </div>
        </div>

        <div className="relative w-full md:w-[600px] h-[748px] bg-[url(https://s7.toryburch.com/is/image/ToryBurch/0429_HP_BR2_Handbags_DSK.dq-1494x1494.jpg)] bg-cover bg-center">
          <div className="absolute w-[245px] top-[618px] left-1/2 -translate-x-1/2 font-elfrida-qodeinteractive-com-semantic-heading-4-upper font-[number:var(--elfrida-qodeinteractive-com-semantic-heading-4-upper-font-weight)] text-wwwmacofalltradescomwhite text-[length:var(--elfrida-qodeinteractive-com-semantic-heading-4-upper-font-size)] text-center tracking-[var(--elfrida-qodeinteractive-com-semantic-heading-4-upper-letter-spacing)] leading-[var(--elfrida-qodeinteractive-com-semantic-heading-4-upper-line-height)] whitespace-nowrap [font-style:var(--elfrida-qodeinteractive-com-semantic-heading-4-upper-font-style)]">
            FINE JEWELRY FEATURES
          </div>

          <div className="absolute top-[658px] left-1/2 -translate-x-1/2">
          <button className="relative overflow-hidden border border-white text-white  px-6 py-3 group">
  <span className="relative z-10 font-elfrida-qodeinteractive-com-semantic-heading-3-upper transition-colors duration-300 group-hover:text-black">
   SHOP NOW
  </span>
  <span className="absolute inset-0 bg-white translate-y-[-100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0"></span>
</button>
          </div>
        </div>

        <div className="relative w-full md:w-[600px] h-[748px] bg-[url(https://s7.toryburch.com/is/image/ToryBurch/0429_HP_BR4_Runway_DSK.dq-1494x1494.jpg)] bg-cover bg-center">
          <div className="absolute w-[245px] top-[618px] left-1/2 -translate-x-1/2 font-elfrida-qodeinteractive-com-semantic-heading-4-upper font-[number:var(--elfrida-qodeinteractive-com-semantic-heading-4-upper-font-weight)] text-wwwmacofalltradescomwhite text-[length:var(--elfrida-qodeinteractive-com-semantic-heading-4-upper-font-size)] text-center tracking-[var(--elfrida-qodeinteractive-com-semantic-heading-4-upper-letter-spacing)] leading-[var(--elfrida-qodeinteractive-com-semantic-heading-4-upper-line-height)] whitespace-nowrap [font-style:var(--elfrida-qodeinteractive-com-semantic-heading-4-upper-font-style)]">
            FINE JEWELRY FEATURES
          </div>

          <div className="absolute top-[658px] left-1/2 -translate-x-1/2">
           <button className="relative overflow-hidden border border-white text-white  px-6 py-3 group">
  <span className="relative z-10 font-elfrida-qodeinteractive-com-semantic-heading-3-upper transition-colors duration-300 group-hover:text-black">
   SHOP NOW
  </span>
  <span className="absolute inset-0 bg-white translate-y-[-100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0"></span>
</button>
          </div>
        </div>

        {/* Product Cards */}
        {/* <div className="flex flex-col md:flex-row gap-[30px] w-full">
          {jewelryProducts.map((product) => (
            <div key={product.id} className="flex-1">
              <Card className="border border-[#cccccc] rounded-none">
                <CardContent className="p-[0.8px]">
                  <div
                    className="w-full h-[504.15px] bg-cover bg-center"
                    style={{ backgroundImage: `url(${product.image})` }}
                  />
                </CardContent>
              </Card>
              <div className="mt-3">
                <h3 className="font-['Outfit',Helvetica] font-normal text-[#18191a] text-[17px] tracking-[0.43px] leading-6">
                  {product.title}
                </h3>
                <p className="font-['Outfit',Helvetica] font-normal text-[#18191a] text-sm tracking-[0.35px] leading-[21px] mt-1">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div> */}
      </div>

      {/* Fashion Boutique Section */}
      <div className="w-full bg-elfridaqodeinteractivecomspring-wood py-24">
        <div className="flex flex-col md:flex-row px-6 md:px-20 lg:px-[100px]">
          <div className="w-full md:w-1/2 pr-0 md:pr-12 mb-12 md:mb-0">
            <img
              className=""
              alt="Mask group"
              src="/newlogo.png"
            />

            <div className="mt-6">
              <h2 className="font-elfrida-qodeinteractive-com-semantic-heading-3-upper font-[number:var(--elfrida-qodeinteractive-com-semantic-heading-3-upper-font-weight)] text-[#18191a] text-[length:var(--elfrida-qodeinteractive-com-semantic-heading-3-upper-font-size)] tracking-[var(--elfrida-qodeinteractive-com-semantic-heading-3-upper-letter-spacing)] leading-[var(--elfrida-qodeinteractive-com-semantic-heading-3-upper-line-height)] [font-style:var(--elfrida-qodeinteractive-com-semantic-heading-3-upper-font-style)]">
                STEP INTO OUR FASHION BOUTIQUE WHERE
                <br />
                ELEGANCE MEETS TRENDSETTING STYLE
              </h2>
            </div>

            <div className="mt-4">
              <p className="font-elfrida-qodeinteractive-com-DM-sans-9pt-regular font-[number:var(--elfrida-qodeinteractive-com-DM-sans-9pt-regular-font-weight)] text-elfridaqodeinteractivecommine-shaft text-[length:var(--elfrida-qodeinteractive-com-DM-sans-9pt-regular-font-size)] tracking-[var(--elfrida-qodeinteractive-com-DM-sans-9pt-regular-letter-spacing)] leading-[var(--elfrida-qodeinteractive-com-DM-sans-9pt-regular-line-height)] [font-style:var(--elfrida-qodeinteractive-com-DM-sans-9pt-regular-font-style)]">
                Offering a curated collection of haute couture, timeless
                classics,
                <br />
                and must-have accessories designed to elevate your wardrobe and
                <br />
                celebrate your unique sense of fashion.
              </p>
            </div>

            <div className="mt-12">
              <Button className="bg-black hover:bg-black/90 text-wwwmacofalltradescomwhite text-xs tracking-[0.66px] leading-[27px] px-14 py-3 h-auto rounded-none">
                DISCOVER MORE
              </Button>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <img
              className="w-full max-w-[893px] h-auto"
              alt="Mask group"
              src="/mask-group-1.svg"
            />
          </div>
        </div>
      </div>

      {/* New Arrivals Section */}
      {/* New Arrivals Section */}
      <div className="w-full px-6 md:px-20 lg:px-[100px] py-16">
        <h2 className="font-elfrida-qodeinteractive-com-semantic-heading-2-upper font-[number:var(--elfrida-qodeinteractive-com-semantic-heading-2-upper-font-weight)] text-[#18191a] text-[length:var(--elfrida-qodeinteractive-com-semantic-heading-2-upper-font-size)] tracking-[var(--elfrida-qodeinteractive-com-semantic-heading-2-upper-letter-spacing)] leading-[var(--elfrida-qodeinteractive-com-semantic-heading-2-upper-line-height)]  [font-style:var(--elfrida-qodeinteractive-com-semantic-heading-2-upper-font-style)] mb-12">
          NEW ARRIVALS SPRING SUMMER
        </h2>

        <div className="w-full overflow-hidden">
          <div className="flex gap-[20px] flex-wrap pb-8">
            {newArrivals.map((product) => (
              <div
                key={product.id}
                className="w-[calc(50%-10px)] sm:w-[calc(50%-10px)] md:w-[calc(33.33%-13.33px)] lg:w-[calc(25%-15px)] flex-none group"
              >
                <Card className="border border-[#cccccc] rounded-none ">
                  <CardContent className="relative overflow-hidden p-0">
                    <div
                      className=" w-full h-[611.5px] bg-cover bg-center"
                      style={{ backgroundImage: `url(${product.image})` }}
                    >
                      <button className="absolute bottom-0 left-0 right-0 bg-black text-white text-sm font-['Outfit',Helvetica] py-3 opacity-0 translate-y-[100%] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out">
                        Select Options
                      </button>
                    </div>
                  </CardContent>
                </Card>
                <div className="mt-4">
                  <h3 className="font-['Outfit',Helvetica] font-normal text-[#18191a] text-[17px] tracking-[0.43px] leading-6">
                    {product.title}
                  </h3>
                  <p className="font-['DM_Sans',Helvetica] font-normal text-elfridaqodeinteractivecomtundora text-sm tracking-[0] leading-[25px] mt-1">
                    {product.description}
                  </p>
                  <p className="font-['Outfit',Helvetica] font-normal text-[#18191a] text-sm tracking-[0.35px] leading-[21px] mt-4">
                    {product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Parallax Section */}
      {/* <div className="relative w-full min-h-[924px] bg-elfridaqodeinteractivecomgallery flex items-end">
        <div className="absolute inset-0 overflow-hidden">
          <div className="w-full h-[1109px] -top-28 relative bg-[url(/parallax-image.png)] bg-cover bg-center" />
        </div>

        <div className="relative z-10 flex flex-col gap-10 p-16 md:p-[153.6px] md:pt-0 max-w-3xl">
          <h2 className="font-elfrida-qodeinteractive-com-bona-nova-bold font-[number:var(--elfrida-qodeinteractive-com-bona-nova-bold-font-weight)] text-wwwmacofalltradescomwhite text-[length:var(--elfrida-qodeinteractive-com-bona-nova-bold-font-size)] tracking-[var(--elfrida-qodeinteractive-com-bona-nova-bold-letter-spacing)] leading-[var(--elfrida-qodeinteractive-com-bona-nova-bold-line-height)] [font-style:var(--elfrida-qodeinteractive-com-bona-nova-bold-font-style)]">
            Must-have accessories designed to elevate your
            <br />
            wardrobe and celebrate your unique sense of fashion
          </h2>

                     <button
              className="group overflow-hidden 
    border border-white 
    text-white  
    px-6 py-3  
    font-semibold 
    w-[200px]
    focus:outline-none
    
    relative 
     
  "
            >
              <span
                className="
      relative 
      z-10 
      transition-colors duration-300 ease-in-out
      group-hover:text-[#18191a] uppercase font-elfrida-qodeinteractive-com-semantic-heading-3-upper  text-wwwmacofalltradescomwhite
    "
              >
                DISCOVER
              </span>
              <span
                className="
      absolute 
      top-0
      left-0
      w-full
      h-full
      bg-white 
      transform -translate-y-full 
      transition-transform duration-300 ease-in-out 
      group-hover:translate-y-0 
      z-0 
    "
              ></span>
            </button>
        </div>
      </div> */}

      {/* Blog Section */}
      {/* <div className="w-full px-6 md:px-20 lg:px-[100px] py-16">
        <h2 className="font-elfrida-qodeinteractive-com-semantic-heading-2-upper font-[number:var(--elfrida-qodeinteractive-com-semantic-heading-2-upper-font-weight)] text-[#18191a] text-[length:var(--elfrida-qodeinteractive-com-semantic-heading-2-upper-font-size)] tracking-[var(--elfrida-qodeinteractive-com-semantic-heading-2-upper-letter-spacing)] leading-[var(--elfrida-qodeinteractive-com-semantic-heading-2-upper-line-height)] whitespace-nowrap [font-style:var(--elfrida-qodeinteractive-com-semantic-heading-2-upper-font-style)] mb-12">
          STYLE STORIES: INSIDE THE FASHION STORE
        </h2>

        <div className="flex flex-col md:flex-row gap-8">
          {blogPosts.map((post) => (
            <div key={post.id} className="w-full md:w-1/3">
              <div className="relative w-full h-[507px] overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${post.image})` }}
                />
                <div className="absolute top-0 left-0 bg-[#121212] px-3 py-1">
                  <span className="font-['Outfit',Helvetica] font-normal text-wwwmacofalltradescomwhite text-sm tracking-[0] leading-[21px]">
                    {post.date}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-center mt-5">
                <span className="font-['Outfit',Helvetica] font-normal text-elfridaqodeinteractivecomtundora text-xs text-center tracking-[0.42px] leading-[21px]">
                  {post.category}
                </span>

                <h3 className="font-['Outfit',Helvetica] font-normal text-[#18191a] text-xl text-center tracking-[0.50px] leading-7 mt-3">
                  {post.title}
                </h3>

                <Button className="bg-black hover:bg-black/90 text-wwwmacofalltradescomblack text-xs tracking-[0.66px] leading-[19.2px] px-3 py-0 h-auto mt-6 rounded-none">
                  READ THE STORY
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </section>
  );
};