import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import {Image} from '@shopify/hydrogen';

type HeroBannerProps = {
  banners: any[];
  desktopImage?: string;
  mobileImage?: string;
};
export function HeroBanner({
  banners,
}: HeroBannerProps) {
  const [slide, setSlide] = useState(2);

  const [i, setI] = useState(0);
   const n = banners.length;
   const go = (d: number) => setI((p) => (p + d + n) % n);

  return (
    <>
       
        <div className="relative aspect-[3/4] w-full sm:aspect-[16/9] md:aspect-[21/7] ">
        {banners.map((s, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-700 ${
              idx === i ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            aria-hidden={idx !== i}
          >
            <picture>
            <source media="(min-width: 768px)" srcSet={s?.desktopImage?.reference?.image?.url} />
            <Image
              data={s?.mobileImage?.reference?.image}
              sizes="100vw"
              alt={s?.mobileImage?.reference?.image?.altText ?? ''}
              className={'h-full w-full object-cover'}
              loading={idx === 0 ? 'eager' : 'lazy'}
          />
            </picture>

            {(s.title || s.description || s.cta) && (
              <div
                className={`absolute inset-0 flex items-center px-6 sm:px-10 lg:px-20 ${
                  s.align === "right" ? "justify-end text-right" : "justify-start text-left"
                }`}
              >
                <div
                  className={`max-w-md ${
                    s.theme === "light" ? "text-white" : "text-foreground"
                  }`}
                >
                  {s.title && (
                    <h2 className="font-serif text-2xl leading-tight sm:text-3xl md:text-4xl lg:text-5xl">
                      {s.title}
                    </h2>
                  )}
                  {s.description && (
                    <p className="mt-3 text-sm sm:text-base md:text-lg">{s.description}</p>
                  )}
                  {s.cta && (
                    <a
                      href={s.cta.href}
                      className="mt-5 inline-flex items-center rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-wider text-foreground shadow-md transition-transform hover:scale-105 sm:text-sm"
                    >
                      {s.cta.label}
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}

        <button
          onClick={() => go(-1)}
          aria-label="Anterior"
          className="absolute left-3 top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/70 text-foreground backdrop-blur transition hover:bg-white sm:left-5 sm:h-10 sm:w-10"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => go(1)}
          aria-label="Siguiente"
          className="absolute right-3 top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/70 text-foreground backdrop-blur transition hover:bg-white sm:right-5 sm:h-10 sm:w-10"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {banners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Ir al slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all ${
                idx === i ? "w-6 bg-black" : "w-2 bg-black/40"
              }`}
            />
          ))}
        </div>
        </div>

    </>
  );
}