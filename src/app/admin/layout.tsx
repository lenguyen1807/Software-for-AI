import { Nunito } from "next/font/google";
import SideBar from "@/components/admin/sidebar";
const nunito = Nunito({ subsets: ["vietnamese"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.className}`}>
        <SideBar />
        <main className="w-full h-screen pl-[250px]">
          {children}
        </main>
      </body>
    </html>
  );
}
