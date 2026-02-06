import Link from "next/link";

export default function Home() {
  return (
    <main className="relative stragecolor w-full h-full flex flex-col justify-center items-center pt-12">
      <div className="text-neutral-700 w-3/5 min-h-1/3 flex flex-col justify-center items-end ">
        <h1 className="text-pretty text-right text-6xl pb-4 pt-8 font-black ">
          React練習專案
        </h1>
        <p className="text-nowrap text-xl pb-8 font-semibold">
          請點選下方按鈕進入記帳頁面
        </p>
      </div>
      <div className="hover:translate-y-[12px] transition-all ease-[cubic-bezier(0.4, 0, 1, 1)] duration-800 w-3/5 flex flex-col justify-center items-end">
        <Link
          className="z-10 text-lg font-bold bg-neutral-700 rounded-full p-6 px-12 text-zinc-300
"
          href="/accounting"
        >
          點此開始
        </Link>
      </div>
    </main>
  );
}
