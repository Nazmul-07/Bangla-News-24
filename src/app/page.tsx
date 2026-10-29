import MainNews from "@/components/MainNews";
import Marquee from "@/components/Marquee";
import MostRead from "@/components/MostRead";
import NewsCard from "@/components/NewsCard";

type NewsItem = {
  id: string | number;
  title: string;
  [key: string]: unknown;
};

type NewsSection = {
  curationId: string | number;
  title: string;
  articles: NewsItem[];
};

export default async function Home() {
  const res = await fetch("https://news-api-v2.vercel.app/api/news/sections", {
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch news sections");
  }

  const result = await res.json();
  const sections: NewsSection[] = result.data ?? [];

  const mainNews = sections[0]?.articles ?? [];
  const otherSections = sections.slice(1);

  return (
    <main className="min-h-screen overflow-x-clip bg-white">
      {/* Breaking News */}
      <Marquee />

      <div className="mx-auto w-full max-w-7xl px-3 py-5 sm:px-5 sm:py-7 lg:px-6 lg:py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8">
          {/* Main News Column */}
          <section className="min-w-0 lg:col-span-8">
            {/* Section Heading */}
            <div className="mb-5 flex items-center gap-3 sm:mb-6">
              <span className="h-7 w-1.5 shrink-0 rounded-full bg-red-600" />

              <h1 className="text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl">
                সর্বশেষ সংবাদ
              </h1>
            </div>

            {/* Featured News */}
            <MainNews news={mainNews} />

            {/* Other News Sections */}
            <div className="mt-8 space-y-8 sm:mt-10 sm:space-y-10">
              {otherSections.map((section) => (
                <section key={section.curationId} className="min-w-0">
                  <div className="border-b-2 border-gray-200">
                    <h2 className="inline-block border-b-2 border-red-600 pb-2 text-lg font-bold text-gray-900 sm:text-xl">
                      {section.title}
                    </h2>
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {(section.articles ?? []).map((news) => (
                      <NewsCard key={news.id} news={news} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </section>

          {/* Most Read Sidebar */}

          {/* Most Read Sidebar */}
          <aside className="min-w-0 lg:col-span-4">
            <div>
              <div className="mb-4 flex items-center gap-3 border-b border-gray-200 pb-3 sm:mb-5">
                <span className="h-7 w-1.5 shrink-0 rounded-full bg-red-600" />

                <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                  সর্বাধিক পঠিত
                </h2>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-3 sm:p-5">
                <MostRead />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
