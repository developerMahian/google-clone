import { useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer";
import TransComp from "../FramerMotion/TransComp";
import { QueryClient, QueryClientProvider } from "react-query";
import { ResultContextProvider } from "../../context/ResultContextProvider";

if (process.env.NODE_ENV === "production") console.info = () => {};

const Layout = ({ children, pageProps }) => {
	const [darkTheme, setDarkTheme] = useState(true);
	const [queryClient] = useState(() => new QueryClient());

	return (
		<ResultContextProvider>
			<QueryClientProvider client={queryClient}>
				<div className={darkTheme ? "dark" : "light"}>
					<div
						className={`bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-200 min-h-screen overflow-x-hidden ${
							process.env.NODE_ENV !== "production" && "debug-screens"
						}`}
					>
						<Header toggleTheme={setDarkTheme} darkTheme={darkTheme} />
						<main className="min-h-[330px]">
							<TransComp>{children}</TransComp>
						</main>
						<Footer />
					</div>
				</div>
			</QueryClientProvider>
		</ResultContextProvider>
	);
};

export default Layout;
