import { Suspense } from "react";
import CategoryNewsContent from "./CategoryNewsContent";

export default function CategoryNewsPage({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  return (
    <Suspense
      fallback={
        <main className="mx-auto w-full max-w-7xl px-3 py-6 sm:px-5 lg:px-6">
          <div className="animate-pulse">
            <div className="mb-6 h-8 w-48 rounded bg-gray-200" />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-64 rounded-lg bg-gray-100"
                />
              ))}
            </div>
          </div>
        </main>
      }
    >
      <CategoryNewsContent params={params} />
    </Suspense>
  );
}