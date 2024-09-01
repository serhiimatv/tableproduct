"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface IProps {
  totalPage: number;
  pageNumber: number;
}

const Pagination: FC<IProps> = ({ totalPage, pageNumber }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <div className="flex justify-center items-center h-16">
        <div className="flex items-center gap-3 h-full">
          <span
            className="text-[12px] text-grayBorder cursor-pointer dark:text-white"
            onClick={() => {
              if (pageNumber - 1 === 0) {
                return undefined;
              } else {
                goToPage(pageNumber - 1);
              }
            }}
          >
            Previous
          </span>
          <span
            className={`flex justify-center items-center h-[31px] w-[31px] rounded-lg cursor-pointer 
                          ${
                            pageNumber !== 1
                              ? "bg-gray dark:bg-darkViolet"
                              : "text-white bg-buttonViolet"
                          }`}
            onClick={() => {
              goToPage(1);
            }}
          >
            1
          </span>
          {totalPage > 3 && pageNumber >= 4 ? (
            <span className="text-lg">...</span>
          ) : null}
          {pageNumber - 1 > 1 && (
            <span
              className="flex justify-center items-center h-[31px] w-[31px] rounded-lg cursor-pointer bg-gray dark:bg-darkViolet"
              onClick={() => {
                goToPage(pageNumber - 1);
              }}
            >
              {pageNumber - 1}
            </span>
          )}
          {pageNumber !== 1 && pageNumber !== totalPage ? (
            <span className="flex justify-center items-center h-[31px] w-[31px] rounded-lg cursor-pointer text-white bg-buttonViolet">
              {pageNumber}
            </span>
          ) : null}
          {pageNumber + 1 !== totalPage && pageNumber !== totalPage ? (
            <span
              className="flex justify-center items-center h-[31px] w-[31px] rounded-lg cursor-pointer bg-gray dark:bg-darkViolet"
              onClick={() => {
                goToPage(pageNumber + 1);
              }}
            >
              {pageNumber + 1}
            </span>
          ) : null}
          {totalPage > 3 && pageNumber <= totalPage - 3 ? (
            <span className="text-lg">...</span>
          ) : null}
          {totalPage !== 1 && (
            <span
              className={`flex justify-center items-center h-[31px] w-[31px] rounded-lg cursor-pointer 
                          ${
                            pageNumber !== totalPage
                              ? "bg-gray dark:bg-darkViolet"
                              : "text-white bg-buttonViolet"
                          }`}
              onClick={() => {
                goToPage(totalPage);
              }}
            >
              {totalPage}
            </span>
          )}
          <span
            className="text-[12px] text-grayBorder cursor-pointer dark:text-white"
            onClick={() => {
              if (pageNumber + 1 > totalPage) {
                return undefined;
              } else {
                goToPage(pageNumber + 1);
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
