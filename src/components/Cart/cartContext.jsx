import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

function cartReducer(state, action) {
  if (action.type === "add_item_cart") {
    const existingCartIndex = state.items.findIndex(
      (item) => item.id == action.item.id
    );
    const updatedItems = [...state.items];

    if (existingCartIndex > -1) {
      const existintItem = state.items[existingCartIndex];
      const updatedItem = {
        ...existintItem,
        quantity: existintItem.quantity + 1,
      };
      updatedItems[existingCartIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }
    return {
      ...state,
      items: updatedItems,
    };
  }
  if (action.type === "remove_item_cart") {
    const existingCartIndex = state.items.findIndex(
      (item) => item.id == action.id
    );
    const updatedItems = [...state.items];
    if (state.items[existingCartIndex].quantity == 1) {
      updatedItems.splice(existingCartIndex, 1);
    } else if (state.items[existingCartIndex].quantity > 1) {
      const updatedItem = {
        ...state.items[existingCartIndex],
        quantity: state.items[existingCartIndex].quantity - 1,
      };
      updatedItems[existingCartIndex] = updatedItem;
    }

    return {
      ...state,
      items: updatedItems,
    };
  }
  if (action.type === "clear_cart") {
    return { ...state, items: [] };
  }
  return state;
}
export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, {
    items: [],
  });
  function addItem(item) {
    dispatchCartAction({
      type: "add_item_cart",
      item: item,
    });
  }

  function removeItem(id) {
    dispatchCartAction({
      type: "remove_item_cart",
      id: id,
    });
  }
  function clearCart() {
    dispatchCartAction({
      type: "clear_cart",
    });
  }

  const cartCtx = {
    items: cart.items,
    addItem: addItem,
    removeItem: removeItem,
    clearCart: clearCart,
  };
  return (
    <CartContext.Provider value={cartCtx}>{children}</CartContext.Provider>
  );
}
export default CartContext;
