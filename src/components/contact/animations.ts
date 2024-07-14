import { useAnimation, useMotionValueEvent, MotionValue } from "framer-motion";

function useEntryAnimations(scrollYProgress: MotionValue<number>) {
    let inView = false;
    const titleAnimation = useAnimation();
    const nameAnimation = useAnimation();
    const emailAnimation = useAnimation();
    const sendButtonAnimation = useAnimation();

    const transition = {
        duration: 0.5,
        ease: "easeInOut"
    }

    useMotionValueEvent(scrollYProgress, "change", (pos) => {
        if (inView) {
            if (pos < 0.9) {
                inView = false;

                titleAnimation.start({ opacity: 0 });

                nameAnimation.start({
                    opacity: 0,
                    rotate: [0, -95],
                    transition
                });
                emailAnimation.start({
                    opacity: 0,
                    rotate: [0, 95],
                    transition
                });
                sendButtonAnimation.start({
                    y: "100%",
                    opacity: 0,
                    transition
                });
            }
            return;
        }

        if (pos > 0.9) {
            inView = true;

            titleAnimation.start({ opacity: 1 });
            nameAnimation.start({
                opacity: 1,
                rotate: [90, 0],
                transition
            });
            emailAnimation.start({
                opacity: 1,
                rotate: [90, 0],
                transition: {
                    delay: 0.1
                }
            });
            sendButtonAnimation.start({
                y: 0,
                opacity: 1,
                transition: {
                    delay: 0.2,
                    duration: 0.7,
                    ease: "easeOut"
                }
            });
        }
    })

    return { titleAnimation, nameAnimation, emailAnimation, sendButtonAnimation };
}

export { useEntryAnimations }