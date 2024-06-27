import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { auth } from "@/lib/auth";
import { InfoForm, ChangePassForm } from "@/components/user/profile-form";
import { GetUserInfo } from "@/lib/api";


export default async function Home() {
    const data = (await auth())?.user;
    const token = data.jwt;
    const user = await GetUserInfo(token);

    return (
        <main>
            <div className="grid gap-6">
                <Card className="border-none rounded-2xl shadow-[rgba(50,50,93,0.08)_0px_0px_12px_-2px,_rgba(0,0,0,0.08)_0px_3px_7px_-3px]">
                    <CardHeader>
                        <CardTitle>Thông tin cơ bản</CardTitle>
                        <CardDescription>
                            Được sử dụng để xác minh thẻ thư viện của bạn trên ứng dụng.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <InfoForm user={user} token={token} />
                    </CardContent>
                </Card>
                <Card className="border-none rounded-2xl shadow-[rgba(50,50,93,0.08)_0px_0px_12px_-2px,_rgba(0,0,0,0.08)_0px_3px_7px_-3px]">
                    <CardHeader>
                        <CardTitle>Đổi mật khẩu</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChangePassForm token={token} />
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}