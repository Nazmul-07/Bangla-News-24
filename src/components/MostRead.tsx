import Link from "next/link";

type NewsItem = {
  id: string | number;
  title: string;
  url?: string;
  link?: string;
};

const MostRead = async () => {
  try {
    const res = await fetch(
      "https://news-api-v2.vercel.app/api/news/most-read",
      {
        next: { revalidate: 300 },
      },
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch most-read news: ${res.status}`);
    }

    const result: { data?: NewsItem[] } = await res.json();
    const mostRead = Array.isArray(result.data) ? result.data : [];

    if (mostRead.length === 0) {
      return (
        <p className="rounded-lg bg-gray-50 px-3 py-4 text-center text-sm text-gray-500 sm:px-4">
          জনপ্রিয় সংবাদ পাওয়া যায়নি।
        </p>
      );
    }

    return (
      <section aria-label="সর্বাধিক পঠিত সংবাদ" className="w-full min-w-0">
        <div className="divide-y divide-gray-200">
          {mostRead.map((news, index) => (
            <article
              key={news.id}
              className="
                group flex min-w-0 items-start gap-3
                py-3 first:pt-0 last:pb-0
                sm:gap-4 sm:py-4
              "
            >
              {/* Ranking Number */}
              <span
                aria-label={`ক্রমিক ${index + 1}`}
                className="
                  w-7 shrink-0 pt-0.5
                  text-xl font-extrabold leading-tight
                  tabular-nums text-red-600/80
                  transition-colors group-hover:text-red-700
                  sm:w-8 sm:text-2xl
                "
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* News Title */}
              <div className="min-w-0 flex-1">
                <h3
                  className="
                    wrap-break-word text-sm font-semibold leading-6
                    text-gray-800 transition-colors
                    group-hover:text-red-600
                    sm:text-base sm:leading-7
                  "
                >
                  <Link
                    href={`/news/${encodeURIComponent(String(news.id))}`}
                    className="
                      focus-visible:outline-2
                      focus-visible:outline-red-500
                      focus-visible:outline-offset-2
                    "
                  >
                    {news.title}
                  </Link>
                </h3>
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  } catch (error) {
    console.error("MostRead error:", error);

    return (
      <p
        role="status"
        className="rounded-lg bg-gray-50 px-3 py-4 text-center text-sm text-gray-500 sm:px-4"
      >
        জনপ্রিয় সংবাদ লোড করা যাচ্ছে না।
      </p>
    );
  }
};

export default MostRead;
