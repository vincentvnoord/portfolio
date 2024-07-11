"use client";

import Image, { StaticImageData } from "next/image";
import { MotionValue, motion, useTransform } from "framer-motion";
import { use, useState } from "react";
import { frontend, databases, backend } from "./constants";
import { ColorfulContainer } from "../ColorContainer";

type Tech = {
    name: string,
    logo: string | StaticImageData
}

enum Direction {
    HOR,
    VERT
}

export const TechStack = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
    const opacity = useTransform(scrollYProgress, [0.35, 0.5], [0, 1]);
    const translateY = useTransform(scrollYProgress, [0.3, 0.4, 0.5], [1000, 100, 0]);
    const scaleY = useTransform(scrollYProgress, [0.6, 0.65], [1, 0]);
    const pointerEvents = useTransform(scrollYProgress, (pos) => {
        return pos > 0.3 && pos < 0.65 ? "all" : "none";
    });

    return (
        <motion.div style={{ opacity, translateY, scaleY, pointerEvents }} className="w-full text-center flex flex-col justify-center items-center gap-3 max-w-screen-md p-3 md:p-9">
            <ColorfulContainer className="shadow-lg" colors={{ right: "bg-navy-300" }}>
                <p className="text-2xl md:text-4xl font-bold">MY TECH</p>
                <p className="text-sm md:text-lg lg:text-xl opacity-80 pb-3">All the languages and technologies I have experience in.</p>

                <motion.div className="grid grid-cols-[1fr_100px] gap-3">
                    <TypeSection className="col-span-3 md:col-auto" title="Frontend" tech={frontend} />
                    <TypeSection className="col-span-3 md:col-auto row-start-3 md:row-span-2" title="Databases" tech={databases} direction={Direction.VERT} />
                    <TypeSection className="col-span-3 md:col-auto row-start-2" title="Backend" tech={backend} />
                </motion.div>
            </ColorfulContainer>
        </motion.div >
    )
}


const TypeSection = ({ title, tech, direction, className }: { title: string, tech: Tech[], direction?: Direction, className?: string }) => {
    const vertical = direction === Direction.VERT;
    const gridCols = vertical ? "grid-cols-2 md:grid-cols-1" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4";
    const [hovered, setHovered] = useState(false);

    return (
        <div className={`${className} flex flex-col gap-1 z-30`} onMouseEnter={() => { setHovered(true) }} onMouseLeave={() => { setHovered(false) }}>
            <p>{title}</p>
            <motion.div className={`grid ${gridCols} transition-colors duration-300 ease-in ${hovered ? "bg-secondary/40" : "bg-secondary/20"} bg-secondary/20 p-3 md:p-6 gap-6 rounded-2xl items-center justify-center`}>
                {tech.map((tech, index) => (
                    <TechCard key={index} index={index} name={tech.name} logo={tech.logo} hovered={hovered} />
                ))}
            </motion.div>
        </div>
    )
}

const TechCard = ({ index, name, logo, hovered }: { index: number, name: string, logo: string | StaticImageData, hovered: boolean }) => {
    const defaultAnim = { opacity: 0, height: 0 };
    const hoveredVariant = { opacity: 1, height: "auto", y: 0 };

    return (
        <motion.div className="flex flex-col z-20 justify-center items-center">
            <div className="w-6 h-6  md:w-12 md:h-12 relative">
                <Image className="object-contain pointer-events-none" src={logo} alt={name + " logo"} fill />
            </div>
            <motion.p className={"overflow-hidden text-secondary-foreground/60"} transition={{ delay: index * 0.05 }} animate={hovered ? hoveredVariant : defaultAnim} initial={defaultAnim}>{name}</motion.p>
        </motion.div>
    )
}