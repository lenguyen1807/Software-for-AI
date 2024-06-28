"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format, sub } from "date-fns";
import axios from 'axios';
import { Calendar } from "@/components/ui/calendar-extended";
import { BookPlus, Calendar as CalendarIcon, Plus } from "lucide-react"
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
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { ResolveURL, ToDateFormat, cn, slugify } from "@/lib/utils";
import { AddBookSchema } from "@/lib/zod";
import { Textarea } from "../ui/textarea";
import { FileUploader } from "../ui/file-uploader";
import { UploadImg } from "@/lib/api";
import { Revalidate } from "@/lib/action";
import { usePathname } from "next/navigation";

export default function AddBookForm({libID, libName, token} : {libID: string, libName: string, token: string}) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof AddBookSchema>>({
    resolver: zodResolver(AddBookSchema),
  });
  const pathname = usePathname();

  async function onSubmit(_data: z.infer<typeof AddBookSchema>) {
    const imageUrl = (await UploadImg(_data.coverImage[0])).url;
    const submitData = {
      slug: slugify(_data.title),
      title: _data.title,
      publishDate: _data.publishDate,
      author: _data.author.split(", "),
      genres: _data.genres.split(", "),
      description: _data.description,
      language: _data.language,
      numPages: _data.numPages,
      publisher: _data.publisher,
      totalNum: _data.totalNum,
      currentNum: _data.totalNum,
      libraryID: libID,
      libraryName: libName,
      imageUrl: imageUrl
    }

    axios.post(ResolveURL("libraries/books"), {
      ...submitData
    }, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then((response) => {
      setOpen(false);
      if (response.status === 200) {
        toast({
          title: "Thêm sách thành công"
        })
      }
      Revalidate(pathname, false);
    }).catch((error) => {
      setOpen(false);
      switch(error.response.status) {
        default:
            toast({
              title: "Có lỗi gì đó xảy ra rồi",
              variant: "destructive",
            })
            break;
      }
      throw error;
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Plus className="mr-2 h-4 w-4" /> Thêm sách
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[700px]">
        <DialogHeader>
          <DialogTitle>Thêm sách</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-4 grid-flow-row gap-x-10 gap-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tiêu đề</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tác giả</FormLabel>
                    <FormControl>
                      <Input placeholder="Stephen Hawking, Geogre R. R. Martin, ..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="genres"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thể loại</FormLabel>
                    <FormControl>
                      <Input placeholder="Fiction, Romance, ..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="numPages"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số trang sách</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={event => field.onChange(+event.target.value)}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ngôn ngữ</FormLabel>
                    <FormControl>
                    <Input placeholder="English" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="publisher"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nhà xuất bản</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="totalNum"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số lượng tổng</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={event => field.onChange(+event.target.value)}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                  control={form.control}
                  name="publishDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Ngày xuất bản</FormLabel>
                      <Input placeholder="2003-07-18" {...field} />
                    </FormItem>
                  )}
                />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="coverImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ảnh bìa</FormLabel>
                  <FormControl>
                    <FileUploader
                      value={field.value}
                      onValueChange={field.onChange}
                      maxFiles={1}
                      maxSize={1024 * 1024}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Hoàn tất
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
