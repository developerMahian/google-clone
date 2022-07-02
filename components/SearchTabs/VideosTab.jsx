import { useEffect } from "react";
import { useQuery } from "react-query";
import numeral from "numeral";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";

import { useResultContext } from "../../context/ResultContextProvider";
import Loading from "../Loading";
import EmptySearchResult from "../EmptySearchResult";

import { FaExternalLinkAlt } from "react-icons/fa";

// import { videosData as data } from "../../staticApiData/videosData";

TimeAgo.addLocale(en);

const VideosTab = () => {
	const { debouncedSearchTerm, getResults, setSearchSuggestions } = useResultContext();

	if (!debouncedSearchTerm) return <EmptySearchResult />;

	const timeAgo = new TimeAgo("en-US");

	const { data, isLoading } = useQuery(["videoSearch", debouncedSearchTerm], () => getResults("videoApi"), {
		enabled: debouncedSearchTerm.length > 0,
		staleTime: Infinity,
	});

	console.info({ isLoading, data });

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
							embedHtml,
							hostPageUrl,
							motionThumbnailUrl,
							name: title,
							creator: { name: creatorName },
							datePublished,
							viewCount,
						},
						index
					) =>
						embedHtml && (
							<div key={index}>
								<div className="w-[390px] mx-auto">
									<video
										className="w-full max-h-[220px] rounded-lg overflow-hidden cursor-pointer mb-2"
										controls={false}
										onMouseOver={({ target }) => target.setAttribute("controls", true)}
										onMouseOut={({ target }) => target.removeAttribute("controls")}
									>
										<source src={motionThumbnailUrl} type="video/mp4" />
										Can&apos;t support Video playing.
									</video>

									<h1 className="inline text-sky-600 dark:text-sky-300 text-base sm:text-lg hover:border-b border-sky-600 dark:border-sky-300 tracking-wide">
										<a href={hostPageUrl} target="_blank" rel="noreferrer">
											{title}{" "}
											<FaExternalLinkAlt className="inline-block ml-3 mb-1 text-xs" />
										</a>
									</h1>

									<div className="text-[13px] opacity-80 tracking-wider mt-1">
										<div className="uppercase">{creatorName}</div>
										<span>{numeral(viewCount).format("0a")} views</span>
										<span className="inline-block scale-[0.4] mx-0.5">🟢</span>
										<span className="">{timeAgo.format(new Date(datePublished))}</span>
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
