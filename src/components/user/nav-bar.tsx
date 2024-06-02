"use client"

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function NavBar() {
    const pathname = usePathname();

    return (
        <div className="mr-4 hidden md:flex">
            <Link href="/user" className="mr-6 flex items-center space-x-2">
                <Image
                    src="/logo.svg"
                    alt="Logo"
                    width="60"
                    height="50"
                />
                <span className="font-bold text-inherit hidden sm:inline-block">THƯ VIỆN BOBO</span>
            </Link>
            <nav className="flex items-center gap-4 text-sm lg:gap-6">
                <Link
                    href="/user/explore"
                    className={cn(
                        "items-center gap-2 rounded-md px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-slate-200",
                        {
                            "text-primary": pathname === "/user/explore"
                        }
                    )}
                >
                    Khám phá
                </Link>
            </nav>
        </div>
    );
}