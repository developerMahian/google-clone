import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import ReactPaginate from "react-paginate";
import { useResultContext } from "../../../context/ResultContextProvider";
import { FaSistrix } from "react-icons/fa";
import Loading from "../../Loading";
import { searchData } from "../../../staticApiData/searchData";
import propTypes from "prop-types";
import Pagination from "./Pagination";

const ArticlesTab = () => {
  const { debouncedSearchTerm, getResults, setSearchSuggestions } =
    useResultContext();

  // const { isLoading, isError, isSuccess, data } = useQuery(
  //   ["searchApi", debouncedSearchTerm],
  //   () => getResults("searchApi", "search"),
  //   {
  //     enabled: debouncedSearchTerm.length > 0,
  //     staleTime: Infinity,
  //   }
  // );

  // console.log({ isLoading, data });

  // if (isLoading) return <Loading />;

  const { results, ts, answers } = searchData;

  useEffect(() => {
    setSearchSuggestions(answers);
  }, [answers]);

  return (
    <section className="container sm:px-5 lg:px-40">
      <span className="inline-block text-xs tracking-wide mt-2 mb-6">
        About {results.length} results in {ts.toFixed(2) / 50} seconds
      </span>

      <ArticlesCollection results={results} />

      <div className="flex flex-wrap gap-x-3 gap-y-2 border-t dark:border-gray-700 pt-7">
        {answers?.map((answer, index) => (
          <button
            key={index}
            className="w-full md:w-[48%] py-4 px-6 h-fit flex gap-x-3 text-left font-medium bg-gray-200 dark:bg-gray-700 rounded-full"
          >
            <FaSistrix className="text-lg mt-[3px]" /> {answer}
          </button>
        ))}
      </div>
    </section>
  );
};

/****
 * Collection of articles with pagination...
 ****/
const ArticlesCollection = ({ results }) => {
  const [pageNumber, setPageNumber] = useState(0);

  const itemsPerPage = 10;
  const itemsVisited = pageNumber * itemsPerPage;

  const displayItems = results.slice(itemsVisited, itemsVisited + itemsPerPage);

  return (
    <div className="flex flex-col gap-10 max-w-2xl mb-6">
      {displayItems?.map(
        ({ link, title, description }, index) =>
          description && (
            <div key={index}>
              <a
                href={link}
                className="inline-block group"
                target="_blank"
                rel="noreferrer"
              >
                <div className="text-sm w-fit">
                  {link.length > 30 ? link.substring(0, 30) : link}
                </div>
                <div className="inline text-sky-600 dark:text-sky-300 text-xl group-hover:underline underline-offset-4">
                  {title}
                </div>
              </a>
              <div className="text-base mt-2">{description}</div>
            </div>
          )
      )}

      <Pagination
        results={results}
        itemsPerPage={itemsPerPage}
        setPageNumber={setPageNumber}
      />
    </div>
  );
};

ArticlesCollection.propTypes = {
  results: propTypes.arrayOf(propTypes.object).isRequired,
};

export default ArticlesTab;
