import RegisterForm from "@/components/admin/create-account-form"
import { auth } from "@/lib/auth"

export default async function CreateAccountPage() {
    const data = (await auth())?.user;

    return (
        <div className='flex flex-col items-center justify-between pt-[50px]'>
            <RegisterForm token={data.jwt}/>
        </div>
    )
}