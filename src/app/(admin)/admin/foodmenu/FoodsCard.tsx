"use client";
import { Pencil, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FoodType } from "@/types";

interface FoodsCardProps {
  title: string;
  price: string;
  paragraph: string;
  foodImg: string;
  // categoryName: any[];
  foodId: string;
  getFoodsInfo: any;
}

export default function FoodsCard({
  title,
  price,
  paragraph,
  foodImg,
  // categoryName,
  foodId,
  getFoodsInfo,
}: FoodsCardProps) {
  const [file, setFile] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState<any>(null);
  const [open, setOpen] = useState(false);

  const onFileUpload = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const deleteFood = async (foodId: string) => {
    try {
      await fetch(`http://localhost:4000/foodsInfo/${foodId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log("Error", error);
      alert("Error in deleteFoods");
    }
    getFoodsInfo();
    setOpen(false);
  };

  return (
    <div className="w-[291px] h-[261px] border-[2px] bg-white rounded-xl flex flex-col  gap-2 items-center justify-between p-3">
      <div
        className="rounded-xl w-full h-[200px] border-[2px] border-[#ef4444] flex justify-end items-end p-4"
        style={{
          backgroundImage: `url(${foodImg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button className="w-11 h-11 flex rounded-full border-[2px] justify-center items-center bg-white">
              <Pencil size={20} color="#ef4444" />
            </button>
          </DialogTrigger>
          <DialogTitle hidden></DialogTitle>
          <DialogContent className="w-[520px] h-[620px] p-6">
            <h1 className="font-semibold text-[22px]">Dishes info</h1>
            <div className="flex justify-between">
              <p className="text-[#71717a] text-[15px]">Dish name</p>
              <input
                type="text"
                className="border rounded-md w-[310px] px-2 focus:outline-none"
              />
            </div>
            <div className="flex justify-between">
              <p className="text-[#71717a] text-[15px]">Dish category</p>
              <Select>
                <SelectTrigger className="w-[310px]">
                  <SelectValue placeholder="All dishes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    {/* {categoryName?.map((item: any, index: any) => {
                      return (
                        <SelectItem value={index} key={index}>
                          {item.categoryName}
                        </SelectItem>
                      );
                    })} */}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-between">
              <p className="text-[#71717a] text-[15px]">Ingredients</p>
              <input
                type="text"
                className="border rounded-md w-[310px] h-[100px] focus:outline-none px-2"
              />
            </div>
            <div className="flex justify-between">
              <p className="text-[#71717a] text-[15px]">Price</p>
              <input
                type="text"
                className="border rounded-md w-[310px] focus:outline-none px-2"
                placeholder="$"
              />
            </div>
            <div className="flex justify-between">
              <p className="text-[#71717a] text-[15px]">Image</p>
              <div>
                <label
                  htmlFor="file-input"
                  className="bg-gray-100 rounded-xl w-[310px] h-[150px] flex flex-col justify-center items-center cursor-pointer border-[1px] border-gray"
                >
                  <input
                    hidden
                    type="file"
                    id="file-input"
                    onChange={onFileUpload}
                  />

                  {!imageUrl ? (
                    <div className="flex flex-col justify-center items-center gap-2">
                      <div className="w-10 h-10 bg-white rounded-full flex justify-center items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 12 12"
                          fill="none"
                        >
                          <path
                            d="M9.5 2.5V9.5H2.5V2.5H9.5ZM9.5 1.5H2.5C1.95 1.5 1.5 1.95 1.5 2.5V9.5C1.5 10.05 1.95 10.5 2.5 10.5H9.5C10.05 10.5 10.5 10.05 10.5 9.5V2.5C10.5 1.95 10.05 1.5 9.5 1.5ZM7.07 5.93L5.57 7.865L4.5 6.57L3 8.5H9L7.07 5.93Z"
                            fill="#202124"
                          />
                        </svg>
                      </div>
                      <span>Choose a file or drag & drop it here</span>
                    </div>
                  ) : (
                    <div className="flex flex-col justify-center items-center h-[150px] w-full gap-2">
                      <Image
                        src={imageUrl}
                        alt="Uploaded"
                        width={1000}
                        height={1000}
                        className="object-cover size-full rounded-lg bg-cover bg-no-repeat bg-center"
                      />
                    </div>
                  )}
                </label>
              </div>
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => deleteFood(foodId)}
                className="border-[1.5px] px-3 py-1 border-red-600 rounded-lg"
              >
                <Trash2 color="red" strokeWidth={1.75} width={18} />
              </button>
              <button className="border-[1.5px] bg-black text-white px-3 py-1 rounded-lg">
                Save changes
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex w-full flex-col gap-1">
        <div className="flex justify-between w-full items-center">
          <h1 className="text-[18px] font-semibold normal text-[#ef4444]">
            {title}
          </h1>
          <h1 className="text-[18px] font-semibold normal">{price}</h1>
        </div>
        <p className="text-[14px] text-black font-normal">{paragraph} </p>
      </div>
    </div>
  );
}
// url("./file.svg");