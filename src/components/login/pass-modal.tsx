"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { useToast } from "../ui/use-toast"
import { Input } from "../ui/input";
import axios from "axios";
import { ResolveURL } from "@/lib/utils";
import { useState } from "react";

const ForgotPasswordSchema = z.object({
    username: z.string(),
    email: z.string().email("Đây là email không hợp lệ")
});

export default function PasswordModal({type} : {type: string}) { 
    const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
        resolver: zodResolver(ForgotPasswordSchema)
    });
    const [open, setOpen] = useState(false);
    const { toast } = useToast();

    function onSubmit(_data: z.infer<typeof ForgotPasswordSchema>) {
        axios.put(ResolveURL("forget-password"), null, {
            params: _data
        }).then((response) => {
            setOpen(false);
            if (response.status === 200) {
                toast({
                    title: "Xác nhận thành công",
                    description: "Bạn đọc vui lòng check email của mình nhé",
                })
            } 
        }).catch((error) => {
            setOpen(false);
            switch(error.response.status) {
                case 404:
                    toast({
                        title: "Thông tin bị sai",
                        description: "Có thể tên tài khoản hoặc email bạn đọc nhập sai rồi",
                        variant: "destructive"
                    })
                    break;
                default:
                    toast({
                        title: "Có lỗi gì đó xảy ra rồi",
                        description: "Đã có lỗi gì đó trong quá trình đăng ký. Mong bạn đọc thông cảm cho Bobo",
                        variant: "destructive",
                    })
                    break;
            }
        })
    }

    return(
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="link" className="text-muted-foreground">
                    Quên mật khẩu ?
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Lấy lại mật khẩu</DialogTitle>
                    <DialogDescription>
                        Sau khi bạn đọc điền đúng thông tin, một email kèm với mật khẩu tạm thời sẽ được gửi đến cho bạn đọc. Sau đó bạn đọc có thể dùng mật khẩu tạm thời nãy để đăng nhập và đổi mật khẩu mới.
                    </DialogDescription>
                </DialogHeader>
                {type === "library" && <p>Hãy liên hệ với quản trị viên của thư viện Bobo để được lấy lại mật khẩu.</p>}
                {type === "admin" && <p>Hết cứu</p>}
                {type === "user" && 
                <Form {...form}>
                    <form
                        className="space-y-6" 
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Tên tài khoản</FormLabel>
                                <FormControl>
                                    <Input {...field} required />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email của bạn</FormLabel>
                                <FormControl>
                                <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <Button type="submit">
                            Xác nhận
                        </Button>
                    </form>
                </Form>
                }
            </DialogContent>
        </Dialog>
    )
}