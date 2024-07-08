"use client";
import { motion, useAnimation, useMotionValue, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export const AuroraHero = () => {
    const curScroll = useScroll();
    const controls = useAnimation();
    const cursorSize = 384;
    const mouse = {
        x: useMotionValue(0),
        y: useMotionValue(0),
    };

    const smoothMouse = {
        x: useSpring(mouse.x),
        y: useSpring(mouse.y),
    }

    useEffect(() => {
        const updateMousePosition = (ev: MouseEvent) => {
            const x = ev.clientX;
            const y = ev.clientY + curScroll.scrollYProgress.get() * window.innerHeight;
            mouse.x.set(x - cursorSize / 2);
            mouse.y.set(y - cursorSize / 2);
        };

        window.addEventListener('mousemove', updateMousePosition);
        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            controls.stop();
        };
    }, []);

    return (
        <div className="absolute blur-2xl min-w-full min-h-screen bg-background pointer-events-none">
            <motion.div
                initial={{ opacity: 1 }}
                animate={{
                    opacity: 1
                }}
                className="z-0 big-radial absolute min-h-full w-full place-content-center pointer-events-none overflow-hidden">
                <motion.div
                    initial={{ scale: 0.5 }}
                    style={{ left: smoothMouse.x, top: smoothMouse.y }}
                    className="absolute origin-center flex justify-center items-center">
                    <div
                        className="relative origin-center w-96 h-96 bg-background rounded-full scale-125"
                    ></div>
                </motion.div>
            </motion.div>
        </div>
    )
}