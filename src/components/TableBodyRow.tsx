import { Product } from "@/model/product";
import Image from "next/image";
import { FC } from "react";
import ActionButtons from "./Actions";

interface IProps {
  products: Product[];
  perpage: number;
  page: number;
}

const statusTheme = {
  Cancelled: "text-redText bg-redBg",
  Delivered: "text-greenText bg-greenBg",
  Process: "text-orangeText bg-orangeBg",
};

const TableBodyRow: FC<IProps> = ({ products, perpage, page }) => {
  return (
    <>
      {products.map((item, idx) => {
        if (idx < perpage * page && idx > (page - 1) * perpage - 1) {
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
              <ActionButtons />
            </tr>
          );
        }
      })}
    </>
  );
};

export default TableBodyRow;
