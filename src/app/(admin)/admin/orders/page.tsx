import { CalendarDays } from "lucide-react";
import { AvatarDemo } from "./Avatar";
import { Array } from "./utils";

export default function Orders() {
  return (
    <div className="bg-[#f4f4f5] ml-[300px] w-full pr-12 py-3">
      <div className="flex justify-end py-7">
        <AvatarDemo />
      </div>
      <div className="bg-white border-[1px] border-[#d8d8d8] rounded-xl  flex flex-col justify-start overflow-hidden">
        <div className="flex bg-white w-full h-[76px] justify-between px-6 items-center">
          <div>
            <p className="text-[23px] font-extrabold">Orders</p>
            <p className="text-[#4e4e4e]">2 items</p>
          </div>
          <div className="flex gap-4">
            <div className="flex gap-2 bg-slate-50 pl-4 pr-20 justify-center items-center py-1 rounded-full border-[1px] border-[#f4f4f5]">
              <CalendarDays className="w-5 h-5" />
              <p>13 June 2023 - 14 July 2023</p>
            </div>
            <div className="flex justify-center items-center bg-[#b4b4b4] rounded-full py-2 px-4 text-[#ffffff]">
              <p>Change delivery state</p>
            </div>
          </div>
        </div>
        <div className="flex border-t-[1px] border-b-[1px] justify-between pr-[31px] pl-[31px] h-[60px] items-center bg-[#f4f4f5]">
          <input type="checkbox" className="w-5 h-5 " />
          <p className="w-[40px] ml-[9px] ">№</p>
          <p className="w-[220px] ">Customer</p>
          <p className="w-[170px] ">Food</p>
          <p className="w-[130px] ">Date</p>
          <select name="" id="" className=" mr-[130px]">
            <option value=""></option>
            <option value="">2</option>
            <option value="">3</option>
            <option value="">4</option>
            <option value="">5</option>
          </select>
          <p className="w-[170px] ">Total</p>
          <p className="w-[220px] ">Delivery Address</p>
          <p className="w-[110px] ">Delivery state</p>
          <select name="" id="">
            <option value=""></option>
            <option value="">2</option>
            <option value="">3</option>
            <option value="">4</option>
            <option value="">5</option>
          </select>
        </div>
        <div className="overflow-y-scroll h-[900px]">
          {Array.map((item, index) => {
            return (
              <div
                key={index}
                className="flex border-t-[1px] flex-grow-0 border-b-[1px] justify-between pr-[31px] pl-[31px] h-[60px] items-center bg-[#f4f4f5]"
              >
                <input type="checkbox" className="w-5 h-5" />
                <p className="w-[40px] ml-[9px] ">{item.number}</p>
                <p className="w-[220px] ">{item.email}</p>
                <p className="w-[170px] ">{item.food}</p>
                <p className="w-[130px] ">{item.date}</p>
                <select name="" id="" className="mr-[130px]">
                  <option value=""></option>
                  <option value="">2</option>
                  <option value="">3</option>
                  <option value="">4</option>
                  <option value="">5</option>
                </select>
                <p className="w-[170px] ">${item.total}</p>
                <p className="w-[220px] ">{item.address}</p>
                <select className="w-[110px] p-2 rounded-full border-[2px] border-red-600">
                  <option value="1">Pending</option>
                  <option value="2">Delivered</option>
                  <option value="3">Cancelled</option>
                </select>
                <select name="" id="" className="">
                  <option value=""></option>
                  <option value="">2</option>
                  <option value="">3</option>
                  <option value="">4</option>
                  <option value="">5</option>
                </select>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}