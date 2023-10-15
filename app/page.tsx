"use client";
import { Button, Select } from "@radix-ui/themes";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<Record<string, string | number>[]>([]);
  const getAllData = async () => {
    const res = await axios.get("/api/issues");
    setData(res.data);
  };

  const handleDelete = async (index: any, e: any) => {
    await axios.delete(`/api/issues/${index}`);
  };
  useEffect(() => {
    getAllData();
  }, [data]);
  return (
    <div className="flex justify-center">
      <div className="flex flex-col">
        <div className="mb-3">
          <Link href="/issues">
            <Button color="blue" className="m-4 flex float-right">
              {" "}
              + New Issue
            </Button>
          </Link>
        </div>
        <table className=" border-spacing-4 border border-slate-500">
          <thead className=" bg-zinc-300 border border-slate-600">
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody className="p-4 bg-blue-200">
            {data.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>{item.desc}</td>
                <td>
                  <select className=" bg-blue-200">
                    <option>Open</option>
                    <option>In_Progress</option>
                    <option>Closed</option>
                  </select>
                </td>
                <td>
                  {new Date(item.createdAt).toLocaleString().split(",")[0]}
                </td>
                <td>
                  <Button onClick={(e) => handleDelete(item.id, e)}>
                    {" "}
                    Delete{" "}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
