"use client";

import Image from "next/image"
import { Button } from "../ui/button"

import { motion, useInView } from "framer-motion";
import { createRef, RefObject } from "react";

export default function Preview({ title, description, image, reverse }: { title: string, description: string, image: string, reverse?: boolean }) {
    const ref: RefObject<HTMLDivElement> = createRef();
    const inView = useInView(ref, { once: false, amount: 0.8 });
    const inViewImage = useInView(ref, { once: false, amount: 0.3 });

    return (
        <div ref={ref}
            className={`w-full flex gap-4 ${reverse ?? "flex-row-reverse"}`}>
            <motion.div initial={{ y: "100%", opacity: 0 }}
                animate={inViewImage ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
                className="w-full shadow-2xl h-full origin-center z-20 rounded-3xl overflow-hidden relative">
                <Image src={image} className="object-cover" alt="Luisterkyn" width={800} height={600} />
            </motion.div>
            <motion.div
                initial={{ opacity: 0, x: "100%" }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: "100%" }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className={`w-[45%] overflow-hidden p-6 flex flex-col h-full self-center items-start ${reverse ?? "items-end text-right origin-right"}`}>
                <h3 className="text-2xl">{title}</h3>
                <p className="font-light text-secondary-foreground/50 mb-3">
                    {description}
                </p>
                <Button className="">Meer lezen</Button>
            </motion.div>
        </div>
    )
}