"use client"

import { GetBookProps } from "@/lib/interface";
import BookCard from "@/components/user/book-card"
import { GetBooksParam } from "@/lib/api";
import { useState, useEffect} from "react"
import { Book } from "@/lib/interface";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationLink
} from "@/components/ui/pagination-extend"

export default function BookPage({...props} : GetBookProps) {
    const [page, setPage] = useState<number>(1);
    const [books, setBook] = useState<Book[]>([]);

    useEffect(() => {
        GetBooksParam({page: page, ...props}).then((data) => {
            setBook(data);
            window.scrollTo(0, 0);
        })
    }, [page, props.language, props.author, props.series, props.genres, props.publisher]);

    return (
        <>
            <div className="grid grid-cols-5 ml-20 justify-between">
                {books.map((book) => (
                    <BookCard
                        book={book}
                        width="200px"
                        height="300px"
                        classNameImage="border-0"
                        className="pb-10"
                        key={book._id}
                    />
                ))}
            </div>
            <Pagination>
                <PaginationContent>
                    {page > 1 && 
                    <PaginationItem>
                        <PaginationPrevious onClick={() => (setPage(page => (page - 1 )))} />
                    </PaginationItem>}
                    <PaginationItem>
                        <PaginationLink isActive>{page}</PaginationLink>
                    </PaginationItem>
                    {books.length == 10 && 
                    <PaginationItem>
                        <PaginationNext onClick={() => (setPage(page => page + 1))}>Tiếp theo</PaginationNext>
                    </PaginationItem>}
                </PaginationContent>
            </Pagination>
        </>
    )
}