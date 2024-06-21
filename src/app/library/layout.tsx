import { Nunito } from "next/font/google";
import SideBar from "@/components/library/lib_sidebar";
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
      if (user.role != "library") {
          redirect("/");
      }
  } else {
      redirect("/login");
  }

  return (
    <div className={cn(nunito.className, "w-full flex w-screen pl-[250px]")}>
        <SideBar />
        {children}
    </div>
  );
}
