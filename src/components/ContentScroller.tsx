"use client";

import { ColorfulContainer } from "./ColorContainer";
import { Introduction } from "./Introduction";
import Projects from "./Projects";
import { TechStack } from "./TechStack/TechStack";
import { useScroll } from "framer-motion";
import React, { useRef } from "react";

const ContentScroller = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll(
        {
            target: targetRef,
            offset: ["start start", "end end"],
        }
    );

    return (
        <div ref={targetRef} className="h-[4000px] w-full pointer-events-none">
            <div className="sticky top-0 w-full">
                <Section>
                    <Introduction scrollYProgress={scrollYProgress} />
                </Section>

                <Section>
                    <TechStack scrollYProgress={scrollYProgress} />
                </Section>
                <Section>
                    <Projects scrollYProgress={scrollYProgress} />
                </Section>
            </div>
        </div>
    )
}

const Section = ({ children }: { children: React.ReactNode }) => {
    return (
        <div style={{ }} className="absolute overflow-hidden w-full transition-height duration-200 ease-in h-dvh flex items-center justify-center">
            {children}
        </div>
    )
}

export default ContentScroller;