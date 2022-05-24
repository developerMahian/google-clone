import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import ReactPaginate from "react-paginate";
import { useResultContext } from "../../context/ResultContextProvider";
import Loading from "../Loading";
import propTypes from "prop-types";
import Pagination from "../Pagination";
// import { searchData as data } from "../../staticApiData/searchData";

const ArticlesTab = () => {
  const { debouncedSearchTerm, getResults, setSearchSuggestions } =
    useResultContext();

  const { isLoading, isError, isSuccess, data } = useQuery(
    ["blogSearch", debouncedSearchTerm],
    () => getResults("searchApi", "search"),
    {
      enabled: debouncedSearchTerm.length > 0,
      staleTime: Infinity,
    }
  );

  console.log({ isLoading, data });

  useEffect(() => {
    setSearchSuggestions(data?.answers || []);

    return () => setSearchSuggestions([]);
  }, [data]);

  if (isLoading) return <Loading />;

  const { results, ts } = data;

  return (
    <section className="container sm:px-5 lg:px-40">
      <span className="inline-block text-xs tracking-wide mt-2 mb-6">
        About {results.length} results in {(ts / 10).toFixed(2)} seconds
      </span>

      <ArticlesCollection results={results} />
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
                <span className="text-sm">
                  {link.length > 30 ? link.substring(0, 30) : link}
                </span>
                <h1 className="text-sky-600 dark:text-sky-300 text-lg sm:text-xl group-hover:underline underline-offset-4">
                  {title}
                </h1>
              </a>
              <p className="text-base mt-2">{description}</p>
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
