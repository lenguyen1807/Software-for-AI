import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { BadgeHelp } from "lucide-react"

export default function HelpModal() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ringHover" className="bg-slate-500" size="sm">
                    <BadgeHelp className="mr-2 h-5 w-5"/>
                    Trợ giúp
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Trợ giúp của thư viện Bobo</DialogTitle>
                    <DialogDescription>
                        Đây là nơi mà thư viện Bobo sẽ giải đáp các thắc mắc dành cho bạn đọc về cách sử dụng web cũng như là về thư viện.
                    </DialogDescription>
                </DialogHeader>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>
                            Thư viện Bobo là gì ?
                        </AccordionTrigger>
                        <AccordionContent>
                        Yes. It adheres to the WAI-ARIA design pattern.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </DialogContent>
        </Dialog>
    )
}