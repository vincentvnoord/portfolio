"use client";
import { motion, useAnimation, useMotionValue, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export const HeroBackground = () => {
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
            const y = ev.clientY + curScroll.scrollYProgress.get() * window.outerHeight;
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
        <div className="absolute blur-2xl min-w-full min-h-full bg-background pointer-events-none">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{
                    opacity: 1
                }}
                className="big-radial absolute min-h-full w-full place-content-center pointer-events-none">
            </motion.div>

            <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ opacity: 0.5 }}
                style={{ left: smoothMouse.x, top: smoothMouse.y }}
                className="absolute blur-3xl origin-center flex justify-center items-center">
                <div
                    className="relative z-80 origin-center w-96 h-96 bg-primary rounded-full"
                ></div>
            </motion.div>
        </div>
    )
}