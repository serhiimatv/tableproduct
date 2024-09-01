"use client";
import { FC, useEffect, useState } from "react";
import DropdownMenu from "@/components/DropdownMenu";
import SearchInput from "@/components/SearchInput";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import TableHeadItem from "@/components/TableHeadItem";
import TableBodyRow from "@/components/TableBodyRow";
import { Product } from "@/model/product";
import Pagination from "./Pagination";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const Table: FC<{ data: Product[] }> = ({ data }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [products, setProducts] = useState<Product[]>(data);

  const [search, setSearch] = useState("");

  const [perPage, setPerPage] = useState(10);

  const [pageNumber, setPageNumber] = useState(1);

  const removeProductHandler = (id: number) => {
    setProducts(products.filter((item) => item.trackingId !== id));
  };

  const filterProducts = () => {
    if (search.trim() === "") {
      return products;
    } else {
      return products.filter((item) => {
        if (item.productName.toLocaleLowerCase().includes(search)) {
          return true;
        }
      });
    }
  };

  useEffect(() => {
    setPageNumber(
      Number(searchParams.get("page")) === 0
        ? 1
        : Number(searchParams.get("page"))
    );
  }, [searchParams]);

  useEffect(() => {
    if (search.trim() !== "") {
      replace(`${pathname}`);
    }
  }, [search]);

  useEffect(() => {
    replace(`${pathname}`);
  }, [perPage]);

  return (
    <>
      <div className="flex items-center p-4 gap-3">
        <span className="text-[12px] font-medium dark:text-white">Show</span>
        <DropdownMenu perPage={perPage} setPerPage={setPerPage} />
        <span className="mr-3 text-[12px] font-medium dark:text-white">
          entries
        </span>
        <SearchInput search={search} setSearch={setSearch} />
        <ThemeSwitcher />
        <button className="flex items-center gap-2 px-3 py-2 bg-buttonViolet rounded-lg text-white font-bold hover:bg-buttonVioletHover">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.5 2.75a.75.75 0 0 0-1.5 0V7H2.75a.75.75 0 0 0 0 1.5H7v4.25a.75.75 0 1 0 1.5 0V8.5h4.25a.75.75 0 1 0 0-1.5H8.5V2.75z"
              fill="#fff"
            />
          </svg>{" "}
          Add Customer
        </button>
      </div>
      <div>
        <table className="w-full flex-col">
          <thead>
            <tr className="grid grid-cols-[7%_28%_15%_7%_11.5%_10.5%_9%_12%] px-4 h-16">
              <TableHeadItem>Tracking ID</TableHeadItem>
              <TableHeadItem isIcon={true}>Product</TableHeadItem>
              <TableHeadItem isIcon={true}>Customer</TableHeadItem>
              <TableHeadItem isIcon={true}>Date</TableHeadItem>
              <TableHeadItem>Amount</TableHeadItem>
              <TableHeadItem>Payment Mode</TableHeadItem>
              <TableHeadItem isIcon={true}>Status</TableHeadItem>
              <TableHeadItem>Action</TableHeadItem>
            </tr>
          </thead>
          <tbody>
            <TableBodyRow
              products={filterProducts()}
              perPage={perPage}
              pageNumber={pageNumber}
              onRemove={removeProductHandler}
            />
          </tbody>
        </table>
      </div>
      <Pagination
        totalCount={filterProducts().length}
        currentPage={pageNumber}
        perPage={perPage}
        siblingCount={1}
      />
    </>
  );
};

export default Table;
