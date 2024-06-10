import { Button } from "@/components/ui/button"
import { auth } from "@/lib/auth";
import { User } from "@/lib/interface";
import MemberCard from "@/components/user/member-card"
import { Plus } from "lucide-react";

export default async function Member() {
    const memberCards = (await auth())?.user as User;

    return (
        <div className="grid gap-6">
            <div className="flex justify-end">
                <Button variant="outline" className="h-[35px] w-[120px] hover:ring-gray-300 hover:ring-1 font-normal">
                    <Plus className="mr-2 h-4 w-4" /> Thêm thẻ
                </Button>
            </div>
            <div className="grid grid-cols-2 gap-6">
                {memberCards.listOfLib.map((lib) => (
                    <MemberCard lib={lib} />
                ))}
            </div>
        </div>
    )
}