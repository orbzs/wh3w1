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
    <div className="relative bg-zinc-100 w-full h-full flex flex-col justify-center items-center">
      <main className="bg-zinc-00 w-full h-full flex justify-start gap-16 items-center flex-col ">
        <div className="text-[22px] navboxshadow h-20 stragecolor w-full flex justify-center items-center justify-self-start">
          記帳小工具
        </div>
        <div className="overflow-y-auto rounded-[72px] stragecolor p-8 pt-10 min-h-80  min-w-80 w-13/24 flex justify-between items-center gap-3 flex-col">
          <Form addList={addList} />
          <div className="h-full flex gap-2 flex-col justify-center w-full">
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

          <div className="p-4">
            小計：
            {rows.reduce((accumulator, row) => {
              return (
                accumulator +
                (row.type === "expense" ? -row.amount : row.amount)
              );
            }, 0)}
          </div>
        </div>

        <div>
          <Link
            className="p-4 bg-zinc-200 absolute bottom-1/8 left-1/12 rounded-full"
            href="/"
          >
            ← 返回首頁
          </Link>
        </div>
      </main>
    </div>
  );
}
