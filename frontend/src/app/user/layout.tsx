import SearchBox from "@/components/user/search-box"
import HelpModal from "@/components/user/help-modal"
import NavBar from "@/components/user/nav-bar"
import UserAvatar from "@/components/user/avatar";
import { auth } from "@/lib/auth";
import SiteFooter from "@/components/footer";
import { redirect } from "next/navigation";
import { GetUserInfo } from "@/lib/api";

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const data = (await auth())?.user;

  if (data) {
    if (data.role != "user") {
      redirect("/");
    }
  } else {
    redirect("/login");
  }

  const user = await GetUserInfo(data.jwt);

  return (
    <>
      <header>
        <div className="fixed z-50 w-full bg-white shadow-sm shadow-slate-200 container flex h-14 max-w-screen-2xl items-center">
          <NavBar />
          <div className="flex flex-1 items-center justify-between space-x-7 md:justify-end">
            <HelpModal user={user} token={data.jwt} />
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <SearchBox />
            </div>
            <nav className="flex items-center">
              <UserAvatar user={user} />
            </nav>
          </div>
        </div>
      </header>

      <main className="grid grid-cols-11 pt-14 w-screen bg-[#fafafa] lg:border-l">
        <div className="col-start-2 col-span-9 my-6">
          {children}
        </div>
      </main>

      <SiteFooter />
    </>
  );
}