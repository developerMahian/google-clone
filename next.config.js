/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["encrypted-tbn0.gstatic.com"],
  },
  env: {
    SEARCH_API_HOST: "google-search3.p.rapidapi.com",
    SEARCH_API_KEY: "4e38ceb809msh9053231e3a58420p1327f2jsn1be39b2ae7cd",
    IMAGE_API_HOST: "google-image-search1.p.rapidapi.com",
    IMAGE_API_KEY: "92c6f60ccamsh9a48e75e269cc1cp1ccc44jsn46db388ee8e9",
    VIDEO_API_HOST: "bing-video-search1.p.rapidapi.com",
    VIDEO_API_KEY: "92c6f60ccamsh9a48e75e269cc1cp1ccc44jsn46db388ee8e9",
  },
};
