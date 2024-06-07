import type { Book } from "@/lib/interface";
import { 
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableCell,
    TableRow
} from "@/components/ui/table";
import BookImage from "@/components/user/book-image";
import { ToDateID } from "@/lib/utils";

// function DisplayList({list} : {list: string[]}) {
//     return (
//         <ul className="space-y-1">
//             {list.map((val) => (
//                 <li key={val}>{val}</li>
//             ))}
//         </ul>
//     )
// }

export default function BookTable({
    books
} : {books: Book[]}) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Ảnh bìa</TableHead>
                    <TableHead>Tên</TableHead>
                    <TableHead>Tác giả</TableHead>
                    <TableHead>Thể loại</TableHead>
                    <TableHead>Ngày thêm</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {books.map((book) => (
                    <TableRow key={book._id}>
                        <TableCell className="flex overflow-hidden">
                            <BookImage
                                book={book}
                                // hrefView={`user/book/${book._id}`}
                                // hrefBorrow={`user/book/${book._id}`}
                                style={{width: "150px", height: "250px"}}
                                key={book._id}
                            />
                        </TableCell>
                        <TableCell>
                            <span className="text-l font-semibold">
                                {book.title}
                            </span>
                        </TableCell>
                        <TableCell className="text-wrap text-muted-foreground"> 
                            {/* <DisplayList list={book.author}/>  */}
                            {book.author.join(", ")}
                        </TableCell>
                        <TableCell className="text-wrap w-[300px] text-muted-foreground"> 
                            {/* <DisplayList list={book.genres}/>  */}
                            {book.genres.join(", ")}
                        </TableCell>
                        <TableCell>
                            {ToDateID(book._id)}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}