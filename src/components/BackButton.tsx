"use client"
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
    const router = useRouter();

    const handleClick = () => {
        router.back();
    }

    return (
        <div onClick={handleClick} className="flex h-fit justify-center items-center justify-self-start">
            <ChevronLeft size={60} />
            <p className="text-sm font-bold">BACK TO HOME</p>
        </div>
    );
}