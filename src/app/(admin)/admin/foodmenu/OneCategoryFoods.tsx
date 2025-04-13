"use client";
import FoodsCard from "@/app/(admin)/admin/foodmenu/FoodsCard";
import { useEffect, useState } from "react";
import { FoodType } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { ImageIcon, X } from "lucide-react";
import { useFoodsInfo } from "@/app/_context/FoodContext";

const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

const uploadImage = async (file: File | null) => {
  if (!file) {
    return null;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const result = await response.json();
    return result.secure_url;
  } catch (error: unknown) {
    return { error: "failed to upload image" };
  }
};

const formSchema = z.object({
  foodName: z.string().min(2, {
    message: "Food name must be at least 2 characters.",
  }),
  price: z.string().min(1, {
    message: "Price must be a positive number.",
  }),
  ingredients: z.string().min(1, {
    message: "Ingredients cannot be empty.",
  }),
  image: z.string().nonempty("zurgaa orullna uu"),
});

interface AppetizersProps {
  category: any;
  // categories: string[];
}

export default function OneCategoryFoods({
  category,
}: // categories,
AppetizersProps) {
  const [value, setValue] = useState("");
  const [file, setFile] = useState<any>(null);
  const [foodImg, setFoodImg] = useState<any>(null);
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const onFileUpload = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
      setFoodImg(URL.createObjectURL(file));
    }
  };
  const { foodsInfo, getFoodsInfo, setFoodsInfo } = useFoodsInfo();
  useEffect(() => {
    getFoodsInfo();
  }, []);

  const createFoodInfo = async (value: FoodType) => {
    const imageUrl = await uploadImage(file);

    const data = await fetch("http://localhost:8000/foodsInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        foodName: value.foodName,
        foodPrice: value.price,
        foodDescription: value.ingredients,
        category: category,
        foodImg: imageUrl,
      }),
    });

    if (data.ok) {
      const jsonData = await data.json();
      setFoodsInfo((prevCategories: any) => [...prevCategories, jsonData]);
      setValue("");
    } else {
      alert("Failed to add food.");
    }
    getFoodsInfo();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    if (!file) {
      return;
    }

    setFile(file);

    const temImageUrl = URL.createObjectURL(file);
    setFoodImg(temImageUrl);
    form.setValue("image", "uploaded");
  };

  const onSubmit = (food: any) => {
    createFoodInfo(food);
    setOpen(false);
    form.reset();
  };

  return (
    <div className="flex flex-col items-start py-8 px-8 rounded-xl gap-9 bg-white">
      <h1 className="text-[30px] font-semibold">{category.categoryName}</h1>
      <div className="flex flex-wrap gap-5">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <div className="w-[290px] h-[260px] px-4 py-2 rounded-[20px] flex flex-col justify-center items-center gap-6 border-dashed border-[1px] border-[#ef4444] cursor-pointer">
              <div className="w-10 h-10 flex justify-center items-center rounded-full bg-[#ef4444]">
                +
              </div>
              <p>Add new Dish to {category.categoryName}</p>
            </div>
          </DialogTrigger>
          <DialogTitle hidden></DialogTitle>

          <DialogContent className="w-[520px] h-[630px] p-6 flex flex-col justify-between">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-[460px] flex flex-col items-between p-6 justify-between gap-6"
              >
                <div className="w-full pb-4 flex justify-start items-center gap-[10px]">
                  <h4 className="text-[20px] font-[600] leading-[28px]">
                    Add new Dish to {category.categoryName}
                  </h4>
                </div>

                <div className="flex gap-6 items-start">
                  <div className="flex flex-col gap-2 items-start h-[60px] w-full">
                    <h4 className="text-[14px] font-[500] leading-[14px]">
                      Food name
                    </h4>
                    <FormField
                      control={form.control}
                      name="foodName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Type food name"
                              className="w-full"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-col gap-2 items-start h-[60px] w-full">
                    <h4 className="text-[14px] font-[500] leading-[14px]">
                      Food price
                    </h4>
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Enter price..."
                              className="w-full"
                              type="number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="w-full h-[60px] flex flex-col gap-[8px]">
                  <p className="text-[14px] leading-[14px] font-[500]">
                    Ingredients
                  </p>
                  <FormField
                    control={form.control}
                    name="ingredients"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="List ingredients..."
                            className="w-full py-2 px-3"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="h-[160px] w-full flex flex-col gap-2 ">
                  <h4 className="text-[14px] font-[500] leading-[14px] ">
                    Food image
                  </h4>
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field: { onChange, value, ...rest } }) => (
                      <FormItem>
                        <FormControl>
                          {foodImg ? (
                            <div className="w-full h-full relative ">
                              <div className="h-[138px]">
                                <Image
                                  alt="file-input"
                                  src={foodImg}
                                  width={1000}
                                  height={1000}
                                  className={
                                    "size-full object-cover rounded-md border border-dashed border-blue-500/20 bg-blue-500/5 bg-cover bg-no-repeat bg-center"
                                  }
                                />
                              </div>
                              <Button
                                // onClick={deleteImage}
                                className="absolute top-2 right-2 rounded-full w-9 h-9  "
                              >
                                <X />
                              </Button>
                            </div>
                          ) : (
                            <label
                              htmlFor="file-input"
                              className={`flex flex-col h-[138px] items-center justify-center cursor-pointer gap-2 p-4  rounded-md border border-dashed border-blue-500/20 bg-blue-500/5 `}
                            >
                              <div className="p-2 bg-[#fff] rounded-full">
                                <ImageIcon className=" w-4 h-4 " />{" "}
                              </div>
                              Choose a file or drag & drop it here
                              <Input
                                id="file-input"
                                type="file"
                                {...rest}
                                onChange={handleChange}
                                className="hidden"
                              />
                            </label>
                          )}
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full pt-6 flex items-center justify-end">
                  <Button type="submit">Add Dish</Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
        {foodsInfo
          .filter((food) => food.category == category._id)
          .map((item: any, index: any) => (
            <FoodsCard
              foodId={item._id}
              // categoryName={categories}
              key={index}
              title={item.foodName}
              price={item.foodPrice}
              paragraph={item.foodDescription}
              foodImg={item.foodImg}
              getFoodsInfo={getFoodsInfo}
            />
          ))}
      </div>
    </div>
  );
}