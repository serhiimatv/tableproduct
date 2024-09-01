import { Product } from "@/model/product";
import Image from "next/image";
import { FC } from "react";

interface IProps {
  products: Product[];
  perPage: number;
  pageNumber: number;
  onRemove: (id: number) => void;
}

const statusTheme = {
  Cancelled: "text-redText bg-redBg",
  Delivered: "text-greenText bg-greenBg",
  Process: "text-orangeText bg-orangeBg",
};

const TableBodyRow: FC<IProps> = ({
  products,
  pageNumber,
  perPage,
  onRemove,
}) => {
  return (
    <>
      {products.map((item, idx) => {
        if (
          idx < perPage * pageNumber &&
          idx > (pageNumber - 1) * perPage - 1
        ) {
          return (
            <tr
              className="px-4 grid grid-cols-[7%_28%_15%_7%_11.5%_10.5%_9%_12%] h-16 bg-lightViolet even:bg-white
                       dark:bg-semiDarkViolet even:dark:bg-violet"
              key={item.trackingId}
            >
              <td className="flex justify-center items-center">
                #{item.trackingId}
              </td>
              <td className="flex items-center pl-10">
                <div className="w-8 h-8 rounded-lg mr-2 relative shrink-0">
                  <Image
                    src={item.productImage}
                    fill={true}
                    alt="product"
                    sizes="(32px_32px)"
                    className="rounded-lg"
                  />
                </div>
                <span className="truncate">{item.productName}</span>
              </td>
              <td className="flex items-center pl-10">{item.customer}</td>
              <td className="flex justify-center items-center">{item.date}</td>
              <td className="flex justify-center items-center">
                ${item.amount}
              </td>
              <td className="flex justify-center items-center">
                {item.paymentMode}
              </td>
              <td className="flex justify-center items-center">
                <span
                  className={`px-3 py-2 rounded-[22px] ${
                    statusTheme[item.status]
                  }`}
                >
                  {item.status}
                </span>
              </td>
              <td className="flex justify-center items-center gap-5">
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="cursor-pointer"
                >
                  <path
                    d="M11.625 4h-7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                    stroke="#624DE3"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19.125 2.5a2.121 2.121 0 1 1 3 3l-9.5 9.5-4 1 1-4 9.5-9.5z"
                    stroke="#624DE3"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="cursor-pointer"
                  onClick={() => onRemove(item.trackingId)}
                >
                  <path
                    d="M3.625 6h18M8.625 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V6h14zM10.625 11v6M14.625 11v6"
                    stroke="#A30D11"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </td>
            </tr>
          );
        }
      })}
    </>
  );
};

export default TableBodyRow;
