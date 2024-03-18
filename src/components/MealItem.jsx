import { useContext } from "react";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import cartContext from "./Cart/cartContext";
export default function MealItem({ meal }) {
  const cartCtx = useContext(cartContext);
  return (
    <li className="meal-item">
      <article>
        <img src={"http://localhost:3000/" + meal.image}></img>
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">
            {currencyFormatter.format(meal.price)}
          </p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-action">
          <Button
            onClick={() => {
              cartCtx.addItem(meal);
            }}
          >
            Add to Cart
          </Button>
        </p>
      </article>
    </li>
  );
}
