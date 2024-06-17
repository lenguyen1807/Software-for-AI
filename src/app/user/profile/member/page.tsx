import { Button } from "@/components/ui/button"
import MemberCard from "@/components/user/member-card"
import { GetUserJoinLibrary, GetUserLibrary } from "@/lib/api";
import { auth } from "@/lib/auth";
import { Plus } from "lucide-react";

export default async function Member() {
    const user = (await auth())?.user;
    const libs = await GetUserLibrary(user.jwt);
    const joinLibs = await GetUserJoinLibrary(user.jwt);

    return (
        <div className="grid gap-6">
            <div className="flex justify-end">
                <Button variant="outline" className="h-[35px] w-[120px] hover:ring-gray-300 hover:ring-1 font-normal">
                    <Plus className="mr-2 h-4 w-4" /> Thêm thẻ
                </Button>
            </div>
            <div className="grid grid-cols-2 gap-6">
                {libs.map((lib) => (
                    <MemberCard key={lib._id} lib={lib} status={true} />
                ))}
                {joinLibs.map((lib) => (
                    <MemberCard key={lib._id} lib={lib} status={false} />
                ))}
            </div>
        </div>
    )
}