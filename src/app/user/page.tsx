import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { GetBooks } from "@/lib/api";
import BookCard from "@/components/user/book-card";
import ScrollPane from "@/components/user/scroll-pane"

export default async function Page() {
    const thisMonth = (new Date().getMonth() + 1).toString(); 

    const books = (await GetBooks()).slice(0, -3);

    return (
        <div className="col-span-3 lg:col-span-4 lg:border-l w-screen">
            <div className="h-full px-4 py-6 lg:px-8">
                <Tabs defaultValue="foryou" className="h-full space-y-6">
                    <div className="space-between flex items-center">
                        <TabsList>
                            <TabsTrigger value="foryou" className="relative">
                                Dành cho bạn
                            </TabsTrigger>
                            <TabsTrigger value="explore">
                                Khám phá
                            </TabsTrigger>
                        </TabsList>
                        <div className="ml-auto mr-4">
                            {/* <Help /> */}
                        </div>
                    </div>
                    <TabsContent
                      value="foryou"
                      className="border-md p-0 outline-none"
                    >
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
                                    books={books}
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
                                        Sách của tháng {thisMonth}
                                    </h2>
                                    <p className="text-sm text-muted-foreground">
                                        Là sách được bạn đọc mượn nhiều nhất tháng {thisMonth} này
                                    </p>
                                </div>
                                <BookCard
                                    book={books[0]}
                                    width="150px"
                                    height="230px"
                                    classNameImage="border-0"
                                    key={books[0]._id}
                                />
                            </div>
                        </div>
                        <Separator className="my-4" />
                        <div className="space-y-4">
                            <div className="mt-6 space-y-1">
                                <h2 className="text-2xl font-semibold tracking-tight">
                                    Sách mới gần đây
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    Những sách mới được thêm vào thư viện Bobo
                                </p>
                            </div>
                            <div className="justify-center mx-20">
                                <ScrollPane
                                    books={books}
                                    wBook={"200px"}
                                    hBook={"300px"}
                                    className="w-full border rounded-md"
                                    classNameImg="border-0"
                                    classNameCard=""
                                />
                                {/* <BookTable books={books}/> */}
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent
                      value="explore"
                      className="border-none p-0 outline-none space-y-10"
                    >
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
                            {/* <BookTable books={books}/> */}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}