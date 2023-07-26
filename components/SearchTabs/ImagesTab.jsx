import { useEffect } from "react";
import propTypes from "prop-types";
import { useQuery } from "react-query";
import "lightgallery.js/dist/css/lightgallery.css";
import { LightgalleryItem, LightgalleryProvider } from "react-lightgallery";

import Loading from "../Loading";
import EmptySearchResult from "../EmptySearchResult";
import { useResultContext } from "../../context/ResultContextProvider";

const ImagesTab = () => {
	const { debouncedSearchTerm, getResults, setSearchSuggestions } = useResultContext();

	const { data, isLoading } = useQuery(["imageApi", debouncedSearchTerm], () => getResults("imageApi"), {
		enabled: debouncedSearchTerm.length > 0,
		staleTime: Infinity,
	});

	const { data: images, related_keywords } = data || {};

	useEffect(() => {
		const keywordList = related_keywords?.keywords?.map((k) => k?.keyword) || [];
		setSearchSuggestions(keywordList || []);
		return () => setSearchSuggestions([]);
	}, [data]);

	if (!debouncedSearchTerm) return <EmptySearchResult />;
	if (isLoading) return <Loading />;

	return (
		<section className="container p-3 pt-0 lg:px-32">
			<span className="inline-block text-xs tracking-wide mt-3 mb-2.5">About {images.length} results found..</span>

			<LightgalleryProvider lightgallerySettings={{}}>
				{/* <div className="columns-2 md:columns-3 space-y-4"> */}
				<div className="grid sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4">
					{images?.map(({ source, url, source_url, thumbnail_url }) => (
						<div key={url}>
							<PhotoItem
								group="imageGroup"
								imgUrl={url}
								alt={source + " - Image"}
								thumbUrl={thumbnail_url}
								pageUrl={source_url}
								infoText={source}
							/>
						</div>
					))}
				</div>
			</LightgalleryProvider>
		</section>
	);
};

const PhotoItem = ({ imgUrl, alt, thumbUrl, pageUrl, infoText, group }) => (
	<LightgalleryItem
		itemClassName="rounded-lg overflow-hidden relative"
		group={group}
		src={imgUrl}
		thumb={thumbUrl}
		subHtml={`
      <a href="${pageUrl}" target="_blank" rel="noreferrer" style="display: flex; align-items: center; gap: 15px; justify-content: center;">
        ${infoText}
        ${linkSvg}
      </a>
    `}
	>
		<div className="relative min-h-[100px] group cursor-pointer">
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				alt={alt}
				src={imgUrl}
				loading="lazy"
				className="w-full h-full object-cover object-center rounded-lg overflow-hidden group-hover:scale-110 transition-transform duration-500 z-0"
				onError={({ currentTarget }) => {
					currentTarget.onerror = null;
				}}
			/>

			<div className="absolute block left-0 bottom-0 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/30 backdrop-blur z-10">
				<p className="text-center text-sm font-medium py-1.5 px-2">{infoText.length > 60 ? infoText.substring(0, 60) + "..." : infoText}</p>
			</div>
		</div>
	</LightgalleryItem>
);

const linkSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="22" fill="none" color="white" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
`;

PhotoItem.propTypes = {
	imgUrl: propTypes.string.isRequired,
	alt: propTypes.string.isRequired,
	thumbUrl: propTypes.string,
	pageUrl: propTypes.string.isRequired,
	infoText: propTypes.string.isRequired,
	group: propTypes.string.isRequired,
};

export default ImagesTab;
