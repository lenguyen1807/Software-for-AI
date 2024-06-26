"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ResolveURL, cn, slugify } from "@/lib/utils"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import { createContext, useContext, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { InfoLibrarySchema } from "@/lib/zod";

import { Step, Stepper, useStepper, type StepItem } from "@/components/ui/stepper";
import { Button } from "@/components/ui/button";
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
} from "@/components/ui/dialog"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar-extended";
import { Calendar as CalendarIcon } from "lucide-react"
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { UserSignUpSchema } from "@/lib/zod";
import { Textarea } from "@/components/ui/textarea";
import axios, { AxiosError } from "axios";
import { User } from "@/lib/interface";

const steps = [
    { label: "Đăng ký", description: "Đăng ký tài khoản quản lý thư viện" },
    { label: "Nhập thông tin", description: "Nhập thông tin thư viện" }
] satisfies StepItem[];

interface ISignUpContext {
    status: boolean;
    setStatus: Dispatch<SetStateAction<boolean>>;
}

const SignUpContext = createContext<ISignUpContext>({ status: false, setStatus: () => { } });

export default function RegisterForm({ token }: { token: string }) {
    const [status, setStatus] = useState(false);

    return (
        <>
            <SignUpContext.Provider value={{ status, setStatus }}>
                <DialogAsk />
            </SignUpContext.Provider>
            <div className="flex w-3/4 flex-col gap-4">
                <Stepper variant="circle-alt" initialStep={0} steps={steps}>
                    {steps.map((stepProps, index) => {
                        if (index === 0) {
                            if (status) {
                                return (
                                    <Step key={stepProps.label} {...stepProps}>
                                        <SignUpForm token={token} />
                                    </Step>
                                )
                            }
                            return null;
                        }
                        return (
                            <Step key={stepProps.label} {...stepProps}>
                                <InfoForm token={token} />
                            </Step>
                        )
                    })}
                </Stepper>
            </div>
        </>
    )
};

function SignUpForm({ token }: { token: string }) {
    const form = useForm<z.infer<typeof UserSignUpSchema>>({ resolver: zodResolver(UserSignUpSchema) });
    const { toast } = useToast();
    const { nextStep } = useStepper();

    function onSubmit(_data: z.infer<typeof UserSignUpSchema>) {
        axios.post(ResolveURL("user"), {
            username: _data.username,
            name: _data.name,
            password: _data.password,
            email: _data.email,
            dateOfBirth: _data.birthday.toLocaleDateString("vi-VN", {
                month: "2-digit",
                day: "2-digit",
                year: "numeric"
            }).split("/").reverse().join("-"),
            address: _data.address,
            role: "library"
        }, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((response) => {
            if (response.status === 200) {
                toast({
                    title: "Đăng ký thành công",
                })
            }
            nextStep();
        }).catch((error) => {
            switch (error.response.status) {
                case 500:
                    toast({
                        title: "Trùng thông tin",
                        variant: "destructive",
                        action: <ToastAction altText="ok">Đăng ký lại</ToastAction>
                    })
                default:
                    toast({
                        title: "Có lỗi gì đó xảy ra rồi",
                        variant: "destructive",
                        action: <ToastAction altText="again">Đăng ký lại</ToastAction>
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
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tài khoản</FormLabel>
                            <FormControl>
                                <Input placeholder="duahaulaplanh" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-2 gap-y-6 gap-x-10 grid-rows-3">
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Mật khẩu</FormLabel>
                                <FormControl>
                                    <Input type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nhập lại mật khẩu</FormLabel>
                                <FormControl>
                                    <Input type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
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
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} />
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
                                <FormLabel>Địa chỉ liên hệ</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="birthday"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Ngày sinh</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP", { locale: vi })
                                                ) : (
                                                    <span>Chọn ngày</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            captionLayout="dropdown-buttons"
                                            fromYear={1990}
                                            toYear={2024}
                                            locale={vi}
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date > new Date() || date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit" variant="gooeyRight">
                    Đăng ký
                </Button>
            </form>
        </Form>
    )
}

function InfoForm({ token }: { token: string }) {
    const form = useForm<z.infer<typeof InfoLibrarySchema>>({ resolver: zodResolver(InfoLibrarySchema) });
    const [userID, setID] = useState("");
    const { toast } = useToast();
    const { nextStep } = useStepper();

    function onSubmit(_data: z.infer<typeof InfoLibrarySchema>) {
        axios.get(ResolveURL(`user?username=${_data.username}`), {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((response) => {
            const user: User = response.data[0];

            if (user.role != "library") {
                throw "Not an library";
            }

            axios.post(ResolveURL("libraries/new"), {
                managerID: user._id,
                slug: slugify(_data.name),
                ..._data
            }, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then((response) => {
                if (response.status === 200) {
                    toast({
                        title: "Tạo thư viện thành công",
                    })
                }
                nextStep();
            }).catch((error) => {
                switch (error.response.status) {
                    default:
                        toast({
                            title: "Có lỗi gì đó xảy ra rồi",
                            variant: "destructive",
                        })
                }
                throw error;
            })
        }).catch((error) => {
            if (error instanceof (AxiosError)) {
                throw error;
            } else {
                if (error === "Not an library") {
                    toast({
                        title: "Tài khoản không hợp lệ",
                        description: "Tài khoản bạn vừa nhập không phải là một tài khoản có quyền quản lý thư viện",
                        variant: "destructive"
                    })
                }
            }
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-2 gap-x-10">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tên thư viện</FormLabel>
                                <FormControl>
                                    <Input placeholder="Thư viện Bobo" {...field} />
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
                                <FormLabel>Địa chỉ thư viện</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Thông tin về thư viện</FormLabel>
                            <FormControl>
                                <Textarea className="resize-none" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-2 gap-x-10">
                    <FormField
                        control={form.control}
                        name="maxBorrowDays"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Số ngày mượn tối đa</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        {...field}
                                        onChange={event => field.onChange(+event.target.value)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lateFeePerDay"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Số tiền phạt khi trả sách trễ (nghìn đồng)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        {...field}
                                        onChange={event => field.onChange(+event.target.value)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tài khoản người quản lý</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button variant="gooeyLeft" type="submit">
                    Xác nhận
                </Button>
            </form>
        </Form>
    )
}

function DialogAsk() {
    const { status, setStatus } = useContext(SignUpContext);
    const [open, setOpen] = useState(true);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader className="gap-y-2">
                    <DialogTitle>Đã có tài khoản Quản lý thư viện ?</DialogTitle>
                    <DialogDescription>
                        Nếu đã có tài khoản để quản lý thư viện sắp tạo, hãy chọn "Đã có".
                    </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-x-10">
                    <Button
                        variant="ringHover"
                        onClick={() => {
                            setStatus(false);
                            setOpen(false);
                        }}
                    >
                        Đã có
                    </Button>
                    <Button
                        variant="ringHover"
                        onClick={() => {
                            setStatus(true);
                            setOpen(false);
                        }}
                    >
                        Tạo tài khoản mới
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}