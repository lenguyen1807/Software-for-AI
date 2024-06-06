"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { LoginSchema as FormSchema } from "@/lib/zod";
import { Authenciate } from "@/lib/action";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import PasswordModal from "@/components/login/pass-modal"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

export default function LoginForm({ type }: { type: string }) {
  const form = useForm<z.infer<typeof FormSchema>>({ resolver: zodResolver(FormSchema) });
  const router = useRouter();
  const { toast } = useToast();

  async function onSubmit(_data: z.infer<typeof FormSchema>) {
    const response = await Authenciate(_data);
    if (response) {
      toast({
        title: response,
        variant: "destructive",
        action: <ToastAction altText="signInAgain">Đăng nhập lại</ToastAction>
      })
    } else {
      router.push("/");
    }
  }

  return (
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex gap-2 ml-auto items-center">
                <FormLabel>Mật khẩu</FormLabel>
                <PasswordModal type={type} />
              </div>
              <FormControl>
                <Input type="password" {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          // aria-disabled={pending}
          type="submit" 
          className="w-full"
          // onClick={(event) => {
          //   if (pending) {
          //     event.preventDefault()
          //   }
          // }}
        >
          Đăng nhập
        </Button>
        {/* { errorMessage && 
          <div
            className="flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
          >
            <TriangleAlert className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{errorMessage}</p>
          </div> 
        } */}
      </form>
    </Form>
  )
}