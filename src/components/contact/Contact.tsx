"use client";

import { CheckIcon, LoaderCircle, SendIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import React, { SetStateAction, useEffect, useState } from "react";
import { AnimationControls, MotionValue, motion, useTransform } from "framer-motion";
import { useEntryAnimations } from "./animations";
import { ContactFormSchema, TContactForm } from "./validation";
import { FieldValues, FormProvider, useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmailInput, MessageInput, NameInput } from "./Inputs";
import { submitFormAction } from "./submitAction";
import Captcha from "react-google-recaptcha";
import { useTheme } from "next-themes";


type SubmissionResult = "error" | "success" | null;
const public_captcha_key = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

const ContactForm = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
    const formMethods = useForm<TContactForm>({
        resolver: zodResolver(ContactFormSchema),
        mode: "onBlur"
    });
    const { setError } = formMethods;
    const [submissionResult, setSubmissionResult] = useState<SubmissionResult>(null);

    const { titleAnimation, nameAnimation, emailAnimation, sendButtonAnimation } = useEntryAnimations(scrollYProgress);
    const pointerEvents = useTransform(scrollYProgress, (pos) => {
        if (pos < 0.9) return "none";
        return "all";
    });
    const opacity = useTransform(scrollYProgress, [0.9, 0.92], [0, 1]);

    const handleSend = async (data: FieldValues) => {
        const res = await submitFormAction(data);

        if (res.success) {
            console.log("Success");
            setSubmissionResult("success");
            //formMethods.reset();
        } else {
            setSubmissionResult("error");
            res.errors?.forEach((err) => {
                setError(err.path[0] as keyof TContactForm, { message: err.message });
            });
        }
    }

    return (
        <motion.div style={{ pointerEvents }} className="z-30 flex flex-col gap-3 items-center">
            <motion.h1 animate={titleAnimation} initial={{ opacity: 0 }} className="font-bold text-5xl">CONTACT ME</motion.h1>
            <FormProvider {...formMethods}>
                <form onSubmit={formMethods.handleSubmit(handleSend)} className="flex flex-col gap-3 justify-center w-full">
                    <div className="flex flex-col md:flex-row gap-3 w-full">
                        <div className="flex flex-col gap-2 w-full">
                            <NameInput animate={nameAnimation} />
                            <EmailInput animate={emailAnimation} />
                            <ReCaptcha animate={sendButtonAnimation} className="hidden md:flex" />
                        </div>

                        <div className="flex flex-col gap-3 w-full justify-center items-center">
                            <MessageInput animate={emailAnimation} />
                            <ReCaptcha animate={sendButtonAnimation} className="md:hidden justify-center items-center" />
                            <motion.div animate={sendButtonAnimation} initial={{ y: "100%", opacity: 0 }} className="w-full flex">
                                <SubmissionMessage submissionResult={submissionResult} />
                                <SubmitButton submissionResult={submissionResult} setSubmissionResult={setSubmissionResult} />
                            </motion.div>
                        </div>
                    </div>

                </form>
            </FormProvider>
        </motion.div>
    )
}

const ReCaptcha = ({ className, animate }: { className?: string, animate: AnimationControls }) => {
    const { theme } = useTheme();
    const { setValue, formState: { errors } } = useFormContext();
    const error = errors.captcha?.message?.toString();
    const themeColor = theme === "dark" ? "dark" : "light";

    const variants = {
        hidden: { height: 0 },
        visible: { height: "auto" }
    }

    const errorColors = {
        center: "bg-destructive/50"
    }

    const onChange = (value: string | null) => {
        setValue("captcha", value);
    }

    useEffect(() => { }, [theme]);

    return (
        <motion.div animate={animate} initial={{ y: "100%", opacity: 0 }} className={`w-full flex flex-col justify-center ${className}`}>
            <Captcha sitekey={public_captcha_key!} onChange={onChange} theme={themeColor} />
            <motion.p variants={variants} transition={{ duration: 0.5, ease: "easeInOut" }} animate={error ? "visible" : "hidden"} initial={{ height: 0 }} className="pr-3 pl-3 text-secondary-foreground font-normal overflow-hidden">
                {error}
            </motion.p>
        </motion.div>
    )
}

const SubmissionMessage = ({ submissionResult }: { submissionResult: SubmissionResult, }) => {
    const hidden = {
        opacity: 0,
        x: "100%"
    }

    return (
        <motion.div initial={hidden} animate={submissionResult ? { opacity: 1, x: 0 } : hidden} className="h-full pointer-events-none w-full text-sm md:text-base flex justify-end items-center pr-3">
            {submissionResult === "error" ? "Something went wrong." : null}
            {submissionResult === "success" ? "Message has been sent. Thank you!" : null}
        </motion.div>
    )
}

const SubmitButton = ({ submissionResult, setSubmissionResult }: { submissionResult: SubmissionResult, setSubmissionResult: React.Dispatch<SetStateAction<SubmissionResult>> }) => {
    const { formState: { isSubmitting, isSubmitSuccessful } } = useFormContext();
    let backgroundColor = isSubmitting ? "bg-primary" : "bg-green-300";
    if (isSubmitSuccessful) {
        backgroundColor = "bg-green-300";
    }

    if (submissionResult === "error") {
        backgroundColor = "bg-destructive";
    }

    const variants = {
        hidden: { scale: 0, rotate: 360 },
        visible: { scale: 1, rotate: 0 },
    }

    useEffect(() => {
        if (submissionResult === "error") {
            setTimeout(() => {
                setSubmissionResult(null);
            }, 5000);
        }

    }, [submissionResult]);

    return (
        <Button disabled={isSubmitting || submissionResult === "success"} className={`self-end transition-colors duration-200 ease-in ${backgroundColor}`}>
            <motion.div initial={!submissionResult ? "visible" : "hidden"} animate={isSubmitting || submissionResult ? "hidden" : "visible"} variants={variants}>
                <SendIcon size={30} />
            </motion.div>

            <motion.div className="absolute" animate={isSubmitting && !submissionResult ? "visible" : "hidden"} initial="hidden" variants={variants}>
                <LoaderCircle className="animate-spin" size={30} />
            </motion.div>

            <motion.div className="absolute" animate={submissionResult === "success" ? "visible" : "hidden"} initial="hidden" variants={variants}>
                <CheckIcon size={30} />
            </motion.div>

            <motion.div className="absolute" animate={submissionResult === "error" ? "visible" : "hidden"} initial="hidden" variants={variants}>
                <XIcon size={30} />
            </motion.div>
        </Button >
    )
}

export default ContactForm;
