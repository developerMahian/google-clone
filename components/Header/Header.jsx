import Link from "next/link";
import { useRouter } from "next/router";
import Search from "./Search";
import { FaMoon, FaSun } from "react-icons/fa";
import Tabs from "./Tabs";

const Header = ({ toggleTheme, darkTheme }) => {
  const router = useRouter();

  return (
    <header className="sm:px-5 px-3 pt-5 pb-0 relative bg-gray-200/20 dark:bg-gray-800/60 border-b-2 dark:border-gray-200/20 z-50">
      <div className="container mx-auto md:px-5">
        <div className="flex justify-between items-center gap-4 sm:gap-10">
          <div className="flex flex-grow items-center gap-4 md:gap-10">
            <Link href="/">
              <a
                className="hdden sm:block text-xl sm:text-2xl font-extrabold rounded-md dark:text-white whitespace-nowrap"
                onClick={() => router.push({ tab: "search" })}
              >
                gClone
              </a>
            </Link>

            <Search />
          </div>

          <button
            className="text-2xl sm:text-3xl font-bold tracking-wider p-2 hover:scale-125 hover:rotate-12 transition-transform duration-300 rounded-full"
            onClick={() => toggleTheme((prev) => !prev)}
          >
            {darkTheme ? (
              <FaSun className="text-amber-400" />
            ) : (
              <FaMoon className="text-sky-500" />
            )}
          </button>
        </div>

        <Tabs />
      </div>
    </header>
  );
};

export default Header;
