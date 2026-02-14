"use client";

import { signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "../../firebase";

export default function Logout() {
  const router = useRouter();
  const handleLogout: React.ComponentProps<"button">["onClick"] = async (e) => {
    e.preventDefault();
    try {
      await signOut(auth);
      console.log("logout!");
      onAuthStateChanged(auth, async (user) => {
        if (!user) {
          console.log("no user");
          router.push("/");
        }
      });
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
      else console.log(error);
    }
  };

  return (
    <button className="relative z-9 p-2 px-6" onClick={handleLogout}>
      ← 登出並返回首頁
    </button>
  );
}
