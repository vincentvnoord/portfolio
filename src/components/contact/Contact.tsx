"use client";

import { CheckIcon, LoaderCircle, SendIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import React, { SetStateAction, useEffect, useState } from "react";
import { MotionValue, motion, useTransform } from "framer-motion";
import { useEntryAnimations } from "./animations";
import { ContactFormSchema, TContactForm } from "./validation";
import { FieldValues, FormProvider, useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmailInput, MessageInput, NameInput } from "./Inputs";
import { submitFormAction } from "./submitAction";

type SubmissionResult = "error" | "success" | null;

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

    const handleSend = async (data: FieldValues) => {
        console.log("Sending message");
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
                        </div>


                        <div className="flex flex-col gap-3 w-full justify-between">
                            <MessageInput animate={emailAnimation} />
                            <motion.div animate={sendButtonAnimation} initial={{ y: "100%", opacity: 0 }} className="w-full flex items-center">
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
