import { useRouter } from "next/router";
import { useResultContext } from "../context/ResultContextProvider";
import ArticlesTab from "../components/ArticlesTab";
import Loading from "../components/Loading";
import TransComp from "../components/TransComp";

const Home = () => {
  const { getResults, results, searchTerm, setSearchTerm, isLoading } =
    useResultContext();
  const router = useRouter();

  // console.log({ results });

  if (isLoading) return <Loading />;

  switch (router.query.tab) {
    case "all":
    case undefined:
      return (
        <TransComp>
          <ArticlesTab data={results} />
        </TransComp>
      );

    case "images":
      return (
        <TransComp>
          <h1 className="text-2xl text-center mt-10 font-bold">
            Are You Lost?
          </h1>
        </TransComp>
      );

    case "videos":
      return (
        <TransComp>
          <h1 className="text-2xl text-center mt-10 font-bold">
            What do you want to see?
          </h1>
        </TransComp>
      );

    case "news":
      return (
        <TransComp>
          <h1 className="text-2xl text-center mt-10 font-bold">
            What do you want to see?
          </h1>
        </TransComp>
      );

    default:
      return <h1 className="text-2xl text-center mt-10 font-bold">Default</h1>;
  }
};

export default Home;
