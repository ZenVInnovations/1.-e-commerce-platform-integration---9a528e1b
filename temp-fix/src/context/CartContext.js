import React, { createContext, useReducer, useContext } from 'react';

const CartContext = createContext();

const initialState = {
  cartItems: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      const exists = state.cartItems.find(item => item._id === action.payload._id);
      if (exists) {
        // Increase quantity if already in cart
        return {
          ...state,
          cartItems: state.cartItems.map(item =>
            item._id === action.payload._id
              ? { ...item, qty: item.qty + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, { ...action.payload, qty: 1 }],
        };
      }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item._id !== action.payload),
      };
    case 'CLEAR_CART':
      return initialState;
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (product) => dispatch({ type: 'ADD_TO_CART', payload: product });
  const removeFromCart = (id) => dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  return (
    <CartContext.Provider value={{ cartItems: state.cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
