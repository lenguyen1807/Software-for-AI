// ref: https://github.com/shadcn-ui/ui/issues/250

"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PencilIcon, User2Icon } from "lucide-react";
import { useToast } from "../ui/use-toast";
import React from "react";
import { UploadImg } from "@/lib/api";
import axios from "axios";
import { ResolveURL } from "@/lib/utils";
import { Revalidate } from "@/lib/action";
import { usePathname } from "next/navigation";

type AvatarUploadProps = {
	value?: string;
	token?: string;
}

export function UploadAvatar({ value, token }: AvatarUploadProps) {
	const inputRef = React.useRef<HTMLInputElement>(null)
	const [loading, setLoading] = React.useState(false);
	const { toast } = useToast();
	const pathname = usePathname();

	async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		if (e.target.files && e.target.files.length > 0) {
			const file = e.target.files[0];
			try {
				setLoading(true);
				const url = (await UploadImg(file)).url;
				axios.put(ResolveURL("user/info"), {
					avatarUrl: url
				}, {
					headers: {
						"Authorization": `Bearer ${token}`
					}
				})
				setLoading(false);
				Revalidate(pathname, false);
				toast({
					title: "Thay đổi avatar thành công"
				})
			} catch (error) {
				setLoading(false);
				toast({
					title: "Thay avatar không thành công",
					variant: "destructive"
				})
				throw error;
			}
		}
	}
	
	return (
		<div className="relative w-40 h-40">
			<Avatar className="w-full h-full">
				<AvatarImage src={value} className="object-cover"/>
				<AvatarFallback className="bg-secondary">
					<User2Icon className="w-16 h-16"/>
				</AvatarFallback>
			</Avatar>
			<Button
				variant="outline"
				size="icon"
				className="rounded-lg p-1 absolute bottom-0 right-0"
				onClick={e => {
					e.preventDefault()
					inputRef.current?.click()
				}}
				disabled={loading}
			>
				<PencilIcon className="w-4 h-4 text-black"/>
			</Button>
			<Input
				ref={inputRef}
				type="file"
				className="hidden"
				onChange={handleChange}
				accept="image/*"
			/>
		</div>
	)
}