import Image from "next/image"
import Link from "next/link"
import SearchBox from "@/components/user/search-box"
import UserAvatar from "@/components/user/avatar"
import { userDummy } from "@/lib/dummy"

export default function SiteHeader() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center">
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
                </div>
                <div className="flex flex-1 items-center justify-between space-x-7 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        <SearchBox/>
                    </div>
                    <nav className="flex items-center">
                        <UserAvatar user={userDummy} />
                    </nav>
                </div>
            </div>
        </header>
    )
}