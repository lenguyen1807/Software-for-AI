// "use client"

import { CalendarDays, X } from "lucide-react"
import { Card } from "@/components/ui/card"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { GetLibraryByID } from "@/lib/api"
import { Library } from "@/lib/interface"

export default async function MemberCard({ lib }: { lib: Library }) {
    return (
        <Card className="relative p-[20px] hover:bg-gray-100/50 cursor-pointer">
            <div className="grid grid-cols-10 flex space-x-[30px] ml-2 items-center">
                <Avatar className="ring-1 ring-slate-200">
                    <AvatarImage src={lib.avatarImageUrl} />
                    <AvatarFallback>{lib.name[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="space-y-2 col-span-8">
                    <h4 className="text-sm font-semibold">{lib.name}</h4>

                    <p className="text-sm text-muted-foreground">
                        {lib.address}
                    </p>

                    <div className="flex items-center pt-2">
                        <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                        <span className="text-xs text-muted-foreground">
                            Thành viên từ 12/12/2021
                        </span>
                    </div>
                </div>
                <Button variant="ghost" className="absolute right-2 hover:bg-transparent group">
                    <X size={15} strokeWidth={2} className="group-hover:stroke-red-500 stroke-gray-500" />
                </Button>
            </div>
        </Card>
    )
}