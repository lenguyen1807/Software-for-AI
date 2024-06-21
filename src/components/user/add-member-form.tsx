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
import { FileUploader } from "@/components/ui/file-uploader"
import { useState } from "react";

const MemberSchema = z.object({
    images: z.array(z.instanceof(File)),
})

export default function AddMemberForm() {
    const form = useForm<z.infer<typeof MemberSchema>>({
       resolver: zodResolver(MemberSchema)
    })

    function onSubmit(_data: z.infer<typeof MemberSchema>) {
        console.log(_data);
    }

    return (
        <Dialog>
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
                            name="images"
                            render={({ field }) => (
                                <div className="space-y-6">
                                    <FormItem className="w-full">
                                        <FormLabel>Ảnh mặt trước và mặt sau</FormLabel>
                                        <FormControl>
                                            <FileUploader
                                                value={field.value}
                                                onValueChange={field.onChange}
                                                maxFiles={2}
                                                maxSize={2 * 1024 * 1024}
                                                // progresses={progresses}
                                                // pass the onUpload function here for direct upload
                                                // onUpload={uploadFiles}
                                                // disabled={isUploading}
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