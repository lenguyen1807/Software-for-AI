import BookPage from "@/components/user/book-page";
import { slugify } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { Nunito } from "next/font/google";

const nunito = Nunito({
    subsets: ["latin"],
});

type Props = {
    params: { filter: string[] };
}

export function generateMetadata({
    params
}: Props) {
    const filter = params.filter[0].charAt(0).toUpperCase() + params.filter[0].slice(1)
    const name = decodeURI(params.filter[1]);
    return { title: `${filter} | ${name === undefined ? "" : name}` };
}

function RenderBookPage({
    filter, name, limit
}: {
    filter: string, name: string, limit: number
}) {
    if (filter == "genre") {
        return (
            <BookPage limit={limit} genres={name} />
        )
    }

    if (filter == "publisher") {
        return (
            <BookPage limit={limit} publisher={name} />
        )
    }

    if (filter == "language") {
        return (
            <BookPage limit={limit} language={name} />
        )
    }

    if (filter == "author") {
        return (
            <BookPage limit={limit} author={name} />
        )
    }

    if (filter == "series") {
        return (
            <BookPage limit={limit} series={name} />
        )
    }

    if (filter == "search") {
        const slug = slugify(name);
        return (
            <BookPage limit={limit} slug={slug} />
        )
    }
}

export default function Page({
    params
}: Props) {
    const filter = params.filter[0];
    const name = decodeURIComponent(params.filter[1]);

    return (
        <>
            <div className={cn(nunito.className, "flex justify-between")}>
                <div className="space-y-4">
                    <div className="mt-6 space-y-1">
                        <h2 className="text-2xl font-bold tracking-tight text-wrap">
                            {filter == "genre" && `Thể loại ${name}`}
                            {filter == "publisher" && `Nhà xuất bản ${name}`}
                            {filter == "language" && `Ngôn ngữ ${name}`}
                            {filter == "series" && `Tuyển tập ${name}`}
                            {filter == "author" && `Tác giả ${name}`}
                            {filter == "search" && `Kết quả tìm kiếm của ${name}`}
                        </h2>
                    </div>
                </div>
            </div>
            <RenderBookPage limit={12} filter={filter} name={name} />
        </>
    )
}