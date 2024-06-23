import AddMemberForm from "@/components/user/add-member-form";
import MemberCard from "@/components/user/member-card"
import { GetLibrary, GetUserInfo, GetUserJoinLibrary, GetUserLibrary } from "@/lib/api";
import { auth } from "@/lib/auth";

export default async function Member() {
    const token = (await auth())?.user.jwt;
    const userLibs = await GetUserLibrary(token);
    const joinLibs = await GetUserJoinLibrary(token);
    const user = await GetUserInfo(token);
    const libs = await GetLibrary();

    const remainLibs = libs.filter((library) => (
        !userLibs.some(remainLib => remainLib.name === library.name)
        && !joinLibs.some(remainLibs => remainLibs.name === library.name)
    ));

    return (
        <div className="grid gap-6">
            <div className="flex justify-end">
                <AddMemberForm userID={user?.id} libs={remainLibs} token={token}/>
            </div>
            <div className="grid grid-cols-2 gap-6">
                {userLibs.map((lib) => (
                    <MemberCard key={lib.managerID} lib={lib} status={true} />
                ))}
                {joinLibs.map((lib) => (
                    <MemberCard key={lib.managerID} lib={lib} status={false} />
                ))}
            </div>
        </div>
    )
}