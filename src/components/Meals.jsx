import { useState, useEffect } from "react";
import logo from "../assets/logo.jpg";
import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";
import Error from "./Error";
const config = {
  method: "GET",
};
export default function Meals() {
  const { data, isLoading, error } = useHttp(
    "http://localhost:3000/meals",
    config,
    []
  );
  if (isLoading) {
    return <p className="center">Fetching Meals...</p>;
  }
  if(error){
    return <Error title="Failed to fetch data" message={error}/>
  }
  return (
    <ul id="meals">
      {isLoading == false &&
        data.map((meals) => {
          return <MealItem key={meals.id} meal={meals} />;
        })}
    </ul>
  );
}
