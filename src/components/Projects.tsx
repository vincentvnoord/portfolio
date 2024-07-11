import { MotionValue, motion, useAnimation, useMotionValueEvent, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { ColorfulContainer } from "./ColorContainer";
import Image from "next/image";

const Projects = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
    const opacity = useTransform(scrollYProgress, [0.6, 0.7], [0, 1]);
    const translateX = useTransform(scrollYProgress, [0.55, 0.7], [1000, 0]);
    const pointerEvents = useTransform(scrollYProgress, (pos) => {
        return pos < 0.6 ? "none" : "all";
    });

    const projectsOpacity = useTransform(scrollYProgress, [0.75, 0.77], [0, 1]);

    return (
        <motion.div style={{ opacity, pointerEvents }} className="flex items-center justify-center">
            <ScrollArrow opacity={projectsOpacity} />

            <ColorfulContainer className="origin-center shadow-lg relative p-3 flex justify-center overflow-hidden">
                <motion.div
                    style={{ translateX, pointerEvents: "none" }}
                    className="font-extrabold pointer-events-none grid text-center text-5xl sm:text-8xl md:text-9xl"
                >
                    {Array.from({ length: 5 }).map((_, index) => (
                        <ProjectText key={index} scrollYProgress={scrollYProgress} index={index} />
                    ))}
                </motion.div>

                <motion.div style={{ pointerEvents, opacity: projectsOpacity }} className="absolute flex w-full h-full top-0 left-0 p-3">
                    <motion.div style={{ pointerEvents }} className="relative origin-center z-10 min-w-full h-full flex items-end justify-start overflow-hidden">
                        <div className="flex flex-col p-2">
                            <p className="text-5xl font-bold">Luisterkyn</p>
                            <p className="text-xl">A web-app created for customers to order on the public pages, and the admin to view and respond to the orders.</p>
                        </div>
                        <div className="w-full rounded-3xl h-full absolute">
                            <Image src="/csharp.png" alt="csharp" layout="fill" objectFit="cover" />
                        </div>
                    </motion.div>
                    <motion.div style={{ pointerEvents }} className="origin-center z-10 min-w-full h-full flex justify-center overflow-hidden">
                        <p>Luisterkyn</p>
                    </motion.div>
                </motion.div>
            </ColorfulContainer>
            <ScrollArrow dir={1} opacity={projectsOpacity} />
        </motion.div>
    );
};

const ScrollArrow = ({ dir = 0, opacity }: { dir?: number, opacity: MotionValue<number> }) => {
    const animController = useAnimation();
    const rotate = dir === 0 ? -10 : 10;
    const x = dir === 0 ? -10 : 10;

    const onTap = async () => {
        console.log("atp");
        await animController.start({ scale: 1.2, rotate, x }, { duration: 0.1, ease: "easeInOut" });
        await animController.start({ scale: 1, rotate: 0, x: 0 });
    }

    return (
        <motion.div className="hover:cursor-pointer" animate={animController} transition={{ type: "spring", stiffness: 200, damping: 5 }} onClick={onTap} style={{ opacity }}>

            {dir === 0 ? <ArrowLeft size={60} /> : <ArrowRight size={60} />}
        </motion.div>
    )
}

const ProjectText = ({ scrollYProgress, index }: { scrollYProgress: MotionValue<number>, index: number }) => {
    const delay = index * -0.01;
    const opacity = useTransform(scrollYProgress, [0.75 + delay, 0.77 + delay], [1, 0]);

    return (
        <motion.p style={{ opacity }} layoutId={index.toString()} initial={{ opacity: 1 }} key={index} className="">
            PROJECTS
        </motion.p>
    )
}

export default Projects;