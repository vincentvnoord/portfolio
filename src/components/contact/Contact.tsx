"use client";

import { SendIcon } from "lucide-react";
import { ColorfulContainer } from "../ColorContainer";
import { Button } from "../ui/button";
import React, { FormEvent, SetStateAction, useState } from "react";
import { AnimationControls, MotionValue, motion, useAnimation, useMotionValueEvent, useTransform } from "framer-motion";
import { entryAnimations } from "./animations";
import { validateContactForm } from "./validation";
import { ZodIssue } from "zod";

const clearErrors = (errors: React.Dispatch<SetStateAction<string | null>>[]) => {
    for (const error of errors) {
        error(null);
    }
}

const ContactForm = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
    const { titleAnimation, nameAnimation, emailAnimation, sendButtonAnimation } = entryAnimations(scrollYProgress);
    const [nameError, setNameError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [messageError, setMessageError] = useState<string | null>(null);

    const pointerEvents = useTransform(scrollYProgress, (pos) => {
        if (pos < 0.9) return "none";
        return "all";
    });

    const handleSend = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Sending message");
        const formData = new FormData(e.currentTarget);
        const res = await validateContactForm(formData);
        if (res.success) {
            console.log("Message sent");
            clearErrors([setNameError, setEmailError, setMessageError]);
        } else {
            clearErrors([setNameError, setEmailError, setMessageError]);

            for (const error of res.errors) {
                if (error.path[0] === "name") {
                    setNameError(error.message);
                } else if (error.path[0] === "email") {
                    setEmailError(error.message);
                } else if (error.path[0] === "message") {
                    setMessageError(error.message);
                }
            }
        }
    }

    return (
        <motion.div style={{ pointerEvents }} className="z-30 flex flex-col gap-3 items-center">
            <motion.h1 animate={titleAnimation} initial={{ opacity: 0 }} className="font-bold text-5xl">CONTACT ME</motion.h1>
            <form onSubmit={handleSend} className="flex flex-col gap-3 justify-center w-full">
                <div className="flex flex-col md:flex-row gap-3 w-full">
                    <div className="flex flex-col gap-2 w-full">
                        <InputContainer error={nameError ? nameError : undefined} animate={nameAnimation}>
                            <input className="z-80 bg-transparent p-3 rounded-lg w-full" id="name" name="name" type="text" placeholder="Name" />
                        </InputContainer>

                        <InputContainer error={emailError ? emailError : undefined} className="origin-top-left" animate={emailAnimation}>
                            <input className="p-3 bg-transparent rounded-lg w-full" id="email" name="email" type="text" placeholder="Email" />
                        </InputContainer>
                    </div>


                    <div className="flex flex-col gap-3 w-full justify-between">
                        <MessageContainer animate={emailAnimation} error={messageError ? messageError : undefined} />
                        <motion.div animate={sendButtonAnimation} initial={{ y: "100%", opacity: 0 }} className="w-full flex">
                            <div className="h-full w-full"></div>
                            <Button className="self-end bg-green-300"><SendIcon size={30} /></Button>
                        </motion.div>
                    </div>
                </div>

            </form>
        </motion.div>
    )
}

const MessageContainer = ({ animate, error }: { animate: AnimationControls, error?: string }) => {
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
                <textarea id="message" name="message" className="resize-none bg-transparent w-full rounded-lg p-3 min-h-[200px] md:min-w-[400px]" placeholder="Message"></textarea>
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

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("Changed");
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

export default ContactForm;