import { SearchIcon, ShoppingCartIcon } from "lucide-react";
import React from "react";

export const BannerByAnima = (): JSX.Element => {
  // Navigation menu items data
  const centerMenuItems = [
    { text: "Home", isActive: true },
    { text: "Pages", isActive: false },
    { text: "Shop", isActive: false },
    { text: "LANDING", isActive: false },
  ];

  return (
    <nav className="w-full cursor-pointer h-24 py-4 bg-black text-wwwmacofalltradescomwhite">
      <div className="container mx-auto flex items-center justify-between h-full">
        {/* Left section - SearchIcon */}
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <SearchIcon className="w-3.5 h-3.5" />
            <span className="font-['Outfit',Helvetica] font-normal text-xs tracking-[0.42px] leading-[27px]">
              SEARCH
            </span>
          </div>
        </div>

        {/* Center section - Navigation */}
        <div className="flex items-center gap-[54px]">
          {centerMenuItems.map((item, index) => (
            <div
              key={index}
              className={`flex items-center px-[3px] py-0 h-[95.2px] justify-center ${
                item.isActive ? "bg-wwwmacofalltradescomwhite" : ""
              }`}
            >
              <span className="font-['Outfit',Helvetica] font-normal text-xs tracking-[0.05px] leading-[27px]">
                {item.text}
              </span>
            </div>
          ))}
        </div>

        {/* Right section - Currency and Cart */}
        <div className="flex items-center gap-6">
          <div className="flex items-center">
            <span className="font-['Outfit',Helvetica] font-normal text-xs tracking-[0.42px] leading-[27px]">
              USD
            </span>
          </div>

          <div className="flex items-center">
            <img
              className="w-4 h-3.5"
              alt="Component"
              src="/component-1-3.svg"
            />
          </div>

          <div className="flex items-center">
            <img
              className="w-[15px] h-3.5"
              alt="Component"
              src="/component-1-6.svg"
            />
          </div>

          <div className="flex items-center gap-2">
            <ShoppingCartIcon className="w-[15px] h-[15px]" />
            <span className="font-['Outfit',Helvetica] font-normal text-xs tracking-[0.42px] leading-[27px]">
              CART / 0
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};
