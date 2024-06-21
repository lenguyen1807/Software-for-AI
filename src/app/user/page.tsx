import { GetBooks, GetBooksParam } from "@/lib/api";
import BookCard from "@/components/user/book-card";

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

import HorizontalBookCard from "@/components/user/horizontal-book-card";

import { ScrollArea } from "@/components/ui/scroll-area"

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
            <div className="grid grid-cols-10 gap-6 w-full text-dark-blue overflow-hidden p-3">
                <div className="xl:col-span-7 xl:row-span-2 col-span-10 bg-white rounded-2xl p-6 shadow-[rgba(50,50,93,0.08)_0px_0px_12px_-2px,_rgba(0,0,0,0.08)_0px_3px_7px_-3px]">
                    <Tabs defaultValue="recommend">
                        <TabsList className="grid w-[300px] bg-transparent grid-cols-2 gap-4">
                            <TabsTrigger
                                value="recommend"
                                className="rounded-full text-dark-blue/50 
                            data-[state=inactive]:ring-1 data-[state=inactive]:ring-dark-blue/20 
                            data-[state=inactive]:hover:ring-offset-1 data-[state=inactive]:hover:ring-dark-blue/50 data-[state=inactive]:hover:text-dark-blue/80
                            data-[state=active]:bg-dark-blue data-[state=active]:text-white"
                            >
                                Gợi ý cho bạn
                            </TabsTrigger>
                            <TabsTrigger
                                value="newest"
                                className="rounded-full text-dark-blue/50 
                            data-[state=inactive]:ring-1 data-[state=inactive]:ring-dark-blue/20 
                            data-[state=inactive]:hover:ring-offset-1 data-[state=inactive]:hover:ring-dark-blue/50 data-[state=inactive]:hover:text-dark-blue/80
                            data-[state=active]:bg-dark-blue data-[state=active]:text-white"
                            >
                                Sách mới
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="recommend">
                            <div className="space-y-6 mt-4 ">
                                <div className="space-y-1">
                                    <h2 className="text-2xl font-bold tracking-tight">
                                        Có thể bạn sẽ thích
                                    </h2>
                                    <p className="text-[15px] text-muted-foreground">
                                        Những sách được gợi ý dành riêng cho bạn đọc
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-6 justify-around">
                                    {books.slice(0, 8).map((book) => (
                                        <BookCard
                                            book={book}
                                            classNameImage="border-none w-[150px] h-[230px] flex-none"
                                            className="w-[150px] items-center"
                                        />
                                    ))}
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="newest">
                            <div className="space-y-6 mt-4 ">
                                <div className="space-y-1">
                                    <h2 className="text-2xl font-bold tracking-tight">
                                        Sách mới gần đây
                                    </h2>
                                    <p className="text-[15px] text-muted-foreground">
                                        Những sách mới được thêm vào thư viện Bobo
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-6 justify-around">
                                    {books.slice(0, 8).map((book) => (
                                        <BookCard
                                            book={book}
                                            classNameImage="border-none w-[150px] h-[230px] flex-none"
                                            className="w-[150px] items-center"
                                        />
                                    ))}
                                </div>
                            </div>

                        </TabsContent>
                    </Tabs>
                </div>
                
                
                <div className="xl:col-span-3 lg:col-span-5 col-span-10 bg-white rounded-2xl px-6 py-6 shadow-[rgba(50,50,93,0.08)_0px_0px_12px_-2px,_rgba(0,0,0,0.08)_0px_3px_7px_-3px]">
                    <div className="space-y-1">
                        <h2 className="text-2xl font-bold tracking-tight">
                            Được mượn nhiều nhất
                        </h2>
                        <p className="text-[15px] text-muted-foreground">
                            Sách được mượn nhiều nhất tháng vừa qua
                        </p>
                    </div>

                    <ScrollArea className="xl:h-[340px] my-3">
                        {rankedHotBooks.map((book) => (
                            <HorizontalBookCard
                                book={book}
                                width={"64px"}
                                height={"88px"}
                                key={book._id}
                                classNameImage=""
                                className="flex gap-[30px] p-3"
                            />
                        ))}
                    </ScrollArea>
                </div>
                
                <div className="shrink-0 xl:col-span-3 lg:col-span-5 col-span-10 bg-white rounded-2xl px-6 py-6 shadow-[rgba(50,50,93,0.08)_0px_0px_12px_-2px,_rgba(0,0,0,0.08)_0px_3px_7px_-3px]">
                    <div className="space-y-1">
                        <h2 className="text-2xl font-bold tracking-tight">
                            Lịch hẹn của bạn
                        </h2>
                        <p className="text-[15px] text-muted-foreground">
                            Nhắc nhở lịch hẹn mượn và trả sách
                        </p>
                    </div>
                    
                    <ScrollArea className="xl:h-[340px] my-3">
                        {rankedHotBooks.map((book) => (
                            <HorizontalBookCard
                                book={book}
                                width={"64px"}
                                height={"88px"}
                                key={book._id}
                                classNameImage=""
                                className="flex gap-[25px] p-3"
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