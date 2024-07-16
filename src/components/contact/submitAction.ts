"use server";

import { validateContactForm } from "./validation";
import { FieldValues } from "react-hook-form";

export async function submitFormAction(fieldValues: FieldValues) {
    console.log("Sending message");
    const res = await validateContactForm(fieldValues);

    if (!res.success) {
        return res;
    }

    try {
        const captchaRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `secret=${process.env.NEXT_PRIVATE_RECAPTCHA_KEY}&response=${fieldValues.captcha}`
        });
        const response = await captchaRes.json();
        console.log(response);
        if (!response.success) {
            return ({ success: false, errors: [{ message: "Error validating captcha", path: ["captcha"] }] });
        }
    } catch (e: any) {
        console.log(e.message);
        return ({ success: false, errors: [{ message: "Error validating captcha", path: ["captcha"] }] });
    }

    const { name, email, message } = res.data;

    const data = {
        sender: { email: process.env.EMAIL_TO, name },
        to: [{ email: process.env.EMAIL_TO, name: "Vincent" }],
        subject: `New message from ${name}`,
        textContent: message,
        htmlContent: `<h1>${email}</h1><p style"max-width:300px">${message}</p>`
    }

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        'api-key': process.env.EMAIL_API_KEY || "",
    }

    try {
        const response = await fetch('https://api.sendinblue.com/v3/smtp/email', {
            method: 'POST',
            headers,
            body: JSON.stringify(data),
        });

        if (response.ok) {
            return ({ success: true });
        } else {
            const errorData = await response.json();
            console.error('Error sending email:', errorData);
            return ({ success: false, errors: [{ message: errorData.message, path: [] }] });
        }
    } catch (error) {
        console.error('Error sending email:', error);
        return ({ success: false, errors: [{ message: error, path: [] }] });
    }
}