import { FaArrowCircleUp, FaGithub, FaSkype, FaTwitter } from "react-icons/fa";

const Footer = () => (
  <footer className="h-56 overflow-hidden relative mt-20">
    <div className="flex before:absolute before:top-0 before:left-1/2 before:-ml-[75rem] before:w-[150rem] before:h-[150rem] before:rounded-[50%] before:bg-gray-200 before:dark:bg-gray-800 before:z-0">
      <div className="text-center mx-auto mt-10 z-10">
        <section className="flex gap-6 justify-center items-center mb-8">
          <a
            href="https://twitter.com/DeveloperMahian"
            target="_blank"
            rel="noreferrer"
          >
            <FaTwitter className={`${socialIconsClass} text-blue-500`} />
          </a>
          <a
            href="https://join.skype.com/invite/wecW1GItckDh"
            target="_blank"
            rel="noreferrer"
          >
            <FaSkype
              className={`${socialIconsClass} !text-3xl  text-sky-500 animate-bounce`}
            />
          </a>
          <a
            href="https://github.com/developerMahian"
            target="_blank"
            rel="noreferrer"
            className={socialIconsClass}
          >
            <FaGithub />
          </a>
        </section>

        <section className="text-gray-500 text-xs text-center font-mono font-semibold mb-4">
          Copyright © 2022, All Right Reserved{" "}
          <a
            href="https://join.skype.com/invite/wecW1GItckDh"
            target="_blank"
            rel="noreferrer"
            className="inline-block text-sky-400 hover:text-sky-500 hover:scale-105 transition-all duration-300"
          >
            DevMahian
          </a>
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

const socialIconsClass =
  "text-2xl hover:rotate-[20deg] hover:scale-110 transition-transform";

export default Footer;
