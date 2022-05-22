import { createContext, useContext, useState } from "react";
import { imageData } from "../staticApiData/imageData";
import { searchData } from "../staticApiData/searchData";
import useDebounce from "../utils/useDebounce";

const ResultContext = createContext();
const searchBaseUrl = "https://google-search3.p.rapidapi.com/api/v1";
const imageBaseUrl = "https://google-image-search1.p.rapidapi.com/v2";

export const ResultContextProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("Tesla");
  const [searchSuggestions, setSearchSuggestions] = useState([]);

  const debouncedSearchTerm = useDebounce(searchTerm);

  const getResults = async (api, searchTopic) => {
    console.log("/**** Fetch Ran... ****/");

    if (api === "searchApi") {
      /**** Fetch function for only Searches... ****/
      return await fetch(
        `${searchBaseUrl}/${searchTopic}/q=${debouncedSearchTerm}&num=30`,
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
    }
  };

  return (
    <ResultContext.Provider
      value={{
        debouncedSearchTerm,
        searchTerm,
        searchSuggestions,
        setSearchTerm,
        setSearchSuggestions,
        getResults,
      }}
    >
      {children}
    </ResultContext.Provider>
  );
};

export const useResultContext = () => useContext(ResultContext);
