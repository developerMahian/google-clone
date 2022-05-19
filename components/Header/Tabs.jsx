import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  FaPlayCircle,
  FaRegImages,
  FaRegNewspaper,
  FaSistrix,
} from "react-icons/fa";

const Tabs = () => (
  <div className="flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-3 child-svg:text-lg sm:child-svg:text-xl mt-4 -mb-[1px] sm:px-24 md:px-32">
    <TabBtn tabId="all">
      <FaSistrix /> All
    </TabBtn>
    <TabBtn tabId="images">
      <FaRegImages /> Images
    </TabBtn>
    <TabBtn tabId="videos">
      <FaPlayCircle /> Videos
    </TabBtn>
    <TabBtn tabId="news">
      <FaRegNewspaper /> News
    </TabBtn>
  </div>
);

const TabBtn = ({ children, tabId }) => {
  const router = useRouter();

  const isTabActive = router.query.tab === tabId;

  return (
    <button
      className={`flex items-center gap-2 text-[15px] sm:text-base border-b-2 ${
        isTabActive ? "border-sky-500" : "border-transparent"
      } px-1 pb-[2px]`}
      onClick={() => router.push({ query: { tab: tabId } })}
    >
      {children}
    </button>
  );
};

export default Tabs;
