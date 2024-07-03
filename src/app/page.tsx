import { ArrowRight } from "lucide-react";
import { CardContainer, HomeCard } from "@/components/CardContainer";
import Image from "next/image";
import { Banner } from "@/components/Logo";
import { ProcessBand } from "@/components/ProcessBand";

export default function Home() {
  return (
    <main className="bg-black min-h-dvh w-full flex flex-col items-center justify-center text-black gap-8">
      <Banner />

      <ProcessBand />

      <CardContainer />
    </main>
  );
}