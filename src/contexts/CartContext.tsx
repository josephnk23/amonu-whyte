import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: string; // Display price as string for formatting
  quantity: number;
  image: string;
  originalPrice?: number;
  currentPrice: number;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  totalItems: number;
  totalPrice: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Constants for cart persistence
const CART_STORAGE_KEY = 'ecommerce-cart-items';
const CART_TIMESTAMP_KEY = 'ecommerce-cart-timestamp';
const CART_EXPIRY_DAYS = 7; // Cart expires after 7 days
const CART_EXPIRY_MS = CART_EXPIRY_DAYS * 24 * 60 * 60 * 1000;

// Helper functions for localStorage
const loadCartFromStorage = (): CartItem[] => {
  try {
    if (typeof window === 'undefined') return []; // SSR safety
    
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    const savedTimestamp = localStorage.getItem(CART_TIMESTAMP_KEY);
    
    if (savedCart && savedTimestamp) {
      const now = Date.now();
      const cartAge = now - parseInt(savedTimestamp);
      
      // Check if cart has expired
      if (cartAge < CART_EXPIRY_MS) {
        const parsedCart = JSON.parse(savedCart);
        console.log(`Cart loaded from storage: ${parsedCart.length} items`);
        return parsedCart;
      } else {
        // Cart expired, clear it
        console.log('Cart expired, clearing storage');
        localStorage.removeItem(CART_STORAGE_KEY);
        localStorage.removeItem(CART_TIMESTAMP_KEY);
      }
    }
    return [];
  } catch (error) {
    console.error('Failed to load cart from localStorage:', error);
    return [];
  }
};

const saveCartToStorage = (items: CartItem[]) => {
  try {
    if (typeof window === 'undefined') return; // SSR safety
    
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    localStorage.setItem(CART_TIMESTAMP_KEY, Date.now().toString());
    console.log(`Cart saved to storage: ${items.length} items`);
  } catch (error) {
    console.error('Failed to save cart to localStorage:', error);
  }
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize state from localStorage
  const [items, setItems] = useState<CartItem[]>(() => loadCartFromStorage());
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Save to localStorage whenever items change (but not on initial load)
  useEffect(() => {
    if (isLoaded) {
      saveCartToStorage(items);
    } else {
      setIsLoaded(true);
    }
  }, [items, isLoaded]);

  // Optional: Listen for storage changes in other tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === CART_STORAGE_KEY && e.newValue) {
        try {
          const updatedCart = JSON.parse(e.newValue);
          setItems(updatedCart);
          console.log('Cart synced from another tab');
        } catch (error) {
          console.error('Failed to sync cart from another tab:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.currentPrice * item.quantity), 0);

  const addItem = (newItem: CartItem) => {
    setItems(prev => {
      const existingItem = prev.find(item => item.id === newItem.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      }
      return [...prev, newItem];
    });
  };

  const removeItem = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    // Also clear from storage
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
      localStorage.removeItem(CART_TIMESTAMP_KEY);
      console.log('Cart cleared from storage');
    } catch (error) {
      console.error('Failed to clear cart from localStorage:', error);
    }
  };

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  return (
    <CartContext.Provider value={{
      items,
      isOpen,
      totalItems,
      totalPrice,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      openCart,
      closeCart,
    }}>
      {children}
    </CartContext.Provider>
  );
};