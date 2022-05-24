import { useResultContext } from "../../../../context/ResultContextProvider";
import { FaLongArrowAltRight } from "react-icons/fa";

const SortingCheck = () => {
  const { sortByTime, setSortByTime } = useResultContext();

  return (
    <div className="flex items-center gap-4">
      <span className="text-xs mb-0.5">
        Sort By <FaLongArrowAltRight className="inline" />
      </span>

      <div className="input-group flex items-center gap-2">
        <label
          className={`${
            !sortByTime && "text-sky-600 dark:text-sky-400"
          } text-sm font-bold tracking-wider transition cursor-pointer`}
          htmlFor="filterCheckbox"
          onClick={() => setSortByTime(false)}
        >
          Relevance
        </label>

        <div className="relative flex items-center cursor-pointer select-none">
          <input id="filterCheckbox" type="checkbox" className="sr-only" />
          <div onClick={() => setSortByTime((prev) => !prev)}>
            <div
              className={`w-8 h-[10px] ${
                sortByTime ? "bg-sky-500" : "bg-gray-300 dark:bg-gray-400"
              } rounded-full shadow-inner transition-colors`}
            ></div>
            <div
              className={`${
                sortByTime
                  ? "translate-x-full bg-sky-700  dark:bg-blue-300"
                  : "bg-gray-400 dark:bg-gray-600"
              } absolute -top-1 left-0 w-[18px] h-[18px] rounded-full transition`}
            ></div>
          </div>
        </div>

        <label
          className={`${
            sortByTime && "text-sky-700 dark:text-sky-400"
          } text-sm tracking-wider font-bold transition cursor-pointer`}
          htmlFor="filterCheckbox"
          onClick={() => setSortByTime(true)}
        >
          Time
        </label>
      </div>
    </div>
  );
};

export default SortingCheck;
