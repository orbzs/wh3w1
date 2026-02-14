import Link from "next/link";

export default function Home() {
  return (
    <main className="stragecolor relative flex h-full w-full flex-col items-center justify-center pt-12">
      <div className="flex min-h-1/3 w-3/5 flex-col items-end justify-center text-neutral-700">
        <h1 className="pt-8 pb-4 text-right text-6xl font-black text-pretty">
          React練習專案
        </h1>
        <p className="pb-8 text-xl font-semibold text-nowrap">
          請先登入或註冊以進入記帳頁面
        </p>
      </div>
      <div className="ease-[cubic-bezier(0.4, 0, 1, 1)] flex w-3/5 flex-col items-end justify-center transition-all duration-800 hover:translate-y-[12px]">
        <Link
          className="z-10 rounded-full bg-neutral-700 p-6 px-12 text-lg font-bold text-zinc-300"
          href="/login"
        >
          登入
        </Link>
      </div>
      <div className="ease-[cubic-bezier(0.4, 0, 1, 1)] mt-4 flex w-3/5 flex-col items-end justify-center transition-all duration-800 hover:translate-y-[12px]">
        <Link
          className="z-10 rounded-full bg-neutral-700 p-6 px-12 text-lg font-bold text-zinc-300"
          href="/signup
          "
        >
          註冊
        </Link>
      </div>
    </main>
  );
}
