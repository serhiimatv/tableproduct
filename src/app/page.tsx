import Table from "@/components/Table";
import { promises as fs } from "fs";

export default async function Home() {
  const file = await fs.readFile(process.cwd() + "/data.json", "utf8");
  const data = JSON.parse(file);

  return (
    <main>
      <Table data={data} />
    </main>
  );
}
