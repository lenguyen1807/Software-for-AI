import type { Book } from "@/lib/interface";
// import { Badge } from "@/components/ui/badge";
// import { Ratings } from "@/components/ui/ratings";
import BookImage from "./book-image";
import { cn } from "@/lib/utils";
import { Nunito } from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
  weight: "500"
});

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    book: Book,
    // hrefView: string,
    // hrefBorrow: string,
    width: string,
    height: string,
    classNameImage: string,
}

export default function BookCard({  
    book, 
    // hrefView, 
    // hrefBorrow,
    width,
    height,
    classNameImage,
    className
} : Props) {
    return (
        <figure 
        key={book._id}
        className={cn("space-y-3 items-center", className)}>
            <BookImage
                book={book}
                // hrefView={hrefView}
                // hrefBorrow={hrefBorrow}
                style={{ width: width, height: height }}
                className={classNameImage}
            />
            <figcaption 
                className="pt-2 space-y-2 text-wrap"
                style={{width: "200px"}}
            >
                {/* <div className="flex items-center space-x-2">
                    <Ratings 
                        rating={book.avgRating}
                        variant="yellow" 
                    />
                    <span className="text-muted-foreground text-sm">{book.avgRating}/5</span>
                </div> */}
                <h3 
                    className={cn(nunito.className, "text-lg")}
                >
                    {book.title}
                </h3>
                <div className="text-xs space-y-1">
                    <h2 className="text-muted-foreground ">
                        Tác giả:
                    </h2>
                    <div className="font-semibold text-foreground">
                        <ul className="space-y-1">
                            {book.author.map((author) => (
                                <li key={author}>{author}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                {/* <div className="flex flex-wrap justify-start">
                    {book.genres.map((genre) => (
                        <Badge 
                            key={genre}
                            className="ml-0 mr-1 my-[0.3rem] text-muted-foreground"
                            variant={"outline"}
                        >
                            {genre}
                        </Badge>
                    ))}
                </div> */}
            </figcaption>
        </figure>
    )
}