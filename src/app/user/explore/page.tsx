"use client"

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

export default function ExplorePage() {
    const [page, setPage] = useState<number>(1);
    const [books, setBook] = useState<Book[]>([]);

    useEffect(() => {
        GetBooksParam({limit:10, page:page}).then((data) => {
            setBook(data);
            window.scrollTo(0, 0);
        })
    }, [page]);

    return (
        <div className="border-none p-0 outline-none space-y-10">
            <div className="flex justify-between">
                <div className="space-y-4">
                    <div className="mt-6 space-y-1">
                        <h2 className="text-2xl font-semibold tracking-tight">
                            Khám phá thế giới sách của thư viện Bobo
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Toàn bộ sách của thư viện Bobo nằm ở đây.
                        </p>
                    </div>
                </div>
            </div>
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
                    <PaginationItem>
                        <PaginationPrevious onClick={() => (setPage(page => (page - 1 < 1 ? 1 : page - 1)))} />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink isActive>{page}</PaginationLink>
                    </PaginationItem>
                    {books.length == 10 && 
                    <PaginationItem>
                        <PaginationNext onClick={() => (setPage(page => page + 1))}>Tiếp theo</PaginationNext>
                    </PaginationItem>}
                </PaginationContent>
            </Pagination>
        </div>
    )
}