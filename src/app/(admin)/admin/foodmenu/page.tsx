import DishesCategory from "./DishesCategory";
import FoodMenu from "./FoodMenu";

export default function FoodMenuA() {
  return (
    <div className="w-full pl-[320px] rounded-xl cursor-default bg-[#f4f4f5] flex flex-col items-start justify-start">
      <DishesCategory />
      <FoodMenu />
    </div>
  );
}