import * as React from "react"

import { Nunito } from "next/font/google";
import { cn } from "@/lib/utils";
import { Ratings } from "@/components/ui/ratings";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

const nunito = Nunito({
    subsets: ["latin"]
});

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    avt: string,
    name: string,
    rating: number,
    reviewDate: string,
    content: string,
}

export function Review({ avt, name, rating, reviewDate, content }: Props) {
    return (
        <div className={cn(nunito.className, "w-full items-center")}>
            <div className="grid grid-cols-5 justify-start gap-3 rounded-2xl p-6 bg-white shadow-[rgba(50,50,93,0.08)_0px_0px_12px_-2px,_rgba(0,0,0,0.08)_0px_3px_7px_-3px]">
                <div className="xl:col-span-1 col-span-5 flex items-center space-x-3">
                    <Avatar className="h-12 w-12 ring-1 ring-slate-200">
                        <AvatarImage src={avt} />
                        <AvatarFallback>{name.toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-1">
                        <div className="text-base">{name}</div>
                        <div className="text-sm text-muted-foreground">{reviewDate}</div>
                    </div>
                </div>

                <div className="xl:col-span-4 col-span-5 flex flex-col space-y-3 w-full">
                    <Ratings
                        rating={rating}
                        variant="yellow"
                        className="flex"
                        size={20}
                        disabled={true}
                    />
                    <div className="text-sm">{content}</div>
                </div>
            </div>

        </div>
    )
}
