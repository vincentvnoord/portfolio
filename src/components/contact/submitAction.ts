"use server";

import { validateContactForm } from "./validation";
import { FieldValues } from "react-hook-form";

export async function submitFormAction(data: FieldValues) {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Sending message");
    const res = await validateContactForm(data);
    return res;
}