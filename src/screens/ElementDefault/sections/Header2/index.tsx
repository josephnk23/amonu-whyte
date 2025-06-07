import { ChevronDown, SearchIcon, ShoppingCartIcon, User2Icon, MenuIcon, XIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../../../contexts/CartContext";
import { SearchOverlay } from "../../../../components/SearcHOverlay";

// Define navigation items for better maintainability
const navItems = [
  { text: "Home", active: true, url: "/" },
  { text: "Collection", active: false },
  { text: "Men", active: false },
  { text: "Women", active: false },
];

const secondaryNavItems = [
  { text: "Shop", active: false, url: "/products" },
  { text: "Accesories", active: false },
];

export const BackgroundByAnima = (): JSX.Element => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const { totalItems, openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openSearch = () => {
    setIsSearchOpen(true);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  return (
    <>
      <header
        className={`w-full h-[70px] fixed top-0 left-0 flex items-center justify-between px-4 sm:px-10 transition-all duration-300 z-50 group ${
          isScrolled ? "bg-white shadow-md border-[1px] border-gray-200" : "bg-transparent border-[1px] border-gray-200"
        } hover:bg-white hover:shadow-md hover:border-gray-200`}
      >
        {/* SearchIcon Section */}
        <div className="flex items-center cursor-pointer" onClick={openSearch}>
          <div className="flex items-center">
            <SearchIcon className="w-4 h-4 text-black" />
            <div className="ml-2 hidden sm:block mt-px font-['Outfit',Helvetica] text-sm font-normal text-black tracking-[0.42px] leading-[27px]">
              Search
            </div>
          </div>
        </div>

        {/* Desktop Primary Navigation */}
        <nav className="hidden md:flex items-center gap-[54px] px-[27px]">
          {navItems.map((item, index) => (
            <div key={index} className="h-[69.2px] flex items-center">
              <div className="px-[3px] py-0">
                <Link to={item.url || "/"} 
                  className={`font-['Outfit',Helvetica] font-normal text-sm text-black tracking-[0.05px] leading-[27px] ${
                    item.active ? "border-b-2 border-black" : ""
                  }`}
                >
                  {item.text}
                </Link>
              </div>
            </div>
          ))}
        </nav>

        {/* Logo */}
        <div className="flex items-center justify-center h-7">
          <div className="w-[102.66px] h-[50px] bg-[url(/newlogo.png)] bg-cover bg-[50%_50%]" />
        </div>

        {/* Desktop Secondary Navigation */}
        <nav className="hidden md:flex items-center gap-[54px] px-[27px]">
          {secondaryNavItems.map((item, index) => (
            <div key={index} className="h-[69px] flex items-center">
              <div className="px-[3px] py-0">
                <Link to={item.url || "/"} className="font-['Outfit',Helvetica] font-normal text-black text-sm tracking-[0.42px] leading-[27px]">
                  {item.text}
                </Link>
              </div>
            </div>
          ))}
        </nav>

        {/* Desktop Right Side Elements */}
        <div className="hidden md:flex items-center gap-4">
          {/* User Icon */}
          <div className="flex items-center pl-3 pr-5">
            <User2Icon className="h-5 text-black" />
          </div>

          {/* Cart */}
          <div className="flex items-center cursor-pointer" onClick={openCart}>
            <ShoppingCartIcon className={`h-5 text-black`} />
            <div className="ml-[10px] mt-1 font-['Outfit',Helvetica] font-normal text-black text-sm tracking-[0.42px] leading-[27px]">
              CART / {totalItems}
            </div>
          </div>
        </div>

        {/* Burger Menu for Mobile */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? (
              <XIcon className="h-6 w-6 text-black" />
            ) : (
              <MenuIcon className="h-6 w-6 text-black" />
            )}
          </button>
        </div>

        {/* Mobile Drawer */}
        {isMenuOpen && (
          <div
            className={`md:hidden fixed top-[70px] left-0 w-full bg-white shadow-md border-[1px] border-gray-200 transition-all duration-300 z-40 ${
              isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
            }`}
          >
            <nav className="flex flex-col items-start p-4">
              {/* Search in Mobile */}
              <div className="w-full py-2 cursor-pointer" onClick={openSearch}>
                <div className="flex items-center">
                  <SearchIcon className="h-5 text-black" />
                  <span className="ml-2 font-['Outfit',Helvetica] font-normal text-sm text-black tracking-[0.05px] leading-[27px]">
                    Search
                  </span>
                </div>
              </div>

              {/* Primary Navigation */}
              {navItems.map((item, index) => (
                <div
                  key={index}
                  className="w-full py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link to={item.url || "/"} 
                    className={`font-['Outfit',Helvetica] font-normal text-sm text-black tracking-[0.05px] leading-[27px] ${
                      item.active ? "border-l-2 border-black pl-2" : ""
                    }`}
                  >
                    {item.text}
                  </Link>
                </div>
              ))}
              
              {/* Secondary Navigation */}
              {secondaryNavItems.map((item, index) => (
                <div
                  key={index}
                  className="w-full py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link to={item.url || "/"} className="font-['Outfit',Helvetica] font-normal text-sm text-black tracking-[0.05px] leading-[27px]">
                    {item.text}
                  </Link>
                </div>
              ))}
              
              {/* User Icon */}
              <div
                className="w-full py-2 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <User2Icon className="h-5 text-black" />
                <span className="ml-2 font-['Outfit',Helvetica] font-normal text-sm text-black tracking-[0.05px] leading-[27px]">
                  Account
                </span>
              </div>
              
              {/* Cart */}
              <div
                className="w-full py-2 flex items-center"
                onClick={() => {
                  setIsMenuOpen(false);
                  openCart();
                }}
              >
                <ShoppingCartIcon className="h-5 text-black" />
                <span className="ml-2 font-['Outfit',Helvetica] font-normal text-sm text-black tracking-[0.05px] leading-[27px]">
                  CART / {totalItems}
                </span>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Search Overlay Component */}
      <SearchOverlay isOpen={isSearchOpen} onClose={closeSearch} />
    </>
  );
};