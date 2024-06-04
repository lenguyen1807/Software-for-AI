"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const rangeBorrowDays = Array.from({ length: 96 }, (_, i) => (i + 5).toString())

const lateFeePerDay = Array.from({ length: 1000 }, (_, i) => ((i + 1) * 1000).toString())

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Thông tin bắt buộc."
    }),

    username: z.string().min(7, {
        message: "Tài khoản gồm 7-20 kí tự.",
    }).max(20, {
        message: "Tài khoản gồm 7-20 kí tự.",
    }),

    password: z.string().min(8, {
        message: "Mật khẩu gồm ít nhất 8 kí tự."
    }),

    passwordConfirm: z.string(),

    address: z.string().min(1, {
        message: "Thông tin bắt buộc."
    }),

    maxBorrowDays: z.enum(rangeBorrowDays.map(String) as [string, ...string[]], {
        message: "Thông tin bắt buộc."
    }),

    lateFee: z.enum(lateFeePerDay.map(String) as [string, ...string[]], {
        message: "Thông tin bắt buộc."
    }),

}).refine((data) => {
    return data.password === data.passwordConfirm
}, {
    message: "Mật khẩu nhập lại không khớp.",
    path: ["passwordConfirm"]
})

export default function RegisterForm() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
            passwordConfirm: "",
            name: "",
            address: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <div className="flex flex-col items-center justify-between pt-[50px]">
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 min-w-[500px]">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tên thư viện</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder=""
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tài khoản</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="VD: thuvien01"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Đây là tài khoản bạn dùng để đăng nhập.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mật khẩu</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder=""
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
                    name="passwordConfirm"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nhập lại mật khẩu</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder=""
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
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Địa chỉ</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder=""
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-2">
                    <FormField
                        control={form.control}
                        name="maxBorrowDays"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Số ngày mượn tối đa</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Chọn số ngày" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {rangeBorrowDays.map((number) => (
                                            <SelectItem key={number} value={number}>
                                                {number}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="maxBorrowDays"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phí trả sách trễ/ ngày</FormLabel>
                                <FormControl>
                                    <Select>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Chọn phí phạt" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {lateFeePerDay.map((number) => (
                                                    <SelectItem key={number} value={number}>
                                                        {number}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>


                <div className="text-right">
                    <Button type="submit">Gửi</Button>
                </div>
            </form>
        </Form>
        </div>
        
    )
}