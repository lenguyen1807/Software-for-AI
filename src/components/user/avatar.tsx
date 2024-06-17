import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { User } from "@/lib/interface"
import { 
  CircleUser,
  LibraryBig,
  LogOut,
  History
} from "lucide-react";
import Link from "next/link";
import { SignOut } from "@/lib/action";
import { Button } from "../ui/button";

export default function UserAvatar({user} : {user: User}) {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
        <Avatar className="ring-1 ring-slate-200">
                <AvatarImage 
                  src={user.avatarUrl}
                  alt={user.username}
                />
                <AvatarFallback>User</AvatarFallback>
            </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-fit">
            <DropdownMenuLabel>Xin chào {user.name} ⭐</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link
                  href="/user/profile" 
                  className="flex"
                >
                  <CircleUser className="mr-2 h-5 w-5"/>
                  <span>Thông tin cá nhân</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href="/user/profile/member" 
                  className="flex"
                >
                  <LibraryBig className="mr-2 h-5 w-5"/>
                  <span>Thẻ thư viện</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href="/user/profile/borrow-history" 
                  className="flex"
                >
                  <History className="mr-2 h-5 w-5"/>
                  <span>Lịch sử mượn</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <form 
                className="flex"
                action={SignOut}
              >
                <Button className="text-[#F25278]" variant="ghost">
                  <LogOut className="mr-2 h-5 w-5"/>
                  Đăng xuất
                </Button>
              </form>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}