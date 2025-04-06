import HeaderHome from "../(auth)/_components/HeaderHome";
import Header from "./_HomeComponents/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <HeaderHome />
      {children}
    </div>
  );
}