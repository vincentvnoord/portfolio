"use client";

import { motion } from "framer-motion";

interface Colors {
    right?: string;
    left?: string;
    center?: string;
}

const defaultColors: Colors = {
    right: "bg-accent",
    left: "bg-blue-300",
    center: "bg-green-200"
}

export const ColorfulContainer = ({ children, className, colors }: { children: React.ReactNode, className?: string, colors?: Colors }) => {
    const containerStyle = "relative overflow-hidden p-6 rounded-2xl ";
    const { right, left, center } = { ...defaultColors, ...colors };



    return (
        <motion.div className="p-6">
            <div className={containerStyle + className}>
                {children}
                <div className="absolute bg-primary z-0 top-0 opacity-60 left-0 blur-3xl h-full w-full">
                    <motion.div
                        className={`absolute bottom-0 left-0 origin-center w-96 h-56 translate-y-10 rounded-full ${left}`}
                        animate={{ y: [50, 0, 50], x: [50, 0, 50] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    >
                    </motion.div>

                    <motion.div
                        className={`absolute top-0 right-0 origin-center w-96 h-96 rounded-full ${right}`}
                        animate={{ y: [50, 0, 50], x: [250, 200, 250] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    >
                    </motion.div>

                    <motion.div
                        className={`absolute top-1/2 right-1/2 origin-center w-96 h-96 transform scale-x-150 translate-x-1/2 -translate-y-1/2 rounded-full ${center}`}
                        initial={{ scale: 1.5 }}
                        animate={{ x: [250, 200, 250] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                    </motion.div>
                </div>
            </div >
        </motion.div>
    )
}