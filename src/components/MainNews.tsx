import Image from "next/image";
import Link from "next/link";

type NewsItem = {
  id: string | number;
  title: string;
  imageUrl?: string;
  imageAlt?: string;
  category?: string;
  description?: string;
};

type MainNewsProps = {
  news: NewsItem[];
};

const MainNews = ({ news }: MainNewsProps) => {
  const [firstNews, ...otherNews] = news ?? [];

  if (!firstNews) {
    return (
      <p className="rounded-lg bg-gray-50 px-4 py-8 text-center text-sm text-gray-500 sm:text-base">
        কোনো সংবাদ পাওয়া যায়নি।
      </p>
    );
  }

  return (
    <section
      aria-label="প্রধান সংবাদ"
      className="grid min-w-0 grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:gap-5"
    >
      {/* Featured News */}
      <Link
        href={`/news/${firstNews.id}`}
        aria-label={firstNews.title}
        className="
          group block h-full min-w-0 rounded-xl
          focus-visible:outline-2
          focus-visible:outline-offset-2
          focus-visible:outline-red-500
        "
      >
        <article className="flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
          {/* Featured Image */}
          <div className="relative aspect-16/10 w-full overflow-hidden bg-gray-100">
            {firstNews.imageUrl ? (
              <Image
                src={firstNews.imageUrl}
                fill
                priority
                sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 640px"
                alt={firstNews.imageAlt || firstNews.title}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-gray-400">
                ছবি পাওয়া যায়নি
              </div>
            )}
          </div>

          {/* Featured Content */}
          <div className="flex-1 p-3 sm:p-4 lg:p-5">
            <p className="mb-2 text-xs font-semibold text-red-600 sm:text-sm">
              {firstNews.category || "সর্বশেষ সংবাদ"}
            </p>

            <h2 className="mb-3 wrap-break-word text-lg font-bold leading-snug text-gray-900 transition-colors group-hover:text-red-600 sm:text-xl lg:text-2xl">
              {firstNews.title}
            </h2>

            {firstNews.description && (
              <p className="line-clamp-3 wrap-break-word text-sm leading-6 text-gray-600 sm:leading-7">
                {firstNews.description}
              </p>
            )}
          </div>
        </article>
      </Link>

      {/* Other News */}
      {/* Other News */}
      <div className="flex min-w-0 flex-col gap-3 sm:gap-4">
        {otherNews.slice(0, 4).map((item) => (
          <Link
            key={item.id}
            href={`/news/${item.id}`}
            aria-label={item.title}
            className="
        group block min-w-0 rounded-lg
        focus-visible:outline-2
        focus-visible:outline-offset-2
        focus-visible:outline-red-500
      "
          >
            <article className="flex min-w-0 gap-3 sm:gap-4">
              {/* Thumbnail */}
              <div className="relative aspect-4/3 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-100 sm:w-28 lg:w-32">
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    fill
                    sizes="(max-width: 639px) 96px, 128px"
                    alt={item.imageAlt || item.title}
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center px-1 text-center text-[10px] text-gray-400">
                    ছবি নেই
                  </div>
                )}
              </div>

              {/* News Content */}
              <div className="min-w-0 flex-1">
                <p className="mb-1 text-[11px] font-semibold text-red-600 sm:text-xs">
                  {item.category || "সংবাদ"}
                </p>

                <h3 className="line-clamp-3 wrap-break-word text-sm font-bold leading-5 text-gray-800 transition-colors group-hover:text-red-600 sm:text-base sm:leading-6">
                  {item.title}
                </h3>

                {item.description && (
                  <p className="mt-1 line-clamp-2 wrap-break-word text-xs leading-5 text-gray-500 sm:text-sm">
                    {item.description}
                  </p>
                )}
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default MainNews;
