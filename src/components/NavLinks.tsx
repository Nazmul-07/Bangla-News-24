
import Link from "next/link";

type Category = {
  id: number;
  title: string;
  slug?: string;
  scrapable: boolean;
};

type CategoriesResponse = {
  data: Category[];
};

const NavLinks = async () => {
  let navs: Category[] = [];

  try {
    const res = await fetch(
      "https://news-api-v2.vercel.app/api/categories",
      {
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      throw new Error(`API Error: ${res.status}`);
    }

    const result: CategoriesResponse = await res.json();
    navs = result.data ?? [];
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }

  const filteredNavs = navs.filter((category) => category.scrapable);

  return (
    <nav
      aria-label="Main navigation"
      className="w-full min-w-0 border-y border-gray-200 bg-white"
    >
      <div
        className="
          mx-auto flex w-full max-w-7xl items-center
          gap-5 overflow-x-auto overscroll-x-contain
          px-3 py-3
          sm:gap-6 sm:px-5
          md:justify-center
          lg:gap-8 lg:px-6
          [&::-webkit-scrollbar]:hidden
          scrollbar-none
        "
      >
        <Link
          href="/"
          className="
            shrink-0 whitespace-nowrap text-sm font-semibold
            text-gray-800 transition-colors
            hover:text-red-500
            sm:text-base
          "
        >
          হোম
        </Link>

        {filteredNavs.map((category) => (
          <Link
            key={category.slug ?? category.id}
            href={`/category/${category.slug ?? category.id}`}
            className="
              shrink-0 whitespace-nowrap text-sm font-medium
              text-gray-700 transition-colors duration-200
              hover:text-red-500
              sm:text-base
            "
          >
            {category.title}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NavLinks;
