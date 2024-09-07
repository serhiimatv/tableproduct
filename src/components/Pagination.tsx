"use client";
import React, { FC } from "react";
import { usePagination, DOTS } from "../hooks/usePagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface IProps {
  totalCount: number;
  siblingCount: number;
  currentPage: number;
  perPage: number;
}

const Pagination: FC<IProps> = ({
  totalCount,
  siblingCount,
  currentPage,
  perPage,
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    perPage,
    siblingCount,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onPageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());

    replace(`${pathname}?${params.toString()}`);
  };

  // let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <>
      <div className="flex justify-center items-center h-16">
        <div className="flex items-center gap-3 h-full">
          <span
            className="text-[12px] text-grayBorder cursor-pointer dark:text-white"
            onClick={() => {
              if (currentPage - 1 === 0) {
                return undefined;
              } else {
                onPageChange(currentPage - 1);
              }
            }}
          >
            Previous
          </span>

          {paginationRange.map((pageNumber, idx) => {
            if (pageNumber === DOTS) {
              return (
                <span className="text-lg" key={pageNumber + idx}>
                  ...
                </span>
              );
            }

            return (
              <span
                className={`flex justify-center items-center h-[31px] w-[31px] rounded-lg cursor-pointer 
                ${
                  pageNumber !== currentPage
                    ? "bg-gray dark:bg-darkViolet"
                    : "text-white bg-buttonViolet"
                }`}
                onClick={() => onPageChange(pageNumber as number)}
                key={pageNumber}
              >
                {pageNumber}
              </span>
            );
          })}

          <span
            className="text-[12px] text-grayBorder cursor-pointer dark:text-white"
            onClick={() => {
              if (currentPage + 1 >= Math.ceil(totalCount / perPage)) {
                return undefined;
              } else {
                onPageChange(currentPage + 1);
              }
            }}
          >
            Next
          </span>
        </div>
      </div>
    </>
  );
};

export default Pagination;
