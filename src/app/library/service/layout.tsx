import ServiceSidebar from "@/components/library/service_sidebar";
export default function ServicePage({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <header>
        <div className="flex flex-1 flex-col h-min-full gap-4 md:gap-8 md:p-10 min-h-[500px] ">
            <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                <ServiceSidebar />
                <main>
                    {children}
                </main>
            </div>
        </div>
        </header>
    )
}



