import type { Book } from "@/lib/interface";
// import { Book as BookIcon, BookPlus} from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import HoverContent from "@/components/user/hover-content";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    book: Book
};

export default function BookImage({
    book,
    style,
    className
}: Props) {
    return (
        <HoverCard openDelay={100} closeDelay={0}>
            <HoverCardTrigger asChild>
                <Link
                    href={`/user/book/${book._id}`}
                    className="overflow-hidden flex rounded-md shadow-[-9px_9px_5px_-5px_rgba(0,0,0,0.3)] shadow-slate-400 hover:scale-[102%]"
                    style={style}
                    key={book._id}
                >
                    <Image
                        src={book.imageUrl}
                        alt={book.title}
                        height={200}
                        width={300}
                        className={cn("object-cover transition-all", className)}
                    />
                </Link>
            </HoverCardTrigger>
            <HoverCardContent
                side="right"
                className="border-8 w-[26rem]"
            >
                <HoverContent book={book} />
            </HoverCardContent>
        </HoverCard>
    );
}

// export default function BookImage({
//     book,
//     hrefView,
//     hrefBorrow,
//     style,
//     className
// } : BookProps) {
//     return (
//         <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//                 <div
//                     className="overflow-hidden flex rounded-md shadow-[-10px_10px_5px_-5px_rgba(0,0,0,0.3)] hover:scale-105"
//                     style={style}
//                     key={book._id}>
//                     <Image
//                         src={book.imageUrl}
//                         alt={book.title}
//                         height={200}
//                         width={300}
//                         className={cn("object-cover transition-all", className)}
//                     />
//                 </div>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent>
//                 <DropdownMenuGroup className="w-40">
//                     <DropdownMenuItem>
//                         <Link href={hrefView} className="flex">
//                             <BookIcon className="mr-2 h-4 w-4"/>
//                             Xem sách
//                         </Link>
//                     </DropdownMenuItem>
//                     <DropdownMenuSeparator/>
//                     <DropdownMenuItem>
//                         <Link href={hrefBorrow} className="flex">
//                             <BookPlus className="mr-2 h-4 w-4"/>
//                             Mượn sách
//                         </Link>
//                     </DropdownMenuItem>
//                 </DropdownMenuGroup>
//             </DropdownMenuContent>
//         </DropdownMenu>
//     )
// }