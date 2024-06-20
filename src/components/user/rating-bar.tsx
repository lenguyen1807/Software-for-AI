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
            <div className="flex items-center justify-around text-dark-blue">
                <div className="text-sm font-bold "> 5 sao </div>
                <Progress value={progress} max={100} className="w-[50%] border [&>*]:bg-slate-600 bg-white h-3" />
                <div className="text-sm text-muted-foreground"> 123,456 (40%) </div>
            </div>

            <div className="flex items-center justify-around text-dark-blue">
                <div className="text-sm font-bold text-dark-blue"> 4 sao </div>
                <Progress value={31} max={100} className="w-[50%] border [&>*]:bg-slate-600 bg-white h-3" />
                <div className="text-sm text-muted-foreground"> 123,456 (40%) </div>
            </div>

            <div className="flex items-center justify-around text-dark-blue">
                <div className="text-sm font-bold text-dark-blue"> 3 sao </div>
                <Progress value={20} max={100} className="w-[50%] border [&>*]:bg-slate-600 bg-white h-3" />
                <div className="text-sm text-muted-foreground"> 123,456 (40%) </div>
            </div>

            <div className="flex items-center justify-around text-dark-blue">
                <div className="text-sm font-bold text-dark-blue"> 2 sao </div>
                <Progress value={5} max={100} className="w-[50%] border [&>*]:bg-slate-600 bg-white h-3" />
                <div className="text-sm text-muted-foreground"> 123,456 (40%) </div>
            </div>

            <div className="flex items-center justify-around text-dark-blue">
                <div className="text-sm font-bold text-dark-blue"> 1 sao </div>
                <Progress value={1} max={100} className="w-[50%] border [&>*]:bg-slate-600 bg-white h-3" />
                <div className="text-sm text-muted-foreground"> 123,456 (40%) </div>
            </div>
        </div>

    )
}
