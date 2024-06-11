"use client"

import { BorrowHistory } from "@/lib/interface";
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<BorrowHistory>[] = [
    {
        accessorKey: "borrowDate",
        header: "Ngày mượn",
        cell: ({ row }) => <div className="text-center">{row.getValue("borrowDate").split("-").reverse().join("-")}</div>,
    },
    {
        accessorKey: "returnDate",
        header: "Ngày trả",
        cell: ({ row }) => <div className="text-center">{row.getValue("returnDate").split("-").reverse().join("-")}</div>,
    },
    {
        accessorKey: "bookTitle",
        header: "Tiêu đề",
    },
    {
        accessorKey: "library",
        header: "Thư viện",
    },
    {
        accessorKey: "status",
        header: "Trạng thái",
    },
]
