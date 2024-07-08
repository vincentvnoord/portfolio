import { AnimationControls } from "framer-motion";
import { colors } from "../../../tailwind.config";

export async function fadeInAnimation(controls: AnimationControls, startCol?: string, endCol?: string) {
    await controls.start({
        backgroundColor: [startCol ? startCol : colors.background, endCol ? endCol : colors.muted],
        transition: {
            duration: 1,
            ease: "easeInOut"
        }
    });
}