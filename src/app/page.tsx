import Table from "@/components/Table";
import { promises as fs } from "fs";
import { Suspense } from "react";

export default async function Home() {
  const file = await fs.readFile(process.cwd() + "/data.json", "utf8");
  const data = JSON.parse(file);

  return (
    <main>
      <Suspense>
        <Table data={data} />
      </Suspense>
    </main>
  );
}
