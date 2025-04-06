import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTrigger,
  } from "@/components/ui/sheet";
  import { ShoppingCart } from "lucide-react";
  import { TabsShop } from "./TabsShop";
  
  export function SheetShop() {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <div className="flex items-center justify-center p-2 bg-white rounded-full cursor-pointer">
            <ShoppingCart />
          </div>
        </SheetTrigger>
        <SheetContent className=" lg:max-w-lg bg-[#404040] border-none rounded-l-3xl flex flex-col gap-5">
          <SheetHeader hidden>
            <div className="flex gap-2 text-[#fafafa] text-[20px] mt-5 font-semibold">
              <ShoppingCart />
              <p>Order details</p>
            </div>
          </SheetHeader>
          <TabsShop />
          <SheetFooter hidden></SheetFooter>
        </SheetContent>
      </Sheet>
    );
  }