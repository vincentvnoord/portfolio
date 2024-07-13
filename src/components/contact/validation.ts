import { FieldValues } from "react-hook-form";
import { z } from "zod";

export const ContactFormSchema = z.object({
    name: z.string().min(1, { message: "Name is required." }).min(2, { message: "Name is too short." }).max(50, { message: "Name is too long." }),
    email: z.string().min(1, { message: "Email is required." }).email({ message: "Invalid email address." }),
    message: z.string().min(10, "Message needs atleast 10 characters.").max(500, { message: "Message is too long." }),
});

export type TContactForm = z.infer<typeof ContactFormSchema>;

type ValidationResult<T> = {
    success: true;
    data: T;
} | {
    success: false;
    errors: z.ZodIssue[];
};

export const validateContactForm = async (formData: FieldValues): Promise<ValidationResult<{ name: string, email: string, message: string }>> => {
    console.log(formData);
    const res = ContactFormSchema.safeParse(formData);

    if (!res.success) {
        return { success: false, errors: res.error.errors };
    }

    return { success: true, data: res.data };
}