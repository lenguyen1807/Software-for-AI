import AddMemberForm from "@/components/user/add-member-form";
import MemberCard from "@/components/user/member-card"
import { GetUserJoinLibrary, GetUserLibrary } from "@/lib/api";
import { auth } from "@/lib/auth";

export default async function Member() {
    const user = (await auth())?.user;
    const libs = await GetUserLibrary(user.jwt);
    const joinLibs = await GetUserJoinLibrary(user.jwt);

    return (
        <div className="grid gap-6">
            <div className="flex justify-end">
                <AddMemberForm />
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