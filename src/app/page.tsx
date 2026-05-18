import { Hero } from "@/components/hero/Hero";
import { ComingSoon } from "@/components/sections/ComingSoon";

export default function HomePage() {
  return (
    <main className="bg-paper text-ink">
      <Hero />
      <ComingSoon id="oferta" />
    </main>
  );
}
