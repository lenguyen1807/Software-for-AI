"use client"

import { Book } from "@/lib/interface";
import { ColumnDef, Table } from "@tanstack/react-table";
import { ArrowUpDown, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
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
import { useMemo } from "react";

export interface TableProps extends Book {
    status: "Đang hoạt động" | "Bị khóa",
    importDate: string,
    library: string
}

export const columns: ColumnDef<TableProps>[] = useMemo<
ColumnDef<TableProps>[]> ( 
() => [
    {
        accessorKey: "title",
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
        cell: ({ row }) => <div className="text-center">{row.getValue("title")}</div>,
    },
    {
        accessorKey: "author",
        header: () => <div className="text-center">Tác giả</div>,
        cell: ({ row }) => <div className="text-center">{row.getValue("author").join(", ")}</div>,
    },
    {
        accessorKey: "genres",
        header: () => <div className="text-center">Thể loại</div>,
        cell: ({ row }) => <div className="text-center">{row.getValue("genres").join(", ")}</div>
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
                            <AlertDialogCancel>Huỷ</AlertDialogCancel>
                            <AlertDialogAction>Tiếp tục</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )
        },
    },
], []);