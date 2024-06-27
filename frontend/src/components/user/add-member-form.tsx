"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from 'axios';

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogDescription,
  DialogTitle
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FileUploader } from "@/components/ui/file-uploader"
import { useState } from "react";
import { ResolveURL, ToDateFormat } from "@/lib/utils";
import { UploadImg } from "@/lib/api";
import { useToast } from "../ui/use-toast";
import { Library } from "@/lib/interface";
import { Revalidate } from "@/lib/action";
import { usePathname } from "next/navigation";

const MemberSchema = z.object({
    libid: z.string(),
    images: z.array(z.instanceof(File)),
}).superRefine(({images}, ctx) => {
    if (images.length === 1) {
        ctx.addIssue({
            code: "custom",
            message: "Phải có đủ 2 ảnh là ảnh mặt trước và mặt sau",
            path: ["images"]
        })
    }
})

export default function AddMemberForm({
    userID, libs, token
} : {
    userID: string | undefined, libs: Library[], token: string
}) {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const { toast } = useToast();
    const pathname = usePathname();

    const form = useForm<z.infer<typeof MemberSchema>>({
       resolver: zodResolver(MemberSchema)
    })

    async function onSubmit(_data: z.infer<typeof MemberSchema>) {
        try {
            setLoading(true);

            // get image url
            const frontURL = (await UploadImg(_data.images[0])).url;
            const backURL = (await UploadImg(_data.images[1])).url;
            
            console.log(frontURL)
            console.log(backURL)

            // post join-request data
            await axios.post(ResolveURL("user/libraries/request"), {
                userID: userID,
                libraryID: _data.libid,
                dateCreated: ToDateFormat(new Date()),
                frontImageUrl: frontURL,
                backImageUrl: backURL
            }, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            setLoading(false);
            Revalidate(pathname, false);
            setOpen(false);
            toast({
                title: "Đã gửi thông tin thêm thẻ thành công"
            })
        } catch (error) {
            setLoading(false);
            setOpen(false);

            toast({
                title: "Có lỗi gì đó xảy ra rồi",
                variant: "destructive",
            })
            throw error;
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button 
                    variant="outline" 
                    className="h-[35px] w-[120px] hover:ring-gray-300 hover:ring-1 font-normal"
                >
                    <Plus className="mr-2 h-4 w-4" /> Thêm thẻ
                </Button>
            </DialogTrigger>
            <DialogContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex w-full flex-col gap-6"
                    >
                        <FormField
                            control={form.control}
                            name="libid"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Thư viện</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Chọn thư viện mà bạn muốn"/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {libs.map((library) => (
                                                <SelectItem 
                                                    value={library._id}
                                                    key={library._id}
                                                >
                                                    {library.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="images"
                            render={({ field }) => (
                                <div className="space-y-6">
                                    <FormItem className="w-full">
                                        <FormLabel>Ảnh mặt trước và mặt sau</FormLabel>
                                        <FormControl>
                                            <FileUploader
                                                disabled={loading}
                                                value={field.value}
                                                onValueChange={field.onChange}
                                                maxFiles={2}
                                                maxSize={2 * 1024 * 1024}
                                            />
                                        </FormControl>
                                    </FormItem>
                                </div>
                            )}
                        />
                        <Button type="submit">
                            Xác nhận
                        </Button>
                    </form>
                </Form> 
            </DialogContent>
        </Dialog>
    )
}