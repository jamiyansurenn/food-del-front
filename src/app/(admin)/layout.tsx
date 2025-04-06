import DishesCategory from "./admin/foodmenu/DishesCategory";
import SideBar from "./_components/SideBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-full bg-[#f4f4f5]">
      <SideBar />
      {children}
    </div>
  );
}