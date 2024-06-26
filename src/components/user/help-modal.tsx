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
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { zodResolver } from "@hookform/resolvers/zod"
import { Textarea } from "../ui/textarea"
import { useEffect, useState } from "react"
import { GetChat } from "@/lib/api"
import { ScrollArea } from "../ui/scroll-area"
import { User } from "@/lib/interface"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { AvatarImage } from "@radix-ui/react-avatar"
import { WindupChildren, Pace } from "windups";

const ChatSchema = z.object({
    query: z.string()
});

interface Message {
    value: string,
    role: "user" | "AI",
    first: boolean
};

const defaultMessage: Message = {
    value: "How can I help you ?",
    role: "AI",
    first: true
}

export default function HelpModal({user} : {user: User}) {
    const form = useForm<z.infer<typeof ChatSchema>>({
        resolver: zodResolver(ChatSchema)
    });
    const [loading, setLoading] = useState(false);
    const [messages, setMessage] = useState<Message[]>([defaultMessage])

    async function onSubmit(_data: z.infer<typeof ChatSchema>) {
        setLoading(true);
        
        const userMessage: Message[] = [
            ...messages, {
            value: _data.query, 
            role: "user",
            first: true
        }]
        setMessage(userMessage);

        const reply = await GetChat(_data.query);

        setMessage([...userMessage, {
            value: reply, 
            role: "AI",
            first: true
        }]);

        setLoading(false);
    }

    useEffect(() => {
        setMessage(prev => prev.map((mes) => ({...mes, first: false})));
    }, []);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ringHover" className="bg-slate-500" size="sm">
                    <BadgeHelp className="mr-2 h-5 w-5"/>
                    Trợ lý AI
                </Button>
            </DialogTrigger>
            <DialogContent className="min-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Trợ giúp của thư viện Bobo</DialogTitle>
                    <DialogDescription>
                        Đây là nơi mà thư viện Bobo sẽ trả lời các câu hỏi của các bạn thông qua AI. Hiện tại do nhiều giới hạn nên trợ lý AI chỉ có thể trả lời câu hỏi bằng tiếng Anh.
                    </DialogDescription>
                </DialogHeader>
                <Card className="w-full">
                    <CardContent>
                        <ScrollArea className="h-[300px]">
                            {messages.map((message) => {
                                return (
                                    <div 
                                        key={message.value}
                                        className="flex gap-3 text-muted-foreground text-sm pt-5"
                                    >
                                        <Avatar>
                                            <AvatarImage src={message.role === "AI" ? "/logo.svg" : user.avatarUrl}/>
                                            <AvatarFallback>{message.role}</AvatarFallback>
                                        </Avatar>

                                        <div className="leading-relaxed">
                                            <span className="block font-bold text-slate-700">
                                                {message.role === "user" ? user.name : "Trợ lý AI"}
                                            </span>
                                            {
                                                (message.first === true && message.role === "AI") ?
                                                <WindupChildren>
                                                    <Pace ms={5}>
                                                        {message.value}
                                                    </Pace>
                                                </WindupChildren> : message.value
                                            }
                                        </div>
                                    </div>
                                )
                            })}
                        </ScrollArea>
                    </CardContent>
                    <CardFooter>
                        <Form {...form}>
                            <form 
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="w-full flex gap-x-5">
                                <FormField
                                    control={form.control}
                                    name="query"
                                    render={({ field }) => (
                                        <FormItem className="grow">
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Nhập câu hỏi của bạn vào đây"
                                                    disabled={loading}
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" variant="outline" disabled={loading}>
                                    <SendHorizonalIcon className="w-5 h-5"/>
                                </Button>
                            </form>
                        </Form>
                    </CardFooter>
                </Card>
            </DialogContent>
        </Dialog>
    )
}