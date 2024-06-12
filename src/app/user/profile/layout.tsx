import ProfileSidebar from "@/components/user/profile-sidebar";

export default function ProfilePage({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div className="flex flex-1 flex-col h-min-full gap-4 md:gap-8 md:p-10 min-h-[500px]">
            <div className="mx-auto grid w-full max-w-6xl gap-2">
                <h1 className="text-3xl font-semibold">Cài đặt</h1>
            </div>
            <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                <ProfileSidebar />
                <main>
                    {children}
                </main>
            </div>
        </div>
    )
}