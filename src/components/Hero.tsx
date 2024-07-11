"use client";

import { useRef } from "react";
import { EntryText } from "./entrytext/EntryText"
import { HeroBackground } from "./HeroBackground"
import { motion, useScroll, useTransform } from "framer-motion"

const Hero = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll(
        {
            target: targetRef,
            offset: ["end end", "end start"],
        }
    );

    const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
    const pointerEvents = useTransform(scrollYProgress, (pos) => {
        return pos === 1 ? "none" : "all";
    });

    return (
        <motion.div style={{ opacity, pointerEvents }} ref={targetRef} className="fixed top-0 transition-height duration-200 ease-in h-dvh w-full flex flex-col items-center justify-center">
            <EntryText />
            <HeroBackground />
        </motion.div>
    )
}

export default Hero;