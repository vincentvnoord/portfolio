import { useFormContext } from "react-hook-form";
import { AnimationControls, motion } from "framer-motion";
import { ColorfulContainer } from "../ColorContainer";

export const NameInput = ({ animate }: { animate: AnimationControls, }) => {
    const { register, formState: { errors, isSubmitting, isSubmitSuccessful } } = useFormContext();
    const error = errors.name?.message?.toString();

    return (
        <>
            <InputContainer error={error} animate={animate}>
                <input disabled={isSubmitSuccessful || isSubmitting} {...register("name")}
                    className={`z-80 bg-transparent p-3 rounded-lg w-full ${isSubmitSuccessful || isSubmitting ? " opacity-45" : ""}`}
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Name" />
            </InputContainer>
        </>
    )
}

export const EmailInput = ({ animate }: { animate: AnimationControls, }) => {
    const { register, formState: { errors, isSubmitSuccessful, isSubmitting } } = useFormContext();
    const error = errors.email?.message?.toString();

    return (
        <>
            <InputContainer error={error} className="origin-top-left" animate={animate}>
                <input {...register("email")}
                    disabled={isSubmitSuccessful || isSubmitting}
                    className={`z-80 bg-transparent p-3 rounded-lg w-full ${isSubmitSuccessful || isSubmitting ? " opacity-45" : ""}`}
                    id="email"
                    name="email"
                    type="text"
                    placeholder="Email" />
            </InputContainer>
        </>
    )
}

export const MessageInput = ({ animate }: { animate: AnimationControls }) => {
    const { register, formState: { errors, isSubmitSuccessful, isSubmitting } } = useFormContext();
    const error = errors.message?.message?.toString();

    const variants = {
        hidden: { height: 0 },
        visible: { height: "auto" }
    }

    const errorColors = {
        center: "bg-destructive/50"
    }

    return (
        <motion.div className="origin-bottom-left" initial={{ opacity: 0 }} animate={animate}>
            <ColorfulContainer colors={error ? errorColors : { center: "bg-yellow-100", left: "bg-pink-500" }} className="z-30 p-[10px]">
                <textarea {...register("message")}
                    disabled={isSubmitSuccessful || isSubmitting}
                    id="message"
                    name="message"
                    className={`resize-none bg-transparent w-full rounded-lg p-3 min-h-[200px] md:min-w-[400px] ${isSubmitSuccessful || isSubmitting ? " opacity-45" : ""}`}
                    placeholder="Message" />
                <motion.p variants={variants} transition={{ duration: 0.5, ease: "easeInOut" }} animate={error ? "visible" : "hidden"} initial={{ height: 0 }} className="pr-3 pl-3 text-secondary-foreground font-normal overflow-hidden">
                    {error}
                </motion.p>
            </ColorfulContainer>
        </motion.div>
    )
}

const InputContainer = ({ children, animate, className, error }: { children: React.ReactNode, animate: AnimationControls, className?: string, error?: string }) => {
    const variants = {
        hidden: { height: 0 },
        visible: { height: "auto" }
    }

    const errorColors = {
        center: "bg-destructive/50"
    }

    return (
        <motion.div className={`origin-bottom-left ${className}`} initial={{ opacity: 0 }} animate={animate}>
            <ColorfulContainer colors={error ? errorColors : { center: "bg-blue-100" }} opacity={50} outerClassName="" className="p-[10px] font-bold">
                {children}
                <motion.p variants={variants} transition={{ duration: 0.5, ease: "easeInOut" }} animate={error ? "visible" : "hidden"} initial={{ height: 0 }} className="pr-3 pl-3 text-secondary-foreground font-normal overflow-hidden">
                    {error}
                </motion.p>
            </ColorfulContainer>
        </motion.div>
    )
}