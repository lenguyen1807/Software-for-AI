import BookImage from "./book-image";
import { cn } from "@/lib/utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    book: any,
    width: string,
    height: string,
    classNameImage: string,
}

export default function HorizontalBookCard({
    book,
    width,
    height,
    classNameImage,
    className
}: Props) {
    return (
        <div
            key={book._id}
            className={cn(className)}
        >
            <div className="flex text-sm font-[650] items-center">{book.rank}</div>
            <div className="shrink-0">
                <BookImage
                    book={book}
                    style={{ width: width, height: height }}
                    className={classNameImage}
                />
            </div>

            <div
                className="flex flex-wrap pt-2 space-y-1 text-wrap"
                style={{ width: "w-full" }}
            >
                <h3 className="text-sm font-[650] w-full line-clamp-3">
                    {book.title}
                </h3>
                <div className="text-xs space-y-1">
                    <div className="font-medium text-muted-foreground line-clamp-3">
                        <ul className="space-y-1">
                            {book.author.map((author) => (
                                <li key={author}>{author}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}