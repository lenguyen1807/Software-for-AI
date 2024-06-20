import FilterPage from "@/components/user/filter-page";
import { GetFilter } from "@/lib/api"

import { cn } from "@/lib/utils";
import { Nunito } from "next/font/google";

const nunito = Nunito({
    subsets: ["latin"],
});

export default async function Page() {
    const data = await GetFilter();

    return (
        <div className={cn(nunito.className)}>
            <FilterPage data={data} />
        </div>
    )
}