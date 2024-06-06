import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import SignupForm from "@/components/login/signup-form"
import LoginForm from "@/components/login/login-form"

function SignUpAsk({isUser} : {isUser: boolean}) {
  if (isUser) {
    return (
      <div className="mt-4 text-center text-sm">
        Chưa có tài khoản ? {" "}
        <SignupForm />
      </div>
    )
  }
  return null;
}

export default function LoginCard({description, type} : {description: string, type: string}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Đăng nhập</CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <LoginForm type={type} />
          <SignUpAsk isUser={type == "user"} />
        </div>
      </CardContent>
    </Card>
  )
}
