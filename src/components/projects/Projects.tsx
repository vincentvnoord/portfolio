import { MotionValue, motion, useAnimation, useMotionValueEvent, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useState } from "react";
import { ColorfulContainer } from "../ColorContainer";
import ProjectScroller from "./Scroller";
import { projectCount } from "./constants";
import Image from "next/image";

const Projects = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
    const opacity = useTransform(scrollYProgress, [0.6, 0.7, 0.8, 0.9], [0, 1, 1, 0]);
    const translateX = useTransform(scrollYProgress, [0.55, 0.7], [1000, 0]);
    const pointerEvents = useTransform(scrollYProgress, (pos) => {
        if (pos < 0.6) return "none";
        if (pos > 0.9) return "none";

        return "all";
    });

    const projectsOpacity = useTransform(scrollYProgress, [0.75, 0.77], [0, 1]);

    const [currentProject, setCurrentProject] = useState(0);

    const containerAnim = useAnimation();

    const handleScroll = async (dir: number) => {
        let nextProject = currentProject + dir;
        if (nextProject < 0) {
            nextProject = projectCount - 1;
        } else if (nextProject >= projectCount) {
            nextProject = 0;
        }
        setCurrentProject(nextProject);

        await containerAnim.start({ rotate: dir === 1 ? 6 : -6 }, { duration: 0.1 });
        await containerAnim.start({ rotate: 0 }, { type: "spring", stiffness: 200, damping: 5 });
    }

    return (
        <motion.div style={{ opacity, pointerEvents }} className="flex-col w-full max-w-screen-lg items-center justify-center">
            {projectCount > 0 &&
                <div className="hidden">
                    <ScrollArrow opacity={projectsOpacity} handleScroll={handleScroll} />
                </div>
            }

            <motion.div animate={containerAnim}>
                <ColorfulContainer outerClassName="p-3" className="origin-center max-h-[700px] shadow-lg relative p-3 flex justify-center overflow-hidden">
                    <motion.div
                        style={{ translateX, pointerEvents: "none" }}
                        className="font-extrabold pointer-events-none grid text-center text-5xl sm:text-8xl md:text-9xl"
                    >
                        {Array.from({ length: 5 }).map((_, index) => (
                            <TitleAnimation key={index} scrollYProgress={scrollYProgress} index={index} />
                        ))}
                    </motion.div>
                    <ProjectScroller currentProject={currentProject} pointerEvents={pointerEvents} opacity={projectsOpacity} />

                </ColorfulContainer>
            </motion.div>

            {projectCount > 0 &&
                <div className="hidden">
                    <ScrollArrow dir={1} opacity={projectsOpacity} handleScroll={handleScroll} />
                </div>
            }

            {projectCount > 0 &&
                <div className=" w-full flex justify-evenly">
                    <ScrollArrow opacity={projectsOpacity} handleScroll={handleScroll} />
                    <ScrollArrow dir={1} opacity={projectsOpacity} handleScroll={handleScroll} />
                </div>
            }

        </motion.div>
    );
};


const ScrollArrow = ({ dir = -1, opacity, handleScroll }: { dir?: number, opacity: MotionValue<number>, handleScroll: (dir: number) => void }) => {
    const animController = useAnimation();
    const rotate = dir === -1 ? -10 : 10;
    const x = dir === -1 ? -10 : 10;

    const onTap = async () => {
        handleScroll(dir);
        console.log("atp");
        await animController.start({ scale: 1.2, rotate, x }, { duration: 0.1, ease: "easeInOut" });
        await animController.start({ scale: 1, rotate: 0, x: 0 });
    }

    return (
        <motion.div className="hover:cursor-pointer" animate={animController} transition={{ type: "spring", stiffness: 200, damping: 5 }} onClick={onTap} style={{ opacity }}>

            {dir === -1 ? <ArrowLeft size={60} /> : <ArrowRight size={60} />}
        </motion.div>
    )
}

const TitleAnimation = ({ scrollYProgress, index }: { scrollYProgress: MotionValue<number>, index: number }) => {
    const delay = index * -0.01;
    const opacity = useTransform(scrollYProgress, [0.75 + delay, 0.77 + delay], [1, 0]);

    return (
        <motion.p style={{ opacity }} layoutId={index.toString()} initial={{ opacity: 1 }} key={index} className="">
            PROJECTS
        </motion.p>
    )
}

export default Projects;