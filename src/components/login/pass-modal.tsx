import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";

export default function PasswordModal({type} : {type: string}) { 
    return(
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="link" className="text-muted-foreground">
                    Quên mật khẩu ?
                </Button>
            </DialogTrigger>
            <DialogContent>
                {type === "library" && <p>Hãy liên hệ với quản trị viên của thư viện Bobo để được lấy lại mật khẩu.</p>}
                {type === "admin" && <p>Hết cứu</p>}
                {type === "user" && 
                    <ForgotPasswordForm />
                }
            </DialogContent>
        </Dialog>
    )
}

function ForgotPasswordForm() {
    return (
        <>
        </>
    )
}