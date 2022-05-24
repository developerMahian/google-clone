import { useEffect } from "react";
import { useQuery } from "react-query";
import propTypes from "prop-types";
import ReactPlayer from "react-player";
import numeral from "numeral";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import { useResultContext } from "../../context/ResultContextProvider";
import Loading from "../Loading";
// import { videosData as data } from "../../staticApiData/videosData";

TimeAgo.addLocale(en);

const VideosTab = () => {
  const { debouncedSearchTerm, getResults, setSearchSuggestions } =
    useResultContext();

  const timeAgo = new TimeAgo("en-US");

  const { isLoading, isError, isSuccess, data } = useQuery(
    ["videoSearch", debouncedSearchTerm],
    () => getResults("videoApi"),
    {
      enabled: debouncedSearchTerm.length > 0,
      staleTime: Infinity,
    }
  );

  console.log({ isLoading, data });

  const suggestions = data?.relatedSearches?.map((obj) => obj?.displayText);

  useEffect(() => {
    setSearchSuggestions(suggestions || []);
    return () => setSearchSuggestions([]);
  }, [data]);

  if (isLoading) return <Loading />;

  const { value } = data;

  return (
    <section className="p-3 sm:pt-5 sm:px-12">
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(390px,_1fr))] gap-8">
        {value?.map(
          (
            {
              contentUrl,
              name: title,
              creator: { name: creatorName },
              publisher,
              datePublished,
              viewCount,
            },
            index
          ) => (
            <div key={index}>
              <div className="w-[390px] mx-auto">
                <ReactPlayer
                  url={contentUrl}
                  controls={true}
                  width="100%"
                  height={220}
                  style={{ margin: "auto" }}
                />

                <h1 className="text-sky-600 dark:text-sky-300 text-base sm:text-lg tracking-wide mt-2">
                  {title}
                </h1>

                <div className="text-[13px] opacity-80 tracking-wider">
                  <div className="uppercase">{creatorName}</div>
                  <span>{numeral(viewCount).format("0a")} views</span>
                  <span className="inline-block scale-[0.4] mx-0.5">🟢</span>
                  <span className="">
                    {timeAgo.format(new Date(datePublished))}
                  </span>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default VideosTab;
