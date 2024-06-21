'use client'

// import { useState } from 'react'
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { Button } from '@/components/ui/button'
import { UserRoundPlus, Home, UsersRound, BookLock, LibraryBig, CalendarCheck, UserRoundSearch, ReceiptText } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { SignOut } from "@/lib/action"
import Image from "next/image"

const menuList = [
    {
        item: [
            {
                link: "/library/book",
                icon: <LibraryBig size={20} strokeWidth={2.5} />,
                text: "Kho sách"
            },
            {
                link: "/library/service",
                icon: <ReceiptText size={20} strokeWidth={2.5} />,
                text: "Dịch vụ"
            },
            {
                link: "/library/user",
                icon: <UserRoundSearch  size={20} strokeWidth={2.5} />,
                text: "Người dùng"
            }
        ]
    },
]

export default function SideBar() {
    // const [selectedItem, setSelectedItem] = useState(false);
    // const [value, setValue] = React.useState("")

    const pathname = usePathname();

    return (
        <div className='fixed left-0 top-0 flex flex-col space-y-[20px] min-w-[250px] min-h-screen border-r px-[10px] pt-[25px] pb-[40px] bg-[#F9FAFB]'>
            <div className='flex items-center pl-[15px] gap-[20px]'>
                <Image
                    src="/logo.svg"
                    alt="Logo"
                    width="60"
                    height="50"
                />
                <span className='italic text-[24px] font-black text-[#000938] leading-none'>
                    BOBO
                </span>
            </div>

            <div className='grow'>
                <Command>
                    <CommandList className='bg-[#F9FAFB] min-h-[500px]'>
                        {menuList.map((menu, key) => (
                            <CommandGroup key={key}>
                                {menu.item.map((option) =>
                                    <Link
                                        href={option.link}
                                        key={option.link}
                                    >
                                        <CommandItem
                                            className={cn('flex gap-[20px] my-[15px] px-[15px] py-[10px] font-bold text-[17px] text-[#000938]/65 cursor-pointer hover:bg-gray-200 hover:text-[#000938]', {
                                                "text-[#000938] bg-gray-200": option.link === pathname
                                            })}
                                        // onSelect={(currentValue) => {
                                        //     setValue(currentValue === value ? "" : currentValue)
                                        //     setSelectedItem(false)
                                        // }}
                                        >
                                            <div>{option.icon}</div>
                                            <div>{option.text}</div>
                                        </CommandItem>
                                    </Link>
                                )}
                            </CommandGroup>
                        ))}
                    </CommandList>
                </Command>
            </div>

            <form
                className='flex justify-center'
                action={SignOut}
            >
                <Button className='px-[20px] bg-[#000938]'>
                    Đăng xuất
                </Button>
            </form>
        </div>
    )
}