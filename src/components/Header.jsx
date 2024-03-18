import logo from "../assets/logo.jpg";
import UserProgressContext from "./Cart/UserProgressContext";
import CartContext from "./Cart/cartContext";
import Button from "./UI/Button";
import { useContext } from "react";

export default function Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  let totalCartItems = 0;

  if (cartCtx.items.length > 0) {
    cartCtx.items.map((item) => {
      totalCartItems = totalCartItems + item.quantity;
    });
  }
  function handleShow() {
    userProgressCtx.showCart();
  }

  return (
    <header id="main-header">
      <div id="title">
        <img id="img" src={logo} alt="A restaurant"></img>
        <h1>React Food</h1>
      </div>
      <nav>
        <Button onClick={handleShow} textOnly={true}>
          Cart ({totalCartItems})
        </Button>
      </nav>
    </header>
  );
}
