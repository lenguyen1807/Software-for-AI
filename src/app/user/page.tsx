// import {
//   Tabs,
//   TabsList,
//   TabsTrigger,
//   TabsContent
// } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { GetBooks, GetBooksParam } from "@/lib/api";
import BookCard from "@/components/user/book-card";
import ScrollPane from "@/components/user/scroll-pane"
import BookTable from "@/components/user/booktable";
// import HelpModal from "@/components/user/help-modal";
// import dynamic from 'next/dynamic'

export default async function Page() {
    // const thisMonth = (new Date().getMonth() + 1).toString(); 
    const books = await GetBooks();
    const hotBook = (await GetBooksParam({limit:1, page:1, sort_by:"-totalBorrow"}))[0];

    return (
        <>
           <div className="flex justify-between">
                <div className="space-y-4">
                    <div className="mt-6 space-y-1">
                        <h2 className="text-2xl font-semibold tracking-tight">
                            Có thể bạn sẽ thích
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Những sách được gợi ý dành riêng cho bạn đọc
                        </p>
                    </div>
                    <ScrollPane
                        books={books.slice(0, 7)}
                        wBook={"150px"}
                        hBook={"230px"}
                        className="w-[950px] border rounded-md"
                        classNameImg="border-0"
                        classNameCard=""
                    />
                </div>
                <div className="space-y-4 hidden md:block mr-8">
                    <div className="mt-6 space-y-1">
                        <h2 className="text-2xl font-semibold tracking-tight">
                            Sách được mượn nhiều nhất
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Là sách được bạn đọc mượn nhiều nhất của thư viện Bobo
                        </p>
                    </div>
                    <BookCard
                        book={hotBook}
                        width="150px"
                        height="230px"
                        classNameImage="border-0"
                        key={hotBook._id}
                    />
                </div>
            </div>
            <Separator className="my-4" />
            <div className="space-y-4 items-center">
                <div className="mt-6 space-y-1">
                    <h2 className="text-2xl font-semibold tracking-tight">
                        Sách mới gần đây
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Những sách mới được thêm vào thư viện Bobo
                    </p>
                </div>
                <div className="justify-center mx-20">
                    {/* <ScrollPane
                        books={books.slice(0, 5)}
                        wBook={"200px"}
                        hBook={"300px"}
                        className="w-full border rounded-md"
                        classNameImg="border-0"
                        classNameCard=""
                    /> */}
                    <BookTable books={books}/>
                </div>
            </div>
        </>
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