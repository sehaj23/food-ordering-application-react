import { useContext } from "react";
import UserProgressContext from "./Cart/UserProgressContext";
import Input from "./Input";
import Button from "./UI/Button";
import Modal from "./UI/Modal";
import CartContext from "./Cart/cartContext";

import useHttp from "../hooks/useHttp";
import Error from "./Error";
export default function Checkout() {
  const userProgressCtx = useContext(UserProgressContext);
  const cartCtx = useContext(CartContext);
  let total = 0;
  const cartTotal = cartCtx.items.map((item) => {
    total = total + item.price * item.quantity;
  });
  function handleCloseCheckout() {
    userProgressCtx.hideCheckout();
  }

  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp("http://localhost:3000/orders", config);
  function handleFinish() {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }
  async function handleSubmit(event) {
    event.preventDefault();
    const postRequest = {
      order: {
        items: cartCtx.items,
        customer: {
          name: event.target["full-name"].value,
          street: event.target.street.value,
          email: event.target.email.value,
          city: event.target.city.value,
          "postal-code": event.target["postal-code"].value,
        },
      },
    };
    sendRequest(JSON.stringify(postRequest));
  }

  let action = (
    <>
      <Button type="button" onClick={handleCloseCheckout} textOnly={true}>
        Close
      </Button>
      <Button>Submit</Button>
    </>
  );
  if (isSending) {
    action = <span>Placing your order.</span>;
  }
  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress == "checkout"}
        onClose={handleCloseCheckout}
      >
        <h2>Success!</h2>
        <p>Your Order has been successfully placed.</p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal
      open={userProgressCtx.progress == "checkout"}
      onClose={handleCloseCheckout}
    >
      <form method="submit" onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {total}</p>
        <Input label="Full Name" type="text" id="full-name"></Input>
        <Input label="E-Mail Address" type="email" id="email"></Input>
        <Input label="Street" type="text" id="street"></Input>
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code"></Input>
          <Input label="City" type="text" id="city"></Input>
          {error && (
            <Error title="Failed to submit order" message={error}></Error>
          )}
          <p className="modal-actions">{action}</p>
        </div>
      </form>
    </Modal>
  );
}
