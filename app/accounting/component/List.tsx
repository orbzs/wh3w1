export default function List({ row }: any) {
  return (
    <div className="flex justify-evenly">
      <div
        className={row.type === "expense" ? "text-red-900" : "text-green-800"}
      >
        {row.type === "expense" ? "-" : "+"}
        {row.number}
      </div>
      <div>{row.content}</div>
      <button className="bg-green-300">刪除</button>
    </div>
  );
}
