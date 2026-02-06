import Link from "next/link";

export default function Home() {
  return (
    <main className="stragecolor w-full h-full flex flex-col justify-center items-center pt-8">
      <div className="w-3/5 h-1/3 flex flex-col justify-center items-end ">
        <h1 className="text-6xl pb-4 pt-8 font-black">React練習專案</h1>
        <p className="text-xl pb-8 font-semibold">請點選下方按鈕進入記帳頁面</p>
      </div>
      <div className=" w-3/5 flex flex-col justify-center items-end">
        <Link
          className="text-lg font-bold bg-neutral-700 rounded-full p-6 px-12 text-[#d9ff41]
"
          href="/accounting"
        >
          點此開始
        </Link>
      </div>
    </main>
  );
}
