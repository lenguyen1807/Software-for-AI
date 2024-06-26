"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format, sub } from "date-fns";
import axios from 'axios';
import { Calendar } from "@/components/ui/calendar-extended";
import { BookPlus, Calendar as CalendarIcon } from "lucide-react"
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

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { vi } from "date-fns/locale";
import { ResolveURL, ToDateFormat, cn, slugify } from "@/lib/utils";

const AddBookSchema = z.object({
  title: z.string(),
  author: z.string(),
  genre: z.string(),
  descript: z.string(),
  publisher: z.string(),
  publishDate: z.date(),
  numPages: z.number().min(1, "Số lượng phải lớn hơn 0"), 
  quantity: z.number().min(1, "Số lượng phải lớn hơn 0"), 
  lang: z.string(),
  LibID: z.string(),
  Libname: z.string(),
  //coverImage: z.instanceof(File),
});

export default function AddBookForm() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof AddBookSchema>>({
    resolver: zodResolver(AddBookSchema),
  });

  function onSubmit(_data: z.infer<typeof AddBookSchema>) {
    console.log(_data);
    const submitData = {
      slug: slugify(_data.title),
      tile: _data.title,
      publishDate: ToDateFormat(_data.publishDate),
      author: _data.author.split(", "),
      genres: _data.genre.split(", "),
      description: _data.descript,
      language: _data.lang,
      numPages: _data.numPages,
      pulisher: _data.publisher,
      totalBorrow: 0,
      totalNum: _data.quantity,
      currentNum: _data.quantity,
      numOfRating:0,
      avgRating:0,
      libraryID: _data.LibID,
      libraryName: _data.Libname
    }
    axios.post(ResolveURL("books/new"), {
      _id: "5eb7cf5a86d9755df3a6c593",
      slug: slugify(_data.title),
      tile: _data.title,
      publishDate: ToDateFormat(_data.publishDate),
      author: _data.author.split(", "),
      genres: _data.genre.split(", "),
      description: _data.descript,
      language: _data.lang,
      numPages: _data.numPages,
      pulisher: _data.publisher,
      series: [],
      totalBorrow: 0,
      totalNum: _data.quantity,
      currentNum: _data.quantity,
      numOfRating:0,
      avgRating:0,
      libraryID: _data.LibID,
      libraryName: _data.Libname,

    })
      .then((response) => {
        setOpen(false);
        toast({
          title: "Thêm sách thành công",
          description: "Sách mới đã được thêm vào kho.",
        });
      })
      .catch((error) => {
        setOpen(false);
        toast({
          title: "Có lỗi xảy ra",
          description: "Không thể thêm sách, vui lòng thử lại.",
          variant: "destructive",
        });
      });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
        <BookPlus className="mr-2" />
          Thêm sách
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thêm sách mới</DialogTitle>
          <DialogDescription>
            Thêm sách mới vào kho sách bạn quản lý trên thư viện BoBo.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tiêu đề</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập tiêu đề" {...field} />
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
                    <Input placeholder="Nhập tác giả" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="genre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thể loại</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập thể loại" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="descript"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập mô tả" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-x-10">
            <FormField
              control={form.control}
              name="publisher"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NXB</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập NXB" {...field} />
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
                    <FormLabel>Ngày xuất bản<span className="text-red-500">*</span></FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP", { locale: vi })
                            ) : (
                              <span>Chọn ngày</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          captionLayout="dropdown-buttons"
                          fromYear={1800}
                          toYear={2024}
                          locale={vi}
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1800-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
            </div>
            
           <div className="grid grid-cols-3 gap-x-10">
           
           <FormField
              control={form.control}
              name="numPages"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số trang sách</FormLabel>
                  <FormControl>
                  <Input type="number" placeholder="Nhập số lượng" {...field} onChange={event => field.onChange(+event.target.value)}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="lang"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ngôn ngữ</FormLabel>
                  <FormControl>
                  <Input placeholder="tiếng Việt" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
              <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số lượng</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Nhập số lượng" {...field} onChange={event => field.onChange(+event.target.value)}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
           </div>
            
            <FormField
              control={form.control}
              name="LibID"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mã thư viện</FormLabel>
                  <FormControl>
                  <Input placeholder="Nhập ID của thư viện của bạn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Libname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên thư viện</FormLabel>
                  <FormControl>
                  <Input placeholder="Nhập tên thư viện của bạn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="coverImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ảnh bìa</FormLabel>
                  <FormControl>
                    <Input placeholder="Chọn ảnh" type="file" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <Button type="submit" className="w-full">
              Thêm sách
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
