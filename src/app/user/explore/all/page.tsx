import BookPage from "@/components/user/book-page";

export default function Page() {
    return (
        <>
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
            <BookPage limit={10}/>
        </>
    )
}