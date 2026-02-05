"use client";
import { useState } from "react";
import Link from "next/link";
import Form from "./component/Form";
import List from "./component/List";

import { Row } from "./types";
import { NewRow } from "./types";

export default function Home() {
  const [rows, setRows] = useState<Row[]>([]); //直接變成空陣列會讓addList的setRows：類型 'any' 不可指派給類型 'never'。row.id：類型 'never' 沒有屬性 'id'。

  const addList = (row: NewRow) => {
    console.log(`row: ${row}`);
    console.log(`rows: ${rows}`);
    setRows((rows) => [...rows, { ...row, id: Math.random() }]);
    // setRows([...rows, { ...row, id: Math.random() }]);可能會讀到舊值>>stale state
    // 改成functional updater
  };

  const deleteList = (id: number) => {
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
            console.log(rows);
            return <List row={row} key={row.id} deleteList={deleteList} />;
          })}
          {/* 看不懂
          {rows.map(() => {
            return <List />;
          })} */}
        </div>
        <div>
          小計：
          {rows.reduce((accumulator, row) => {
            return (
              accumulator + (row.type === "expense" ? -row.amount : row.amount)
            );
          }, 0)}
        </div>
        <div>
          <Link href="/">返回首頁</Link>
        </div>
      </main>
    </div>
  );
}
