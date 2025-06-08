import React from 'react';
import { X, Minus, Plus } from 'lucide-react';
import { Link } from 'react-router-dom'; // Add this import
import { useCart } from '../../contexts/CartContext';
import { Button } from '../ui/button';

export const CartDrawer: React.FC = () => {
  const { items, isOpen, totalPrice, closeCart, updateQuantity, removeItem } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-[70] transition-opacity"
        onClick={closeCart}
      />
      
      {/* Drawer */}
 <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] transform transition-transform duration-300 ease-in-out translate-x-0">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="font-['Outfit',Helvetica] font-normal text-[#111111] text-lg tracking-[0.05px]">
            MY BAG / {totalPrice.toFixed(2)} ₵
          </h2>
          <button 
            onClick={closeCart}
            className="p-1 hover:bg-gray-100 rounded-none transition-colors"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="font-['Outfit',Helvetica] text-gray-500 text-sm">Your bag is empty</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4">
                {/* Product Image */}
                <div className="w-40 h-40 bg-gray-100 rounded-none overflow-hidden flex-shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-['Outfit',Helvetica] font-normal text-[#111111] text-sm tracking-[0.05px] leading-5">
                        {item.name}
                      </h3>
                      <p className="font-['Outfit',Helvetica] font-normal text-gray-500 text-xs mt-1">
                        Quantity {item.quantity}
                      </p>
                      <p className="font-['Outfit',Helvetica] font-normal text-[#111111] text-sm mt-2">
                        {item.price}
                      </p>
                    </div>
                    
                    {/* Remove Button */}
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="p-1 hover:bg-gray-100 rounded-none transition-colors ml-2"
                    >
                      <X className="h-4 w-4 text-gray-400" />
                    </button>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center mt-3 gap-3">
                    <div className="flex items-center border border-gray-300 rounded-none">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        className="p-2 hover:bg-gray-50 transition-colors"
                      >
                        <Minus className="h-3 w-3 text-gray-600" />
                      </button>
                      <span className="px-3 py-2 text-sm font-['Outfit',Helvetica] text-[#111111] min-w-[40px] text-center">
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
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 p-6 space-y-4">
            {/* Total Price */}
            <div className="flex items-center justify-between">
              <span className="font-['Outfit',Helvetica] font-normal text-[#111111] text-lg tracking-[0.05px]">
                TOTAL PRICE
              </span>
              <span className="font-['Outfit',Helvetica] font-normal text-[#111111] text-lg tracking-[0.05px]">
                {totalPrice.toFixed(2)} ₵
              </span>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Link to="/cart" onClick={closeCart}>
                <Button 
                  variant="outline" 
                  className="w-full font-['Outfit',Helvetica] font-normal text-[#111111] text-sm tracking-[0.05px] border-black rounded-none hover:bg-gray-50"
                >
                  VIEW CART
                </Button>
              </Link>
 <Link to="/checkout" onClick={closeCart}>
   <Button 
     className="w-full font-['Outfit',Helvetica] font-normal text-white text-sm tracking-[0.05px] bg-black rounded-none hover:bg-gray-800"
   >
     CHECKOUT
   </Button>
 </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};