import { useRouter } from "next/router";
import TransComp from "../components/FramerMotion/TransComp";
import ArticlesTab from "../components/SearchTabs/ArticlesTab";
import ImagesTab from "../components/SearchTabs/ImagesTab";
import VideosTab from "../components/SearchTabs/VideosTab";
// import NewsTab from "../components/SearchTabs/NewsTab/NewsTab";

const Home = () => {
	const router = useRouter();

	switch (router.query.tab) {
		case "articles":
		case undefined:
			return (
				<TransComp>
					<ArticlesTab />
				</TransComp>
			);

		case "images":
			return (
				<TransComp>
					<ImagesTab />
				</TransComp>
			);

		case "videos":
			return (
				<TransComp>
					<VideosTab />
				</TransComp>
			);

		// case "news":
		//   return (
		//     <TransComp>
		//       <NewsTab />
		//     </TransComp>
		//   );
	}
};

export default Home;
