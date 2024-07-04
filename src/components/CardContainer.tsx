"use client";

import React, { useEffect, useRef, useState } from "react";
import { easeIn, easeInOut, motion } from "framer-motion";
import Link from "next/link";

export const CardContainer = () => {
    const [selectedCardIndex, setSelectedCardIndex] = useState(0);
    const intervalInstance = useRef<NodeJS.Timeout | undefined>(undefined);

    const clearExistingInterval = () => {
        if (intervalInstance.current) {
            clearInterval(intervalInstance.current);
            intervalInstance.current = undefined;
        }
    }

    const startInterval = () => {
        clearExistingInterval();
        intervalInstance.current = setInterval(() => {
            setSelectedCardIndex(prevIndex => (prevIndex + 1) % 3);
        }, 3000);
    }

    useEffect(() => {
        startInterval();

        return () => clearExistingInterval();
    }, []);

    return (
        <motion.div className="h-full w-full grid grid-rows-2 lg:grid-cols-2 p-12 gap-8">
            <HomeCard
                title="PROJECTEN"
                className="row-span-2"
                color="bg-blue-300"
                index={0}
                selected={selectedCardIndex}
                setSelectedCard={setSelectedCardIndex}
                startInterval={startInterval}
                stopInterval={clearExistingInterval}
            >
                <div className="flex flex-col">
                    <p>test</p>
                    <p>test</p>
                    <p>test</p>
                    <p>test</p>
                    <p>test</p>
                    <p>test</p>
                    <p>test</p>
                    <p>test</p>
                    <p>test</p>
                    <p>test</p>
                    <p>test</p>
                    <p>test</p>
                    <p>test</p>
                    <p>test</p>
                </div>
            </HomeCard>

            <HomeCard
                title="GRATIS ONTWERP"
                color="bg-green-300"
                index={1}
                selected={selectedCardIndex}
                setSelectedCard={setSelectedCardIndex}
                startInterval={startInterval}
                stopInterval={clearExistingInterval}
            >

                <div className="flex flex-col h-full p-2 pt-3">
                    <p className="text-xl font-light">
                        Nog niet overtuigd van de waarde van een website?
                    </p>
                    <p className="font-bold">Vraag een gratis ontwerp aan!</p>
                </div>
            </HomeCard>

            <Link href="contact">
                <HomeCard
                    title="CONTACT"
                    color="bg-yellow-300"
                    index={2}
                    selected={selectedCardIndex}
                    setSelectedCard={setSelectedCardIndex}
                    startInterval={startInterval}
                    stopInterval={clearExistingInterval}
                >
                    <div className="flex flex-col h-full p-2 pt-3">
                        <p className="text-xl font-light">
                            Voor als je mogelijkheden wil bespreken of gewoon een vraag hebt, ik sta altijd open voor een gesprek!
                        </p>
                    </div>
                </HomeCard>
            </Link>
            
        </motion.div>
    )
}

interface HomeCardProps {
    title: string;
    index: number;
    selected: number;
    setSelectedCard: React.Dispatch<React.SetStateAction<number>>;
    startInterval: () => void;
    stopInterval: () => void;
    className?: string;
    color?: string;
    children?: React.ReactNode;
}

const variants = {
    default: {
        scale: 1,
    },
    hover: {
        scale: 1.03,
    }
}

const transition = {
    ease: easeInOut,
    duration: .1
}

export const HomeCard = ({ title, className, color, index, selected, setSelectedCard, startInterval, stopInterval, children }: HomeCardProps) => {
    const isSelected = selected === index;
    const defaultStyles = `p-3 h-full overflow-hidden flex flex-col cursor-pointer transition-all duration-200 ease-in-out rounded-3xl`;
    const colorStyle = color ? color : "bg-white";

    const onMouseEnter = () => {
        setSelectedCard(index);
        stopInterval();
    }

    const onMouseLeave = () => startInterval();


    return (
        <motion.div
            key={index}
            variants={variants}
            animate={isSelected ? "hover" : "default"}
            transition={transition}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className={`${defaultStyles} ${className} ${colorStyle}`}
        >
            <h3 className="text-5xl font-extrabold">{title}</h3>
            <CardContentAnimation selected={isSelected}>
                {children}
            </CardContentAnimation>
        </motion.div>
    )
}

const CardContentAnimation = ({ children, selected }: { children: React.ReactNode, selected: boolean }) => {
    const variants = {
        default: {
            opacity: 0,
            x: "-100%"
        },
        selected: {
            opacity: 1,
            x: 0
        }
    }

    return (
        <motion.div animate={selected ? variants.selected : variants.default} transition={{ duration: .5, type: "spring" }} initial="default" >
            {children}
        </motion.div>
    )
}