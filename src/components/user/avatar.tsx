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
  Stamp
} from "lucide-react";
import Link from "next/link";
import { signOut } from '@/lib/auth';
import { Button } from "../ui/button";

export default function UserAvatar({user} : {user: User}) {
  async function SignOut() {
    "use server" 
    await signOut({ redirectTo: "/" });
  }  

  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Avatar>
                <AvatarImage 
                  src={user.avatarURL} 
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
                  href="#" 
                  className="flex"
                >
                  <LibraryBig className="mr-2 h-5 w-5"/>
                  <span>Thẻ thư viện</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href="#" 
                  className="flex"
                >
                  <Stamp className="mr-2 h-5 w-5"/>
                  <span>Yêu cầu duyệt</span>
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