"use client";
import { useFoodsInfo } from "@/app/_context/FoodContext";
import FoodsCartFront from "./FoodsCartFront";
import { useEffect } from "react";
interface OneCategoryFrontType {
  catoName: string;
  categoryId: string;
}
export default function OneCategoryFronts({
  catoName,
  categoryId,
}: OneCategoryFrontType) {
  const { foodsInfo, getFoodsInfo } = useFoodsInfo();
  useEffect(() => {
    getFoodsInfo();
  }, []);
  console.log(foodsInfo);

  return (
    <div className="flex flex-col items-start py-8 px-32 gap-9">
      <h1 className="text-[30px] normal font-semibold ">{catoName}</h1>
      <div className="flex flex-wrap gap-10 ">
        {foodsInfo
          .filter((food) => food.category == categoryId)
          .map((item: any, index: any) => {
            return (
              <FoodsCartFront
                catoName={catoName}
                key={index}
                title={item.foodName}
                price={item.foodPrice}
                paragraph={item.foodDescription}
                imgUrl={item.foodImg}
              />
            );
          })}
      </div>
    </div>
  );
}
