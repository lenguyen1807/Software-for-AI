'use client'
import React, { useState } from 'react'
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { Button } from '@/components/ui/button'
import { UserRoundPlus, Home, UsersRound, BookLock } from 'lucide-react'
import Link from 'next/link'

export default function SideBar() {
    const menuList = [
        {
            item: [
                {
                    link: "/admin",
                    icon: <Home size={20} strokeWidth={2.5} />,
                    text: "Trang chủ"
                },
                {
                    link: "/admin/create",
                    icon: <UserRoundPlus size={20} strokeWidth={2.5} />,
                    text: "Cấp tài khoản"
                },
                {
                    link: "/admin/accounts",
                    icon: <UsersRound size={20} strokeWidth={2.5} />,
                    text: "Quản lý tài khoản"
                },
                {
                    link: "/admin/books",
                    icon: <BookLock size={20} strokeWidth={2.5} />,
                    text: "Quản lý sách"
                }
            ]
        },
    ]

    const [selectedItem, setSelectedItem] = useState(false);
    const [value, setValue] = React.useState("")

    return (
        <div className='fixed left-0 top-0 flex flex-col space-y-[20px] min-w-[250px] min-h-screen border-r px-[10px] pt-[25px] pb-[40px] bg-[#F9FAFB]'>
            <div className='flex items-center pl-[15px] gap-[20px]'>
                <img src="/LOGO.svg" alt="Logo" className="h-[36px]" />
                <span className='italic text-[24px] font-black text-[#000938] leading-none'>
                    BOBO
                </span>
            </div>

            <div className='grow'>
                <Command>
                    <CommandList className='bg-[#F9FAFB] min-h-[500px]'>
                        {menuList.map((menu: any, key: number) => (
                            <CommandGroup key={key}>
                                {menu.item.map((option: any, optionKey: number) =>
                                    <Link href={option.link}>
                                        <CommandItem
                                            className='flex gap-[20px] my-[15px] px-[15px] py-[10px] font-bold text-[17px] text-[#000938]/65 cursor-pointer hover:bg-gray-200 hover:text-[#000938]'
                                            onSelect={(currentValue) => {
                                                setValue(currentValue === value ? "" : currentValue)
                                                setSelectedItem(false)
                                            }}
                                            key={optionKey}>
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

            <div className='flex justify-center'>
                <Button className='px-[20px] bg-[#000938]'>
                    Đăng xuất
                </Button>
            </div>
        </div>
    )
}