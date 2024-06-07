import { Nunito } from "next/font/google";
import SideBar from "@/components/admin/sidebar";
const nunito = Nunito({ subsets: ["vietnamese"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${nunito.className}`}>
      <main className="w-full h-screen pl-[250px]">
        <SideBar />
        {children}
      </main>
    </div>
  );
}
