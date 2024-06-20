import type { Book } from "@/lib/interface";
import BookImage from "./book-image";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    book: Book,
    classNameImage: string,
}

export default function BookCard({
    book,
    classNameImage,
    className
}: Props) {
    return (
        <figure
            key={book._id}
            className={cn("space-y-3", className)}>
            <BookImage
                book={book}
                className={classNameImage}
            />
            <figcaption className="pt-2 space-y-2 text-wrap">
                <h3 className="text-base font-[650] text-pretty text-center line-clamp-2 w-full">
                    {book.title}
                </h3>
                <div className="text-[13px]">
                    <div className="font-semibold text-muted-foreground text-pretty text-center space-y-2">
                        <ul className="space-y-1">
                            {book.author.map((author) => (
                                <li key={author}>
                                    <Link
                                        className="hover:text-primary"
                                        href={`/user/explore/author/${author}`}
                                    >
                                        {author}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <Link
                            className="hover:text-primary"
                            href={`/user/explore/library/${book.libraryID}`}
                        >
                            {book.libraryName}
                        </Link>
                    </div>
                </div>
            </figcaption>
        </figure>
    )
}