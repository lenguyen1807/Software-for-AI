"use client"

import { Book } from "@/lib/interface";
import { ColumnDef } from "@tanstack/react-table";
import { ToDateID } from "@/lib/utils";
import { ArrowUpDown, PenIcon, Trash2 } from "lucide-react"
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
import { useSession } from "next-auth/react";

export const getColumns = ({onDelete} : {onDelete: (id: string, token: string) => void}) : ColumnDef<Book>[] => [
    {
        accessorKey: "_id",
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
        cell: ({ row }) => <div className="text-center">{row.getValue("_id")}</div>,
    },
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
        header: ({ column }) => {
            return (
                <div className="flex justify-center items-center">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Tác giả
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>

            )
        },
        cell: ({ row }) => <div className="text-center">{row.getValue("author").join(", ")}</div>,
    },
    {
        accessorKey: "genres",
        header: ({ column }) => {
            return (
                <div className="flex justify-center items-center">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Thể loại
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>

            )
        },
        cell: ({ row }) => <div className="text-center">{row.getValue("genres").join(", ")}</div>,
    },
    {
        accessorKey: "publisher",
        header: ({ column }) => {
            return (
                <div className="flex justify-center items-center">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Nhà xuất bản
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>

            )
        },
        cell: ({ row }) => <div className="text-center">{row.getValue("publisher")}</div>,
    },
    {
        accessorKey: "_id",
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
        cell: ({ row }) => <div className="text-center">{ToDateID(row.getValue("_id"))}</div>,
    },
    {
        accessorKey: "currentNum",
        header: ({ column }) => {
            return (
                <div className="flex justify-center items-center">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Số lượng còn lại
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>

            )
        },
        cell: ({ row }) => <div className="text-center">{row.getValue("currentNum")}</div>,
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const { data: session, status } = useSession();
            const token = session?.user.jwt;

            return (
                <AlertDialog>
                    <AlertDialogTrigger>
                        <Button variant="ghost"><PenIcon size={16} /></Button>
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
                            <AlertDialogAction
                                onClick={
                                    async() => onDelete(row.getValue("_id"), token)
                                }
                            >
                                Tiếp tục
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const { data: session, status } = useSession();
            const token = session?.user.jwt;

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
                            <AlertDialogAction
                                onClick={
                                    async() => onDelete(row.getValue("_id"), token)
                                }
                            >
                                Tiếp tục
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )
        },
    },
];