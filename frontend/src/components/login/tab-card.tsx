import { 
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent
} from "@/components/ui/tabs"
import LoginCard from "@/components/login/login-card"

export default function TabCard() {
    return (
        <div className="flex flex-col w-full">
            <Tabs
                defaultValue="user"
                className="max-w-full w-auto h-auto bg-slate-50"
            >
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="user">Người dùng</TabsTrigger>
                    <TabsTrigger value="library">Thư viện</TabsTrigger>
                    <TabsTrigger value="admin">Quản trị viên</TabsTrigger>
                </TabsList>

                <TabsContent value="user">
                     <LoginCard description="Dành cho người mượn sách" type={"user"} />
                </TabsContent>

                <TabsContent value="library">
                    <LoginCard description="Dành cho thư viện" type={"library"}/>
                </TabsContent>

                <TabsContent value="admin">
                    <LoginCard description="Dành cho quản trị viên" type={"admin"}/>
                </TabsContent>
            </Tabs>
        </div>
    )
}