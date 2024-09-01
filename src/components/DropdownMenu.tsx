"use client";
import { Dispatch, FC, SetStateAction, useState } from "react";

interface IProps {
  perPage: number;
  setPerPage: Dispatch<SetStateAction<number>>;
}

const DropdownMenu: FC<IProps> = ({ perPage, setPerPage }) => {
  const perPageCounts = [10, 20, 30, 40, 60, 100];

  const [isShow, setIsShow] = useState(false);

  return (
    <>
      <div
        className="flex items-center justify-center w-11 py-2 bg-gray rounded-lg relative cursor-pointer
                  dark:bg-darkViolet"
        onClick={() => setIsShow(!isShow)}
      >
        <button className="flex items-center" type="button">
          <span className="text-[12px] mr-1 dark:text-white">{perPage}</span>
          <svg
            width="8"
            height="9"
            viewBox="0 0 8 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.624 6.07 1.226 3.329a.5.5 0 0 1 .376-.829h4.796a.5.5 0 0 1 .377.83L4.377 6.07a.5.5 0 0 1-.753 0z"
              className="fill-grayBorder dark:fill-white"
            />
          </svg>
        </button>
        {isShow && (
          <div
            className="absolute w-11 top-10 left-0 py-2 bg-gray rounded-lg
                          dark:bg-darkViolet"
          >
            <ul className="flex flex-col justify-center text-sm">
              {perPageCounts.map((item) => {
                if (item !== perPage) {
                  return (
                    <li
                      className="text-[12px] cursor-pointer hover:bg-hoverGray px-[10px] text-center
                                dark:text-white dark:hover:bg-buttonVioletHover"
                      key={item}
                      onClick={() => {
                        setPerPage(item);
                        setIsShow(false);
                      }}
                    >
                      {item}
                    </li>
                  );
                }
              })}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default DropdownMenu;
