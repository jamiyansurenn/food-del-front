"use client";
import { FoodType } from "@/types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
type FoodsInfoContextType = {
  foodsInfo: FoodType[];
  getFoodsInfo: () => void;
  setFoodsInfo: any;
};
export const FoodsInfoContext = createContext<FoodsInfoContextType>(
  {} as FoodsInfoContextType
);

export const useFoodsInfo = () => {
  return useContext(FoodsInfoContext);
};

export const FoodsProvider = ({ children }: { children: ReactNode }) => {
  const [foodsInfo, setFoodsInfo] = useState<FoodType[]>([]);

  const getFoodsInfo = async () => {
    const data = await fetch(`http://localhost:4000/foodsInfo`);
    const foodsInfo = await data.json();
    setFoodsInfo(foodsInfo.foodsInfo);
    console.log(foodsInfo);
    return foodsInfo;
  };
  useEffect(() => {
    getFoodsInfo();
  }, []);

  return (
    <div>
      <FoodsInfoContext.Provider
        value={{ foodsInfo, getFoodsInfo, setFoodsInfo }}
      >
        {children}
      </FoodsInfoContext.Provider>
    </div>
  );
};