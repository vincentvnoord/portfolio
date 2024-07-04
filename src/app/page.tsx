import { ArrowRight } from "lucide-react";
import { CardContainer, HomeCard } from "@/components/CardContainer";
import Image from "next/image";
import { Banner } from "@/components/Logo";
import { ProcessBand } from "@/components/ProcessBand";
import { IntroText } from "@/components/Intro";

export default function Home() {
  return (
    <main className="bg-black min-h-dvh w-full flex flex-col items-center justify-center text-white gap-8">
      <IntroText />
    </main>
  );
}