"use client";

import { motion, useAnimation, useInView } from "framer-motion"
import React, { useEffect } from "react"

export const BasicReveal = ({ children }: { children: React.ReactNode }) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, {});
    const mainControls = useAnimation();

    const variants = {
        hidden: { opacity: 0, y: 0 },
        visible: { opacity: 1, y: 0 }
    }

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible");
        } else {
            mainControls.start("hidden");
        }
    }, [isInView]);

    return (
        <motion.div ref={ref} variants={variants} transition={{ duration: 2, ease: "easeInOut" }} initial="hidden" animate={mainControls}>
            {children}
        </motion.div>
    )
}