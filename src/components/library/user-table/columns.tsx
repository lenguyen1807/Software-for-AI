"use client"
import { User } from "@/lib/interface";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ShieldCheck, Trash2 } from "lucide-react"
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

export const getColumns = ({onDelete} : {onDelete: (id: string, token: string) => void}) : ColumnDef<User>[] => [
    {
        accessorKey: "_id",
        header: ({ column }) => {
            return (
                <div className="flex justify-center items-center">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Mã khách hàng
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>

            )
        },
        cell: ({ row }) => <div className="text-center">{row.getValue("_id")}</div>,
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <div className="flex justify-center items-center">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Họ và Tên
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>

            )
        },
        cell: ({ row }) => <div className="text-center">{row.getValue("name")}</div>,
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
                        Tài khoản
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>

            )
        },
        cell: ({ row }) => <div className="text-center">{row.getValue("username")}</div>,
    },
    {
        accessorKey: "role",
        header: ({ column }) => {
            return (
                <div className="flex justify-center items-center">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Loại toài khoản
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>

            )
        },
        cell: ({ row }) => <div className="text-center">{row.getValue("role")}</div>,
    },
    {
        accessorKey: "address",
        header: ({ column }) => {
            return (
                <div className="flex justify-center items-center">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Địa chỉ
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>

            )
        },
        cell: ({ row }) => <div className="text-center">{row.getValue("address")}</div>,
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <div className="flex justify-center items-center">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Trạng thái
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )
        },
        cell: ({ row }) => <div className="text-center">{row.getValue("status") == false ? "Chờ phê duyệt" : "Thành viên" }</div>,
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
                        <Button variant="ghost"><ShieldCheck  size={16} /></Button>
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