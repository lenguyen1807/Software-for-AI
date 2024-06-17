import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import BookCard from "@/components/user/book-card"
import { Book } from "@/lib/interface"

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    books: Book[]
}

export default function BookCarousel({ books }: Props) {
    return (
        <Carousel
            opts={{
                align: "start",
                // loop: true,
            }}
            className="w-full "
        >
            <CarouselContent className="w-full">
                {books.map((book) => (
                    <CarouselItem key={book._id} className="p-6 md:basis-1/5 lg:basis-1/7">
                        <BookCard
                            book={book}
                            width="150px"
                            height="230px"
                            classNameImage=""
                            className="border-none"
                            key={book._id}
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}