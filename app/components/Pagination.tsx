type PaginationProps = {
  handlePrev: () => void;
  handleNext: () => void;
  currentPage: number;
  totalPages: number;
};

export const Pagination = ({
  handleNext,
  handlePrev,
  currentPage,
  totalPages,
}: PaginationProps) => {
  return (
    <div className="mt-10 flex items-center justify-center gap-4">
      {/* TODO: onClick={handlePrev} disabled={skip === 0} холбох */}
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm transition-colors hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
      >
        &larr; Өмнөх
      </button>
      <span className="text-sm text-zinc-500 dark:text-zinc-400">
        {/* TODO 14: Хуудасны дугаар харуулах */}
        {/* Хуудас {Math.floor(skip / PRODUCTS_PER_PAGE) + 1} / {Math.ceil(total / PRODUCTS_PER_PAGE)} */}
        Хуудас {currentPage} / {totalPages}
      </span>
      {/* TODO: onClick={handleNext} disabled={skip + PRODUCTS_PER_PAGE >= total} холбох */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm transition-colors hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
      >
        Дараах &rarr;
      </button>
    </div>
  );
};
