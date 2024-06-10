import { Nunito } from "next/font/google";
import SideBar from "@/components/admin/sidebar";
import { cn } from "@/lib/utils";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const nunito = Nunito({ subsets: ["vietnamese"] });

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = (await auth())?.user;

  if (user) {
      if (user.role != "admin") {
          redirect("/");
      }
  } else {
      redirect("/login");
  }

  return (
    <div className={cn(nunito.className, "w-full h-screen pl-[250px]")}>
        <SideBar />
        {children}
    </div>
  );
}
