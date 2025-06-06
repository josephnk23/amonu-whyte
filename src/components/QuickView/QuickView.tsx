import React, { useState } from "react";
import { X, Eye, Minus, Plus, Truck, HelpCircle, Share2 } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  originalPrice: number;
  badge?: string;
  colors?: string[];
  selectedColor?: number;
  category: string;
  color: string;
  size: string;
}

interface QuickViewProps {
  product: Product;
  children?: React.ReactNode;
}

export const QuickView: React.FC<QuickViewProps> = ({ product, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("US4 / UK8");

  const sizeOptions = [
    "US4 / UK8",
    "US6 / UK10", 
    "US8 / UK12",
    "US10 / UK14",
    "US12 / UK16"
  ];

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const formatPrice = (price: string) => {
    // Convert price format from "120.00$" to "$300.00 USD"
    const numericPrice = price.replace(/[^0-9.-]/g, '');
    return `$${numericPrice} USD`;
  };

  // Handle click on the eye icon to prevent parent click
  const handleEyeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsOpen(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children || (
          <button
            onClick={handleEyeClick}
            className="absolute top-3 right-3 z-20 bg-white/80 hover:bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 border-0 cursor-pointer"
            type="button"
          >
            <Eye className="h-4 w-4 text-gray-700" />
          </button>
        )}
      </DialogTrigger>
      
      <DialogContent 
        className="max-w-5xl w-[95vw] font-elfrida-qodeinteractive-com-semantic-label-upper max-h-[90vh] p-0 bg-white rounded-none overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex h-full max-h-[90vh]">
          {/* Left side - Image */}
          <div className="flex-1 relative bg-gray-50 min-h-0 overflow-hidden">
            <div className="w-full h-full relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center"
                style={{ 
                  maxHeight: '90vh',
                  objectFit: 'cover'
                }}
              />
              {product.badge && (
                <Badge className="absolute top-6 left-6 bg-transparent text-black border border-gray-300 rounded-none z-10">
                  {product.badge}
                </Badge>
              )}
            </div>
          </div>

          {/* Right side - Product Details */}
          <div className="w-[480px] min-w-[480px] max-w-[480px] flex flex-col relative">
            {/* Close button */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 z-30 p-2 hover:bg-gray-100 rounded-none"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setIsOpen(false);
              }}
            >
              <X className="h-5 w-5" />
            </Button>

            {/* Scrollable content area */}
            <div className="flex-1 overflow-y-auto p-8 pt-12">
              {/* Product Info */}
              <div className="mb-6">
                <h1 className="text-2xl font-normal text-black mb-2 tracking-wide">
                  {product.name}
                </h1>
                <div className="text-2xl font-normal text-black mb-6">
                  {formatPrice(product.price)}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-gray-700">
                    Size: {selectedSize}
                  </label>
                  <button className="text-sm text-gray-600 underline hover:text-black">
                    Find your size
                  </button>
                </div>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger className="w-full h-12 border-gray-300 rounded-none bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-none">
                    {sizeOptions.map((size) => (
                      <SelectItem key={size} value={size} className="rounded-none">
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

            

            
              
              {/* Quantity */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Quantity
                </label>
                <div className="flex items-center border border-gray-300 w-32">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-12 w-12 rounded-none border-0 hover:bg-gray-50"
                    onClick={() => handleQuantityChange(-1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="flex-1 text-center font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-12 w-12 rounded-none border-0 hover:bg-gray-50"
                    onClick={() => handleQuantityChange(1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <Button 
                className="w-full h-14 bg-black text-white text-sm font-medium rounded-none hover:bg-gray-800 mb-6"
                onClick={(e) => {
                  e.stopPropagation();
                  // Add to cart logic here
                }}
              >
                Add to cart - {formatPrice(product.price)}
              </Button>

              {/* Action Buttons */}
              <div className="flex items-center justify-between text-sm mb-6">
                <button 
                  className="flex items-center gap-2 text-gray-600 hover:text-black"
                  onClick={(e) => e.stopPropagation()}
                >
                  <HelpCircle className="w-4 h-4" />
                  Ask a question
                </button>
                <button 
                  className="flex items-center gap-2 text-gray-600 hover:text-black"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Truck className="w-4 h-4" />
                  Delivery & Return
                </button>
                <button 
                  className="flex items-center gap-2 text-gray-600 hover:text-black"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Share2 className="w-4" />
                  Share
                </button>
              </div>

              {/* View Full Details */}
              <div className="pt-6 border-t border-gray-200">
                <button 
                  className="text-sm text-gray-700 hover:text-black flex items-center gap-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  View full details
                  <span className="text-lg">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};