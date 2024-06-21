import LibPage from "@/components/user/lib-page";
import { GetLibraryByID } from "@/lib/api";

import { cn } from "@/lib/utils";
import { Nunito } from "next/font/google";

const nunito = Nunito({
    subsets: ["latin"],
});

type Props = {
    params: { libID: string };
}

export async function generateMetadata({
    params
}: Props) {
    const lib = await GetLibraryByID(params.libID);
    return { title: `Library | ${lib.name}` };
}

export default async function Page({
    params
}: Props) {
    const lib = await GetLibraryByID(params.libID);
    return (
        <>
            <div className={cn(nunito.className, "flex justify-between")}>
                <div className="space-y-4">
                    <div className="mt-6 space-y-1">
                        <h2 className="text-2xl font-bold tracking-tight">
                            Thư viện {lib.name}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Toàn bộ sách của thư viện thành viên {lib.name} của Bobo nằm ở đây.
                        </p>
                    </div>
                </div>
            </div>
            <LibPage id={lib._id} limit={12} />
        </>
    )
}