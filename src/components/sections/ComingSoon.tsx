import { dictionary } from "@/lib/i18n";

type ComingSoonProps = {
  id?: string;
};

export function ComingSoon({ id = "oferta" }: ComingSoonProps) {
  return (
    <section
      id={id}
      className="relative min-h-screen flex items-center justify-center bg-paper text-ink"
    >
      <div className="absolute top-0 inset-x-0 h-px bg-ink/10" />

      <div className="text-center px-6">
        <div className="flex items-center justify-center gap-4 text-xs tracking-[0.3em] uppercase text-ink/60">
          <span>02</span>
          <span aria-hidden className="text-cobalt">·</span>
          <span>{dictionary.pl.nav.properties}</span>
          <span aria-hidden className="text-ink/30">/</span>
          <span>{dictionary.en.nav.properties}</span>
        </div>

        <h2 className="mt-8 font-medium tracking-tight text-4xl sm:text-6xl">
          <span className="text-ink">{dictionary.pl.soon}</span>
          <span aria-hidden className="mx-4 text-ink/20">·</span>
          <span className="text-ink/60">{dictionary.en.soon}</span>
        </h2>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-px bg-ink/10" />
    </section>
  );
}
