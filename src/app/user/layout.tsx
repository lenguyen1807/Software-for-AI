import SearchBox from "@/components/user/search-box"
import HelpModal from "@/components/user/help-modal"
import NavBar from "@/components/user/nav-bar"
import UserAvatar from "@/components/user/avatar";
import { auth } from "@/lib/auth";
import { User } from "@/lib/interface";
import SiteFooter from "@/components/footer";
import { redirect } from "next/navigation";

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const user = (await auth())?.user;

  if (user) {
      if (user.role != "user") {
          redirect("/");
      }
  } else {
      redirect("/login");
  }


  const data = user as User;

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
            <NavBar />
            <div className="flex flex-1 items-center justify-between space-x-7 md:justify-end">
                <HelpModal />
                <div className="w-full flex-1 md:w-auto md:flex-none">
                    <SearchBox/>
                </div>
                <nav className="flex items-center">
                    <UserAvatar user={data} />
                </nav>
            </div>
        </div>
      </header>
      <main className="border-t">
        <div className="lg:border-l w-screen">
          <div className="h-full px-4 py-6 lg:px-8">
            <div className="border-md p-0 outline-none">
                {children}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter/>
    </>
  );
}