import { Button } from "@/components/ui/button"
import MemberCard from "@/components/user/member-card"
import { GetUserLibrary } from "@/lib/api";
import { Plus } from "lucide-react";

export default async function Member() {
    const libs = await GetUserLibrary();
    console.log(libs)
    return (
        <div className="grid gap-6">
            <div className="flex justify-end">
                <Button variant="outline" className="h-[35px] w-[120px] hover:ring-gray-300 hover:ring-1 font-normal">
                    <Plus className="mr-2 h-4 w-4" /> Thêm thẻ
                </Button>
            </div>
            <div className="grid grid-cols-2 gap-6">
                {libs.map((lib) => (
                    <MemberCard lib={lib} />
                ))}
            </div>
        </div>
    )
}