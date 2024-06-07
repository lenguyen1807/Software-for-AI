"use client"

import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { ArrowUpDown, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const data: Book[] = [
    {
        id: "m5gr84i9",
        tittle: "Harry Potter",
        author: "J. K. Rowling",
        genre: "Phép thuật",
        library: "KTX",
        publisher: "NXB Trẻ",
        importDate: "01-01-2024",
        status: "Đang hoạt động",
    },
    {
        id: "3u1reuv4",
        tittle: "Lord of the Rings",
        author: "J. R. R. Tolkien",
        genre: "Phiêu lưu",
        library: "KTX",
        publisher: "NXB Kim Đồng",
        importDate: "12-12-2023",
        status: "Đang hoạt động",
    },
    {
        id: "3u1reuv4",
        tittle: "Lord of the Rings",
        author: "J. R. R. Tolkien",
        genre: "Phiêu lưu",
        library: "KTX",
        publisher: "NXB Kim Đồng",
        importDate: "12-12-2023",
        status: "Đang hoạt động",
    },
    {
        id: "3u1reuv4",
        tittle: "Lord of the Rings",
        author: "J. R. R. Tolkien",
        genre: "Phiêu lưu",
        library: "KTX",
        publisher: "NXB Kim Đồng",
        importDate: "12-12-2023",
        status: "Đang hoạt động",
    },
    {
        id: "3u1reuv4",
        tittle: "Lord of the Rings",
        author: "J. R. R. Tolkien",
        genre: "Phiêu lưu",
        library: "KTX",
        publisher: "NXB Kim Đồng",
        importDate: "12-12-2023",
        status: "Đang hoạt động",
    },
    {
        id: "3u1reuv4",
        tittle: "Lord of the Rings",
        author: "J. R. R. Tolkien",
        genre: "Phiêu lưu",
        library: "KTX",
        publisher: "NXB Kim Đồng",
        importDate: "12-12-2023",
        status: "Đang hoạt động",
    },
    {
        id: "3u1reuv4",
        tittle: "Lord of the Rings",
        author: "J. R. R. Tolkien",
        genre: "Phiêu lưu",
        library: "KTX",
        publisher: "NXB Kim Đồng",
        importDate: "12-12-2023",
        status: "Đang hoạt động",
    },
    {
        id: "3u1reuv4",
        tittle: "Lord of the Rings",
        author: "J. R. R. Tolkien",
        genre: "Phiêu lưu",
        library: "KTX",
        publisher: "NXB Kim Đồng",
        importDate: "12-12-2023",
        status: "Đang hoạt động",
    },
    {
        id: "3u1reuv4",
        tittle: "Lord of the Rings",
        author: "J. R. R. Tolkien",
        genre: "Phiêu lưu",
        library: "KTX",
        publisher: "NXB Kim Đồng",
        importDate: "12-12-2023",
        status: "Đang hoạt động",
    },
    {
        id: "3u1reuv4",
        tittle: "Lord of the Rings",
        author: "J. R. R. Tolkien",
        genre: "Phiêu lưu",
        library: "KTX",
        publisher: "NXB Kim Đồng",
        importDate: "12-12-2023",
        status: "Đang hoạt động",
    },
    {
        id: "3u1reuv4",
        tittle: "Lord of the Rings",
        author: "J. R. R. Tolkien",
        genre: "Phiêu lưu",
        library: "KTX",
        publisher: "NXB Kim Đồng",
        importDate: "12-12-2023",
        status: "Đang hoạt động",
    },
    {
        id: "3u1reuv4",
        tittle: "Lord of the Rings",
        author: "J. R. R. Tolkien",
        genre: "Phiêu lưu",
        library: "KTX",
        publisher: "NXB Kim Đồng",
        importDate: "12-12-2023",
        status: "Đang hoạt động",
    },
]

export type Book = {
    id: string
    tittle: string
    author: string
    genre: string
    library: string
    publisher: string
    importDate: string

    status: "Đang hoạt động" | "Bị khóa"
}

export const columns: ColumnDef<Book>[] = [
    {
        accessorKey: "id",
        header: ({ column }) => {
            return (
                <div className="flex justify-center items-center">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Mã sách
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>

            )
        },
        cell: ({ row }) => <div className="text-center">{row.getValue("id")}</div>,
    },
    {
        accessorKey: "tittle",
        header: ({ column }) => {
            return (
                <div className="flex justify-center items-center">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Tiêu đề
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>

            )
        },
        cell: ({ row }) => <div className="text-center">{row.getValue("tittle")}</div>,
    },
    {
        accessorKey: "author",
        header: () => <div className="text-center">Tác giả</div>,
        cell: ({ row }) => <div className="text-center">{row.getValue("author")}</div>,
    },
    {
        accessorKey: "genre",
        header: () => <div className="text-center">Thể loại</div>,
        cell: ({ row }) => <div className="text-center">{row.getValue("genre")}</div>,
    },
    {
        accessorKey: "publisher",
        header: () => <div className="text-center">Nhà xuất bản</div>,
        cell: ({ row }) => <div className="text-center">{row.getValue("publisher")}</div>,
    },
    {
        accessorKey: "library",
        header: ({ column }) => {
            return (
                <div className="flex justify-center items-center">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Thư viện
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )
        },
        cell: ({ row }) => <div className="text-center">{row.getValue("library")}</div>,
    },
    {
        accessorKey: "importDate",
        header: ({ column }) => {
            return (
                <div className="flex justify-center items-center">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Ngày nhập
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )
        },
        cell: ({ row }) => <div className="text-center">{row.getValue("importDate")}</div>,
    },
    {
        accessorKey: "status",
        header: () => <div className="text-center">Trạng thái</div>,
        cell: ({ row }) => <div className="text-center">{row.getValue("status")}</div>,
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            return (
                <AlertDialog>
                    <AlertDialogTrigger>
                        <Button variant="ghost"><Trash2 size={16} /></Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Bạn có chắc chắn muốn xóa sách này?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Hành động này không thể được hoàn tác và sẽ xóa vĩnh viễn dữ liệu của sách khỏi máy chủ của chúng tôi.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )
        },
    },
]

export default function BookTable() {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div className="px-[25px]">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Nhập tiêu đề để tìm sách"
                    value={(table.getColumn("tittle")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("tittle")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    Không tìm thấy kết quả.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                {/* <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} trên {" "}
          {table.getFilteredRowModel().rows.length} hàng được chọn.
        </div> */}
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Trang trước
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Trang sau
                    </Button>
                </div>
            </div>
        </div>
    )
}