import Image from "next/image"
import TabCard from "@/components/login/tab-card"
import LibImg from "../../../public/lib.jpg"

function Quote({quote, author} : {quote: string, author: string}) {
    return (
        <div className="backdrop-blur-md rounded-md flex-col p-5 text-white">
            <div className="relative z-20 mt-auto">
                <blockquote className="space-y-2">
                <p className="text-lg shadow-sm">
                    &ldquo;{quote}&rdquo;
                </p>
                ⭐⭐⭐⭐⭐
                <footer className="text-sm">{author}</footer>
                </blockquote>
            </div>
        </div>
    )
}

export default function Page() {
    return (
        <div className="relative w-full lg:grid lg:min-h-[400px] xl:min-h-[750px] lg:grid-cols-2">
        {/* <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"> */}
            <div className="absolute top-0 left-0 p-4">
                <div className="flex items-center">
                    <Image
                        src="/logo.svg"
                        alt="Logo"
                        width="60"
                        height="50"
                    />
                    <span className="font-bold text-inherit hidden md:block">THƯ VIỆN BOBO</span>
                </div>
            </div>        
            <div className="flex justify-center items-center py-12">
                {/* <div className="mx-auto grid w-[350px] gap-6"> */}
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <TabCard/>
                </div>
            </div>
            {/* <div className="hidden bg-muted lg:block relative"> */}
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex space-y-5">
                <Image
                    src={LibImg}
                    alt="Image"
                    fill
                    className="object-cover"
                    placeholder="blur"
                />
                <Quote quote={"👌😭."} author={"New York Times"}/>
                <Quote quote={"Đây là ứng dụng mượn sách kết hợp với thư viện tốt nhất mà tôi từng dùng."} author={"IGN"}/>
            </div>
        </div>
    )
}