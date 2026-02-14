"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, getDoc, type Timestamp } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSignupSubmit: React.ComponentProps<"form">["onSubmit"] = async (
    e,
  ) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      // ⭐ 把 name 存進 displayName
      await updateProfile(userCredential.user, {
        displayName: name.trim(),
      });
      console.log("user: ", user);
      console.log("signup successed:", {
        uid: userCredential.user.uid,
        displayName: userCredential.user.displayName,
        email: userCredential.user.email,
      });
      await setDoc(doc(db, "users", user.uid), {
        name: name.trim(),
        email: email.toLowerCase(),
        // uid: userCredential.user.uid,
        createdAt: new Date(),
      });
      router.push("/login");
    } catch (error) {
      //catch (error) { console.log(error.message); } 在 TS 可能會被抱怨 error 是 unknown
      if (error instanceof Error) console.log(error.message);
      else console.log(error);
    }
  };
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center bg-zinc-100 bg-[linear-gradient(rgb(244,244,245)_98%,#d9ff416c)]">
      <form
        onSubmit={handleSignupSubmit}
        className="stragecolor flex min-h-80 w-13/24 min-w-80 flex-col items-center justify-between gap-4 rounded-[72px] p-8 pt-10 transition-all duration-1600 ease-in-out hover:translate-y-[6px]"
      >
        <div className="pb-2 text-xl font-semibold text-nowrap text-neutral-700">
          註冊帳號
        </div>
        <input
          type="text"
          placeholder="使用者名稱"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          required
          className="focus:border-teal h-22/24 w-9/24 rounded-[36px] border-r-2 border-l-2 px-3 font-semibold transition-all duration-400 hover:text-neutral-600 focus:ring-1 focus:outline-none"
        />
        <input
          type="email"
          placeholder="電子信箱"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
          className="focus:border-teal h-22/24 w-9/24 rounded-[36px] border-r-2 border-l-2 px-3 font-semibold transition-all duration-400 hover:text-neutral-600 focus:ring-1 focus:outline-none"
        />
        <input
          type="password"
          placeholder="密碼"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
          className="focus:border-teal h-22/24 w-9/24 rounded-[36px] border-r-2 border-l-2 px-3 font-semibold transition-all duration-400 hover:text-neutral-600 focus:ring-1 focus:outline-none"
        />
        <div className="ease-[cubic-bezier(0.4, 0, 1, 1)] flex w-3/5 flex-col items-center justify-center transition-all duration-800 hover:translate-y-[12px]">
          <button
            type="submit"
            className="curser-pointer z-10 rounded-full bg-neutral-700 p-4 px-12 text-lg font-bold text-zinc-300"
          >
            註冊
          </button>
        </div>
      </form>
    </div>
  );
}
