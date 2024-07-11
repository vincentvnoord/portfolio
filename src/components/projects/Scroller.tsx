import { motion, useAnimation, MotionValue } from "framer-motion";
import Image from "next/image";
import { Button } from "../ui/button";
import { ShinyButton } from "../ShinyButton";

const projects = [
    { title: "Luisterkyn", description: "A web-app created for customers to order on the public pages, and the admin to view and respond to the orders.", image: "/csharp.png" },
    { title: "test", description: "A web-app created for customers to order on the public pages, and the admin to view and respond to the orders.", image: "/mysql.png" },
    { title: "Test2", description: "A web-app created for customers to order on the public pages, and the admin to view and respond to the orders.", image: "/csharp.png" },
]

export const projectCount = projects.length;

const ProjectScroller = ({ pointerEvents, opacity, currentProject }: { pointerEvents: MotionValue<"none" | "all">, opacity: MotionValue<number>, currentProject: number }) => {
    const { title, description, image } = projects[currentProject];

    return (
        <motion.div style={{ pointerEvents, opacity }} className="absolute flex gap-2 w-full h-full top-0 left-0 p-3">

            <ProjectCard title={title} description={description} image={image} />
        </motion.div>
    )
}

const ProjectCard = ({ title, description, image }: { title: string, description: string, image: string }) => {
    const descriptionAnim = useAnimation();
    const backgroundAnim = useAnimation();

    const onMouseEnter = async () => {
        descriptionAnim.start({ height: "auto" });
        backgroundAnim.start({ opacity: 1 });
    }

    const onMouseLeave = async () => {
        descriptionAnim.start({ height: 0 });
        backgroundAnim.start({ opacity: 0 });
    }

    return (
        <motion.div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} style={{}} className="relative origin-center z-10 min-w-full h-full flex flex-col items-end justify-start overflow-hidden">
            <div className="w-full z-0 rounded-3xl h-full relative">
                <Image className="object-cover" src={image} alt="csharp" layout="fill" objectFit="cover" />
            </div>
            <div className="flex z-10 flex-col p-4">
                <p className="z-10 text-2xl md:text-5xl font-bold w-full">{title}</p>
                <motion.div animate={descriptionAnim} initial={{ height: 0 }} className="z-10 md:text-xl relative flex items-center overflow-hidden">
                    <motion.p >{description}</motion.p>
                </motion.div>

                <motion.div initial={{ opacity: 0 }} animate={backgroundAnim} className="z-20 absolute flex w-full h-full top-0 left-0 pt-12 md:items-center justify-center">
                    <Button className="bg-primary text-2xl md:text-4xl md:p-12 font-bold">VIEW PROJECT</Button>
                </motion.div>

            </div>

            <motion.div initial={{ opacity: 0 }} animate={backgroundAnim} className="z-0 rounded-3xl absolute w-full h-full bg-background/80">
            </motion.div>
        </motion.div>
    )
}

export default ProjectScroller;