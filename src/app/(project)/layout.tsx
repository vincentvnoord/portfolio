import BackButton from "@/components/BackButton";
import { ModeToggle } from "@/components/ui/ThemeToggler";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="w-full flex flex-col gap-5 items-center pt-9">
            <div className="flex items-center justify-between w-full max-w-screen-md">
                <BackButton />
                <ModeToggle />
            </div>
            <section className="max-w-screen-md w-full p-3">
                {children}
            </section>
        </main>
    );
}