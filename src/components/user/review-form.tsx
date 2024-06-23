"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Textarea } from "../ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { Ratings } from "../ui/ratings"
import { useState } from "react"
import { ResolveURL, ToDateFormat } from "@/lib/utils"
import { useToast } from "../ui/use-toast"
import axios from "axios"
import { Revalidate } from "@/lib/action"
import { usePathname } from "next/navigation"

const ReviewSchema = z.object({
    review: z.string(),
})

export default function ReviewForm({bookID, userID} : {bookID: string, userID: string | undefined}) {
    const [rating, setRating] = useState(5);
    const form = useForm<z.infer<typeof ReviewSchema>>({
        resolver: zodResolver(ReviewSchema)
    });
    const { toast } = useToast();
    const pathname = usePathname();

    function onSubmit(_data: z.infer<typeof ReviewSchema>) {
        axios.post(ResolveURL("reviews/"), {
            content: _data.review,
            rating: rating,
            reviewDate: ToDateFormat(new Date()),
            bookID: bookID,
            userID: userID
        }).then((response) => {
            if (response.status === 200) {
                Revalidate(pathname, false);
                toast({
                    title: "Nhận xét thành công",
                });
            }
        }).catch((error) => {
            switch(error.response.status) {
                default:
                    toast({
                        title: "Có lỗi gì đó xảy ra rồi",
                        variant: "destructive",
                    })
            }
            throw error;
        })
    }

    return (
        <Form {...form}>
            <form 
                className="space-y-6"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <span className="text-sm">Rating của bạn đọc</span>
                <Ratings
                    onRatingChange={setRating}
                    rating={5}
                    totalStars={5}
                    variant="yellow"
                    size={25}
                />
                <FormField
                control={form.control}
                name="review"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Đánh giá của bạn đọc
                        </FormLabel>
                        <FormControl>
                            <Textarea 
                                placeholder="Nhập đánh giá của bạn đọc vào đây" 
                                {...field} 
                                required
                            />
                        </FormControl>
                    </FormItem>
                )}
                />
                <Button type="submit">
                    Đánh giá
                </Button>
            </form>
        </Form>
    )
}