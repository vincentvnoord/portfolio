"use client";

import { Nixie_One } from "next/font/google";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, AnimationControls, motion, useAnimation, useScroll, } from "framer-motion";
import { EntryTextAnimation } from "./Animation";
import { ShinyButton } from "../ShinyButton";

const nixie = Nixie_One({
    subsets: ["latin"],
    weight: "400"
});

export const EntryText = () => {
    const bigStyle = "text-2xl md:text-5xl [1500]:text-7xl font-bold text-nowrap";
    const smallStyle = `${nixie.className} md:text-3xl xl:text-5xl`;
    const [textVisible, setTextVisible] = useState(false);

    const onClick = () => {
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
    }

    return (
        <div className="cursor-default z-10 flex flex-col p-5 items-center relative">
            <div className={`${textVisible ? "" : "opacity-0"} flex flex-col xl:flex-row items-center justify-center gap-2`}>
                <div className="flex flex-col items-center xl:items-start p-6">
                    <p className={smallStyle}>I&apos;m a</p>
                    <div className={`flex gap-3 w-full items-center`}>
                        <div className="relative z-10">
                            <p className={bigStyle}>FULL-STACK</p>
                        </div>
                        <div className="relative z-20" >
                            <p className={bigStyle}>DEVELOPER</p>
                        </div>
                    </div>

                    <p className={smallStyle + " pt-2"}>{"&"}</p>

                    <div className="relative z-20 flex flex-col gap-3">
                        <p className={bigStyle}>SOFTWARE ENGINEER</p>
                    </div>
                </div>

                <div className="bg-primary h-0.5 w-full xl:w-0.5 xl:h-96"></div>

                <div className="flex flex-col items-center gap-5 p-6">
                    <div className="pt-3">
                        <p className="text-sm text-center lg:text-left lg:text-xl opacity-80">I build seamless backends and frontends. Lets create something great.</p>
                    </div>
                    <ShinyButton onClick={onClick} title="GET IN TOUCH" />
                </div>
            </div>

            <EntryTextAnimation setTextVisible={setTextVisible} />
        </div>
    )
}
