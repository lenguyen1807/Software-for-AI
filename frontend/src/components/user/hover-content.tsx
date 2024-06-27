"use client"

import { useState } from "react";
import { Ratings } from "@/components/ui/ratings";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"
import type { Book } from "@/lib/interface";

export default function HoverContent({book} : {book: Book}) {
    const [truncate, setTruncate] = useState(true);

    return (
        <div className="text-wrap space-y-2">
            <h2>{book.title}</h2>
            <span className="text-xs text-muted-foreground">Tác giả: {book.author[0]} ...</span>
            <div className="flex items-center space-x-2">
                <Ratings 
                    rating={book.avgRating}
                    variant="yellow" 
                />
                <span className="text-muted-foreground text-sm">{book.avgRating}/5</span>
            </div>
            <div>
                <p className={cn("text-xs", {
                    "line-clamp-4": truncate
                })}>
                    {book.description} 
                </p>
                <Button 
                    variant={"link"} 
                    className="px-0 text-xs text-muted-foreground"
                    onClick={() => setTruncate(truncate => !truncate)}
                >
                    {truncate ? "nhiều hơn" : "ít hơn"}
                </Button>
            </div>
        </div>
    )
}