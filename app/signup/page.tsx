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
    <form onSubmit={handleSignupSubmit} className="flex flex-col gap-2 p-8">
      <div>Sign up</div>
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        required
      />
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
        Sign up
      </button>
    </form>
  );
}
