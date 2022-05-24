import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import propTypes from "prop-types";
import {
  FaBookReader,
  FaPlayCircle,
  FaRegImages,
  FaRegNewspaper,
} from "react-icons/fa";

const Tabs = () => (
  <div className="flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-3 child-svg:text-2xl sm:child-svg:text-xl mt-4 -mb-[1px] sm:px-24 md:px-32">
    <TabBtn tabId="articles">
      <FaBookReader /> <span className="hidden sm:inline-block">Articles</span>
    </TabBtn>
    <TabBtn tabId="images">
      <FaRegImages /> <span className="hidden sm:inline-block">Images</span>
    </TabBtn>
    <TabBtn tabId="videos">
      <FaPlayCircle /> <span className="hidden sm:inline-block">Videos</span>
    </TabBtn>
    <TabBtn tabId="news">
      <FaRegNewspaper /> <span className="hidden sm:inline-block">News</span>
    </TabBtn>
  </div>
);

const TabBtn = ({ children, tabId }) => {
  const [isTabActive, setIsTabActive] = useState(false);

  const router = useRouter();

  const tabActiveValue =
    router.query.tab === tabId ||
    (router.asPath === "/" && tabId === "articles");

  useEffect(() => {
    setIsTabActive(tabActiveValue);
  }, [router.query.tab]);

  return (
    <button
      className={`flex items-center gap-2 text-[15px] sm:text-base border-b-2 ${
        isTabActive
          ? "border-sky-500 child-svg:text-sky-500 font-medium"
          : "border-transparent"
      } p-1`}
      onClick={() => router.push({ query: { tab: tabId } })}
    >
      {children}
    </button>
  );
};

TabBtn.protoType = {
  tabId: propTypes.string.isRequired,
};

export default Tabs;
