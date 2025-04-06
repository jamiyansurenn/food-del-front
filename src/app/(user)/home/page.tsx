"use client";
import { useEffect } from "react";

import { useCategories } from "@/app/_context/CategoriesContext";
import Ads from "../_HomeComponents/Ads"; // Ensure the file '../_HomeComponents/Ads.tsx' exists or update the path to the correct location.
import Catagories from "../_HomeComponents/Categories";
import OneCategoryFronts from "../_HomeComponents/OneCategoryFront";
import Footer from "../_HomeComponents/Footer";

export default function Homepage() {
  const { categories, getCategories } = useCategories();
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div>
      <Ads />
      <div className="flex flex-col items-start py-8 px-12 gap-9">
        <Catagories />
        {categories.map((item: any, index) => {
          return (
            <OneCategoryFronts
              key={index}
              catoName={item.categoryName}
              categoryId={item._id}
            />
          );
        })}
      </div>
      <Footer />
    </div>
  );
}