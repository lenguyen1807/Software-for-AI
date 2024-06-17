export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <div className="border-none px-6 pt-4 pb-6 outline-none space-y-10">
            {children}
        </div>
    )
}