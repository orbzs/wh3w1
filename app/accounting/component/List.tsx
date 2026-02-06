"use client";

import { Row } from "../types";
interface ListsProp {
  row: Row;
  deleteList: (id: number) => void;
}

export default function List({ row, deleteList }: ListsProp) {
  return (
    <div className="hover:translate-x-[8px] transition-all duration-200 flex justify-center gap-6 w-full mt-2">
      <div
        className={`overflow-hidden text-ellipsis w-3/12 border-r-2 border-l-2 rounded-[16px] px-3  ${row.type === "expense" ? "border-0" : "border-0"}`}
      >
        {row.type === "expense" ? "-" : "+"}
        {row.amount}
      </div>
      <div className="overflow-hidden text-ellipsis w-5/12 border-r-2 border-l-2 rounded-[16px] px-3 ">
        {row.content}
      </div>
      <button
        type="button"
        className="w-1/12 border-r-2 border-l-2 rounded-[16px]"
        onClick={() => {
          deleteList(row.id);
        }}
      >
        x
      </button>
    </div>
  );
}
