"use client";
import { useState } from "react";
import Link from "next/link";
import Form from "./component/Form";
import List from "./component/List";

export default function Home() {
  const [rows, setRows] = useState([
    { type: "expense", number: "100", content: "吃飯", id: Math.random() },
  ]);

  const addList = (row: any) => {
    console.log(`row: ${row}`);
    setRows([...rows, { ...row, id: Math.random() }]);
  };

  const deleteList = (id: any) => {
    setRows(
      rows.filter((row) => {
        return row.id !== id;
      }),
    );
  };

  return (
    <div className="">
      <main className="flex items-center justify-center flex-col">
        <div className="">記帳小工具</div>
        <div>
          <Form addList={addList} />
          {rows.map((row) => {
            console.log(row);
            return <List row={row} key={row.id} deleteList={deleteList} />;
          })}
          {/* 看不懂
          {rows.map(() => {
            return <List />;
          })} */}
        </div>
        <div>小計</div>
        <div>
          <Link href="/">返回首頁</Link>
        </div>
      </main>
    </div>
  );
}
