"use client";
import { Pencil, Plus, Trash2 } from "lucide-react";
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
  imgUrl: any;
  catoName: any;
}

export default function FoodsCartFront({
  title,
  price,
  paragraph,
  imgUrl,
  catoName,
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

  return (
    <div className="w-[291px] h-[261px] border-[2px] bg-white rounded-xl flex flex-col  gap-2 items-center justify-between p-3">
      <div
        className="rounded-xl w-full h-[200px] border-[2px] border-[#ef4444] flex justify-end items-end p-4"
        style={{
          backgroundImage: `url("${imgUrl}")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button className="w-11 h-11 flex rounded-full border-[2px] justify-center items-center bg-white">
              <Plus color="#ef4444" />
            </button>
          </DialogTrigger>
          <DialogTitle hidden></DialogTitle>
          <DialogContent className="w-[826px] h-[312px] px-6 py-10 flex">
            <div
              className=" rounded-xl w-1/2 h-[full] border-[2px] border-[#ef4444] "
              style={{
                backgroundImage: `url("${imgUrl}")`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div className="w-1/2 flex flex-col justify-between">
              <div>
                <p className="text-[25px] font-semibold normal text-[#ef4444]">
                  {title}
                </p>
                <p className="text-[14px] text-black font-normal">
                  {paragraph}
                </p>
              </div>
              <div>
                <div className="flex justify-between">
                  <div>
                    <p>Total price</p>
                    <p className="text-[18px] font-semibold normal text-[#ef4444]">
                      ${price}
                    </p>
                  </div>
                  <div>- 1 +</div>
                </div>
                <button className="w-full bg-black text-white rounded-lg h-[40px]">
                  Add to cart
                </button>
              </div>
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