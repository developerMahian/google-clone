import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useResultContext } from "../../context/ResultContextProvider";
import Search from "./Search";
import Tabs from "./Tabs";
import { FaMoon, FaSun } from "react-icons/fa";

const Header = ({ toggleTheme, darkTheme }) => {
  const [isNavFixed, setIsNavFixed] = useState(false);
  const headerRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    window.addEventListener("scroll", headerFixHandler);

    return () => window.removeEventListener("scroll", headerFixHandler);
  }, []);

  const headerFixHandler = () => {
    const headerSlideStyle = [
      { transform: "translateY(-100%)" },
      { transform: "translateY(0)" },
    ];

    const transitionOption = {
      duration: 300,
      iterations: 1,
    };

    setIsNavFixed(window.scrollY > 110);

    window.scrollY > 110 &&
      window.scrollY < 140 &&
      headerRef.current.animate(headerSlideStyle, transitionOption);
  };

  return (
    <>
      {isNavFixed && <div className="mb-32" />}

      <header
        ref={headerRef}
        className={`${
          isNavFixed
            ? "fixed left-0 right-0 top-0 p-2"
            : "relative sm:px-5 px-3 pt-5 pb-0"
        } bg-gray-100 dark:bg-gray-800 border-b-2 dark:border-gray-200/20 z-50`}
      >
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

              <Search isNavFixed={isNavFixed} />
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

          {!isNavFixed && <Tabs />}
        </div>
      </header>
    </>
  );
};

export default Header;
