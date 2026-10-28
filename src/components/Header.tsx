
import Image from "next/image";
import Link from "next/link";
import DateDisplay from "./DateDisplay";
import NavLinks from "./NavLinks";

const Header = () => {
  return (
    <header className="mx-auto w-full max-w-7xl px-3 sm:px-5 lg:px-6">
      {/* Header Top */}
      <div
        className="
          flex flex-col items-center gap-4 py-4
          sm:py-5
          md:relative md:flex-row md:justify-center
          md:gap-0
        "
      >
        {/* Logo + Site Info */}
        <Link
          href="/"
          className="
            flex min-w-0 max-w-full items-center justify-center
            gap-2 text-center
            sm:gap-3
            md:mx-auto
          "
        >
          <Image
            className="h-10 w-10 shrink-0 object-contain sm:h-12 sm:w-12"
            height={50}
            width={50}
            src="/logo.png"
            alt="Bangla News 24 Logo"
            priority
          />

          <div className="min-w-0">
            <h1
              className="
                text-lg font-bold leading-tight text-gray-900
                sm:text-xl
                md:text-2xl
              "
            >
              Bangla News 24
            </h1>

            <div className="mt-1">
              <DateDisplay />
            </div>
          </div>
        </Link>

        {/* Authentication Buttons */}
        <div
          className="
            flex shrink-0 items-center justify-center gap-2
            md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2
          "
        >
          <Link
            href="/sign-in"
            className="
              btn btn-sm border-gray-300 bg-white text-gray-700
              hover:border-red-500 hover:text-red-500
              sm:btn-md
            "
          >
            সাইন ইন
          </Link>

          <Link
            href="/sign-up"
            className="
              btn btn-sm border-red-500 bg-red-500 text-white
              hover:border-red-600 hover:bg-red-600
              sm:btn-md
            "
          >
            সাইন আপ
          </Link>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-t border-gray-200">
        <NavLinks />
      </div>
    </header>
  );
};

export default Header;
