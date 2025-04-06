"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useCategories } from "../_context/CategoriesContext";
import { useEffect } from "react";
import { FoodType } from "@/types";

export function CarouselSize() {
  // const data = await fetch("https://localhost:4000/categories");
  // const jsonData = await data.json();
  // console.log(data);
  // console.log(jsonData);
  const { categories, getCategories } = useCategories();
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-[95%]"
    >
      <CarouselContent>
        {categories?.map((item: any, index) => (
          <CarouselItem key={index} className="basis-1/9">
            <div className="h-9 w-full flex justify-center px-7 items-center text-white bg-black rounded-full">
              {item.categoryName}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}