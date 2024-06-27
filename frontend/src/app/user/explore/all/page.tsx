import BookPage from "@/components/user/book-page";
import { cn } from "@/lib/utils";
import { Nunito } from "next/font/google";

const nunito = Nunito({
    subsets: ["latin"],
});

export default function Page() {
    return (
        <div className={cn(nunito.className)}>
            <div className="flex gap-6">
                <div className="space-y-1 my-4">
                    <h2 className="text-2xl font-bold tracking-tight">
                        Khám phá thế giới sách của thư viện Bobo
                    </h2>
                    <p className="text-[15px] text-muted-foreground">
                        Toàn bộ sách của thư viện Bobo nằm ở đây.
                    </p>
                </div>
            </div>
            <div className="mt-6">
                <BookPage limit={12} />
            </div>
        </div>
    )
}