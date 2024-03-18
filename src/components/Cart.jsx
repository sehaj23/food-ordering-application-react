import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "./Cart/cartContext";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import UserProgressContext from "./Cart/UserProgressContext";
export default function Cart() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  let total = 0;
  const cartTotal = cartCtx.items.map((item) => {
    total = total + item.price * item.quantity;
  });

  function hideCart() {
    userProgressCtx.hideCart();
  }

  function handleCheckout() {
    userProgressCtx.showCheckout();
  }

  return (
    <Modal
      className="cart"
      open={userProgressCtx.progress == "cart"}
      onClose={userProgressCtx.progress == "cart" ? hideCart : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => {
          return (
            <li className="cart-item" key={item.id}>
              <p>
                {item.name} - {item.quantity} x 
                {currencyFormatter.format(item.price)}
              </p>
              <p className="cart-item-actions">
                <button
                  onClick={() => {
                    cartCtx.removeItem(item.id);
                  }}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => {
                    cartCtx.addItem(item);
                  }}
                >
                  +
                </button>
              </p>
            </li>
          );
        })}
      </ul>
      <p className="cart-total">{currencyFormatter.format(total)}</p>
      <p className="modal-actions">
        <Button onClick={hideCart} textOnly={true}>
          Close
        </Button>
        {cartCtx.items.length > 0 && (
          <Button onClick={handleCheckout}>Checkout</Button>
        )}
      </p>
    </Modal>
  );
}
