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
    <>
      <form onSubmit={handleLoginSubmit} className="flex flex-col gap-2 p-8">
        <div>Log in</div>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
        />
        <input
          type="password"
          placeholder="pw"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />
        <button type="submit" className="cursor-pointer bg-stone-100">
          Log in
        </button>
      </form>
    </>
  );
}
