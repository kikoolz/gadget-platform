"use client";

import React, { createContext, useContext, useReducer, useEffect } from 'react';

export interface CartItem {
  id: string;
  name: string;
  slug: string;
  image: string;
  originalPrice: number;
  discountPrice: number;
  quantity: number;
  stock: number;
}

// Validation function for cart items
const isValidCartItem = (item: any): item is CartItem => {
  console.log('Validating cart item:', item);
  
  if (!item || typeof item !== 'object') {
    console.log('Item is not an object');
    return false;
  }
  
  const hasRequiredFields = (
    typeof item.id === 'string' &&
    typeof item.name === 'string' &&
    typeof item.slug === 'string' &&
    typeof item.image === 'string' &&
    typeof item.originalPrice === 'number' &&
    typeof item.discountPrice === 'number' &&
    typeof item.quantity === 'number' &&
    typeof item.stock === 'number'
  );
  
  const hasValidValues = (
    item.quantity > 0 &&
    item.stock > 0 &&
    item.originalPrice >= 0 &&
    item.discountPrice >= 0
  );
  
  const isValid = hasRequiredFields && hasValidValues;
  console.log('Validation result:', { hasRequiredFields, hasValidValues, isValid });
  
  return isValid;
};

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

type CartAction =
  | { type: 'ADD_TO_CART'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
} | null>(null);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        // If item exists, increase quantity
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.min(item.quantity + 1, item.stock) }
            : item
        );
        
        return {
          ...state,
          items: updatedItems,
          totalItems: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
          totalPrice: updatedItems.reduce((sum, item) => sum + (item.discountPrice * item.quantity), 0),
        };
      } else {
        // Add new item
        const newItem = { ...action.payload, quantity: 1 };
        const updatedItems = [...state.items, newItem];
        
        return {
          ...state,
          items: updatedItems,
          totalItems: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
          totalPrice: updatedItems.reduce((sum, item) => sum + (item.discountPrice * item.quantity), 0),
        };
      }
    }
    
    case 'REMOVE_FROM_CART': {
      const updatedItems = state.items.filter(item => item.id !== action.payload);
      
      return {
        ...state,
        items: updatedItems,
        totalItems: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: updatedItems.reduce((sum, item) => sum + (item.discountPrice * item.quantity), 0),
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(1, Math.min(action.payload.quantity, item.stock)) }
          : item
      );
      
      return {
        ...state,
        items: updatedItems,
        totalItems: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: updatedItems.reduce((sum, item) => sum + (item.discountPrice * item.quantity), 0),
      };
    }
    
    case 'CLEAR_CART': {
      return {
        items: [],
        totalItems: 0,
        totalPrice: 0,
      };
    }
    
    case 'LOAD_CART': {
      console.log('LOAD_CART action received with payload:', action.payload);
      
      // TEMPORARY: Skip validation to test if that's the issue
      const cartItems = Array.isArray(action.payload) ? action.payload : [];
      
      console.log('Loading cart items (validation disabled):', cartItems);
      
      return {
        items: cartItems,
        totalItems: cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0),
        totalPrice: cartItems.reduce((sum, item) => sum + ((item.discountPrice || 0) * (item.quantity || 0)), 0),
      };
    }
    
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    totalItems: 0,
    totalPrice: 0,
  });

  // Load cart from localStorage on mount
  useEffect(() => {
    console.log('CartProvider mounted, checking localStorage...');
    const savedCart = localStorage.getItem('cart');
    console.log('Raw localStorage data:', savedCart);
    
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart);
        console.log('Parsed cart items:', cartItems);
        console.log('Is array?', Array.isArray(cartItems));
        
        // Validate that cartItems is an array and has valid structure
        if (Array.isArray(cartItems)) {
          console.log('Cart items is array, dispatching LOAD_CART with', cartItems.length, 'items');
          dispatch({ type: 'LOAD_CART', payload: cartItems });
        } else {
          console.warn('Invalid cart data in localStorage (not array), clearing...', cartItems);
          localStorage.removeItem('cart');
        }
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
        localStorage.removeItem('cart');
      }
    } else {
      console.log('No cart data found in localStorage');
    }
  }, []);

  // Save cart to localStorage whenever state changes
  useEffect(() => {
    console.log('Saving cart to localStorage:', state.items);
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider
      value={{
        state,
        dispatch,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
