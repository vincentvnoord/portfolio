"use client";

import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "@/components/ui/ThemeToggler";
import { motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronUp, CrossIcon, MenuIcon, XIcon } from "lucide-react";

export const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollYProgress } = useScroll();

    const defaultPfpSizes = "h-16 w-16 sm:h-32 sm:w-32"
    const scrolledPfpSizes = "h-10 w-10 sm:h-12 sm:w-12"

    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (latest) => {
            if (latest > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        })

        return () => {
            unsubscribe();
        }
    }, [scrollYProgress])

    return (
        <motion.header className="w-full min-h-0 sticky left-0 top-0 flex justify-center z-50 max-w-screen-lg pt-6 sm:pt-10 text-nowrap">
            <motion.div
                transition={{ duration: 0.2 }}
                className={`flex transition-colors duration-100 ease-in mx-2 justify-between border-y-4 border-x-2 backdrop-blur-md p-2 bg-background/30 rounded-3xl w-full items-center gap-2 sm:gap-5 ${isScrolled ? "border-primary/50" : "border-primary/0"}`}
            >
                <div className="flex items-center gap-2">
                    <motion.div
                        className={`flex-shrink-0 transition-all duration-300 ease-in-out relative rounded-3xl overflow-hidden ${isScrolled ? scrolledPfpSizes : defaultPfpSizes}`}>
                        <Image src="/pfp.jpeg" alt="Vincent van Noord" className="object-cover" fill />
                    </motion.div>

                    <div className="flex flex-col">
                        <h2 className="text-sm md:text-xl font-bold">VINCENT VAN NOORD</h2>
                        <motion.p initial={{ height: "auto" }} animate={isScrolled ? { height: 0 } : { height: "auto" }} className="text-xs sm:text-base overflow-hidden text-secondary-foreground/50">Full Stack Software Ontwikkelaar</motion.p>
                    </div>
                </div>

                <MobileNav />

                <motion.div initial={{ fontSize: "1.25rem" }} animate={isScrolled ? { fontSize: "1rem" } : { fontSize: "1.25rem" }} className="hidden lg:flex gap-4 text-xl items-center font-semibold text-secondary-foreground/50 pl-1">
                    <Link href="/over-mij">OVER MIJ</Link>
                    <Link href="/">PROJECTEN</Link>
                    <Link href="/">CONTACT</Link>
                    <div className="flex items-center">
                        <ModeToggle />
                    </div>
                </motion.div>
            </motion.div>
        </motion.header >
    )
}

const MobileNav = () => {
    const [opened, setOpened] = useState(false);

    return (
        <div className="lg:hidden relative pr-2">
            <MenuIcon onClick={() => setOpened(true)} size={32} />
            <motion.div initial={{ height: 0 }} animate={opened ? { height: "auto" } : { height: 0 }} className="absolute top-0 right-0 bg-primary overflow-hidden flex flex-col text-xl font-semibold">
                <div className="flex flex-col p-2 text-background">
                    <Link href="/over-mij">OVER MIJ</Link>
                    <Link href="/">PROJECTEN</Link>
                    <Link href="/">CONTACT</Link>
                    <div className="flex items-center justify-between pt-6">
                        <div onClick={() => setOpened(false)} className="h-12 w-12 flex items-center justify-center">
                            <ChevronUp size={32} />
                        </div>
                        <ModeToggle />
                    </div>
                </div>
            </motion.div>
        </div>
    )
}