"use client"

import { IBorrowColumns } from "@/lib/interface";
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<IBorrowColumns>[] = [
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
        cell: ({row}) => {
            const status = row.getValue("status");
            if (status === "not returned") {
                return <Badge variant="green-subtle">Đang mượn</Badge>;
            }
            if (status === "dated") {
                return <Badge variant="red-subtle">Quá hạn</Badge>;
            }
            return <Badge variant="blue-subtle">Đã trả</Badge>;
        }
    },
]