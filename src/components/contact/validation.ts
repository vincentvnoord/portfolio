
import { z } from "zod";
export const ContactFormSchema = z.object({
    name: z.string().min(2, { message: "Name is too short." }).max(50, { message: "Name is too long." }),
    email: z.string().email({ message: "Invalid email address." }),
    message: z.string().min(10, "Message needs atleast 10 characters.").max(500, { message: "Message is too long." }),
});


type ValidationResult<T> = {
    success: true;
    data: T;
} | {
    success: false;
    errors: z.ZodIssue[];
};

export const validateContactForm = async (formData: FormData): Promise<ValidationResult<{ name: string, email: string, message: string }>> => {
    const rawFormData = Object.fromEntries(formData.entries());
    console.log(formData);
    const res = ContactFormSchema.safeParse(rawFormData);

    if (!res.success) {
        return { success: false, errors: res.error.errors };
    }

    return { success: true, data: res.data };
}