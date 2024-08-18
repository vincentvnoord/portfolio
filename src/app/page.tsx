import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/ThemeToggler";
import Image from "next/image";
import Link from "next/link";
import { Service } from "@/components/Service";

export default function Home() {
  return (
    <main className="bg-background transition-colors duration-500 ease-in-out w-full flex flex-col items-center p-8 gap-16">
      <header className="w-full max-w-screen-md pt-20">
        <div className="flex w-full items-center gap-5">
          <div className="h-32 w-32 relative rounded-3xl overflow-hidden">
            <Image src="/pfp.jpeg" alt="Vincent van Noord" fill className="object-cover" />
          </div>

          <div className="flex flex-col w-full">
            <h2 className="text-3xl">VINCENT VAN NOORD</h2>
            <p className="pl-1 text-secondary-foreground/50">Full Stack Software Ontwikkelaar</p>
            <div className="flex gap-8 text-xl font-semibold text-secondary-foreground/50 p-3 pl-1">
              <Link href="/">PROJECTEN</Link>
              <Link href="/">BLOG</Link>
              <Link href="/">CONTACT</Link>
            </div>
          </div>

          <div className="justify-self-end">
            <ModeToggle />
          </div>
        </div>
      </header>

      <section className="w-full flex flex-col items-start max-w-screen-md">
        <h1 className="text-3xl font-bold text-primary">Digitale oplossingen die jouw bedrijf laat groeien.</h1>
        <p className="text-secondary-foreground/60">
          Met maatwerk en WordPress-ontwikkelingen creëer ik razendsnelle websites en software die niet alleen
          jouw online aanwezigheid versterken, maar ook de conversie verbeteren en jouw succes vergroten.
        </p>
        <Button className="mt-3 p-6 text-xl font-bold">BEGIN HIER</Button>
      </section>

      <section className="w-full max-w-screen-md grid sm:grid-cols-2 md:grid-cols-3 gap-[1px] p-[1px] origin-center bg-secondary-foreground/30">
        <Service title="Maatwerk" description="Oplossingen op maat, perfect afgemstemd op jouw unieke behoeften" />
        <Service title="WordPress" description="Van eenvoudige blogs tot complexe websites" />
        <Service title="UI" description="Moderne interfaces waar je uren naar kan staren" />
        <Service title="UX" description="Gebruiksvriendelijke ervaringen die je klanten blij maken" />
        <Service title="SEO" description="Ik zorg ervoor dat je gevonden wordt" />
        <Service title="Performance" description="Razendsnelle websites die je conversie verbeteren" />
      </section>

      <section className="w-full max-w-screen-lg flex flex-col">
        <h2 className="text-5xl self-center">Projecten</h2>
        <div className="flex flex-col w-full pt-6">
          <div className="w-full flex gap-4">
            <div className="w-full rounded-3xl overflow-hidden relative">
              <Image src="/projects/luisterkyn/luisterkyn-hero.png" className="object-cover" alt="Luisterkyn" width={800} height={600} />
            </div>
            <div className="w-[45%] p-6 flex flex-col gap-3 h-full self-center items-start">
              <h3 className="text-2xl">Luisterkyn</h3>
              <p className="font-light text-secondary-foreground/50">
                Landing pagina en webshop voor een Luisterkindpraktijk.
              </p>
              <Button className="">Meer Lezen</Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

