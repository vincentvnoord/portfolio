"use client";

import { Nixie_One } from "next/font/google";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

const nixie = Nixie_One({
    subsets: ["latin"],
    weight: "400"
});

interface TransformValues {
    x: number;
    y: number;
    scaleX: number;
    scaleY: number;
}

export const IntroText = () => {
    const highlightRev = useRef<HTMLDivElement>(null);
    const currentDiv = useRef<HTMLDivElement>(null);
    const [transformValues, setTransformValues] = useState<TransformValues>();

    if (currentDiv.current && highlightRev.current) {
        const sourceDivBounds = currentDiv.current.getBoundingClientRect();
        const destinationDivBounds = highlightRev.current.getBoundingClientRect();

        const transformValues: TransformValues = {
            x: sourceDivBounds.left - destinationDivBounds.left,
            y: sourceDivBounds.top - destinationDivBounds.top,
            scaleX: sourceDivBounds.width / destinationDivBounds.width,
            scaleY: sourceDivBounds.height / destinationDivBounds.height,
            // You can capture other properties like rotation, opacity, etc.
        };

        setTransformValues(transformValues);
    }

    const bigStyle = "text-9xl font-bold";
    const smallStyle = `${nixie.className} text-5xl`;

    return (
        <div className="cursor-default">
            <div className="flex w-full items-end">
                <p className={smallStyle}>I'm a</p>
                <p className={bigStyle}>FULL-STACK</p>
            </div>

            <div className="flex w-full justify-end items-end">
                <p className={bigStyle}>DEVELOPER</p>
                <p className={smallStyle}>&</p>
            </div>

            <p className={bigStyle}>SOFTWARE ENGINEER</p>

            <motion.div className="bg-white" ref={highlightRev}></motion.div>
        </div >
    )
}