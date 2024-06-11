"use client"

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function ProfileSidebar() {
    const pathname = usePathname();

   return (
    <nav
        className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0"
    >
        <Link
            href="/user/profile"
            className={`${pathname === "/user/profile" ? "text-black font-medium" : ""}`}
        >
            Thông tin cá nhân
        </Link>
        <Link
            href="/user/profile/member"
            className={`${pathname === "/user/profile/member" ? "text-black font-medium" : ""}`}
        >
            Thẻ thư viện
        </Link>
        <Link
            href="/user/profile/borrow-history"
            className={`${pathname === "/user/profile/borrow-history" ? "text-black font-medium" : ""}`}
        >
            Lịch sử mượn sách
        </Link>
    </nav>
   ) 
}