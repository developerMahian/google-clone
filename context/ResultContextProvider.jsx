import { createContext, useContext, useState } from "react";
import { searchData } from "../staticApiData/searchData";

const ResultContext = createContext();
const baseUrl = "https://google-search3.p.rapidapi.com/api/v1";

export const ResultContextProvider = ({ children }) => {
  const [results, setResults] = useState(searchData);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getResults = async (type) => {
    if (!type) return;

    setIsLoading(true);

    const data = await fetch(`${baseUrl}${type}`, {
      method: "GET",
      headers: {
        "X-User-Agent": "desktop",
        "X-Proxy-Location": "EU",
        "X-RapidAPI-Host": "google-search3.p.rapidapi.com",
        "X-RapidAPI-Key": "f5e153c0c6msh29f2bdb7028b126p1fe0f5jsn3fa25ffd5423",
      },
    }).then((res) => res.json());

    console.log(data);

    setResults(data);
    setIsLoading(false);
  };

  return (
    <ResultContext.Provider
      value={{ getResults, results, searchTerm, setSearchTerm, isLoading }}
    >
      {children}
    </ResultContext.Provider>
  );
};

export const useResultContext = () => useContext(ResultContext);
