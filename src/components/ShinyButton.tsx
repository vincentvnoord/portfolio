import { motion, useAnimation } from "framer-motion"

export const ShinyButton = ({ title, className, onClick }: { title: string, className?: string, onClick?: () => void }) => {
    const parentAnim = useAnimation();
    const childAnim = useAnimation();
    const textAnim = useAnimation();
    const darkTextAnim = useAnimation();

    const stopAnimations = () => {
        parentAnim.stop();
        childAnim.stop();
        textAnim.stop();
        darkTextAnim.stop();
    }

    const handleHover = async () => {
        stopAnimations();
        childAnim.start({
            scaleY: 1,
        });

        parentAnim.start({
            scale: 1.1,
        });

        textAnim.start({
            opacity: 0,
        });

        darkTextAnim.start({
            opacity: 1,
        });
    }

    const handleLeave = async () => {
        stopAnimations();
        childAnim.start({
            scaleY: 0,
            transition: {
                duration: 0.5,
            }
        });

        parentAnim.start({
            scale: 1,
        });

        textAnim.start({
            opacity: 1,
            transition: {
                duration: 0.5,
            }
        });
        darkTextAnim.start({
            opacity: 0,
            transition: {
                duration: 0.5,
            }
        });
    }

    return (
        <motion.button
            onHoverStart={handleHover}
            onMouseLeave={handleLeave}
            onClick={onClick}
            animate={parentAnim}
            className={`relative hover:cursor-pointer border-2 border-primary rounded-full p-3 flex items-center overflow-hidden ${className}`}>

            <motion.span
                initial={{ opacity: 1 }}
                animate={textAnim}
                className="h-full z-10 w-full text-xl font-bold">
                {title}
            </motion.span>

            <motion.div
                initial={{ scaleY: 0, scaleX: 1.3 }}
                animate={childAnim}
                className="absolute bg-primary w-full h-full origin-bottom top-0 left-0 z-0"
            ></motion.div>

            <motion.span
                initial={{ opacity: 0 }}
                animate={darkTextAnim}
                className="absolute top-0 left-0 h-full z-20 w-full text-xl text-background font-bold p-3">
                {title}
            </motion.span>
        </motion.button>
    )
}