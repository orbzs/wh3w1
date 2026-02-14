"use client";
import { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

import { NewRow } from "../types";
interface FormProps {
  addList: (row: NewRow) => void;
}

export default function Form({ addList }: FormProps) {
  const [type, setType] = useState<"expense" | "income">("expense");
  const [amountString, setAmount] = useState<string>(""); //讓父元件把資料傳給子元件
  const [content, setContent] = useState<string>(""); //現在有變數amountString跟content

  const setExButton = () => {
    setType("expense");
  };
  const setInButton = () => {
    setType("income");
  };

  // 直接控制正整數以外不要出現在input
  const handleChange: React.ComponentProps<"input">["onChange"] = (e) => {
    const newAmStValue = e.target.value;
    const re = /^[1-9]\d*$/;
    if (newAmStValue === "" || re.test(newAmStValue)) {
      setAmount(newAmStValue);
    }
  };

  const amount = Number(amountString);

  const handleSubmit: React.ComponentProps<"form">["onSubmit"] = (e) => {
    e.preventDefault();
    if (amountString.trim().length === 0 || content.trim().length === 0) {
      return;
    } else if (!Number.isInteger(amount) || Number(amountString) <= 0) {
      console.log("not integer or smaller than 0");
      return;
    } else {
      addList({ type, amount, content }); //包成物件讓page可以用addList(row){setRows([...rows, { ...row, id: Math.random() }]);}
      setAmount("");
      setContent("");
    }
  };

  return (
    <form
      className="relative flex h-3/24 min-h-[48px] w-full items-center justify-center gap-4 border-b-2 pb-3"
      onSubmit={handleSubmit}
    >
      <Menu
        as="div"
        className="inline-block h-full w-3/24 min-w-[84px] rounded-[24px] border-r-2 border-l-2 text-center transition-all duration-400 hover:text-neutral-600"
      >
        <MenuButton className="inline-flex h-full cursor-pointer items-center justify-start gap-x-1.5 px-3 font-semibold inset-ring-1 inset-ring-white/5">
          {type === "expense" ? "支出" : "收入"}
          <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5" />
        </MenuButton>

        <MenuItems
          transition
          className="absolute left-0 z-10 mt-2 w-32 origin-top-right rounded-[36px] bg-neutral-700 outline-1 -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
        >
          <div className="flex flex-col py-1">
            <MenuItem>
              <button
                type="button"
                className="block h-full px-4 py-2 font-semibold text-zinc-300 transition-all duration-200 hover:translate-x-[2px] data-focus:text-zinc-50 data-focus:outline-hidden"
                onClick={setExButton}
              >
                支出
              </button>
            </MenuItem>
            <MenuItem>
              <button
                type="button"
                className="block h-full px-4 py-2 font-semibold text-zinc-300 transition-all duration-200 hover:translate-x-[2px] data-focus:text-zinc-50 data-focus:outline-hidden"
                onClick={setInButton}
              >
                收入
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>
      <input
        type="text"
        placeholder="金額"
        value={amountString} //子元件設定一個{value: amountString}props，等於input({value: amountString})
        //   不好的寫法
        //   value={
        //     type === "expense" ? -Math.abs(Number(amountString)) : Number(amountString)
        //   }
        onChange={handleChange}
        inputMode="numeric"
        required
        className="focus:border-teal h-22/24 w-9/24 rounded-[36px] border-r-2 border-l-2 px-3 font-semibold transition-all duration-400 hover:text-neutral-600 focus:ring-1 focus:outline-none"
      />

      <input
        type="text"
        placeholder="項目"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
        required
        className="focus:border-teal h-22/24 w-9/24 rounded-[36px] border-r-2 border-l-2 px-3 font-semibold transition-all duration-400 hover:text-neutral-600 focus:ring-1 focus:outline-none"
      />

      <button
        type="submit"
        className="absolute top-7 -right-1 flex h-[56px] w-[56px] cursor-pointer items-center justify-center rounded-full bg-neutral-700 text-center text-zinc-300 transition-all duration-400 hover:translate-y-[4px]"
      >
        <div className="text-2xl">+</div>
      </button>
    </form>
  );
}
