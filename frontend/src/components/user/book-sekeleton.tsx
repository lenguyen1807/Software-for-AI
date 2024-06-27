import { Skeleton } from "@/components/ui/skeleton"

export function ExploreBookSekeleton() {
    const arr = Array.from(Array(12).keys());
    return (
        <>
            {arr.map((i) => {
                return (
                    <figure 
                        key={i}
                        className="pb-10 w-[165px]"
                    >
                        <Skeleton className="w-[165px] h-[250px]"/>
                        <figcaption className="pt-2 space-y-2 text-wrap">
                            <h3 className="text-base font-[650] text-pretty text-center line-clamp-2 w-full">
                            </h3>
                            <div className="text-[13px]">
                                <div className="font-semibold text-muted-foreground text-pretty text-center space-y-2">
                                </div>
                            </div>
                        </figcaption>
                    </figure>
                )
            })}
        </>
    )
}

export function HomeBookSekeleton() {
    const arr = Array.from(Array(8).keys());
    return (
        <>
        {arr.map((i) => {
            return (
                <figure 
                    key={i}
                    className="space-y-3 w-[150px] items-center"
                >
                    <Skeleton className="border-none w-[150px] h-[230px] flex-none"/>
                    <figcaption className="pt-2 space-y-2 text-wrap">
                        <h3 className="text-base font-[650] text-pretty text-center line-clamp-2 w-full">
                            {""}
                        </h3>
                        <div className="text-[13px]">
                            <div className="font-semibold text-muted-foreground text-pretty text-center space-y-2">
                                {""}
                            </div>
                        </div>
                    </figcaption>
                </figure>
            )
        })}
        </>
    )
}