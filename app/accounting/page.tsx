"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Form from "./component/Form";
import List from "./component/List";
import Logout from "./component/Logout";
import { onAuthStateChanged, type User } from "firebase/auth";
import {
  doc,
  getDocs,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../firebase";

import { Row } from "./types";
import { NewRow } from "./types";

export default function Home() {
  // 驗證
  const router = useRouter();

  const [rows, setRows] = useState<Row[]>([]); //直接變成空陣列會讓addList的setRows：類型 'any' 不可指派給類型 'never'。row.id：類型 'never' 沒有屬性 'id'。

  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      console.log("please login or signup");
      router.push("/");
    } else {
      console.log("user.uid: ", user.uid);
      // const querySnapshot = await getDocs(
      //   collection(db, "users", user.uid, "transactions"),
      // );
      // // 1
      // querySnapshot.forEach((doc) => {
      //   console.log(doc.id, " => ", doc.data());
      // });
      // // 2
      // querySnapshot.forEach((docSnap) => {
      //   const data = docSnap.data();
      //   const row = { id: docSnap.id, ...data };
      //   console.log(row);
      // });
      // // 3
      // console.log("querySnapshot.docs =>", querySnapshot.docs);
      // const rows = querySnapshot.docs.map((docSnap) => ({
      //   id: docSnap.id,
      //   ...docSnap.data(),
      // }));
      // console.log(rows);
    }
  });

  const addList = (row: NewRow) => {
    console.log(`row: ${row}`);
    console.log(`rows: ${rows}`);
    setRows((rows) => [...rows, { ...row, id: Math.random() }]);
    // setRows([...rows, { ...row, id: Math.random() }]);可能會讀到舊值>>stale state
    // 改成functional updater

    // onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //     addDoc(collection(db, "users", user.uid, "transactions"), {
    //       ...row,
    //       createdAt: serverTimestamp(),
    //     });
    //     console.log("add row at:", serverTimestamp);
    //   }
    // });
  };

  const deleteList = (id: number) => {
    setRows(
      rows.filter((row) => {
        return row.id !== id;
      }),
    );
  };

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center bg-zinc-100 bg-[linear-gradient(rgb(244,244,245)_98%,#d9ff416c)]">
      <main className="flex h-full w-full flex-col items-center justify-start gap-16">
        <div className="navboxshadow stragecolor flex h-20 w-full items-center justify-center justify-self-start pt-6 text-[22px] font-bold">
          記帳小工具
        </div>
        <div className="stragecolor flex min-h-80 w-13/24 min-w-80 flex-col items-center justify-between gap-3 rounded-[72px] p-8 pt-10 transition-all duration-1600 ease-in-out hover:translate-y-[6px]">
          <Form addList={addList} />
          <div className="flex h-full w-full flex-col justify-center gap-2 overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
        <div className="ease-[cubic-bezier(0.4, 0, 1, 1)] absolute bottom-1/8 left-1/12 transition-all duration-800 hover:translate-y-[6px] hover:font-black hover:text-zinc-300">
          <div className="overflow group relative overflow-hidden rounded-full bg-zinc-200 p-6 before:absolute before:top-full before:left-0 before:h-full before:w-full before:bg-neutral-800 before:transition-transform before:duration-500 before:ease-in hover:before:-translate-y-full">
            <Logout />
          </div>
        </div>
      </main>
    </div>
  );
}
