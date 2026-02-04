import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <div className="">
        <h1 className="">React練習專案</h1>
        <p className="">歡迎光臨我的介面，請點選下方按鈕進入記帳小工具</p>
      </div>
      <div className="">
        <Link className="" href="/accounting">
          點此開始
        </Link>
      </div>
    </main>
  );
}
