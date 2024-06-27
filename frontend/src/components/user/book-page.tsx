"use client"

import { GetBookProps } from "@/lib/interface";
import BookCard from "@/components/user/book-card"
import { GetBooksParam } from "@/lib/api";
import { useState, useEffect } from "react"
import { Book } from "@/lib/interface";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
    PaginationLink
} from "@/components/ui/pagination-extend"
import { cn } from "@/lib/utils";
import { Nunito } from "next/font/google";

const nunito = Nunito({
    subsets: ["latin"],
});

export default function BookPage({ ...props }: GetBookProps) {
    const [page, setPage] = useState<number>(1);
    const [books, setBook] = useState<Book[]>([]);

    useEffect(() => {
        GetBooksParam({ page: page, ...props }).then((data) => {
            setBook(data);
            window.scrollTo(0, 0);
        })
    }, [page, props.language, props.author, props.series, props.genres, props.publisher, props.limit]);

    return (
        <>
            <div className={cn(nunito.className, "flex flex-wrap gap-x-10 justify-start")}>
                {books.map((book) => (
                    <BookCard
                        book={book}
                        classNameImage="border-0 w-[165px] h-[250px]"
                        className="pb-10 w-[165px]"
                        key={book._id}
                    />
                ))}
            </div>
            <Pagination>
                <PaginationContent>
                    {page > 1 &&
                        <PaginationItem>
                            <PaginationPrevious onClick={() => (setPage(page => (page - 1)))} />
                        </PaginationItem>}
                    <PaginationItem>
                        <PaginationLink isActive>{page}</PaginationLink>
                    </PaginationItem>
                    {books.length == props.limit &&
                        <PaginationItem>
                            <PaginationNext onClick={() => (setPage(page => page + 1))}>Tiếp theo</PaginationNext>
                        </PaginationItem>}
                </PaginationContent>
            </Pagination>
        </>
    )
}