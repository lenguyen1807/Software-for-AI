"use client"

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function ServiceSidebar() {
    const pathname = usePathname();

   return (
    <nav
        className="w-full flex  gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0"
    >
        <Link
            href="/library/service/borrow"
            className={`${pathname === "/library/service/borrow" ? "text-black font-medium" : ""}`}
        >
            Lịch mượn sách
        </Link>
        <Link
            href="/library/service/restore"
            className={`${pathname === "/library/service/restore" ? "text-black font-medium" : ""}`}
        >
            Lịch trả sách
        </Link>
    </nav>
   ) 
}