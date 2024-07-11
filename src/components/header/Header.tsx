"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ShinyButton } from "../ShinyButton";
import { ModeToggle } from "../ui/ThemeToggler";

export const Header = () => {
    return (
        <div className="fixed left-0 z-50 flex justify-center top-0 w-full h-1/5">
            <motion.header className="flex items-start justify-center pt-6 h-fit">
                <div className="flex justify-center items-center gap-3">
                    <ModeToggle />

                </div>
            </motion.header>
        </div>
    )
}