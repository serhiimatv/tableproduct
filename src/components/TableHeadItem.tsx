import { FC, ReactNode } from "react";

interface IProps {
  isIcon?: boolean;
  children?: ReactNode;
}

const TableHeadItem: FC<IProps> = ({ isIcon, children }) => {
  return (
    <>
      <th className="flex justify-center items-center cursor-pointer">
        {children}
        {isIcon && (
          <svg
            width="17"
            height="17"
            viewBox="0 0 17 17"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-grayBorder dark:fill-white ml-4"
          >
            <path d="M4.651 7.833h7.698c.575 0 .88-.68.498-1.11L9 2.393a.666.666 0 0 0-.996 0l-3.85 4.33a.667.667 0 0 0 .498 1.11zm3.351 6.773a.666.666 0 0 0 .996 0l3.849-4.33a.666.666 0 0 0-.498-1.11H4.65c-.574 0-.88.68-.498 1.11l3.849 4.33z" />
          </svg>
        )}
      </th>
    </>
  );
};

export default TableHeadItem;
