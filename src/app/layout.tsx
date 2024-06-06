import "@/styles/globals.css"
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils"
import SiteFooter from "@/components/footer";
import { Toaster } from "@/components/ui/toaster"
 
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Thư viện Bobo",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <main>
            {children}
          <SiteFooter/>
        </main>
        <Toaster />
      </body>
    </html>
  );
}