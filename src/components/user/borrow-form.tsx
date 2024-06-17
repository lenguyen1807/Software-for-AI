"use client"
 
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { addDays, format } from "date-fns"
import { vi } from "date-fns/locale"
import { cn, ResolveURL, ToDateFormat } from "@/lib/utils";
import { useState } from "react";
import axios from 'axios';

import { BookPlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Book, Library } from "@/lib/interface";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar-extended";
import { Calendar as CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button";
import { Revalidate } from "@/lib/action";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";

const BorrowSchema = z.object({
    borrowDate: z.date(),
    returnDate: z.string()
});

interface BorrowFormProps {
    book: Book,
    libs: Library[],
    libID: string,
    libFee: number,
    userID: string | undefined,
    token: string,
}

export default function BorrowForm({
    book, libs, libFee, userID, libID, token
} : BorrowFormProps) {

    const checkLibValid = (libName: string) => libs.some(({name}) => name === libName);

    const [open, setOpen] = useState(false);
    const form = useForm<z.infer<typeof BorrowSchema>>({
        resolver: zodResolver(BorrowSchema)
    });
    const { toast } = useToast();

    function onSubmit(_data: z.infer<typeof BorrowSchema>)
    {
        axios.post(ResolveURL("user/borrows"), {
            bookID: book._id,
            userID: userID,
            libraryID: libID,
            borrowDate: ToDateFormat(_data.borrowDate),
            returnDate: ToDateFormat(addDays(_data.borrowDate, parseInt(_data.returnDate)))
        }, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((response) => {
            setOpen(false);
            if (response.status === 200) {
                Revalidate("user_borrow");
                toast({
                    title: "Gửi yêu cầu mượn sách thành công",
                    description: "Bạn đọc vui lòng chờ thư viện duyệt, sau đó thông tin về trạng thái duyệt sẽ được gửi tới bạn"
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
      <div className="flex items-center space-x-5">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button 
                disabled={!checkLibValid(book.libraryName) || (book.currentNum < 0)}
                className="bg-slate-700"
            >
                <BookPlus className="mr-2 h-5 w-5"/>
                Mượn sách
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader className="space-y-4">
              <DialogTitle className="pr-3"> 
                Bạn đang mượn sách {" "}
                <span className="text-muted-foreground text-wrap italic">{book.title}</span>
              </DialogTitle>
              <DialogDescription className="text-wrap">
                Nếu bạn trả sách trễ sẽ phải trả phí <span className="font-bold">{libFee} ngàn đồng</span> cho thư viện {book.libraryName} 
              </DialogDescription>
            </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="borrowDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                <FormLabel>Chọn ngày mượn</FormLabel>
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
                                            locale={vi}
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date < new Date()
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="returnDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Ngày trả</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Chọn số ngày để trả sách" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="1">Ngày kế tiếp</SelectItem>
                                            <SelectItem value="3">3 ngày sau</SelectItem>
                                            <SelectItem value="7">Một tuần sau</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                        <Button type="submit" variant="ringHover">
                            Mượn sách
                        </Button>
                    </form>
                </Form>
          </DialogContent>
        </Dialog>
        {!checkLibValid(book.libraryName) && <span className="text-xs text-muted-foreground text-wrap">
            Hình như bạn chưa là thành viên của thư viện {book.libraryName} !
        </span>}
        {(book.currentNum <= 0) && <span className="text-xs text-muted-foreground text-wrap">
            Sách này đã hết số lượng rồi 
        </span>}
      </div>
    )
}