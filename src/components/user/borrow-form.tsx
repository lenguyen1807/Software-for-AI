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
});

interface BorrowFormProps {
    book: Book,
    libs: Library[],
    libID: string,
    libFee: number,
    libDate: number,
    userID: string | undefined,
    token: string,
}

export default function BorrowForm({
    book, libs, libFee, libDate, userID, libID, token
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
        }, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((response) => {
            setOpen(false);
            if (response.status === 200) {
                Revalidate("user_borrow", true);
                toast({
                    title: "Gửi yêu cầu mượn sách thành công",
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
                <div className="space-y-2">
                    <p>
                        Nếu bạn trả sách trễ sẽ phải trả phí <span className="font-bold">{libFee} ngàn đồng</span> cho thư viện {book.libraryName} 
                    </p>
                    <p>
                        Thư viện {book.libraryName} có thời gian mượn tối đa là <span className="font-bold">{libDate} ngày</span> do đó sau khi mượn thì bạn đọc nên trả thư viện trong khoảng thời gian này nhé.
                    </p>
                </div>
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