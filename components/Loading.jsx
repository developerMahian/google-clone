import PacmanLoader from "react-spinners/PacmanLoader";

const Loading = () => {
  return (
    <div className="flex justify-center items-center mr-24 h-[60vh]">
      <PacmanLoader color={"#0ea5e9"} size={45} />
    </div>
  );
};

export default Loading;
