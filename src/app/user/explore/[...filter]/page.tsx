import BookPage from "@/components/user/book-page";
import { decode } from "querystring";

type Props = {
    params: { filter: string[] };
}

export function generateMetadata({
    params
} : Props) {
    const filter = params.filter[0].charAt(0).toUpperCase() + params.filter[0].slice(1)
    const name = decodeURI(params.filter[1]);
    return { title: `${filter} | ${name === undefined ? "" : name}`};
}

function RenderBookPage({
    filter, name
} : {
    filter: string, name: string
}) {
    if (filter == "genre") {
        return (
            <BookPage limit={10} genres={name}/>
        )
    }

    if (filter == "publisher") {
        return (
            <BookPage limit={10} publisher={name}/>
        )
    }

    if (filter == "language") {
        return (
            <BookPage limit={10} language={name}/>
        )
    }

    if (filter == "author") {
        return (
            <BookPage limit={10} author={name}/>
        )
    }

    if (filter == "series") {
        return (
            <BookPage limit={10} series={name}/>
        )
    }
}

export default function Page({
    params
} : Props) {
    const filter = params.filter[0];
    const name = decodeURIComponent(params.filter[1]);

    return (
        <>
            <div className="flex justify-between">
                <div className="space-y-4">
                    <div className="mt-6 space-y-1">
                        <h2 className="text-2xl font-semibold tracking-tight text-wrap">
                            {filter == "genre" && `Thể loại ${name}`}
                            {filter == "publisher" && `Nhà xuất bản ${name}`}
                            {filter == "language" && `Ngôn ngữ ${name}`}
                            {filter == "series" && `Tuyển tập ${name}`}
                            {filter == "author" && `Tác giả ${name}`}
                        </h2>
                    </div>
                </div>
            </div>
            <RenderBookPage filter={filter} name={name} />
        </>
    )
}