"use client"

import { type Filter } from "@/lib/interface";
import { createContext, useState } from "react";
import { FilterForm } from "./filter-form";
import BookPage from "./book-page";

interface IFilterContext {
    props: Filter;
    setProps: (props: Filter) => void;
}

export const FilterContext = createContext<IFilterContext | null>(null);

export default function FilterPage({ data }: { data: Filter }) {
    const [props, setProps] = useState<IFilterContext["props"]>({
        language: [],
        publisher: [],
        genres: [],
        author: [],
        series: []
    });

    return (
        <div className="justify-between space-y-6">
            <FilterContext.Provider value={{ props, setProps }}>
                <FilterForm data={data} />
            </FilterContext.Provider>
            <BookPage
                limit={12}
                language={props.language}
                author={props.author}
                genres={props.genres}
                series={props.series}
                publisher={props.publisher}
            />
        </div>
    )
}