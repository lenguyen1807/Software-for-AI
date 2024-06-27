"use client"

import { UserBorrow } from "@/lib/interface";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge";

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
            return (
                <div className="text-center">
                    {deadline < new Date() ? <Badge variant={"red-subtle"}>Trễ hẹn</Badge> : <Badge variant={"green-subtle"}>Đang mượn</Badge>}
                </div>
            );
        },
    },
];