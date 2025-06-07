import React from 'react';
import { Link } from 'react-router-dom';
import { X, Minus, Plus, ArrowLeft } from 'lucide-react';
import { useCart } from '../../../../contexts/CartContext';
import { Button } from '../../../../components/ui/button';
import { Card, CardContent } from '../../../../components/ui/card';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '../../../../components/ui/breadcrumb';
import { BackgroundByAnima } from '../Header2'; 
import { FooterByAnima } from '../FooterByAnima';
import { FooterWrapperByAnima } from '../FooterWrapperByAnima/FooterWrapperByAnima';

// Helper function to format price
const formatPrice = (price: number) => {
  return `${price.toFixed(2)} ₵`;
};

export const CartPage: React.FC = () => {
  const { items, totalPrice, updateQuantity, removeItem, clearCart } = useCart();

  return (
    <>
      <BackgroundByAnima />
      
      {/* Breadcrumb */}
        <Breadcrumb className="w-full text-black py-4 border-b-[1px] font-elfrida-qodeinteractive-com-semantic-label-upper font">
       <div className="w-full mt-20 container mx-auto px-4 py-0">
          <BreadcrumbList className="flex items-center gap-2">
            <BreadcrumbItem>
              <BreadcrumbLink className='text-base' href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <span className='text-base'>Cart</span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </div>    
      </Breadcrumb>

     

      <section className="w-full font-elfrida-qodeinteractive-com-semantic-heading-3-upper font">
        <div className="max-w-[1526px] mt-10 mx-auto px-4 md:px-8 lg:px-16 py-8">
          
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="font-['Outfit',Helvetica] font-normal text-[#111111] text-2xl lg:text-3xl tracking-[0.05px]">
                SHOPPING CART
              </h1>
              <Link 
                to="/products" 
                className="flex items-center gap-2 font-['Outfit',Helvetica] text-sm text-gray-600 hover:text-black transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Continue Shopping
              </Link>
            </div>
          </div>

          {items.length === 0 ? (
            // Empty Cart State
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <h2 className="font-['Outfit',Helvetica] font-normal text-[#111111] text-xl mb-4">
                  Your cart is empty
                </h2>
                <p className="font-['Outfit',Helvetica] text-gray-600 text-sm mb-8">
                  Looks like you haven't added any items to your cart yet.
                </p>
                <Link to="/products">
                  <Button className="bg-black text-white rounded-none px-8 py-3 font-['Outfit',Helvetica] text-sm tracking-[0.05px] hover:bg-gray-800 transition-colors">
                    START SHOPPING
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">
              
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="space-y-6">
                  
                  {/* Desktop Table Header */}
                  <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-gray-200">
                    <div className="col-span-6">
                      <span className="font-['Outfit',Helvetica] font-normal text-[#111111] text-sm tracking-[0.05px]">
                        PRODUCT
                      </span>
                    </div>
                    <div className="col-span-2 text-center">
                      <span className="font-['Outfit',Helvetica] font-normal text-[#111111] text-sm tracking-[0.05px]">
                        PRICE
                      </span>
                    </div>
                    <div className="col-span-2 text-center">
                      <span className="font-['Outfit',Helvetica] font-normal text-[#111111] text-sm tracking-[0.05px]">
                        QUANTITY
                      </span>
                    </div>
                    <div className="col-span-2 text-center">
                      <span className="font-['Outfit',Helvetica] font-normal text-[#111111] text-sm tracking-[0.05px]">
                        TOTAL
                      </span>
                    </div>
                  </div>

                  {/* Cart Items List */}
                  {items.map((item) => (
                    <Card key={item.id} className="border shadow-none border-gray-200 rounded-none overflow-hidden">
                      <CardContent className="p-0">
                        
                        {/* Desktop Layout */}
                        <div className="hidden md:grid grid-cols-12 gap-4 p-6 items-center">
                          
                          {/* Product Info */}
                          <div className="col-span-6 flex gap-4">
                            <div className="w-20 h-20 bg-gray-100 overflow-hidden flex-shrink-0">
                              <img 
                                src={item.image} 
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <Link 
                                to={`/product/${item.id}`}
                                className="font-['Outfit',Helvetica] font-normal text-[#111111] text-base tracking-[0.05px] hover:text-gray-600 transition-colors"
                              >
                                {item.name}
                              </Link>
                              <p className="font-['Outfit',Helvetica] text-gray-500 text-sm mt-1">
                                SKU: #{item.id.toString().padStart(4, '0')}
                              </p>
                            </div>
                          </div>
                          
                          {/* Price */}
                          <div className="col-span-2 text-center">
                            <span className="font-['Outfit',Helvetica] font-normal text-[#111111] text-sm">
                              {formatPrice(item.currentPrice)}
                            </span>
                          </div>
                          
                          {/* Quantity Controls */}
                          <div className="col-span-2 flex justify-center">
                            <div className="flex items-center border border-gray-300">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-2 hover:bg-gray-50 transition-colors"
                              >
                                <Minus className="h-3 w-3 text-gray-600" />
                              </button>
                              <span className="px-4 py-2 text-sm font-['Outfit',Helvetica] text-[#111111] min-w-[50px] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-2 hover:bg-gray-50 transition-colors"
                              >
                                <Plus className="h-3 w-3 text-gray-600" />
                              </button>
                            </div>
                          </div>
                          
                          {/* Total */}
                          <div className="col-span-2 flex items-center justify-center gap-2">
                            <span className="font-['Outfit',Helvetica] font-normal text-[#111111] text-sm">
                              {formatPrice(item.currentPrice * item.quantity)}
                            </span>
                            <button 
                              onClick={() => removeItem(item.id)}
                              className="p-1 hover:bg-gray-100 rounded-sm transition-colors"
                            >
                              <X className="h-4 w-4 text-gray-400 hover:text-red-600" />
                            </button>
                          </div>
                        </div>

                        {/* Mobile Layout */}
                        <div className="md:hidden p-4">
                          <div className="flex gap-4">
                            <div className="w-16 h-16 bg-gray-100 overflow-hidden flex-shrink-0">
                              <img 
                                src={item.image} 
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <Link 
                                    to={`/product/${item.id}`}
                                    className="font-['Outfit',Helvetica] font-normal text-[#111111] text-sm tracking-[0.05px] hover:text-gray-600 transition-colors"
                                  >
                                    {item.name}
                                  </Link>
                                  <p className="font-['Outfit',Helvetica] text-gray-500 text-xs mt-1">
                                    {formatPrice(item.currentPrice)} each
                                  </p>
                                </div>
                                
                                <button 
                                  onClick={() => removeItem(item.id)}
                                  className="p-1 hover:bg-gray-100 rounded-sm transition-colors ml-2"
                                >
                                  <X className="h-4 w-4 text-gray-400" />
                                </button>
                              </div>
                              
                              <div className="flex items-center justify-between mt-3">
                                <div className="flex items-center border border-gray-300">
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="p-1 hover:bg-gray-50 transition-colors"
                                  >
                                    <Minus className="h-3 w-3 text-gray-600" />
                                  </button>
                                  <span className="px-3 py-1 text-sm font-['Outfit',Helvetica] text-[#111111] min-w-[40px] text-center">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="p-1 hover:bg-gray-50 transition-colors"
                                  >
                                    <Plus className="h-3 w-3 text-gray-600" />
                                  </button>
                                </div>
                                
                                <span className="font-['Outfit',Helvetica] font-medium text-[#111111] text-sm">
                                  {formatPrice(item.currentPrice * item.quantity)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                      </CardContent>
                    </Card>
                  ))}
                  
                  {/* Clear Cart Button */}
                  <div className="flex justify-start pt-4">
                    <button
                      onClick={clearCart}
                      className="font-['Outfit',Helvetica] text-sm text-gray-600 hover:text-red-600 transition-colors underline"
                    >
                      Clear Cart
                    </button>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="border shadow-none border-gray-200 rounded-none sticky top-24">
                  <CardContent className="p-6">
                    <h2 className="font-['Outfit',Helvetica] font-normal text-[#111111] text-lg tracking-[0.05px] mb-6">
                      ORDER SUMMARY
                    </h2>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-['Outfit',Helvetica] text-sm text-gray-600">
                          Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)
                        </span>
                        <span className="font-['Outfit',Helvetica] text-sm text-[#111111]">
                          {formatPrice(totalPrice)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-['Outfit',Helvetica] text-sm text-gray-600">
                          Shipping
                        </span>
                        <span className="font-['Outfit',Helvetica] text-sm text-[#3c9342]">
                          {totalPrice >= 50 ? 'FREE' : formatPrice(5)}
                        </span>
                      </div>
                      
                      {totalPrice < 50 && (
                        <div className="p-3 bg-yellow-50 border border-yellow-200">
                          <p className="font-['Outfit',Helvetica] text-xs text-yellow-800">
                            Add {formatPrice(50 - totalPrice)} more for FREE shipping
                          </p>
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center py-3 border-t-2 border-black">
                        <span className="font-['Outfit',Helvetica] font-medium text-[#111111] text-base">
                          Total
                        </span>
                        <span className="font-['Outfit',Helvetica] font-medium text-[#111111] text-base">
                          {formatPrice(totalPrice + (totalPrice >= 50 ? 0 : 5))}
                        </span>
                      </div>
                    </div>
                    
                   <div className="space-y-3 pt-4">
                      <Link to="/checkout" className="block">
                        <Button className="w-full rounded-none bg-black text-white py-4 font-['Outfit',Helvetica] text-base font-medium hover:bg-gray-800 transition-all duration-200 transform hover:scale-[1.02]">
                          PROCEED TO CHECKOUT
                        </Button>
                      </Link>
                      
                      <Link to="/products" className="block">
                        <Button 
                          variant="outline" 
                          className="w-full border-2 border-gray-300 text-gray-700 rounded-none py-3 font-['Outfit',Helvetica] text-sm hover:border-gray-400 hover:bg-gray-50 transition-colors"
                        >
                          Continue Shopping
                        </Button>
                      </Link>
                    </div>
                    
                    {/* Security Icons */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <p className="font-['Outfit',Helvetica] text-xs text-gray-500 text-center mb-3">
                        Secure checkout powered by SSL encryption
                      </p>
                      <div className="flex justify-center items-center gap-2 opacity-60">
                       
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </section>
      
      <FooterByAnima />
      <FooterWrapperByAnima />
    </>
  );
};