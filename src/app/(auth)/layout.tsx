import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex justify-center gap-[8%] px-[100px] items-center">
      {children}
      <img
        alt="img"
        src={
          "https://res.cloudinary.com/dsvivujtj/image/upload/v1739850324/Frame_1321316047_iwsxvt.png"
        }
        width={856}
        height={904}
        className="w-[856px] h-[904px]"
      />
    </div>
  );
}