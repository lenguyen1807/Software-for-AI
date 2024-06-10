"use client"

import Link from "next/link";
import { useState } from "react";

export default function ProfilePage({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [activeLink, setActiveLink] = useState("");

    return (
        <div className="flex flex-1 flex-col h-min-full gap-4 md:gap-8 md:p-10 min-h-[500px]">
            <div className="mx-auto grid w-full max-w-6xl gap-2">
                <h1 className="text-3xl font-semibold">Cài đặt</h1>
            </div>
            <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                <nav
                    className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0"
                >
                    <Link href="/user/profile"
                        className={`${activeLink === "/user/profile" ? "text-black font-medium" : ""}`}
                        onClick={() => setActiveLink("/user/profile")}>
                        Thông tin cá nhân
                    </Link>

                    <Link href="/user/profile/member"
                        className={`${activeLink === "/user/profile/member" ? "text-black font-medium" : ""}`}
                        onClick={() => setActiveLink("/user/profile/member")}>
                        Thẻ thư viện
                    </Link>


                    <Link href="/user/profile/borrow-history"
                        className={`${activeLink === "/user/profile/borrow-history" ? "text-black font-medium" : ""}`}
                        onClick={() => setActiveLink("/user/profile/borrow-history")}>
                        Lịch sử mượn sách
                    </Link>
                </nav>
                <main>
                    {children}
                </main>
            </div>
        </div>
    )
}