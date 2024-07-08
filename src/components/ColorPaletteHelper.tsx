"use client";

import { colors } from "../../tailwind.config"

export const ColorPaletteHelper = () => {
    const allColors = Object.keys(colors);
    return (
        <div className="flex absolute">
            {allColors.map((color) => (<Color key={color} color={color} />))}
        </div>
    )
}

const Color = ({ color }: { color: string }) => {
    const bgCol = "bg-" + color;

    return (
        <div className="w-32 h-32 flex bg-background flex-col">
            <div className={`w-32 h-32 z-20 ${bgCol}`}></div>
            <p className="text-light">{color}</p>
        </div>
    )
}