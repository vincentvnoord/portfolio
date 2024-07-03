"use client";

import { Transition, motion } from "framer-motion";

export const Banner = () => {

    return (
        <div className="pt-32 flex flex-col h-auto text-white">
            <div className="w-full flex translate-y-2 md:translate-y-3 justify-between">
                <KeyPoint index={0} className="self-start" title="WEBDESIGN" />
                <KeyPoint index={1} className="md:pr-48" title="APPLICATIES" />
            </div>
            <div className="flex items-center justify-center">
                <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-align-center">VINCENT VAN NOORD</h1>
            </div>

            <div className="w-full flex -translate-y-1 justify-between">
                <KeyPoint index={3} title="MAATWERK" className="md:pl-32" />
                <KeyPoint index={2} title="SOFTWARE ONTWIKKELING" />
            </div>
        </div>
    );
}

const KeyPoint = ({ title, className, index }: { title: string, className?: string, index: number }) => {
    const variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    }

    const transition: Transition = {
        ease: "easeInOut",
        duration: 1.4,
        delay: 0.5 * index,
    }

    return (
        <motion.div animate={"visible"} initial={"hidden"} variants={variants} transition={transition} className={className}>
            <h2 >{title}</h2>
        </motion.div>
    )
}