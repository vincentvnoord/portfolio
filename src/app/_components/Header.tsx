"use client";

import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "@/components/ui/ThemeToggler";
import { motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";

export const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollYProgress } = useScroll();

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
        <motion.header initial={{ paddingTop: "5rem" }} animate={isScrolled ? { paddingTop: "2rem" } : { paddingTop: "5rem" }} className="w-full flex justify-center z-50 top-0 max-w-screen-lg sticky pt-20 text-nowrap">
            <motion.div animate={isScrolled ? { borderWidth: 1 } : { borderWidth: 0 }} transition={{ duration: 0.2 }} className="flex flex-col md:flex-row border-primary p-2 backdrop-blur-lg bg-background/30 rounded-3xl justify-center items-center gap-5">
                <motion.div initial={{ width: 150, height: 150 }} animate={isScrolled ? { width: 50, height: 50 } : { width: 150, height: 150 }} className="h-32 w-32 flex-shrink-0 relative rounded-3xl overflow-hidden">
                    <Image src="/pfp.jpeg" alt="Vincent van Noord" className="object-cover" fill />
                </motion.div>

                <div className="flex flex-col">
                    <h2 className="text-xl font-bold">VINCENT VAN NOORD</h2>
                    <motion.p initial={{ height: "auto" }} animate={isScrolled ? { height: 0 } : { height: "auto" }} className="pl-1 overflow-hidden text-secondary-foreground/50">Full Stack Software Ontwikkelaar</motion.p>
                </div>

                <motion.div initial={{ width: "100%" }} transition={{ duration: 0.5, ease: "circOut" }} animate={isScrolled ? { width: "0%" } : { width: "100%" }}>

                </motion.div>

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
