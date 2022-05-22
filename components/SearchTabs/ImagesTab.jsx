import Image from "next/image";
import { useQuery } from "react-query";
import { LightgalleryItem, LightgalleryProvider } from "react-lightgallery";
import PropTypes from "prop-types";
import { useResultContext } from "../../context/ResultContextProvider";
import Loading from "../Loading";
import { imageData } from "../../staticApiData/imageData";
import "lightgallery.js/dist/css/lightgallery.css";
import { useEffect } from "react";

const ImagesTab = () => {
  const { debouncedSearchTerm, getResults, setSearchSuggestions } =
    useResultContext();

  {
    // const { isLoading, isError, isSuccess, data } = useQuery(
    //   ["imageApi", debouncedSearchTerm],
    //   () => getResults("imageApi"),
    //   {
    //     enabled: debouncedSearchTerm.length > 0,
    //     staleTime: Infinity,
    //   }
    // );
    // console.log({ isLoading, data });
    // if (isLoading) return <Loading />;
  }

  const {
    response: { images, suggestions },
  } = imageData;

  const answers = suggestions?.map(({ text }) => text);

  useEffect(() => {
    setSearchSuggestions(answers);
  }, [suggestions]);

  return (
    <section className="container p-3 sm:pt-5 lg:px-32">
      <LightgalleryProvider>
        <div className="columns-2 md:columns-3 space-y-4">
          {images?.map(({ source, image, thumbnail, dominantColor }, index) => (
            <div key={index} className="cursor-pointer">
              <PhotoItem
                key={index}
                group="mainGroup"
                imgUrl={image?.url}
                alt={source?.title + " - Image"}
                thumbUrl={thumbnail?.url}
                pageUrl={source?.page}
                infoText={source?.title}
                dominantColor={dominantColor}
              />
            </div>
          ))}
        </div>
      </LightgalleryProvider>
    </section>
  );
};

const PhotoItem = ({ imgUrl, alt, thumbUrl, pageUrl, infoText, group }) => (
  <LightgalleryItem
    group={group}
    src={imgUrl}
    thumb={thumbUrl}
    subHtml={`
      <a href="${pageUrl}" target="_blank" rel="noreferrer" style="display: flex; align-items: center; gap: 15px; justify-content: center;">
        ${infoText}
        <svg xmlns="http://www.w3.org/2000/svg" width="22" fill="none" color="white" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    `}
  >
    <img
      src={imgUrl}
      alt={alt}
      className="w-full h-full rounded-lg object-cover object-center"
      loading="lazy"
    />
  </LightgalleryItem>
);

PhotoItem.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  thumbUrl: PropTypes.string,
  pageUrl: PropTypes.string.isRequired,
  infoText: PropTypes.string.isRequired,
  group: PropTypes.string.isRequired,
};

export default ImagesTab;
