import Header from "./components/Header";
import Meals from "./components/Meals";
import { CartContextProvider } from "./components/Cart/cartContext";
import { UserProgressProvider } from "./components/Cart/UserProgressContext";
import Checkout from "./components/Checkout"
import Cart from "./components/Cart";
function App() {
  return (
    <>
      <UserProgressProvider>
        <CartContextProvider>
          <Header />
          <div id="body">
            <Meals />
            <Cart />
            <Checkout />
          </div>
        </CartContextProvider>
      </UserProgressProvider>
    </>
  );
}

export default App;
