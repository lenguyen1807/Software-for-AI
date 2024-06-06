import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Loader2 } from "lucide-react"

export default async function Page() {
    const data = await auth();
    if (data) {
        const role = data.user?.role;
        if (role === "user") {
            redirect("/user");
        } else if (role === "admin") {
            redirect("/admin");
        } else if (role === "library") {
            redirect("/library");
        }
    }
    else {
        redirect("/login");
    }

    return (
        <div className="items-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        </div>
    )
}