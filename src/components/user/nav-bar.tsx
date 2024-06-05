"use client"

import Image from "next/image";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import React from "react";

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y0 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-1 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
  )
})

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
                <NavigationMenu>
                     <NavigationMenuList className="text-muted-foreground transition-all hover:text-primary">
                        <NavigationMenuItem>
                            <Link
                                href="/user/explore/all"
                                legacyBehavior
                                passHref
                            >
                                <NavigationMenuLink
                                    className={cn(
                                        "items-center gap-2 rounded-md px-3 py-2",
                                        {
                                            "text-primary": pathname === "/user/book/all"
                                        },
                                        navigationMenuTriggerStyle()
                                    )}
                                >
                                    Tất cả sách
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>
                                Khám phá
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <div className="grid w-[400px] gap-3 p-4">
                                    <ListItem 
                                        href="/user/explore/genre" 
                                        title="Thể loại"
                                    >
                                        Tìm xem những cuốn sách theo từng thể loại ở thư viện Bobo
                                    </ListItem>
                                </div>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                     </NavigationMenuList>
                </NavigationMenu>
            </nav>
        </div>
    );
}