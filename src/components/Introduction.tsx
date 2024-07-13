"use client";

import { motion, MotionValue, useMotionValueEvent, useTransform } from "framer-motion"
import { ColorfulContainer } from "./ColorContainer"
import { useEffect, useState } from "react";

export const Introduction = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
    const rotateX = useTransform(scrollYProgress, [0.05, 0.15, 0.3, 0.4], [90, 0, 0, -90]);
    const rotateY = useTransform(scrollYProgress, [0.05, 0.20], [30, 0]);
    const opacity = useTransform(scrollYProgress, [0.3, 0.4], [1, 0]);
    const translateY = useTransform(scrollYProgress, [0.05, 0.4], [100, -100]);
    const [triggerAway, setTriggerAway] = useState(false);

    useMotionValueEvent(scrollYProgress, "change", (value) => {

    });

    return (
        <motion.div style={{ rotateX, rotateY, opacity, translateY }}
            initial={{ x: 0, scale: 0 }}
            animate={triggerAway ? { rotate: 180, scale: 0 } : { rotate: 0, scale: 1 }}
            className="origin-bottom-left"
        >
            <ColorfulContainer
                colors={{ center: "bg-secondary", right: "bg-accent" }}
                className="shadow-xl"
                outerClassName="p-3"
            >
                <div className="w-full z-20 relative md:text-center flex flex-col justify-center items-center gap-3 max-w-screen-sm lg:max-w-screen-md p-2 md:p-9">
                    <p className="text-2xl md:text-4xl">Hi I&apos;m Vincent. Nice to meet you.</p>
                    <p className="text-sm lg:text-xl opacity-80">
                        I started my programming journey in 2018, initially in game development.
                        This was fun, but not fulfilling.
                        I then focused on solving problems through mainly web development.
                    </p>
                </div>
            </ColorfulContainer>
        </motion.div>
    )
}