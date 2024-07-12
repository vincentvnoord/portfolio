import { EntryText } from "@/components/entrytext/EntryText";
import { HeroBackground } from "@/components/HeroBackground";
import { Header } from "@/components/header/Header";
import { TechStack } from "@/components/TechStack/TechStack";
import { ColorfulContainer } from "@/components/ColorContainer";
import { Introduction } from "@/components/Introduction";
import Hero from "@/components/Hero";
import { BasicReveal } from "@/components/BasicReveal";
import ContentScroller from "@/components/ContentScroller";

export default function Home() {
  return (
    <main className="bg-background transition-colors duration-500 ease-in-out min-h-dvh w-full flex flex-col items-center justify-center gap-8">
      <Header />
      <Hero />
      <ContentScroller />

    </main>
  );
}
