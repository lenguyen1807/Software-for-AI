import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function SignUpAsk({isUser} : {isUser: boolean}) {
  if (isUser) {
    return (
      <div className="mt-4 text-center text-sm">
          Chưa có tài khoản ? {" "}
        <Link href="/sign_up" className="underline">
          Đăng ký
        </Link>
      </div>
    )
  }
  return null;
}

export default function LoginCard({description, isUser} : {description: string, isUser: boolean}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Đăng nhập</CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username">Tài khoản</Label>
            <Input></Input>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Mật khẩu</Label>
              <Link href="/forgot_password" className="ml-auto inline-block text-sm underline">
                Quên mật khẩu ?
              </Link>
            </div>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            Đăng nhập
          </Button>
          <SignUpAsk isUser={isUser} />
        </div>
      </CardContent>
    </Card>
  )
}