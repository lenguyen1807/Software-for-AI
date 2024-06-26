"use client"

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from "zod";
import { type Filter } from '@/lib/interface';

import { FilterIcon } from 'lucide-react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast"
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { Button } from '@/components/ui/button';
import { useContext } from 'react';
import { FilterContext } from './filter-page';

const optionSchema = z.object({
    label: z.string(),
    value: z.string(),
})

export const FormSchema = z.object({
    genres: z.array(optionSchema),
    publisher: z.array(optionSchema),
    author: z.array(optionSchema),
    series: z.array(optionSchema),
    language: z.array(optionSchema),
})

function MapToOption(data: string[]): Option[] {
    return data.map((val) => {
        return { "label": val, "value": val };
    })
}

function MapOptionToValue(data: Option[]) {
    return data.map((option) => option.value);
}

export function FilterForm({ data }: { data: Filter }) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            genres: [],
            publisher: [],
            author: [],
            series: [],
            language: []
        }
    });
    const { toast } = useToast();
    const { props, setProps } = useContext(FilterContext);

    function onSubmit(_data: z.infer<typeof FormSchema>) {
        const result = {} as Filter;
        Object.keys(_data).map((idx) => {
            result[idx as keyof Filter] = MapOptionToValue(_data[idx as keyof Filter]);
        })
        console.log(result);
        setProps(result);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex gap-x-10 space-y-6 items-center pb-3 px-1"
            >
                <div className='grid grid-cols-5 grid-flow-row gap-x-10 gap-y-4'>
                    <FormField
                        control={form.control}
                        name="genres"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='font-[650] text-[15px]'>Thể loại</FormLabel>
                                <FormControl>
                                    <MultipleSelector
                                        {...field}
                                        defaultOptions={MapToOption(data.genres)}
                                        placeholder="Tất cả"
                                        badgeVariant="green-subtle"
                                        hidePlaceholderWhenSelected
                                        emptyIndicator={
                                            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                                                Không tìm thấy sách phù hợp.
                                            </p>
                                        }
                                        className='bg-white'
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="author"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='font-[650] text-[15px]'>Tác giả</FormLabel>
                                <FormControl>
                                    <MultipleSelector
                                        {...field}
                                        defaultOptions={MapToOption(data.author)}
                                        placeholder="Tất cả"
                                        badgeVariant="pink-subtle"
                                        hidePlaceholderWhenSelected
                                        className='bg-white'
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="publisher"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='font-[650] text-[15px]'>Nhà xuất bản</FormLabel>
                                <FormControl>
                                    <MultipleSelector
                                        {...field}
                                        defaultOptions={MapToOption(data.publisher)}
                                        placeholder="Tất cả"
                                        badgeVariant="teal-subtle"
                                        hidePlaceholderWhenSelected
                                        className='bg-white'
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="series"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='font-[650] text-[15px]'>Tuyển tập sách</FormLabel>
                                <FormControl>
                                    <MultipleSelector
                                        {...field}
                                        defaultOptions={MapToOption(data.series)}
                                        placeholder="Tất cả"
                                        badgeVariant="amber-subtle"
                                        hidePlaceholderWhenSelected
                                        className='bg-white'
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="language"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='font-[650] text-[15px]'>Ngôn ngữ</FormLabel>
                                <FormControl>
                                    <MultipleSelector
                                        {...field}
                                        defaultOptions={MapToOption(data.language)}
                                        placeholder="Tất cả"
                                        badgeVariant="blue-subtle"
                                        hidePlaceholderWhenSelected
                                        className='bg-white'
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <Button
                    type='submit'
                    variant="gooeyRight"
                >
                    <FilterIcon className="mr-2 w-5 h-5" />
                    Lọc
                </Button>
            </form>
        </Form>
    )
}