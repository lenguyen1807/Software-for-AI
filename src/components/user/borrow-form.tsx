"use client"

import { useState } from "react";
import { useMediaQuery } from 'usehooks-ts'
import { Button } from "@/components/ui/button"
import { BookPlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Book } from "@/lib/interface";

export default function BorrowForm({book} : {book: Book}) {
    const [open, setOpen] = useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")

    if (isDesktop) {
      return (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-slate-700">
                <BookPlus className="mr-2 h-5 w-5"/>
                Mượn sách
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="pr-3"> 
                Bạn đang mượn sách {" "}
                <span className="text-muted-foreground text-wrap">{book.title}</span>
              </DialogTitle>
              <DialogDescription>Hihi</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )
    }
    else {
      return (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button className="bg-slate-700">
                <BookPlus className="mr-2 h-5 w-5"/>
                Mượn sách
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>
                Bạn đang mượn sách {book.title}
              </DrawerTitle>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
      )
    }
}