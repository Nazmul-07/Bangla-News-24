
"use client";

import Link from "next/link";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

type Headline = {
  id: string;
  title: string;
  link: string;
};

type Props = {
  headlines: Headline[];
};

const MarqueeClient = ({ headlines }: Props) => {
  if (!headlines.length) return null;

  return (
    <section
      aria-label="সর্বশেষ সংবাদ"
      className="w-full min-w-0 overflow-hidden border-y border-red-700 bg-red-600 text-white shadow-sm"
    >
      <div className="mx-auto flex w-full max-w-7xl items-stretch">
        {/* Latest News Badge */}
        <div className="relative z-10 flex shrink-0 items-center gap-1.5 bg-red-800 px-2.5 py-2.5 sm:gap-2 sm:px-4 sm:py-3 lg:px-5">
          {/* Live Indicator */}
          <span className="relative flex h-2 w-2 shrink-0 sm:h-2.5 sm:w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-300 opacity-75" />
            <span className="relative inline-flex h-full w-full rounded-full bg-yellow-300" />
          </span>

          <span className="whitespace-nowrap text-[11px] font-bold uppercase tracking-wide sm:text-xs md:text-sm">
            সর্বশেষ
          </span>
        </div>

        {/* Scrolling Headlines */}
        <div className="flex min-h-10 min-w-0 flex-1 items-center overflow-hidden px-2 text-xs sm:min-h-11 sm:px-4 sm:text-sm md:text-base lg:px-5">
          <div className="min-w-0">
            <MarqueeText direction="right" duration={10}>
              {headlines.map((headline, index) => (
                <span
                  key={`${headline.id}-${index}`}
                  className="mx-2 inline-flex items-center gap-2 whitespace-nowrap sm:mx-4 sm:gap-3"
                >
                  <Link
                    href={`/news/${headline.id}`}
                    className="font-medium transition-colors hover:text-yellow-200 focus-visible:outline-2 focus-visible:outline-yellow-300"
                  >
                    {headline.title}
                  </Link>

                  <span aria-hidden="true" className="text-yellow-300">
                    •
                  </span>
                </span>
              ))}
            </MarqueeText>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarqueeClient;
