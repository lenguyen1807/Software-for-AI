"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { BadgeHelp, SendHorizonalIcon } from "lucide-react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Textarea } from "../ui/textarea"
import { useState } from "react"
import { ResolveURL } from "@/lib/utils"
import axios from "axios"
import { GetChat } from "@/lib/api"

const ChatSchema = z.object({
    query: z.string()
});

export default function HelpModal() {
    const form = useForm<z.infer<typeof ChatSchema>>({
        resolver: zodResolver(ChatSchema)
    });
    const [loading, setLoading] = useState(false);

    async function onSubmit(_data: z.infer<typeof ChatSchema>) {
        setLoading(true);
        const reply = await GetChat(_data.query);
        setLoading(false);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ringHover" className="bg-slate-500" size="sm">
                    <BadgeHelp className="mr-2 h-5 w-5"/>
                    Trợ lý AI
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Trợ giúp của thư viện Bobo</DialogTitle>
                    <DialogDescription>
                        Đây là nơi mà thư viện Bobo sẽ trả lời các câu hỏi của các bạn thông qua AI. Hiện tại do nhiều giới hạn nên trợ lý AI chỉ có thể trả lời câu hỏi bằng tiếng Anh.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-6">
                    <Form {...form}>
                        <form 
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6 justify-end">
                            <FormField
                                control={form.control}
                                name="query"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Textarea
                                                disabled={loading}
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" variant="outline">
                                <SendHorizonalIcon className="w-5 h-5"/>
                            </Button>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}