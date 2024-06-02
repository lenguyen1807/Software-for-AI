function Href({href, desc} : {href: string, desc: string}) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
        >
            {desc}
        </a>
    )
}

export default function SiteFooter() {
    return (
        <footer className="border-t py-6 md:px-6 md:py-0">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                 <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
                    Trang web này được xây dựng bằng {" "}
                    <Href href="https://ui.shadcn.com/" desc="shadcn/ui"/> (nhóm tụi mình rất cảm ơn {" "}
                    <Href href="https://github.com/shadcn-ui/ui/tree/main/apps/www/components" desc="source code của shadcn/ui"/> 😭) và {" "}
                    <Href href="https://nextjs.org/docs/getting-started/installation" desc="NextJS"/>. Ngoài ra cảm ơn các thành viên của nhóm gồm {" "}
                    <Href href="https://www.facebook.com/vmthu.XII" desc="Vũ Minh Thư"/>, {" "}
                    <Href href="https://www.facebook.com/profile.php?id=100010421776385" desc="Ngô Ngọc Vũ"/>, {" "}
                    <Href href="https://web.facebook.com/anhtu.nguyen2112003" desc="Nguyễn Anh Tú"/> cho phần front-end và {" "}
                    <Href href="https://web.facebook.com/haiimphuong" desc="Phan Nguyên Phương"/> ,{" "}
                    <Href href="https://web.facebook.com/profile.php?id=61552012169255" desc="Đỗ Hoàng Long"/> cho phần back-end 💓.
                 </p>
            </div>
        </footer>
    )
}