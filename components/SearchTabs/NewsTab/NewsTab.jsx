import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import propTypes from "prop-types";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";

import { useResultContext } from "../../../context/ResultContextProvider";
import Pagination from "../../Pagination";
import SortingCheck from "./components/SortingCheck";
import Loading from "../../Loading";
import EmptySearchResult from "../../EmptySearchResult";
import NewsIcon from "../../SvgAssets/NewsIcon";

// import { newsData as data } from "../../../staticApiData/newsData";

TimeAgo.addLocale(en);

const NewsTab = () => {
	const { debouncedSearchTerm, getResults } = useResultContext();

	const { isLoading, data } = useQuery(["newsSearch", debouncedSearchTerm], () => getResults("searchApi", "news"), {
		enabled: debouncedSearchTerm.length > 0,
		staleTime: Infinity,
	});

	if (!debouncedSearchTerm) return <EmptySearchResult />;
	if (isLoading) return <Loading />;

	const { entries, ts } = data || {};

	return (
		<section className="container sm:px-5 lg:px-36">
			<div className="max-w-3xl flex flex-col sm:flex-row items-center justify-between gap-2 mt-1.5 mb-2.5">
				<span className="inline-block text-xs tracking-wide">
					About {entries?.length} results in {(ts / 10).toFixed(2)} seconds
				</span>

				<SortingCheck />
			</div>

			<NewsCollection entries={entries} />
		</section>
	);
};

/****
 * Collection of articles with pagination...
 ****/
const NewsCollection = ({ entries }) => {
	const [pageNumber, setPageNumber] = useState(0);
	const [filteredEntries, setFilteredEntries] = useState([...(entries || [])].sort((a, b) => new Date(b?.published) - new Date(a?.published)));
	// const [displayItems, setDisplayItems] = useState([]);
	const [filterLoading, setFilterLoading] = useState(false);

	const { sortByTime } = useResultContext();

	const timeAgo = new TimeAgo("en-US");

	const itemsPerPage = 15;
	const itemsVisited = pageNumber * itemsPerPage;

	const displayItems = [];

	if (sortByTime) displayItems = filteredEntries?.slice(itemsVisited, itemsVisited + itemsPerPage);
	else displayItems = entries?.slice(itemsVisited, itemsVisited + itemsPerPage);

	useEffect(() => {
		setFilterLoading(true);
		setTimeout(() => setFilterLoading(false), 500);
	}, [sortByTime]);

	return (
		<div className="flex flex-col gap-3 max-w-3xl mb-6">
			{filterLoading ? (
				<Loading speed={2} />
			) : (
				displayItems?.map(({ id, link, published, source, title }) => (
					<div key={id} className="px-5 py-4 md:pr-12 rounded-lg border border-gray-300 dark:border-gray-700">
						<a href={link} className="inline-block group" target="_blank" rel="noreferrer">
							<span className="flex items-center gap-2.5 text-xs tracking-wider mb-2">
								<NewsIcon />
								{link.substring(8, 40) + "..."}
							</span>

							<h1 className="text-sky-600 dark:text-sky-300 text-lg sm:text-xl group-hover:underline underline-offset-4 mb-1">{title}</h1>

							<span className="opacity-70 text-xs">{timeAgo.format(new Date(published), "round")}</span>
						</a>
					</div>
				))
			)}

			<Pagination results={sortByTime ? filteredEntries : entries} itemsPerPage={itemsPerPage} setPageNumber={setPageNumber} />
		</div>
	);
};

NewsCollection.propTypes = {
	entries: propTypes.arrayOf(propTypes.object).isRequired,
};

export default NewsTab;
