import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogDescription,
  DialogTitle
} from "@/components/ui/dialog"
import SignupForm from "@/components/login/signup-form";

export default function SignupModal() {
    return (
        <Dialog>
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
                <SignupForm />
            </DialogContent>
        </Dialog>
    )
}