import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const user = (await auth())?.user;

    if (user) {
        if (user.role != "library") {
            redirect("/");
        }
    } else {
        redirect("/login");
    }

    return (
        <>
        {children}
        </>
    )

}