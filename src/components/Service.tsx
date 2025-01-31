"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

export const Service = ({ title, description, icon }: { title: string, description: string, icon: string | React.ReactNode }) => {
    const [hovered, setHovered] = useState(false);

    const descriptionVariants = {
        hidden: {
            height: 0,
            opacity: 0
        },
        visible: {
            height: "auto",
            opacity: 1
        }
    }

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="flex min-h-48 h-full transition-colors duration-500 ease-in-out hover:bg-foreground hover:text-background bg-background flex-col items-center justify-end md:p-3 text-center">
            {typeof icon === "string" ? <Image style={{ fill: "white" }} src={icon} alt={title} width={64} height={64} /> : icon}
            <div className="h-1/2">
                <h2 className="mt-3 text-sm font-semibold">{title}</h2>
                <motion.p initial="hidden" animate={hovered ? "visible" : "hidden"} variants={descriptionVariants} className="text-xs opacity-50 overflow-hidden">{description}</motion.p>
            </div>
        </div>
    )
}