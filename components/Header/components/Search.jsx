import { useRouter } from "next/router";
import { useEffect } from "react";
import Autocomplete from "react-autocomplete";
import { FaSistrix } from "react-icons/fa";
import { HiSearch } from "react-icons/hi";
import { useResultContext } from "../../../context/ResultContextProvider";

const Search = ({ isNavFixed }) => {
	const { searchTerm, setSearchTerm, searchSuggestions } = useResultContext();

	// console.info({ searchSuggestions });

	useEffect(() => {
		const searchInputEl = document.getElementById("headerSearchInput");

		isNavFixed ? searchInputEl.classList.add("!h-10") : searchInputEl.classList.remove("!h-10");
	}, [isNavFixed]);

	return (
		<form
			className="relative flex-grow md:max-w-[600px] sm:pr-10 dark:text-gray-900"
			onSubmit={(e) => e.preventDefault()}
		>
			<Autocomplete
				getItemValue={(item) => item}
				items={searchSuggestions}
				shouldItemRender={(item, value) => item.toLowerCase().indexOf(value.toLowerCase()) > -1}
				renderItem={(item, isHighlighted) => (
					<div
						key={item}
						className={`${
							isHighlighted ? "bg-gray-300 dark:bg-gray-600" : "bg-gray-200 dark:bg-gray-700"
						} flex items-center gap-4 text-base dark:text-gray-100 px-6 py-2 transition-colors duration-300 capitalize cursor-pointer`}
					>
						<FaSistrix />
						{item}
					</div>
				)}
				value={searchTerm}
				onChange={(event) => setSearchTerm(event.target.value)}
				onSelect={(val) => setSearchTerm(val)}
				inputProps={{
					className:
						"h-10 sm:h-12 w-full outline-none text-base font-medium dark:bg-gray-700 dark:text-gray-200 pl-6 pr-1 rounded-full shadow hover:shadow-md dark:hover:shadow-2xl transition-shadow duration-300",
					id: "headerSearchInput",
					placeholder: "Want to know something?",
				}}
				wrapperStyle={{ display: "block" }}
				menuStyle={{
					position: "fixed",
					maxHeight: "50%",
					borderRadius: "12px",
					boxShadow: "0 5px 20px 5px rgba(0, 0, 0, 0.125)",
					background: "transparent",
					overflow: "auto",
				}}
			/>

			<button type="submit" className="absolute sm:right-12 right-1.5 top-0 bottom-0">
				<HiSearch className="text-white text-3xl bg-sky-500 rounded-full p-1.5" />
			</button>
		</form>
	);
};

export default Search;
