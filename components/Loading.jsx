import propTypes from "prop-types";
import PacmanLoader from "react-spinners/PacmanLoader";

const Loading = ({ speed = 1 }) => {
  return (
    <div className="flex justify-center items-center mr-24 h-[60vh]">
      <PacmanLoader color={"#0ea5e9"} size={45} speedMultiplier={speed} />
    </div>
  );
};

Loading.propTypes = {
  speed: propTypes.number,
};

export default Loading;
