"use client";
import { useCategories } from "@/app/_context/CategoriesContext";
import { useEffect } from "react";

export default function Footer() {
  const { categories, getCategories } = useCategories();
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div className="bg-black w-full h-[775px] flex flex-col items-center justify-start gap-40 py-16">
      <div className="flex gap-10 h-[100px] w-[100vw] justify-center items-center text-[25px] bg-[#ef4444] text-white">
        <p>Fresh fast delivered</p>
        <p>Fresh fast delivered</p>
        <p>Fresh fast delivered</p>
        <p>Fresh fast delivered</p>
        <p>Fresh fast delivered</p>
        <p>Fresh fast delivered</p>
      </div>
      <div className="flex gap-40 w-full justify-center items-start text-white">
        <div>
          <img src="./Logo.png" alt="logo" />
        </div>
        <div className="flex flex-col gap-5">
          <h1 className="text-[16px] font-normal normal text-[#71717a]">
            NOMNOM
          </h1>
          <div className="flex flex-col gap-2">
            <p>Home</p>
            <p>Contant us</p>
            <p>Delivery zone</p>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <h1 className="text-[16px] font-normal normal text-[#71717a]">
            MENU
          </h1>
          <div className="flex flex-col gap-2">
            {categories.slice(0, 5).map((item: any, index) => {
              return <p key={index}>{item.categoryName}</p>;
            })}
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <h1></h1>
          <div className="mt-[25px] flex flex-col gap-2">
            {categories.slice(5, 10).map((item: any, index) => {
              return <p key={index}>{item.categoryName}</p>;
            })}
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <h1 className="text-[16px] font-normal normal text-[#71717a]">
            FOLLOW US
          </h1>
          <div></div>
        </div>
      </div>
      <div className="flex w-[90%] flex-col gap-5 items-start justify-start">
        <div className="w-full m-auto h-[0.5px] bg-[#71717a]"></div>
        <div className="flex gap-12 text-[#71717a] text-[14px] font-normal">
          <p>Copy right 2024 © Nomnom LLC</p>
          <p>Privacy policy </p>
          <p>Terms and conditoin</p>
          <p>Cookie policy</p>
        </div>
      </div>
    </div>
  );
}