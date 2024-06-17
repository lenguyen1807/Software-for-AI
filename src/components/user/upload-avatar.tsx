'use client'

import { useRef } from 'react';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import type { User } from '@/lib/interface';

export default function UploadAvatar({ avt }: { avt: User }) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Xử lý file đã chọn, ví dụ: upload lên server
            console.log('Selected file:', file);
        }
    };

    return (
        <div className="relative" >
            <Avatar className="h-40 w-40 ring-1 ring-slate-200 ring-offset-4">
                <AvatarImage
                    src={avt?.avatarUrl}
                    alt={avt?.username}
                    className="h-full w-full object-cover"
                />
                <AvatarFallback className="h-40 w-40">{avt?.username}</AvatarFallback>
            </Avatar>
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
            />
            <Button variant="outline" className="h-[35px] w-[50px] absolute bottom-2 right-0" onClick={handleButtonClick}>
                <Pencil className="h-4 w-4" />
            </Button>
        </div>
    );
}