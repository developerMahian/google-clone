import { useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer";
import TransComp from "../FramerMotion/TransComp";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ResultContextProvider } from "../../context/ResultContextProvider";

const Layout = ({ children, pageProps }) => {
  const [darkTheme, setDarkTheme] = useState(true);
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ResultContextProvider>
      <QueryClientProvider client={queryClient}>
        <div className={darkTheme ? "dark" : "light"}>
          <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-200 min-h-screen overflow-x-hidden">
            <Header toggleTheme={setDarkTheme} darkTheme={darkTheme} />
            <main className="min-h-[330px]">
              <TransComp>{children}</TransComp>
            </main>
            <Footer />
          </div>
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ResultContextProvider>
  );
};

export default Layout;
