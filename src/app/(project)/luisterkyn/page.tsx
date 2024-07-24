import { ChevronLeft, CircleIcon, Link2Icon } from "lucide-react";
import Link from "next/link";

export default function Luisterkyn() {
    return (
        <div className="w-full">
            <div className="flex items-center justify-start w-full pb-9">
                <h1 className="flex text-5xl font-extrabold items-center gap-3 justify-center justify-self-center">Luisterkyn <Link2Icon size={60} /></h1>
            </div>
            <div className="flex flex-col gap-3">
                <Section header="The Goal">
                    The &quot;Luisterkind Methode&quot; is a dutch method for communicating with someone&apos;s inner child, this is why the website is also in Dutch.
                    I made this project for a client who wanted to have a website for her Luisterkind practice.
                    The site serves two main purposes: allowing people to find her practice and enabling them to order a reading directly from the website.
                </Section>
                <Section header="Complexities">
                    Because the website would allow people to order a reading, I had to think about alot of different things like:
                    <ul className="p-2">
                        <ListItem>How to handle SEO combined with interactivity</ListItem>
                        <ListItem>How to handle payments</ListItem>
                        <ListItem>How the owner sees the orders</ListItem>
                        <ListItem>How the owner can respond to orders</ListItem>
                    </ul>

                    I was already familiar with the elements of the web like <HighLightText href="https://nl.wikipedia.org/wiki/HyperText_Markup_Language">HTML</HighLightText>, <HighLightText>CSS</HighLightText>, <HighLightText>JavaScript</HighLightText> and <HighLightText>React</HighLightText>.
                    But the problem with basic JavaScript and React is that it is bad for SEO.
                    For this reason I had to learn about <HighLightText>Server Side Rendering</HighLightText>, and in turn choose a framework. I chose <HighLightText>Next.js</HighLightText>.
                </Section>

                <Section header="My Process">

                </Section>
            </div>
        </div>
    )
}

const HighLightText = ({ children, href }: { children: React.ReactNode, href?: string }) => {
    return (
        <Link href={href ? href : ""}>
            <span className="text-primary">{children}</span>
        </Link>
    )

}

const ListItem = ({ children }: { children: React.ReactNode }) => {
    return (
        <li className="flex gap-3 items-center font-semibold"><div className="w-2 h-2 rounded-full bg-card-foreground"></div>{children}</li>
    )
}

const Section = ({ children, header }: { children?: React.ReactNode, header?: string }) => {
    return (
        <div className="flex flex-col">
            <SectionHeader>{header}</SectionHeader>
            <SectionContent>
                {children}
            </SectionContent>
        </div>
    )
}

type TextProps = {
    children: React.ReactNode,
    className?: string
}

const SectionContent = ({ children, className }: TextProps) => {
    return (
        <div className={className}>{children}</div>
    )
}

const SectionHeader = ({ children, className }: TextProps) => {
    return (
        <h2 className={`text-2xl font-bold text-primary ${className}`}>{children}</h2>
    )
}