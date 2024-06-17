import { GetBooks, GetBooksParam } from "@/lib/api";
import BookCard from "@/components/user/book-card";

import HorizontalBookCard from "@/components/user/horizontal-book-card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import BookCarousel from "@/components/user/book-carousel";

import { cn } from "@/lib/utils";
import { Nunito } from "next/font/google";

const nunito = Nunito({
    subsets: ["latin"],
});

export default async function Page() {
    const books = await GetBooks();
    const hotBooks = await GetBooksParam({limit:5, page:1, sort_by:"-totalBorrow"});

    const rankedHotBooks = hotBooks.map((book, index) => ({
        ...book,
        rank: index + 1
    }));
    
    return (
        <div className={cn(nunito.className)}>
            {/* Recommend  */}
            <div className="grid grid-cols-11 gap-6 text-dark-blue mt-6">
                <div className="col-start-2 col-span-9  bg-white border border-slate-200 rounded-lg p-6">
                    <h2 className="text-2xl font-bold tracking-tight">
                        Có thể bạn sẽ thích
                    </h2>
                    <p className="text-base text-muted-foreground">
                        Những sách được gợi ý dành riêng cho bạn đọc
                    </p>                
                    <div className="flex justify-center">
                        <BookCarousel books={books.slice(0, 8)} />
                    </div>
                </div>
            </div>
            
            <div className="grid grid-cols-11 gap-6 text-dark-blue mt-6 pb-6">
                <div className="col-start-2 col-span-6 row-span-2 bg-white border border-slate-200 rounded-lg p-6">
                    <h2 className="text-2xl font-bold tracking-tight">
                        Sách mới gần đây
                    </h2>
                    <p className="text-base text-muted-foreground">
                        Những sách mới được thêm vào thư viện Bobo
                    </p>
                    <div className=" grid grid-cols-4 gap-x-3 gap-y-6 justify-items-center py-6">
                        {books.slice(0, 10).map((book) => (
                            <BookCard
                                book={book}
                                width="150px"
                                height="230px"
                                classNameImage="border-0"
                                className=""
                                key={book._id}
                            />
                        ))}
                    </ div>
                </div>

                <div className="col-span-3 bg-white border border-slate-200 rounded-lg px-6 pt-6">
                    <h2 className="text-2xl font-bold tracking-tight">
                        Được mượn nhiều nhất
                    </h2>
                    <p className="text-base text-muted-foreground">
                        Sách được mượn nhiều nhất tháng vừa qua
                    </p>

                    <ScrollArea className="h-[400px] mt-3">
                        {rankedHotBooks.map((book) => (
                            <HorizontalBookCard
                                book={book}
                                width={"80px"}
                                height={"110px"}
                                key={book._id}
                                classNameImage=""
                                className="flex gap-[30px] p-3"
                            />
                        ))}
                    </ScrollArea>
                </div>

                <div className="col-span-3 bg-white border border-slate-200 rounded-lg p-6">
                    <h2 className="text-2xl font-bold tracking-tight">
                        Lịch hẹn của bạn
                    </h2>
                    <p className="text-base text-muted-foreground">
                        Nhắc nhở lịch hẹn mượn và trả sách
                    </p>

                    <ScrollArea className="h-[400px] mt-3">
                        {rankedHotBooks.map((book) => (
                            <HorizontalBookCard
                                book={book}
                                width={"80px"}
                                height={"110px"}
                                key={book._id}
                                classNameImage="shadow-none"
                                className="flex gap-[30px] p-3"
                            />
                        ))}
                    </ScrollArea>
                </div>
            </div>
        </div>
    )
}

// export default async function Page() {
//     const thisMonth = (new Date().getMonth() + 1).toString(); 
//     const books = await GetBooks();
//     const hotBook = (await GetBooksParam({limit:"1", page:"1", sort_by:"-totalBorrow"}))[0];

//     return (
//         <div className="col-span-3 lg:col-span-4 lg:border-l w-screen">
//             <div className="h-full px-4 py-6 lg:px-8">
//                 <Tabs defaultValue="foryou" className="h-full space-y-6">
//                     <div className="space-between flex items-center">
//                         <TabsList>
//                             <TabsTrigger value="foryou" className="relative">
//                                 Dành cho bạn
//                             </TabsTrigger>
//                             <TabsTrigger value="explore">
//                                 Khám phá
//                             </TabsTrigger>
//                         </TabsList>
//                         <div className="ml-auto mr-4">
//                             <HelpModal />
//                         </div>
//                     </div>
//                     <TabsContent
//                       value="foryou"
//                       className="border-md p-0 outline-none"
//                     >
                     
//                     </TabsContent>
//                     <TabsContent
//                       value="explore"
//                       className="border-none p-0 outline-none space-y-10"
//                     >
//                         <ExplorePage />
//                     </TabsContent>
//                 </Tabs>
//             </div>
//         </div>
//     )
// }