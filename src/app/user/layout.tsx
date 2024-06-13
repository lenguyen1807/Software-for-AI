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
      <header>
        <div className="fixed z-50 w-full bg-white border-b container flex h-14 max-w-screen-2xl items-center">
          <NavBar />
          <div className="flex flex-1 items-center justify-between space-x-7 md:justify-end">
            <HelpModal />
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <SearchBox />
            </div>
            <nav className="flex items-center">
              <UserAvatar user={data} />
            </nav>
          </div>
        </div>
      </header>

      <main className="pt-14 w-screen bg-light-blue lg:border-l">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}