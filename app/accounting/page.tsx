"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Form from "./component/Form";
import List from "./component/List";
import Logout from "./component/Logout";
import { onAuthStateChanged } from "firebase/auth";
import {
  doc,
  getDoc,
  getDocs,
  addDoc,
  collection,
  serverTimestamp,
  deleteDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase";

import { Row, NewRow } from "./types";

const KEY = "accounting_rows";

export default function Home() {
  const [rows, setRows] = useState<Row[]>([]); //直接變成空陣列會讓addList的setRows：類型 'any' 不可指派給類型 'never'。row.id：類型 'never' 沒有屬性 'id'。
  const [displayName, setDisplayName] = useState<string>("");

  // 驗證
  const router = useRouter();
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        console.log("please login or signup");
        router.push("/");
        return;
      }

      console.log("user.uid: ", user.uid);

      const snap = await getDoc(doc(db, "users", user.uid));
      setDisplayName(snap.data()!.name);

      const querySnapshot = await getDocs(
        collection(db, "users", user.uid, "transactions"),
      );

      const fetchedRows: Row[] = querySnapshot.docs.map((docSnap) => {
        const data = docSnap.data() as Omit<Row, "id">; // type/amount/content
        return {
          id: docSnap.id,
          ...data,
        };
      });

      setRows(fetchedRows);
    });
  }, []);

  const addList = async (row: NewRow) => {
    const user = auth.currentUser;
    if (!user) {
      console.log("no user, cannot add");
      router.push("/");
      return;
    }

    try {
      const docRef = await addDoc(
        collection(db, "users", user.uid, "transactions"),
        {
          ...row,
          createdAt: serverTimestamp(),
        },
      );
      setRows((rows) => [...rows, { ...row, id: docRef.id }]);
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
      else console.log(error);
    }
  };

  const deleteList = async (id: string) => {
    const user = auth.currentUser;
    if (!user) {
      console.log("no user, cannot delete");
      router.push("/");
      return;
    }

    try {
      await deleteDoc(doc(db, "users", user.uid, "transactions", id));
      setRows((rows) => rows.filter((row) => row.id !== id));
      console.log("deleted:", id);
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
      else console.log(error);
    }
  };

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center bg-zinc-100 bg-[linear-gradient(rgb(244,244,245)_98%,#d9ff416c)]">
      <main className="flex h-full w-full flex-col items-center justify-start gap-16">
        <div className="navboxshadow stragecolor flex h-20 w-full items-center justify-center justify-self-start pt-6 text-[22px] font-bold">
          您好，{displayName}！
        </div>
        <div className="stragecolor flex min-h-80 w-13/24 min-w-80 flex-col items-center justify-between gap-3 rounded-[72px] p-8 pt-10 transition-all duration-1600 ease-in-out hover:translate-y-[6px]">
          <Form addList={addList} />
          <div className="flex h-full w-full flex-col justify-center gap-2 overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {rows.map((row) => {
              // console.log(row);
              // console.log(rows);
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
