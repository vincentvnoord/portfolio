import { useEffect, useState } from "react";
import { useAnimation, motion, AnimationControls } from "framer-motion";
import { fadeInAnimation } from "./Helper";

export const EntryTextAnimation = ({ setTextVisible }: { setTextVisible: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const rotationAnim = useAnimation();
    const scaleAndColorAnim = useAnimation();

    useEffect(() => {
        const initialAnimation = async () => {
            await scaleAndColorAnim.start({
                scaleY: [0, 1],
                transition: {
                    delay: 0.5
                }
            });

            setTextVisible(true);

            await scaleAndColorAnim.start({
                scaleX: [1, 0.01],
            });

            await scaleAndColorAnim.start({
                scaleY: [1, 0],
            });

            await scaleAndColorAnim.start({
                scaleX: 1,
            });

        }

        initialAnimation();
        return () => {
            rotationAnim.stop();
            scaleAndColorAnim.stop();
        }
    }, [rotationAnim, scaleAndColorAnim]);

    return (
        <motion.div
            animate={rotationAnim}
            className={`absolute w-full h-full z-30 top-0 origin-bottom-left pointer-events-none`}
        >
            <motion.div
                initial={{ scaleY: 0 }}
                animate={scaleAndColorAnim}
                className="w-full h-full top-0 bg-primary origin-bottom-left flex flex-col justify-between"
            >
            </motion.div>
        </motion.div>
    )
}