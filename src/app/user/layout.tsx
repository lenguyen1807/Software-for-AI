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
        {children}
      </main>
    </>
  );
}