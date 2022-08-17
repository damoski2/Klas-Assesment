import React from "react";
import classnames from "classnames";
import { usePagination } from "../usePagination";
import { usePaginationProps } from "../types";

const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount=1,
  currentPage,
  pageSize,
  className,
}: usePaginationProps) => {
  const paginationRange: (number | string)[] | undefined = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (
    currentPage === 0 ||
    (typeof paginationRange == "object" && paginationRange.length < 2)
  ) {
    return null;
  }

  const onNext = (): void => {
    onPageChange?.(currentPage + 1);
  };

  const onPrevious = (): void => {
    onPageChange?.(currentPage - 1);
  };

  let lastPage: number | undefined | string =
    paginationRange?.[paginationRange.length - 1];

  return (
    <div>
      <ul
        className={classnames("pagination-container", {
          [className as string]: className,
        })}
      >
        <li
          className={classnames("pagination-item", {
            disabled: currentPage === 1,
          })}
          onClick={onPrevious}
        >
          <div className="arrow left" />
        </li>
        {paginationRange?.map((pageNumber, index) => {
          if (pageNumber === "...") {
            return (
              <li key={index} className="pagination-item dots">
                &#8230;
              </li>
            );
          }

          return (
            <li
              key={index}
              className={classnames("pagination-item", {
                selected: pageNumber === currentPage,
              })}

              onClick={()=> onPageChange?.(pageNumber as number)}
            >
              {pageNumber}
            </li>
          );
        })}

        <li className={classnames('pagination-item', { disabled: currentPage === lastPage })} onClick={onNext} >
            <div className="arrow right" />
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
