import { ArrowRight } from "lucide-react";
import { CardContainer, HomeCard } from "@/components/CardContainer";
import Image from "next/image";
import { Banner } from "@/components/Logo";
import { ProcessBand } from "@/components/ProcessBand";
import { EntryText } from "@/components/entrytext/EntryText";
import { AuroraHero } from "@/components/AuroraHero";
import { Header } from "@/components/header/Header";
import NextLogo from "@/../public/nextjs-icon.png";
import { TechStack } from "@/components/TechStack";

export default function Home() {
  return (
    <main className="bg-background min-h-dvh w-full flex flex-col items-center justify-center gap-8">
      <Header />
      <div className="min-h-dvh w-full flex flex-col items-center justify-center">
        <EntryText />
        <AuroraHero />
      </div>


      <div className="w-full text-center flex flex-col justify-center items-center gap-3 max-w-screen-md pt-48 p-9">
        <p className="text-4xl">Hi I'm Vincent. Nice to meet you.</p>
        <p className="text-xl opacity-80">
          I started my programming journey in 2018, initially in game development.
          This was fun, but not fulfilling.
          I then focused on solving problems through mainly web development.
        </p>
      </div>

      <TechStack />

    </main>
  );
}