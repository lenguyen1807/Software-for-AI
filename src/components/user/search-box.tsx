"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";

const SearchSchema = z.object({
    value: z.string()
});

export default function SearchBox() {
    const form = useForm<z.infer<typeof SearchSchema>>({
        resolver: zodResolver(SearchSchema)
    });
    const [open, setOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && e.ctrlKey) {
                if (
                    (e.target instanceof HTMLElement && e.target.isContentEditable) ||
                    e.target instanceof HTMLInputElement ||
                    e.target instanceof HTMLTextAreaElement ||
                    e.target instanceof HTMLSelectElement
                    ) 
                {
                    return;
                }

                e.preventDefault();
                setOpen((open) => !open);
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    function onSubmit(_data: z.infer<typeof SearchSchema>) {
        setOpen(false);
        router.push(`/user/explore/search/${_data.value}`);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <p className="text-sm text-muted-foreground">
                    Ấn vào đây để tìm kiếm hoặc ấn {" "}
                        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                            <span className="text-xs">Ctrl + k</span>
                        </kbd>
                    </p>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Tìm kiếm sách dựa theo tên
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField 
                            control={form.control}
                            name="value"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input autoFocus placeholder="nhập vào đây để tìm kiếm" hidden {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}