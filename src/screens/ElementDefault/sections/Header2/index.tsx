import { ChevronDown, SearchIcon, ShoppingCartIcon, User2Icon } from "lucide-react";
import React, { useState, useEffect } from "react";

// Define navigation items for better maintainability
const navItems = [
  { text: "Home", active: true },
  { text: "Collection ", active: false },
  { text: "Men ", active: false },
  { text: "Women ", active: false },
];

const secondaryNavItems = [
  { text: "Shop", active: false },
  { text: "Accesories", active: false },
];

export const BackgroundByAnima = (): JSX.Element => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full h-[70px] fixed top-0 left-0 flex items-center justify-between px-10 transition-all duration-300 z-50 group ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      } hover:bg-wwwmacofalltradescomwhite  border-[1px] hover:shadow-md`} // Note: ensure 'bg-wwwmacofalltradescomwhite' is a defined color in your tailwind.config.js
    >
      {/* SearchIcon Section */}
      <div className="flex items-center">
        <div className="flex items-center">
          <SearchIcon className="w-3.5 h-3.5 text-black" />
          <div className="ml-2 mt-px font-['Outfit',Helvetica] text-base font-normal text-black  tracking-[0.42px] leading-[27px]">
            SEARCH
          </div>
        </div>
      </div>

      {/* Primary Navigation */}
      <nav className="flex items-center gap-[54px] px-[27px]">
        {navItems.map((item, index) => (
          <div key={index} className="h-[69.2px] flex items-center">
            <div className="px-[3px] py-0">
              <div
                className={`font-['Outfit',Helvetica] font-normal text-sm text-black tracking-[0.05px] leading-[27px] ${
                  item.active ? "" : "" // Consider adding active state styling here e.g., 'border-b-2 border-color'
                }`}
              >
                {item.text}
              </div>
            </div>
          </div>
        ))}
      </nav>

      {/* Logo */}
      <div className="flex items-center justify-center h-7">
        {/* Assuming the logo itself needs to change for light/dark background, you might need two versions or an SVG that adapts */}
        <div className="w-[102.66px] h-[50px] bg-[url(/newlogo.png)] bg-cover bg-[50%_50%]" />
      </div>

      {/* Secondary Navigation */}
      <nav className="flex items-center gap-[54px] px-[27px]">
        {secondaryNavItems.map((item, index) => (
          <div key={index} className="h-[69px] flex items-center">
            <div className="px-[3px] py-0">
              <div className="font-['Outfit',Helvetica] font-normal text-black text-sm tracking-[0.42px] leading-[27px]">
                {item.text}
              </div>
            </div>
          </div>
        ))}
      </nav>

      {/* Right Side Elements */}
      <div className="flex items-center gap-4">
        {/* Currency Selector */}
        <div className="font-elfrida-qodeinteractive-com-semantic-label-upper flex items-center font-[number:var(--elfrida-qodeinteractive-com-semantic-label-upper-font-weight)] text-black text-[length:var(--elfrida-qodeinteractive-com-semantic-label-upper-font-size)] tracking-[var(--elfrida-qodeinteractive-com-semantic-label-upper-letter-spacing)] leading-[var(--elfrida-qodeinteractive-com-semantic-label-upper-line-height)]">
          USD
          <ChevronDown className="h-5 ml-0 text-black" />
        </div>

        {/* User Icon */}
        <div className="flex items-center pl-3 pr-5">
          <User2Icon className="h-5 text-black" />
        </div>

        {/* Cart */}
        <div className="flex items-center">
          <ShoppingCartIcon className="h-5 text-black" />
          <div className="ml-[10px] mt-1 font-['Outfit',Helvetica] font-normal text-black text-sm tracking-[0.42px] leading-[27px]">
            CART / 0
          </div>
        </div>
      </div>
    </header>
  );
};