"use client"

import * as React from "react"

import { Progress } from "@/components/ui/progress"

import { Nunito } from "next/font/google";
import { cn } from "@/lib/utils";

const nunito = Nunito({
    subsets: ["latin"]
});

export function RatingBar() {
    const [progress, setProgress] = React.useState(0)

    React.useEffect(() => {
        const timer = setTimeout(() => setProgress(40), 500)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div className={cn(nunito.className, "space-y-6")}>
            <div className="flex items-center justify-center gap-x-10 text-dark-blue">
                <span className="shrink-0 text-sm font-bold "> 5 sao </span>
                <Progress value={progress} max={100} className="w-[60%] border [&>*]:bg-slate-400 bg-white h-3" />
                <div className="shrink-0 text-sm text-muted-foreground"> 123,456 (40%) </div>
            </div>

            <div className="flex items-center justify-center gap-x-10 text-dark-blue">
                <span className="shrink-0 text-sm font-bold "> 4 sao </span>
                <Progress value={31} max={100} className="w-[60%] border [&>*]:bg-slate-400 bg-white h-3" />
                <div className="shrink-0 text-sm text-muted-foreground"> 123,456 (40%) </div>
            </div>

            <div className="flex items-center justify-center gap-x-10 text-dark-blue">
                <span className="shrink-0 text-sm font-bold "> 3 sao </span>
                <Progress value={20} max={100} className="w-[60%] border [&>*]:bg-slate-400 bg-white h-3" />
                <div className="shrink-0 text-sm text-muted-foreground"> 123,456 (40%) </div>
            </div>

            <div className="flex items-center justify-center gap-x-10 text-dark-blue">
                <div className="shrink-0 text-sm font-bold text-dark-blue"> 2 sao </div>
                <Progress value={5} max={100} className="w-[60%] border [&>*]:bg-slate-400 bg-white h-3" />
                <div className="shrink-0 text-sm text-muted-foreground"> 123,456 (40%) </div>
            </div>

            <div className="flex items-center justify-center gap-x-10 text-dark-blue">
                <div className="shrink-0 text-sm font-bold text-dark-blue"> 1 sao </div>
                <Progress value={1} max={100} className="w-[60%] border [&>*]:bg-slate-400 bg-white h-3" />
                <div className="shrink-0 text-sm text-muted-foreground"> 123,456 (40%) </div>
            </div>
        </div>

    )
}
