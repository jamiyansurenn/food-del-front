"use client";
import { useContext, useEffect, useState } from "react";
import OneCategoryFoods from "./OneCategoryFoods";
import { useCategories } from "@/app/_context/CategoriesContext";

export default function FoodMenu() {
  const [foodsInfo, setFoodsInfo] = useState<any[]>([]);

  useEffect(() => {
    getFoodsInfo();
  }, []);
  const getFoodsInfo = async () => {
    const foodInfo = await fetch(`http://localhost:8000/foodsInfo`);
    const jsonFoodInfo = await foodInfo.json();
    console.log(jsonFoodInfo);
    setFoodsInfo(jsonFoodInfo.foodsInfo);
    return foodsInfo;
  };

  const { categories, getCategories } = useCategories();
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="bg-[#f4f4f5]  mt-[350px] w-full flex flex-col gap-20 pr-[20px]">
      {categories?.map((item: any, index: any) => {
        return (
          <OneCategoryFoods
            // categories={categories}
            key={index}
            category={item}
          />
        );
      })}
    </div>
  );
}
