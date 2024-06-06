import { GetBookByID, GetLibraryByID } from "@/lib/api";
import Image from "next/image";
import { STIX_Two_Text, Nunito, Playfair_Display } from "next/font/google";
import { cn } from "@/lib/utils";
import BorrowForm from "@/components/user/borrow-form";
import { Ratings } from "@/components/ui/ratings";
import Link from "next/link";

const stix = STIX_Two_Text({
  weight: "600",
  subsets: ["latin"],
});

const nunito = Nunito({
  subsets: ["latin"]
});

const playfair = Playfair_Display({
  weight: "500",
  subsets: ["latin"],
  style: "italic"
})

type Props = {
  params: { bookID: string };
};

function LinkField({
  label,
  value,
  href
} : {
  label: string,
  value: string,
  href: string
}) {
  return (
    <div>
      <h2 className="text-slate-700 text-lg">
        {label}
      </h2>
      <Link 
        className={cn(nunito.className, "text-muted-foreground text-pretty hover:underline underline-offset-8")}
        href={href}
      >
        <span>{value}</span>
      </Link>
    </div>
  )
}

function TextField({label, value} : {label: string, value: string}) {
  return (
    <div>
      <h2 className="text-slate-700 text-lg">
        {label}
      </h2>
      <p className={cn(nunito.className, "text-muted-foreground text-pretty")}>
        {value}
      </p>
    </div>
  )
}

/** Generate Metadata for book page based on book title */
export async function generateMetadata(
  { params } : Props
) {
  const book = await GetBookByID(params.bookID);
  return { title: `Thư viện Bobo | ${book.title}` }
}

export default async function Page(
  { params }: Props
) {
  const book = await GetBookByID(params.bookID);
  const lib = await GetLibraryByID(book.libraryID);

  return (
    <div className="w-screen mx-auto p-10 space-y-20">
      <div className='md:grid md:grid-flow-col md:grid-cols-2 items-center md:justify-items-center justify-center'>
        <div 
            className="overflow-hidden flex rounded-r-xl shadow-[-10px_10px_5px_-5px_rgba(0,0,0,0.3)] hover:scale-105"
            style={{width: "300px", height: "450px"}}
            key={book._id}
        >
            <Image 
                src={book.imageUrl}
                alt={book.title}
                height={200}
                width={300}
                className="object-cover transition-all"
            />
        </div>
        <div className="space-y-10">
          {book.series != null && 
            <div className="text-slate-600">
                <h1>Tuyển tập</h1>
                <div className="grid grid-cols-1 grid-flow-row">
                  {book.series.map((series) => (
                    <Link 
                      key={series}  
                      href={`/user/explore/series/${series}`} 
                      className={cn(playfair.className, "text-2xl hover:text-primary")}
                    >
                      {series}
                    </Link>
                  ))}
                </div>
            </div>
          }
          <div className="space-y-5">
            <h1 className={cn("text-5xl text-wrap", stix.className)}>
              {book.title}
            </h1>
            <div className={cn("flex items-center space-x-20 text-base text-wrap h-fit", nunito.className)}>
              <div className="grid grid-cols-1 grid-flow-row">
                  {book.author.map((author) => (
                    <Link
                      key={author}
                      className="hover:underline underline-offset-8"
                      href={`/user/explore/author/${author}`}
                    >
                      {author}
                    </Link>
                  ))}
              </div>
              <span className="text-slate-500">
                {book.numPages} trang
              </span>
            </div>
            <div className="flex items-center space-x-5">
                <Ratings 
                    rating={book.avgRating}
                    variant="yellow" 
                    className="flex"
                    size={25}
                />
                <span className={cn("text-lg", nunito.className)}>{book.avgRating}/5</span>
                <span className="text-sm text-muted-foreground">{book.numOfRating} ratings</span>
            </div>
            <div className="flex flex-wrap items-center">
              {book.genres.map((genre) => (
                <Link
                  key={genre}
                  className="text-muted-foreground hover:text-primary underline-offset-8 underline pt-4 pr-4 cursor-pointer"
                  href={`/user/explore/genre/${genre}`}
                >
                  {genre}
                </Link>
              ))}
            </div>
          </div>
          <div className="pt-6">
            <BorrowForm book={book} />
          </div>
        </div>
      </div>
      <div className="md:grid md:grid-cols-2 justify-between w-full gap-x-32">
        <TextField 
          label="Mô tả" 
          value={book.description == null ? "Không có" : book.description}
        />
        <div className="md:grid md:grid-cols-2 grid-rows-3 justify-between gap-y-10">
          <LinkField 
            label="Thư viện"
            value={lib.name}
            href={`/user/explore/library/${lib._id}`}
          />
          <TextField 
            label="Địa chỉ"
            value={lib.address}
          />
          <LinkField 
            label="Nhà xuất bản"
            value={book.publisher}
            href={`/user/explore/publisher/${book.publisher}`}
          />
          <TextField
            label="Ngày xuất bản"
            value={book.publishDate}
          />
          <LinkField 
            label="Ngôn ngữ"
            value={book.language}
            href={`/user/explore/language/${book.language}`}
          />
        </div>
      </div>
    </div>
  );
}