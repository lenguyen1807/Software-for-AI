import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"

export default function SearchBox() {
    return (
        <Command className="rounded-md border shadow-md bg-slate-50">
            <CommandInput 
                className="inline-flex relative h-8 w-full" 
                placeholder="Gõ vào đây để tìm kiếm" 
            />
            <CommandList>
            </CommandList>
        </Command>
    );
}