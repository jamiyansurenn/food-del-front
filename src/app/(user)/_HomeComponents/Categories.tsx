import { CarouselSize } from "@/app/shadcn/Carousel";

export default function Catagories() {
  return (
    <div className="flex flex-col w-full items-start py-8 px-12 gap-9">
      <h1 className="text-black  text-[30px] normal font-semibold flex justify-start">
        Categories
      </h1>
      <div className="flex flex-col w-full items-center py-8 px-12">
        <CarouselSize />
      </div>
    </div>
  );
}
