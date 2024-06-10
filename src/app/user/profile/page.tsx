import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { User } from "@/lib/interface";
import { auth } from "@/lib/auth";
import UploadAvatar from "@/components/user/upload-avatar";


export default async function Home() {
    const data = (await auth())?.user as User;

    return (
        <main>
            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Thông tin cơ bản</CardTitle>
                        <CardDescription>
                            Được sử dụng để xác minh thẻ thư viện của bạn trên ứng dụng.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">


                        <div className="grid grid-cols-5 grid-flow-col gap-6">
                            <form className="space-y-2 col-span-3">
                                <Label htmlFor="name">Họ và tên</Label>
                                <Input id="name" defaultValue={data?.name} />
                            </form>
                            <form className="space-y-2 col-span-3">
                                <Label htmlFor="dateOfBirth">Ngày sinh</Label>
                                <Input id="dateOfBirth" placeholder="YYYY-MM-DD" defaultValue={data?.dateOfBirth} />
                            </form>
                            <div className="flex justify-center items-center row-span-2 col-span-2">
                                <UploadAvatar avt={data} />
                            </div>

                        </div>

                        <form className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" defaultValue={data?.email} />
                        </form>

                        <form className="space-y-2">
                            <Label htmlFor="address">Địa chỉ</Label>
                            <Input id="address" defaultValue={data?.address} />
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-end px-6 py-4">
                        <Button>Lưu thay đổi</Button>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Đổi mật khẩu</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <form className="space-y-2">
                            <Label htmlFor="name">Nhập mật khẩu hiện tại</Label>
                            <Input id="name" type="password" />
                        </form>
                        <form className="space-y-2">
                            <Label htmlFor="name">Nhập mật khẩu mới</Label>
                            <Input id="name" type="password" />
                        </form>
                        <form className="space-y-2">
                            <Label htmlFor="name">Xác nhận mật khẩu mới</Label>
                            <Input id="name" type="password" />
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-end px-6 py-4">
                        <Button>Lưu thay đổi</Button>
                    </CardFooter>
                </Card>
            </div>
        </main>
    );
}