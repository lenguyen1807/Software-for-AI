export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <div className="border-none p-0 outline-none space-y-10">
            {children}
        </div>
    )
}