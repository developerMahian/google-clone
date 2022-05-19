import { useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer";
import TransComp from "../TransComp";
import { ResultContextProvider } from "../../context/ResultContextProvider";

const Layout = ({ children, router }) => {
  const [darkTheme, setDarkTheme] = useState(false);

  return (
    <ResultContextProvider>
      <div className={darkTheme ? "dark" : "light"}>
        <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-200 min-h-screen overflow-x-hidden">
          <Header toggleTheme={setDarkTheme} darkTheme={darkTheme} />

          <main className="min-h-[330px]">
            <TransComp>{children}</TransComp>
          </main>

          <Footer />
        </div>
      </div>
    </ResultContextProvider>
  );
};

export default Layout;
