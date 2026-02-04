"use client";

type RowsType = "expense" | "income";

interface Row {
  type: RowsType;
  number: string;
  content: string;
  id: number;
}

interface ListsProp {
  row: Row;
  deleteList: (id: number) => void;
}

export default function List({ row, deleteList }: ListsProp) {
  return (
    <div className="flex justify-evenly">
      <div
        className={row.type === "expense" ? "text-red-900" : "text-green-800"}
      >
        {row.type === "expense" ? "-" : "+"}
        {row.number}
      </div>
      <div>{row.content}</div>
      <button
        type="button"
        className="bg-green-300"
        onClick={() => {
          deleteList(row.id);
        }}
      >
        刪除
      </button>
    </div>
  );
}
