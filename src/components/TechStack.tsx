import Image, { StaticImageData } from "next/image";
import NextLogo from "@/../public/nextjs-icon.png";
import ReactLogo from "@/../public/react.svg";

const technologies = [
    { name: "Next.js", logo: NextLogo },
    { name: "React", logo: ReactLogo },
    { name: "TailwindCSS", logo: "https://upload.wikimedia.org/wikipedia/commons/4/46/Logo-React.svg" },
    { name: "TypeScript", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" },

]

export const TechStack = () => {
    return (
        <div className="w-full text-center flex flex-col justify-center items-center gap-7 max-w-screen-md p-9">
            <p className="text-4xl">My beloved technologies</p>
            <div className="flex gap-6 items-center">
                {technologies.map((tech, index) => (
                    <TechCard key={index} name={tech.name} logo={tech.logo} />
                ))}
            </div>
        </div>
    )
}

const TechCard = ({ name, logo }: { name: string, logo: string | StaticImageData }) => {
    return (
        <div className="flex flex-col items-between justify-between">
            <Image className="" src={logo} alt={name + " logo"} width={80} height={80} />
            <p>{name}</p>
        </div>
    )
}