"use client"

import { UserBorrow } from "@/lib/interface";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Undo2 } from "lucide-react"
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

export const getColumns = ({onDelete} : {onDelete: (id: string, token: string) => void}):ColumnDef<UserBorrow>[] => [
    {
        accessorKey: "borrowDate",
        header: ({ column }) => {
            return (
                <div className="flex justify-center items-center">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Ngày mượn
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>

            )
        },
        cell: ({ row }) => <div className="text-center">{row.getValue("borrowDate")}</div>,
    },
    {
        accessorKey: "returnDate",
        header: ({ column }) => {
            return (
                <div className="flex justify-center items-center">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Ngày trả
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>

            )
        },
        cell: ({ row }) => <div className="text-center">{row.getValue("returnDate")}</div>,
    },
    {
        accessorKey: "bookTitle",
        header: ({ column }) => {
            return (
                <div className="flex justify-center items-center">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Tên sách
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>

            )
        },
        cell: ({ row }) => <div className="text-center">{row.getValue("bookTitle")}</div>,
    },
    {
        accessorKey: "username",
        header: ({ column }) => {
            return (
                <div className="flex justify-center items-center">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Tên người mượn
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>

            )
        },
        cell: ({ row }) => <div className="text-center">{row.getValue("username")}</div>,
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <div className="flex justify-center items-center">
                    Trạng thái
                </div>

            )
        },
        cell: ({ row }) => {
            const deadline = new Date(row.getValue("returnDate"));
            let value = null;

            if (deadline < new Date() && row.getValue("status") != "returned") {
                value = "Quá hạn";
            }
            else {
                value = row.getValue("status") === "not returned" ? "Đang mượn" : "Đã trả";
            }

            return (
                <div className="text-center">
                    {value}
                </div>
            );
        },
    },
    {
        id: "actions",
        cell: ({row}) => {
            const { data: session, status } = useSession();
            const token = session?.user.jwt;

            return (
                <AlertDialog>
                    <AlertDialogTrigger>
                        <Button variant="ghost"><Undo2 size={16} /></Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Bạn có muốn xác nhận người dùng {row.getValue("username")} trả sách?</AlertDialogTitle>
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
        }
    },
    {
        accessorKey: "_id",
        header: ({ column }) => {},
        cell: ({ row }) => <></>,
    }
];