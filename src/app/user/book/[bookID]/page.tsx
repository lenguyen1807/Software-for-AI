import { GetBookByID } from "@/lib/api";
import Image from "next/image";
import { STIX_Two_Text, Nunito } from "next/font/google";
import { cn } from "@/lib/utils";
// import { DisplayList } from "@/components/user/booktable";
// import BorrowForm from "@/components/user/borrow-form";
import { Ratings } from "@/components/ui/ratings";

const stix = STIX_Two_Text({
  weight: "600",
  subsets: ["latin"],
});

const nunito = Nunito({
  subsets: ["latin"]
});

type Props = {
  params: { bookID: string };
};

function TextField({label, value} : {label: string, value: string}) {
  return (
    <div className="space-y-4">
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

  return (
    <div className="max-w-7xl mx-auto p-10 space-y-20">
      <div className='flex flex-col justify-center lg:flex-row lg:items-center'>
      <div className='flex flex-col justify-center sm:w-2/4 xl:ml-40'>
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
        </div>
        <div className="space-y-5">
          <h1 className={cn("text-5xl text-wrap", stix.className)}>
            {book.title}
          </h1>
          <div className={cn("flex items-center space-x-20 text-base text-wrap h-fit", nunito.className)}>
            <ul className="space-y-1">
                {book.author.map((author) => (
                    <li key={author}>{author}</li>
                ))}
            </ul>
            <span className="text-slate-500">
              {book.numPages} trang
            </span>
          </div>
          <div className="flex items-center space-x-10">
              <Ratings 
                  rating={book.avgRating}
                  variant="yellow" 
                  className="flex"
                  size={25}
              />
              <span className={cn("text-lg", nunito.className)}>{book.avgRating}/5</span>
              <span className="text-sm text-muted-foreground">{book.numOfRating} ratings</span>
          </div>
          <div className="flex flex-wrap items-center px-0">
            {book.genres.map((genre) => (
              <p 
                key={genre}
                className="text-muted-foreground hover:text-primary underline-offset-8 underline pt-4 pr-4 cursor-pointer"
              >
                {genre}
              </p>
            ))}
          </div>
          <div className="pt-6">
            {/* <BorrowForm book={book} /> */}
          </div>
        </div>
      </div>
      <div className="md:grid md:grid-cols-2 justify-between space-x-52">
        <TextField 
          label="Mô tả" 
          value={book.description == null ? "Không có" : book.description}
        />
        <div className="md:grid hidden grid-cols-2 grid-rows-3 justify-between">
          <div className="col-span-2">
            <TextField 
              label="Thư viện"
              value=""
            />
          </div>
          <TextField
            label="Nhà xuất bản"
            value={book.publisher}
          />
          <TextField
            label="Ngày xuất bản"
            value={(new Date(book.publishDate)).toLocaleDateString()}
          />
          <TextField
            label="Ngôn ngữ"
            value={book.language}
          />
          <TextField
            label="Series"
            value={book.series == null ? "Không có" : book.series.join(", ")}
          />
        </div>
      </div>
    </div>
  );
}