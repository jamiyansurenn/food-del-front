"use client";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useCategories } from "@/app/_context/CategoriesContext";

export default function DishesCategory() {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);

  const { categories, getCategories } = useCategories();
  useEffect(() => {
    getCategories();
  }, []);

  const createCategory = async (value: string) => {
    const data = await fetch("http://localhost:4000/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ categoryName: value }),
    });

    // if (data.ok) {
    //   const jsonData = await data.json();
    //   setCategories((prevCategories) => [...prevCategories, jsonData]);
    //   setValue("");
    // } else {
    //   alert("Nemelt amjiltgvi");
    // }
    getCategories();
  };

  const deleteCategory = async (categoryId: string) => {
    await fetch(`http://localhost:4000/categories/${categoryId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ categoryName: categoryId }),
    });
    getCategories();
  };

  const handleAddCategory = () => {
    if (value.trim() === "") {
      alert("Name oruulna uu");
      return;
    }
    setOpen(false);
    createCategory(value);
  };

  return (
    <div className="h-[350px] bg-[#f4f4f5] w-full fixed pr-[340px]">
      <div className="h-[230px] bg-white rounded-xl gap-8 justify-center w-full flex flex-col mt-20 px-10 py-5">
        <h1 className="text-[24px] font-medium">Dishes category</h1>
        <div className="flex gap-4 flex-wrap">
          <div
            className="flex justify-center gap-2 items-center bg-[#f4f4f5]
                    px-1 rounded-full border-[1px] border-black w-[170px] h-[40px]"
          >
            <p>All Dishes</p>
            <div className="flex justify-center items-center bg-black w-6 h-6 text-white rounded-full">
              <p>0</p>
            </div>
          </div>
          {categories?.map((item: any, index: any) => (
            <ContextMenu key={index}>
              <ContextMenuTrigger
                className="flex justify-center gap-2 items-center bg-[#f4f4f5]
                    px-1 rounded-full border-[1px] border-black w-[170px] h-[40px]"
              >
                <p>{item.categoryName}</p>
                <div className="flex justify-center items-center bg-black w-6 h-6 text-white rounded-full">
                  <p>0</p>
                </div>
              </ContextMenuTrigger>
              <ContextMenuContent className="w-64">
                {/* <ContextMenuItem>
                  Edit
                  <ContextMenuShortcut>⌘[</ContextMenuShortcut>
                </ContextMenuItem> */}
                <ContextMenuItem onClick={() => deleteCategory(item._id)}>
                  Delete
                  <ContextMenuShortcut>⌘]</ContextMenuShortcut>
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          ))}

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="w-10 h-10 bg-red-600 rounded-full text-white text-[23px]"
              >
                +
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-[18px] font-semibold">
                  Add new category
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className=" flex flex-col items-start gap-2">
                  <Label htmlFor="name" className="text-[13px] text-[#404040]">
                    Category name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Type category name..."
                    className="col-span-3"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" onClick={handleAddCategory}>
                  Add category
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}