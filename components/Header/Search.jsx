import { HiSearch } from "react-icons/hi";
import { useResultContext } from "../../context/ResultContextProvider";

const Search = () => {
  const { getResults, searchTerm, setSearchTerm } = useResultContext();

  const submitHandler = (event) => {
    event.preventDefault();

    // getResults(`/search/q=${searchTerm}&num=30`);
  };

  return (
    <form
      className="relative flex-grow md:max-w-[550px] sm:pr-10"
      onSubmit={submitHandler}
    >
      <input
        type="text"
        className="h-10 sm:h-12 w-full outline-none font-medium dark:bg-gray-700 dark:text-gray-200 pl-4 pr-1 rounded-full shadow hover:shadow-md dark:hover:shadow-2xl transition-shadow duration-300"
        placeholder="Search here..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      <button
        type="submit"
        className="absolute sm:right-12 right-1.5 top-0 bottom-0"
      >
        <HiSearch className="text-white text-3xl bg-sky-500 rounded-full p-1.5" />
      </button>
    </form>
  );
};

export default Search;
