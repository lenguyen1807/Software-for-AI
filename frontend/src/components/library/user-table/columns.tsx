"use client"
import { UserJoin } from "@/lib/interface";
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
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { useSession } from "next-auth/react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export const getColumns = ({onApprove} : {onApprove: (id: string, token: string, accept: boolean) => void}) : ColumnDef<UserJoin>[] => [
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
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <div className="flex justify-center items-center">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Email
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>

            )
        },
        cell: ({ row }) => <div className="text-center">{row.getValue("email")}</div>,
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
        accessorKey: "libCheck",
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
        cell: ({ row }) => 
        <div className="text-center">
            {row.getValue("libCheck") == false 
            ? <Badge variant="blue-subtle">Chờ phê duyệt</Badge> 
            : <Badge variant="green-subtle">Thành viên</Badge>}
        </div>,
    },
    {
        id: "actions",
        header: ({ column }) => <span>Xét duyệt</span>,
        cell: ({ row }) => {
            const { data: session, status } = useSession();
            const token = session?.user.jwt;
            const front = row.getValue("frontImageUrl")
            const back = row.getValue("backImageUrl")

            return (
                <AlertDialog>
                    <AlertDialogTrigger>
                        {row.getValue("libCheck") === false && <Button variant="ghost"><ShieldCheck size={16}/></Button>}
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Bạn có chắc chắn muốn cho người dùng này trở thành thành viên?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Người dùng {row.getValue("name")} sẽ trở thành thành viên của thư viện bạn và có thể mượn sách. Đồng thời bạn không thể tự xoá người dùng này ra khỏi danh sách thành viên.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <div className="grid grid-cols-2 gap-x-14">
                            <div className="space-y-6">
                                <span className="text-sm text-muted-foreground">Ảnh mặt trước</span>
                                {front != undefined && <Dialog>
                                    <DialogTrigger>
                                        <Image src={row.getValue("frontImageUrl")}
                                            width={200} 
                                            height={200} 
                                            alt={row.getValue("email")}
                                            style={{
                                                width: '100%',
                                                height: 'auto',
                                            }}
                                        />
                                    </DialogTrigger>
                                    <DialogContent className="min-w-[600px]">
                                        <div className="relative h-[calc(100vh-220px)] w-full overflow-clip rounded-md bg-transparent">
                                            <Image src={row.getValue("frontImageUrl")} fill alt={row.getValue("email")} className="h-full w-full object-contain" />
                                        </div>
                                    </DialogContent>
                                </Dialog>}
                            </div>
                            <div className="space-y-6">
                                <span className="text-sm text-muted-foreground">Ảnh mặt sau</span>
                                {back != undefined && <Dialog>
                                    <DialogTrigger>
                                        <Image src={row.getValue("backImageUrl")}
                                            width={200} 
                                            height={200} 
                                            alt={row.getValue("email")}
                                            style={{
                                                width: '100%',
                                                height: 'auto',
                                            }}
                                        />
                                    </DialogTrigger>
                                    <DialogContent className="min-w-[600px]">
                                        <div className="relative h-[calc(100vh-220px)] overflow-clip rounded-md bg-transparent">
                                            <Image src={row.getValue("backImageUrl")} fill alt={row.getValue("email")} className="h-full w-full object-contain" />
                                        </div>
                                    </DialogContent>
                                </Dialog>}
                            </div>
                        </div>
                        <AlertDialogFooter>
                            <AlertDialogCancel>
                                Huỷ 
                            </AlertDialogCancel>
                            <AlertDialogAction
                                onClick={
                                    async() => onApprove(row.getValue("_id"), token, false)
                                }
                            >
                                Từ chối
                            </AlertDialogAction>
                            <AlertDialogAction
                                onClick={
                                    async() => onApprove(row.getValue("_id"), token, true)
                                }
                            >
                                Duyệt
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )
        },
    },
    {
        accessorKey: "frontImageUrl",
        header: ({ column }) => {},
        cell: ({ row }) => <></>,
    },
    {
        accessorKey: "backImageUrl",
        header: ({ column }) => {},
        cell: ({ row }) => <></>,
    },
    {
        accessorKey: "_id",
        header: ({ column }) => {},
        cell: ({ row }) => <></>,
    },
];