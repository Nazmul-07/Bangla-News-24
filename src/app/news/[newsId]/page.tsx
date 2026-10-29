
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

type NewsArticle = {
  title: string;
  imageUrl?: string;
  text?: string;
  category?: string;
};

type NewsApiResponse = {
  data?: NewsArticle;
};

type NewsDetailsProps = {
  params: Promise<{ newsId: string }>;
};

// Page component: params এখানে await করবে না
export default function NewsDetailsPage({
  params,
}: NewsDetailsProps) {
  return (
    <Suspense fallback={<NewsDetailsLoading />}>
      <NewsDetailsContent params={params} />
    </Suspense>
  );
}

// Loading UI
function NewsDetailsLoading() {
  return (
    <main className="mx-auto w-full max-w-4xl px-3 py-6 sm:px-6 sm:py-8">
      <div className="animate-pulse">
        <div className="mb-4 h-4 w-24 rounded bg-gray-200" />
        <div className="mb-6 h-8 w-full max-w-2xl rounded bg-gray-200" />
        <div className="aspect-16/10 w-full rounded-xl bg-gray-200" />
        <div className="mt-6 h-4 w-full rounded bg-gray-200" />
        <div className="mt-3 h-4 w-5/6 rounded bg-gray-200" />
        <div className="mt-3 h-4 w-4/6 rounded bg-gray-200" />
      </div>
    </main>
  );
}

// Dynamic content: params ও API fetch এখানে
async function NewsDetailsContent({
  params,
}: NewsDetailsProps) {
  const { newsId } = await params;

  let news: NewsArticle | null = null;

  try {
    const res = await fetch(
      `https://news-api-v2.vercel.app/api/article/${encodeURIComponent(newsId)}`,
      {
        next: { revalidate: 300 },
      },
    );

    if (res.ok) {
      const result: NewsApiResponse = await res.json();
      news = result.data ?? null;
    }
  } catch (error) {
    console.error("News details fetch error:", error);
  }

  if (!news) {
    return (
      <main className="mx-auto w-full max-w-4xl px-4 py-12 text-center sm:px-6">
        <h1 className="text-2xl font-bold text-gray-900">
          সংবাদটি পাওয়া যায়নি
        </h1>

        <p className="mt-3 text-gray-600">
          সংবাদ লোড করা যাচ্ছে না। অনুগ্রহ করে পরে আবার চেষ্টা করুন।
        </p>

        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-red-600 px-5 py-2.5 font-semibold text-white transition hover:bg-red-700"
        >
          হোম পেজে ফিরে যান
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-4xl min-w-0 px-3 py-5 sm:px-6 sm:py-8 lg:py-10">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mb-5 text-sm text-gray-500 sm:mb-7"
      >
        <Link href="/" className="transition hover:text-red-600">
          হোম
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700">
          {news.category || "সংবাদ"}
        </span>
      </nav>

      <article>
        {/* Category */}
        <p className="mb-3 text-sm font-bold text-red-600 sm:text-base">
          {news.category || "সর্বশেষ সংবাদ"}
        </p>

        {/* Title */}
        <h1 className="wrap-break-word text-2xl font-extrabold leading-snug text-gray-900 sm:text-3xl lg:text-4xl">
          {news.title}
        </h1>

        {/* Image */}
        {news.imageUrl && (
          <div className="relative mt-5 aspect-16/10 w-full overflow-hidden rounded-xl bg-gray-100 sm:mt-7">
            <Image
              src={news.imageUrl}
              alt={news.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover"
            />
          </div>
        )}

        {/* News text */}
        <div className="mt-6 whitespace-pre-line wrap-break-word text-base leading-8 text-gray-800 sm:mt-8 sm:text-lg sm:leading-9">
          {news.text || "এই সংবাদের বিস্তারিত পাওয়া যায়নি।"}
        </div>
      </article>

      {/* Back button */}
      <div className="mt-8 border-t border-gray-200 pt-5 sm:mt-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-red-600 hover:text-red-600"
        >
          ← সব সংবাদে ফিরে যান
        </Link>
      </div>
    </main>
  );
}
