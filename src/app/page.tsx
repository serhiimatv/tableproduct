import DropdownMenu from "@/components/DropdownMenu";
import Pagination from "@/components/Pagination";
import SearchInput from "@/components/SearchInput";
import TableBodyRow from "@/components/TableBodyRow";
import TableHeadItem from "@/components/TableHeadItem";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { Product } from "@/model/product";
import { promises as fs } from "fs";
import { Suspense } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    perpage?: string;
    page?: string;
    search?: string;
  };
}) {
  const file = await fs.readFile(process.cwd() + "/src/data.json", "utf8");
  const data: Product[] = JSON.parse(file);

  const perpage = searchParams?.perpage || "10";
  const page = Number(searchParams?.page) || 1;
  const search = searchParams?.search || "";

  const filterProducts = () => {
    if (search.trim() === "") {
      return data;
    } else {
      return data.filter((item) =>
        item.productName.toLocaleLowerCase().includes(search)
      );
    }
  };

  return (
    <main>
      <div className="flex items-center p-4 gap-3">
        <span className="text-[12px] font-medium dark:text-white">Show</span>
        <Suspense>
          <DropdownMenu perPage={perpage.toString()} />
        </Suspense>
        <span className="mr-3 text-[12px] font-medium dark:text-white">
          entries
        </span>
        <Suspense>
          <SearchInput />
        </Suspense>
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
              page={page}
              perpage={Number(perpage)}
            />
          </tbody>
        </table>
      </div>
      <Suspense>
        <Pagination
          totalCount={filterProducts().length}
          currentPage={page}
          perPage={Number(perpage)}
          siblingCount={1}
        />
      </Suspense>
    </main>
  );
}
