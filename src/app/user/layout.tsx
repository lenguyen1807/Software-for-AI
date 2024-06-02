import SiteHeader from "@/components/user/header";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SiteHeader />
      <main className="border-t">
        <div className="lg:border-l w-screen">
          <div className="h-full px-4 py-6 lg:px-8">
            <div className="border-md p-0 outline-none">
              {children}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}