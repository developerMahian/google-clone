const ArticlesTab = ({ data: { results, total, ts } }) => (
  <div className="container sm:px-14 md:px-40">
    <span className="inline-block text-xs tracking-wide mt-2 mb-6">
      About {total} results in {ts.toFixed(2)} seconds
    </span>
    <div className="flex flex-col gap-10">
      {results?.map(
        ({ link, title, description }, index) =>
          description && (
            <div key={index} className="max-w-2xl">
              <a href={link} target="_blank" rel="noreferrer">
                <div className="text-sm w-fit">
                  {link.length > 30 ? link.substring(0, 30) : link}
                </div>
                <div className="inline text-sky-600 dark:text-sky-300 text-xl hover:underline underline-offset-4">
                  {title}
                </div>
              </a>

              <div className="text-base mt-2">{description}</div>
            </div>
          )
      )}
    </div>
  </div>
);

export default ArticlesTab;
