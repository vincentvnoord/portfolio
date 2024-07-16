import BackButton from "@/components/BackButton";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="w-full flex gap-5 justify-center pt-9">
            <BackButton />
            <section className="max-w-screen-md w-full">
                {children}
            </section>
        </main>
    );
}