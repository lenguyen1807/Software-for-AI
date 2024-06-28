"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Calendar, PenIcon } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
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
import { AddBookSchema } from "@/lib/zod";
import { Book } from "@/lib/interface";
import { Textarea } from "../ui/textarea";
import { FileUploader } from "../ui/file-uploader";
import { UploadImg } from "@/lib/api";

const EditBookSchema = AddBookSchema.extend({
  currentNum: z.number()
})

export default function EditBookForm({token, book} : {token: string, book: Book}) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [books, setBooks] = useState<z.infer<typeof EditBookSchema>>({
      title: book.title,
      author: book.author.join(", "),
      genres: book.genres.join(", "),
      description: book?.description,
      publisher: book.publisher,
      publishDate: book.publishDate,
      numPages: book.numPages,
      totalNum: book.totalNum,
      currentNum: book.currentNum,
      language: book.language,
      coverImage: [],
  })

  const form = useForm<z.infer<typeof EditBookSchema>>({
    resolver: zodResolver(EditBookSchema),
    // defaultValues: books
  });

  async function onSubmit(_data: z.infer<typeof EditBookSchema>) {
    let imageUrl = null;
    if (_data.coverImage.length > 0) {
      imageUrl = (await UploadImg(_data.coverImage[0])).url;
    }
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <PenIcon className="mr-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[700px]">
        <DialogHeader>
          <DialogTitle>Sửa sách</DialogTitle>
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
                      <Input {...field} />
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
                      <Input {...field} />
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
                    <Input {...field} />
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
                name="currentNum"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số lượng hiện tại</FormLabel>
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
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
            </div>
            <div className="grid grid-cols-2 gap-x-10">
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
            </div>
            <Button type="submit" className="w-full">
              Hoàn tất
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}