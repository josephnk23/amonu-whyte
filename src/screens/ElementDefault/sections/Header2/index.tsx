import { ChevronDown, SearchIcon, ShoppingCartIcon, User2Icon, MenuIcon, XIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../../../../contexts/CartContext";
import { SearchOverlay } from "../../../../components/SearcHOverlay";

// Define navigation items without hardcoded active states
const navItems = [
  { text: "Home", url: "/" },
  { text: "Collection", url: "/collection" },
    { text: "Shop", url: "/products" },
];


export const BackgroundByAnima = (): JSX.Element => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const { totalItems, openCart } = useCart();
  const location = useLocation(); // Add useLocation hook

  // Function to determine if a navigation item is active
  const isActiveItem = (itemUrl: string) => {
    const currentPath = location.pathname;
    
    // Special case for home - only active when exactly on home page
    if (itemUrl === "/") {
      return currentPath === "/";
    }
    
    // For /products route, make it active for both /products and /products with search params
    if (itemUrl === "/products") {
      return currentPath === "/products" || currentPath.startsWith("/products?");
    }
    
    // For category routes, check if current path matches exactly
    if (itemUrl.startsWith("/product-category/")) {
      return currentPath === itemUrl;
    }
    
    // Default: check if current path starts with item URL
    return currentPath.startsWith(itemUrl);
  };

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
          isScrolled ? "bg-white shadow-md border-[1px] border-gray-200" : "bg-white border-[1px] border-gray-200"
        } hover:bg-white hover:shadow-md hover:border-gray-200`}
      >
        {/* SearchIcon Section */}
        <div className="flex items-center gap-8">
        <div className="flex items-center cursor-pointer" onClick={openSearch}>
          <div className="flex items-center">
            <SearchIcon className="w-4 h-4 text-black" />
            <div className="ml-2 hidden sm:block mt-px font-['Outfit',Helvetica] text-sm font-normal text-black tracking-[0.42px] leading-[27px]">
              Search
            </div>
          </div>
        </div>

        {/* Desktop Primary Navigation - Updated with dynamic active state */}
        <nav className="hidden md:flex items-center gap-[54px] px-[27px]">
          {navItems.map((item, index) => {
            const isActive = isActiveItem(item.url);
            return (
              <div key={index} className="h-[69.2px] flex items-center">
                <div className="px-[3px] py-0">
                  <Link to={item.url} 
                    className={`font-['Outfit',Helvetica] font-normal text-sm text-black tracking-[0.05px] leading-[27px] hover:text-gray-600 transition-colors ${
                      isActive ? "border-b-2 border-black font-medium" : ""
                    }`}
                  >
                    {item.text}
                  </Link>
                </div>
              </div>
            );
          })}
        </nav>
        </div>

        {/* Logo */}
       {/* Logo - Now truly centered */}
<div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center h-7">
  <Link to="/">
    <div className="w-[102.66px] h-[50px] bg-[url(/newlogo.png)] bg-cover bg-[50%_50%]" />
  </Link>
</div>

        {/* Desktop Secondary Navigation - Updated with dynamic active state */}
        <nav className="hidden md:flex items-center gap-[54px] px-[27px]">
          
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

        {/* Mobile Drawer - Updated with dynamic active state */}
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

              {/* Primary Navigation - Updated with dynamic active state */}
              {navItems.map((item, index) => {
                const isActive = isActiveItem(item.url);
                return (
                  <div
                    key={index}
                    className="w-full py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Link to={item.url} 
                      className={`font-['Outfit',Helvetica] font-normal text-sm text-black tracking-[0.05px] leading-[27px] ${
                        isActive ? "border-l-2 border-black pl-2 font-medium" : ""
                      }`}
                    >
                      {item.text}
                    </Link>
                  </div>
                );
              })}
              
              {/* Secondary Navigation - Updated with dynamic active state */}
              
              
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