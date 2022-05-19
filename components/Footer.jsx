import Link from "next/link";
import { FaArrowCircleUp, FaGithub, FaTwitter } from "react-icons/fa";
import Fiverr from "./SvgAssets/Fiverr";

const Footer = () => (
  <footer className="h-56 overflow-hidden relative mt-20">
    <div className="flex before:absolute before:top-0 before:left-1/2 before:-ml-[75rem] before:w-[150rem] before:h-[150rem] before:rounded-[50%] before:bg-gray-200 before:dark:bg-gray-800 before:z-0">
      <div className="text-center mx-auto mt-10 z-10">
        <section className="flex gap-6 justify-center items-center mb-8">
          <a href="#" target="_blank">
            <FaTwitter className={`${socialIconsClass} text-blue-500`} />
          </a>
          <a
            href="#"
            target="_blank"
            className="hover:rotate-[20deg] transition-transform"
          >
            <Fiverr />
          </a>
          <a href="#" target="_blank">
            <FaGithub className={socialIconsClass} />
          </a>
        </section>
        <section className="text-gray-500 text-xs text-center font-mono font-semibold mb-2.5">
          Copyright © 2022, All Right Reserved{" "}
          <Link href="#">
            <a className="inline-block text-sky-400 hover:text-sky-500 hover:scale-105 transition-all duration-300">
              DevMahian
            </a>
          </Link>
          <div>Inspired by Google</div>
        </section>
        <button
          onClick={() => window.scroll({ top: 0, left: 0, behavior: "smooth" })}
        >
          <FaArrowCircleUp className="text-[40px] text-sky-400 hover:text-sky-500 hover:scale-110 transition-all duration-300" />
        </button>
      </div>
    </div>
  </footer>
);

const socialIconsClass = "text-2xl hover:rotate-[20deg] transition-transform";

export default Footer;
