"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { InfoUserSchema, UserPasswordSchema } from "@/lib/zod"
import { User } from "@/lib/interface"
import { z } from "zod"

import { useToast } from "@/components/ui/use-toast"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import UploadAvatar from "@/components/user/upload-avatar"
import { Button } from "../ui/button"
import axios from "axios"
import { ResolveURL } from "@/lib/utils"

export function InfoForm({user, token} : {user: User, token: string}) {
    const form = useForm<z.infer<typeof InfoUserSchema>>({
        resolver: zodResolver(InfoUserSchema),
        defaultValues: {
            ...user,
        }
    });
    const { toast } = useToast();

    function onSubmit(_data: z.infer<typeof InfoUserSchema>) {
        axios.put(ResolveURL("user/info"), {
            ..._data
        }, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((response) => {
            if (response.status === 200) {
                toast({
                    title: "Đổi thông tin thành công",
                })
            } 
        }).catch((error) => {
            switch(error.response.status) {
                default:
                    toast({
                        title: "Có lỗi gì đó xảy ra rồi",
                        variant: "destructive",
                    })
            }
            throw error;
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
                <div className="grid grid-cols-5 grid-flow-col gap-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                        <FormItem className="col-span-3 space-y-2">
                            <FormLabel>Họ và tên</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="dateOfBirth"
                        render={({ field }) => (
                        <FormItem className="col-span-3 space-y-2">
                            <FormLabel>Ngày sinh</FormLabel>
                            <FormControl>
                                <Input 
                                    placeholder="YYYY-MM-DD"
                                    {...field} 
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <div className="flex justify-center items-center row-span-2 col-span-2">
                        <UploadAvatar avt={user} />
                    </div>
                </div>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                    <FormItem className="space-y-2">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input 
                                {...field} 
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                    <FormItem className="space-y-2">
                        <FormLabel>Địa chỉ</FormLabel>
                        <FormControl>
                            <Input 
                                {...field} 
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <div className="flex justify-end px-6">
                    <Button
                        type="submit"
                        variant="gooeyRight"
                    >
                        Lưu thay đổi
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export function ChangePassForm({token} : {token: string}) {
    const form = useForm<z.infer<typeof UserPasswordSchema>>({
        resolver: zodResolver(UserPasswordSchema)
    });
    const { toast } = useToast();

    function onSubmit(_data: z.infer<typeof UserPasswordSchema>) {
        axios.put(ResolveURL("user/info/password"), null, {
            params: {
                old_password: _data.password,
                new_password: _data.newPassword,
                confirm_password: _data.confirmPassword
            },
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((response) => {
            if (response.status === 200) {
                toast({
                    title: "Đổi mật khẩu thành công",
                })
            } 
        }).catch((error) => {
            switch(error.response.status) {
                default:
                    toast({
                        title: "Có lỗi gì đó xảy ra rồi",
                        variant: "destructive",
                    })
            }
            throw error;
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                    <FormItem className="space-y-2">
                        <FormLabel>Mật khẩu hiện tại</FormLabel>
                        <FormControl>
                            <Input 
                                type="password"
                                {...field} 
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                    <FormItem className="space-y-2">
                        <FormLabel>Nhập lại mật khẩu hiện tại</FormLabel>
                        <FormControl>
                            <Input 
                                type="password"
                                {...field} 
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                    <FormItem className="space-y-2">
                        <FormLabel>Mật khẩu mới</FormLabel>
                        <FormControl>
                            <Input 
                                type="password"
                                {...field} 
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <div className="flex justify-end px-6">
                    <Button
                        type="submit"
                        variant="gooeyLeft"
                    >
                        Đổi mật khẩu
                    </Button>
                </div>
            </form>
        </Form>
    )
}