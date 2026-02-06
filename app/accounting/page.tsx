"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Form from "./component/Form";
import List from "./component/List";

import { Row } from "./types";
import { NewRow } from "./types";

const KEY = "accounting_rows";

export default function Home() {
  const [rows, setRows] = useState<Row[]>([]);

  // 在useState之後才用useEffect讀 localStorage，避免 hydration 失敗
  useEffect(() => {
    const raw = localStorage.getItem(KEY);
    if (!raw) return;

    try {
      const data = JSON.parse(raw) as Row[];
      //
      if (Array.isArray(data)) setRows(data);
    } catch {
      setRows([]);
    }
  }, []);

  // 2. 當 rows 變更，寫回 localStorage
  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(rows));
  }, [rows]);

  const addList = (row: NewRow) => {
    console.log(`row: ${row}`);
    console.log(`rows: ${rows}`);
    setRows((rows) => [...rows, { ...row, id: Math.random() }]);
    // setRows([...rows, { ...row, id: Math.random() }]);可能會讀到舊值>>stale state
    // 改成functional updater
  };

  const deleteList = (id: number) => {
    setRows((rows) =>
      rows.filter((row) => {
        return row.id !== id;
      }),
    );
    // functional updater
  };

  return (
    <div className="bg-[linear-gradient(rgb(244,244,245)_98%,#d9ff416c)] relative bg-zinc-100 w-full h-full flex flex-col justify-center items-center">
      <main className="  w-full h-full flex justify-start gap-16 items-center flex-col ">
        <div className="pt-6 font-bold text-[22px] navboxshadow h-20 stragecolor w-full flex justify-center items-center justify-self-start">
          記帳小工具
        </div>
        <div className="hover:translate-y-[6px] ease-in-out transition-all duration-1600 rounded-[72px] stragecolor p-8 pt-10 min-h-80  min-w-80 w-13/24 flex justify-between items-center gap-3 flex-col">
          <Form addList={addList} />
          <div className="overflow-y-auto  [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] h-full flex gap-2 flex-col justify-center w-full">
            {rows.map((row) => {
              console.log(row);
              console.log(rows);
              return <List row={row} key={row.id} deleteList={deleteList} />;
            })}
          </div>

          <div className="py-4 font-semibold">
            小計：
            {rows.reduce((accumulator, row) => {
              return (
                accumulator +
                (row.type === "expense" ? -row.amount : row.amount)
              );
            }, 0)}
          </div>
        </div>
        <div className="absolute bottom-1/8 left-1/12  hover:translate-y-[6px] transition-all ease-[cubic-bezier(0.4, 0, 1, 1)] duration-800 hover:text-zinc-300 hover:font-black ">
          <div
            className="bg-zinc-200 overflow group relative overflow-hidden rounded-full p-6 before:absolute before:top-full before:left-0 before:h-full
before:w-full before:bg-neutral-800 before:transition-transform before:ease-in before:duration-500 hover:before:-translate-y-full
"
          >
            <Link className="relative z-9 p-4 px-6 " href="/">
              ← 返回首頁
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
