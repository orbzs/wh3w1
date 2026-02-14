"use client";

import { Row } from "../types";
interface ListsProp {
  row: Row;
  deleteList: (id: number) => void;
}

export default function List({ row, deleteList }: ListsProp) {
  return (
    <div
      className={`mt-2 flex w-full justify-center gap-6 transition-all duration-200 hover:translate-x-[10px] hover:text-neutral-500 ${row.type === "expense" ? "hover:text-neutral-500" : "hover:border-0"}`}
    >
      <div
        className={`w-3/12 overflow-hidden rounded-[16px] border-r-2 border-l-2 px-3 text-ellipsis ${row.type === "expense" ? "border-0" : "border-0"}`}
      >
        {row.type === "expense" ? "-" : "+"}
        {row.amount}
      </div>
      <div className="w-5/12 overflow-hidden rounded-[16px] border-r-2 border-l-2 px-3 text-ellipsis">
        {row.content}
      </div>
      <button
        type="button"
        className="w-1/12 cursor-pointer rounded-[16px] border-r-2 border-l-2 transition duration-200 ease-in hover:translate-x-[8px] hover:text-neutral-600"
        onClick={() => {
          deleteList(row.id);
        }}
      >
        x
      </button>
    </div>
  );
}
