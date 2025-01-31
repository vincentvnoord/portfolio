import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/ThemeToggler";
import Image from "next/image";
import Link from "next/link";
import { Service } from "@/components/Service";
import Preview from "@/components/projecten/Preview";
import { CodeIcon, MonitorCheck } from "lucide-react";
import WordPressIcon from "@/components/icons/Wordpress";
import { Header } from "./_components/Header";

export default function Home() {
  return (
    <main className="bg-background transition-colors duration-500 ease-in-out w-full flex flex-col items-center p-8 pt-0 gap-16">
      <Header />

      <section className="w-full gap-3 flex flex-col items-start max-w-screen-md">
        <h1 className="text-5xl leading-[1] font-bold text-primary">Digitale oplossingen die jouw bedrijf doet groeien.</h1>
        <p className="text-secondary-foreground/60">
          Met maatwerk en WordPress-ontwikkelingen creëer ik razendsnelle websites en software die niet alleen
          jouw online aanwezigheid versterken, maar ook de conversie verbeteren en jouw succes vergroten.
        </p>
        <Button className="mt-3 p-6 text-xl font-bold">BEGIN HIER</Button>
      </section>

      <section className="w-full max-w-screen-md grid sm:grid-cols-2 md:grid-cols-3 gap-[1px] p-[1px] origin-center bg-secondary-foreground/30">
        <Service icon={<CodeIcon />} title="Maatwerk" description="Oplossingen op maat, perfect afgemstemd op jouw unieke behoeften" />
        <Service icon={<WordPressIcon />} title="WordPress" description="Van eenvoudige blogs tot complexe websites" />
        <Service icon={<MonitorCheck width={32} height={32} />} title="UI" description="Moderne interfaces die er goed uit zien" />
        <Service icon="/pfp.jpeg" title="UX" description="Gebruiksvriendelijke ervaringen " />
        <Service icon="/pfp.jpeg" title="SEO" description="Ik zorg ervoor dat je gevonden wordt" />
        <Service icon="/pfp.jpeg" title="Performance" description="Razendsnelle websites die je conversie verbeteren" />
      </section>

      <section className="w-full max-w-screen-lg flex flex-col">
        <h2 className="text-5xl self-center">Projecten</h2>
        <div className="flex flex-col w-full pt-6 gap-6">
          <Preview title="Luisterkyn" description="Een webwinkel om digitale diensten te bestellen" image="/projects/luisterkyn/luisterkyn-hero.png" />
          <Preview reverse title="Luisterkyn" description="Een webwinkel om digitale diensten te bestellen" image="/projects/luisterkyn/luisterkyn-hero.png" />
          <Preview title="Luisterkyn" description="Een webwinkel om digitale diensten te bestellen" image="/projects/luisterkyn/luisterkyn-hero.png" />
        </div>
      </section>
    </main>
  );
}

