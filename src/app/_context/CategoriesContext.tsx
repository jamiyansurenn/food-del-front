"use client";
import { FoodType } from "@/types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
type categoriesContextType = {
  categories: FoodType[];
  getCategories: () => void;
};
export const CategoriesContext = createContext<categoriesContextType>(
  {} as categoriesContextType
);

export const useCategories = () => {
  return useContext(CategoriesContext);
};

export const CategoriesProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<FoodType[]>([]);

  const getCategories = async () => {
    const data = await fetch("http://localhost:4000/categories");
    const categories = await data.json();
    setCategories(categories.data);
    console.log(categories);
  };
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      <CategoriesContext.Provider value={{ categories, getCategories }}>
        {children}
      </CategoriesContext.Provider>
    </div>
  );
};