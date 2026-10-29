import Marquee from "@/components/Marquee";
import NewsCard from "@/components/NewsCard";

type CategoryNewsItem = {
  id: string | number;
  title: string;
  imageUrl?: string;
  imageAlt?: string;
  category?: string;
  description?: string;
  link?: string;
};

type CategoryResponse = {
  title?: string;
  data?: CategoryNewsItem[];
};

export default async function CategoryNewsContent({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  // গুরুত্বপূর্ণ: params এখন Suspense-এর ভেতরে resolve হবে
  const { categoryId } = await params;

  let categoryTitle = "বিভাগের সংবাদ";
  let categoryNews: CategoryNewsItem[] = [];

  try {
    const res = await fetch(
      `https://news-api-v2.vercel.app/api/category/${encodeURIComponent(categoryId)}`,
      { next: { revalidate: 300 } },
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch category news: ${res.status}`);
    }

    const result: CategoryResponse = await res.json();

    categoryTitle = result.title || categoryTitle;
    categoryNews = Array.isArray(result.data) ? result.data : [];
  } catch (error) {
    console.error("Category news error:", error);

    return (
      <>
        <Marquee />
        <main className="mx-auto w-full max-w-7xl px-3 py-6 sm:px-5 lg:px-6">
          <p className="rounded-lg bg-gray-50 px-4 py-8 text-center text-gray-500">
            সংবাদ লোড করা যাচ্ছে না। অনুগ্রহ করে পরে আবার চেষ্টা করুন।
          </p>
        </main>
      </>
    );
  }

  return (
    <>
      {/* Full-width marquee */}
      <Marquee />

      {/* Other sections remain constrained to 7xl */}
      <main className="mx-auto w-full max-w-7xl min-w-0 px-3 py-4 sm:px-5 sm:py-6 lg:px-6 lg:py-8">
        <div className="mb-5 mt-5 border-b-2 border-gray-200 sm:mb-6 sm:mt-7">
          <h1 className="-mb-0.5 inline-block border-b-2 border-red-600 pb-2 text-xl font-bold leading-snug text-gray-900 sm:text-2xl lg:text-3xl">
            {categoryTitle}
          </h1>
        </div>

        {categoryNews.length > 0 ? (
          <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
            {categoryNews.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        ) : (
          <p className="rounded-lg bg-gray-50 px-4 py-8 text-center text-sm text-gray-500 sm:text-base">
            এই বিভাগে কোনো সংবাদ পাওয়া যায়নি।
          </p>
        )}
      </main>
    </>
  );
}