import { createContext, useContext, useState } from "react";
import useDebounce from "../utils/useDebounce";

const ResultContext = createContext();
const searchBaseUrl = "https://google-search74.p.rapidapi.com";
const imageBaseUrl = "https://real-time-image-search.p.rapidapi.com/search";
const videoBaseUrl = "https://bing-video-search1.p.rapidapi.com/videos/search";

export const ResultContextProvider = ({ children }) => {
	const [searchTerm, setSearchTerm] = useState("Web Developer");
	const [searchSuggestions, setSearchSuggestions] = useState([]);
	const [sortByTime, setSortByTime] = useState(false);

	const debouncedSearchTerm = useDebounce(searchTerm).toLowerCase().replace(" ", "+");

	const getResults = async (api, searchTopic) => {
		console.info("/**** Fetch Ran... ****/");

		if (api === "searchApi") {
			/**** Fetch function for only Blog or News... ****/
			return await fetch(`${searchBaseUrl}?query=${debouncedSearchTerm}&limit=50&related_keywords=true`, {
				method: "GET",
				headers: {
					"X-User-Agent": "desktop",
					"X-Proxy-Location": "EU",
					"X-RapidAPI-Host": process.env.NEXT_PUBLIC_SEARCH_API_HOST,
					"X-RapidAPI-Key": process.env.NEXT_PUBLIC_SEARCH_API_KEY,
				},
			}).then((res) => res.json());
		} else if (api === "imageApi") {
			/**** Fetch function for only Images... ****/
			return await fetch(`${imageBaseUrl}?query=${debouncedSearchTerm}&region=us`, {
				method: "GET",
				headers: {
					"X-RapidAPI-Host": process.env.NEXT_PUBLIC_IMAGE_API_HOST,
					"X-RapidAPI-Key": process.env.NEXT_PUBLIC_IMAGE_API_KEY,
				},
			}).then((res) => res.json());
		} else if (api === "videoApi") {
			/**** Fetch function for only Videos... ****/
			return await fetch(
				// `${videoBaseUrl}/?q=${debouncedSearchTerm}&count=40`,
				`${videoBaseUrl}/?q=${debouncedSearchTerm}&count=40&safeSearch=strict`,
				{
					method: "GET",
					headers: {
						"X-RapidAPI-Host": process.env.NEXT_PUBLIC_VIDEO_API_HOST,
						"X-RapidAPI-Key": process.env.NEXT_PUBLIC_VIDEO_API_KEY,
					},
				}
			).then((res) => res.json());
		}
	};

	return (
		<ResultContext.Provider
			value={{
				searchTerm,
				setSearchTerm,
				searchSuggestions,
				setSearchSuggestions,
				sortByTime,
				setSortByTime,
				debouncedSearchTerm,
				getResults,
			}}
		>
			{children}
		</ResultContext.Provider>
	);
};

export const useResultContext = () => useContext(ResultContext);
