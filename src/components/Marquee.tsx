
import MarqueeClient from "./MarqueeClient";

type Headline = {
  id: string;
  title: string;
  link: string;
};

type NewsResponse = {
  data: Headline[];
};

const Marquee = async () => {
  try {
    const res = await fetch(
      "https://news-api-v2.vercel.app/api/news?limit=10",
      {
        next: { revalidate: 300 },
      }
    );

    if (!res.ok) {
      console.error("News API error:", res.status);

      return (
        <p
          role="status"
          className="w-full rounded-md bg-gray-50 px-3 py-2 text-center text-xs text-gray-500 sm:text-sm"
        >
          খবর লোড করা যাচ্ছে না।
        </p>
      );
    }

    const result: NewsResponse = await res.json();

    if (!Array.isArray(result.data)) {
      console.error("Invalid news API response:", result);

      return (
        <p
          role="status"
          className="w-full rounded-md bg-gray-50 px-3 py-2 text-center text-xs text-gray-500 sm:text-sm"
        >
          খবর লোড করা যাচ্ছে না।
        </p>
      );
    }

    return (
      <section
        aria-label="সর্বশেষ খবর"
        className="w-full min-w-0 overflow-hidden"
      >
        <MarqueeClient headlines={result.data} />
      </section>
    );
  } catch (error) {
    console.error("Failed to fetch headlines:", error);

    return (
      <p
        role="status"
        className="w-full rounded-md bg-gray-50 px-3 py-2 text-center text-xs text-gray-500 sm:text-sm"
      >
        খবর লোড করা যাচ্ছে না।
      </p>
    );
  }
};

export default Marquee;
