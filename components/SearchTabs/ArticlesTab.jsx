import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import propTypes from "prop-types";

import { useResultContext } from "../../context/ResultContextProvider";
import EmptySearchResult from "../EmptySearchResult";
import Pagination from "../Pagination";
import Loading from "../Loading";

const ArticlesTab = () => {
	const { debouncedSearchTerm, getResults, setSearchSuggestions } = useResultContext();

	const { data, isLoading } = useQuery(["blogSearch", debouncedSearchTerm], () => getResults("searchApi"), {
		enabled: debouncedSearchTerm.length > 0,
		staleTime: Infinity,
	});

	const { results, related_keywords } = data || {};

	useEffect(() => {
		const keywordList = related_keywords?.keywords?.map((k) => k?.keyword) || [];
		setSearchSuggestions(keywordList || []);
		return () => setSearchSuggestions([]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	if (!debouncedSearchTerm) return <EmptySearchResult />;
	if (isLoading) return <Loading />;

	return (
		<section className="container sm:px-5 lg:px-40 pt-2">
			<span className="inline-block text-xs tracking-wide">About {results?.length || 0} results found..</span>
			{results?.length > 0 && <ArticlesCollection results={results} />}
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

	const displayItems = results?.slice(itemsVisited, itemsVisited + itemsPerPage) || [];

	return results?.length > 0 ? (
		<div className="flex flex-col gap-10 max-w-2xl my-6">
			{displayItems?.map(
				({ link, title, description }, index) =>
					description && (
						<div key={index}>
							<a href={link} className="inline-block group" target="_blank" rel="noreferrer">
								<span className="text-sm">{link?.length > 30 ? link.substring(0, 30) : link}</span>
								<h1 className="text-sky-600 dark:text-sky-300 text-lg sm:text-xl group-hover:underline underline-offset-4">{title}</h1>
							</a>
							<p className="text-base mt-2">{description}</p>
						</div>
					)
			)}

			<Pagination {...{ results, itemsPerPage, setPageNumber }} />
		</div>
	) : null;
};

ArticlesCollection.propTypes = {
	results: propTypes.arrayOf(propTypes.object).isRequired,
};

export default ArticlesTab;
