import { createContext, useContext, useEffect, useState } from "react";
import { imageData } from "../staticApiData/imagesData";
import { searchData } from "../staticApiData/searchData";
import useDebounce from "../utils/useDebounce";

const ResultContext = createContext();
const searchBaseUrl = "https://google-search3.p.rapidapi.com/api/v1";
const imageBaseUrl = "https://google-image-search1.p.rapidapi.com/v2";
const videoBaseUrl = "https://bing-video-search1.p.rapidapi.com/videos/search";

export const ResultContextProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("Tesla");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [sortByTime, setSortByTime] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm)
    .toLowerCase()
    .replace(" ", "+");

  const getResults = async (api, searchTopic) => {
    console.log("/**** Fetch Ran... ****/");

    if (api === "searchApi") {
      /**** Fetch function for only Blog or News... ****/
      return await fetch(
        `${searchBaseUrl}/${searchTopic}/q=${debouncedSearchTerm}&num=50`,
        {
          method: "GET",
          headers: {
            "X-User-Agent": "desktop",
            "X-Proxy-Location": "EU",
            "X-RapidAPI-Host": process.env.SEARCH_API_HOST,
            "X-RapidAPI-Key": process.env.SEARCH_API_KEY,
          },
        }
      ).then((res) => res.json());
    } else if (api === "imageApi") {
      /**** Fetch function for only Images... ****/
      return await fetch(`${imageBaseUrl}/?q=${debouncedSearchTerm}&hl=en`, {
        method: "GET",
        headers: {
          "X-RapidAPI-Host": process.env.IMAGE_API_HOST,
          "X-RapidAPI-Key": process.env.IMAGE_API_KEY,
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
            "X-RapidAPI-Host": process.env.VIDEO_API_HOST,
            "X-RapidAPI-Key": process.env.VIDEO_API_KEY,
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
