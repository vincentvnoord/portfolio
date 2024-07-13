"use client";

import { SendIcon } from "lucide-react";
import { Button } from "../ui/button";
import React, { SetStateAction } from "react";
import { MotionValue, motion, useTransform } from "framer-motion";
import { entryAnimations } from "./animations";
import { ContactFormSchema, TContactForm } from "./validation";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmailInput, MessageInput, NameInput } from "./Inputs";
import { submitFormAction } from "./submitAction";

const ContactForm = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
    const { titleAnimation, nameAnimation, emailAnimation, sendButtonAnimation } = entryAnimations(scrollYProgress);
    const formMethods = useForm<TContactForm>({
        resolver: zodResolver(ContactFormSchema),
    });
    const { setError } = formMethods;

    const pointerEvents = useTransform(scrollYProgress, (pos) => {
        if (pos < 0.9) return "none";
        return "all";
    });

    const handleSend = async (data: FieldValues) => {
        console.log("Sending message");
        const res = await submitFormAction(data);

        if (res.success) {
            console.log("Success");
        } else {
            res.errors.forEach((err) => {
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
                            <motion.div animate={sendButtonAnimation} initial={{ y: "100%", opacity: 0 }} className="w-full flex">
                                <div className="h-full w-full"></div>
                                <Button className="self-end bg-green-300"><SendIcon size={30} /></Button>
                            </motion.div>
                        </div>
                    </div>

                </form>
            </FormProvider>
        </motion.div>
    )
}


export default ContactForm;
