import { Header } from "@/components/ui/header-3";
import { Hero } from "@/components/hero/Hero";
import { ComingSoon } from "@/components/sections/ComingSoon";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="bg-paper text-ink">
        <Hero />
        <ComingSoon id="oferta" />
      </main>
    </>
  );
}
