import propTypes from "prop-types";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import ReactPaginate from "react-paginate";

const Pagination = ({ results, itemsPerPage, setPageNumber }) => {
  const pageCount = Math.ceil(results.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <ReactPaginate
      previousLabel={<FaArrowCircleLeft />}
      nextLabel={<FaArrowCircleRight />}
      breakLabel="..."
      onPageChange={handlePageClick}
      pageCount={pageCount}
      nextClassName={paginateIconClass}
      previousClassName={paginateIconClass}
      pageLinkClassName={reactPaginateBtnClasses}
      activeLinkClassName="bg-sky-300 dark:bg-sky-800"
      breakLinkClassName={reactPaginateBtnClasses}
      disabledClassName="opacity-70 text-red-300 hover:scale-100"
      containerClassName="flex flex-wrap items-center gap-3"
    />
  );
};

const reactPaginateBtnClasses =
  "inline-block px-5 py-1.5 bg-gray-200 dark:bg-gray-700 hover:scale-90 transition-transform rounded-lg font-bold cursor-pointer";

const paginateIconClass =
  "text-lg p-1.5 text-sky-500 bg-gray-300 dark:bg-gray-700 rounded-full hover:scale-90 transition-transform cursor-pointer";

Pagination.propTypes = {
  results: propTypes.arrayOf(propTypes.object).isRequired,
  itemsPerPage: propTypes.number.isRequired,
  setPageNumber: propTypes.func.isRequired,
};

export default Pagination;
