"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from 'axios';
import { format } from "date-fns"
import { vi } from "date-fns/locale"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogDescription,
  DialogTitle
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input";
import { ResolveURL } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar-extended";
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast";
import { SignUpSchema as FormSchema } from "@/lib/zod"
import { useState } from "react";
import { ToastAction } from "../ui/toast";

export default function SignupForm() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({ resolver: zodResolver(FormSchema) });

  function onSubmit(_data: z.infer<typeof FormSchema>) {
    axios.post(ResolveURL("register"), {
      username: _data.username,
      name: _data.name,
      password: _data.password,
      email: _data.email,
      dateOfBirth: _data.birthday.toLocaleDateString("vi-VN", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric"
      }).split("/").reverse().join("-"),
      address: _data.address
    })
      .then((response) => {
        setOpen(false);
        if (response.status === 200) {
          toast({
            title: "Đăng ký thành công",
            description: "Cảm ơn bạn đọc đã tin tưởng Bobo. Bạn đọc vui lòng đơi để được duyệt, chỉ một chút thôi là trở thành thành viên chính thức của Bobo rồi.",
            action: <ToastAction altText="ok">Đăng nhập thôi</ToastAction>
          })
        } 
      })
      .catch((error) => {
        setOpen(false);
        switch(error.response.status) {
          case 500:
            toast({
              title: "Trùng thông tin",
              description: "Hình như đã có người dùng email hoặc username trùng với cái bạn đọc vừa nhập",
              variant: "destructive",
              action: <ToastAction altText="ok">Đăng ký lại</ToastAction>
            })
          default:
            toast({
              title: "Có lỗi gì đó xảy ra rồi",
              description: "Đã có lỗi gì đó trong quá trình đăng ký. Mong bạn đọc thông cảm cho Bobo",
              variant: "destructive",
              action: <ToastAction altText="again">Đăng ký lại</ToastAction>
            })
        }
      })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="link" size="sm">
          Đăng ký tài khoản
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Đăng ký</DialogTitle>
          <DialogDescription>
            Trở thành một thành viên của thư viện Bobo
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tài khoản <span className="text-red-500">*</span></FormLabel>
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
                    <FormLabel>Mật khẩu <span className="text-red-500">*</span></FormLabel>
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
                    <FormLabel>Nhập lại mật khẩu <span className="text-red-500">*</span></FormLabel>
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
                    <FormLabel>Tên của bạn đọc <span className="text-red-500">*</span></FormLabel>
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
                    <FormLabel>Email của bạn đọc <span className="text-red-500">*</span></FormLabel>
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
                    <FormLabel>Địa chỉ của bạn đọc<span className="text-red-500">*</span></FormLabel>
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
                    <FormLabel>Ngày sinh của bạn đọc <span className="text-red-500">*</span></FormLabel>
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
            <Button type="submit" className="w-full">
              Đăng ký
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}