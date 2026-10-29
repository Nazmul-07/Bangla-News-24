
import Image from "next/image";
import Link from "next/link";

type News = {
  id: string | number;
  title: string;
  imageUrl?: string;
  imageAlt?: string;
  category?: string;
  description?: string;
};

type NewsCardProps = {
  news: News;
};

const NewsCard = ({ news }: NewsCardProps) => {
  return (
    <Link
      href={`/news/${news.id}`}
      aria-label={news.title}
      className="
        group block h-full min-w-0 rounded-xl
        focus-visible:outline-2
        focus-visible:outline-offset-2
        focus-visible:outline-red-500
      "
    >
      <article
        className="
          flex h-full min-w-0 flex-col overflow-hidden
          rounded-xl border border-gray-200 bg-white
          shadow-sm transition-all duration-300
          group-hover:-translate-y-1 group-hover:shadow-lg
        "
      >
        {/* News Image */}
        <div className="relative aspect-16/10 w-full shrink-0 overflow-hidden bg-gray-100">
          {news.imageUrl ? (
            <Image
              src={news.imageUrl}
              fill
              sizes="
                (max-width: 639px) 100vw,
                (max-width: 1023px) 50vw,
                (max-width: 1279px) 33vw,
                400px
              "
              alt={news.imageAlt || news.title}
              className="
                object-cover transition-transform duration-500
                group-hover:scale-105
              "
            />
          ) : (
            <div className="flex h-full items-center justify-center px-3 text-center text-xs text-gray-400 sm:text-sm">
              ছবি পাওয়া যায়নি
            </div>
          )}
        </div>

        {/* News Content */}
        <div className="flex min-w-0 flex-1 flex-col p-3 sm:p-4 lg:p-5">
          {/* Category */}
          <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-red-600 sm:text-xs">
            {news.category || "সর্বশেষ সংবাদ"}
          </p>

          {/* Title */}
          <h2
            className="
              wrap-break-word text-base font-bold leading-snug
              text-gray-900 transition-colors
              group-hover:text-red-600
              sm:text-lg sm:leading-relaxed
            "
          >
            {news.title}
          </h2>

          {/* Description */}
          {news.description && (
            <p className="mt-2 line-clamp-3 wrap-break-word text-xs leading-6 text-gray-600 sm:text-sm sm:leading-6">
              {news.description}
            </p>
          )}
        </div>
      </article>
    </Link>
  );
};

export default NewsCard;
