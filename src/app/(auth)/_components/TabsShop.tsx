import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrderCartFood from "./OrderCardFood";

export function TabsShop() {
  return (
    <Tabs defaultValue="account" className="w-full mt-5">
      <TabsList className="grid w-full h-[44px] grid-cols-2 rounded-full">
        <TabsTrigger
          value="account"
          className="rounded-full h-full text-[18px] font-normal text-black"
        >
          Cart
        </TabsTrigger>
        <TabsTrigger
          value="password"
          className="rounded-full text-[18px] h-full text-black"
        >
          Order
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="mt-7">
        <div className="bg-white rounded-xl h-[540px] p-4 flex flex-col gap-4">
          <h1 className="text-[20px] font-semibold">My cart</h1>
          <div className="h-full overflow-scroll">
            <OrderCartFood />
            <OrderCartFood />
            <OrderCartFood />
            <OrderCartFood />
            <OrderCartFood />
            <OrderCartFood />
            <OrderCartFood />
            <OrderCartFood />
          </div>
        </div>
        <div className="w-full bg-white rounded-xl flex flex-col justify-between h-[276px] mt-8 p-4">
          <h1 className="font-semibold text-[20px]">Payment info</h1>
          <div className="flex justify-between">
            <p className="text-[16px] ">Items</p>
            <p className="font-bold text-[16px]">$25.98</p>
          </div>
          <div className="flex justify-between">
            <p>Shipping</p>
            <p className="font-bold">$0.99</p>
          </div>
          <div>
            - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            - - - - - - - - - -
          </div>
          <div className="flex justify-between">
            <p>Total</p>
            <p className="font-bold">$26.97</p>
          </div>
          <button className="w-full bg-[#ef4444] rounded-full py-2">
            Checkout
          </button>
        </div>
      </TabsContent>
      <TabsContent value="password" className="mt-7">
        <div className="bg-white rounded-xl h-[540px] p-4">passsword</div>
      </TabsContent>
    </Tabs>
  );
}