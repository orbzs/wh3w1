"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleLoginSubmit: React.ComponentProps<"form">["onSubmit"] = async (
    e,
  ) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const user = userCredential.user;
      console.log("user: ", user);
      console.log("login successed:", {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
      });
      router.push("/accounting");
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
      else console.log(error);
    }
  };
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center bg-zinc-100 bg-[linear-gradient(rgb(244,244,245)_98%,#d9ff416c)]">
      <form
        onSubmit={handleLoginSubmit}
        className="stragecolor flex min-h-80 w-13/24 min-w-80 flex-col items-center justify-between gap-6 rounded-[72px] p-8 pt-10 transition-all duration-1600 ease-in-out hover:translate-y-[6px]"
      >
        <div className="pb-4 text-xl font-semibold text-nowrap text-neutral-700">
          登入系統
        </div>
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
            登入
          </button>
        </div>
      </form>
    </div>
  );
}
