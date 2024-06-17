import FilterPage from "@/components/user/filter-page";
import { GetFilter } from "@/lib/api"
import { type Filter } from "@/lib/interface"

export default async function Page() {
    const data = await GetFilter();

    return (
        <>
            <FilterPage data={data} />
        </>
    )    
}