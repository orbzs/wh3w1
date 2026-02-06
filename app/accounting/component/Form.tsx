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
      className="h-3/24 relative border-b-2 flex gap-4 justify-center items-center w-full min-h-[48px] pb-3"
      onSubmit={handleSubmit}
    >
      <Menu
        as="div"
        className=" hover:text-neutral-600 transition-all duration-400 h-full w-3/24 min-w-[84px] text-center inline-block border-r-2 border-l-2 rounded-[24px] "
      >
        <MenuButton className="cursor-pointer px-3 h-full justify-start inline-flex items-center gap-x-1.5 font-semibold inset-ring-1 inset-ring-white/5">
          {type === "expense" ? "支出" : "收入"}
          <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 " />
        </MenuButton>

        <MenuItems
          transition
          className="absolute left-0 z-10 mt-2 w-32 origin-top-right rounded-[36px] bg-neutral-700 outline-1 -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
        >
          <div className="py-1 flex flex-col">
            <MenuItem>
              <button
                type="button"
                className="hover:translate-x-[2px] transition-all duration-200 h-full block px-4 py-2 font-semibold text-zinc-300  data-focus:text-zinc-50 data-focus:outline-hidden"
                onClick={setExButton}
              >
                支出
              </button>
            </MenuItem>
            <MenuItem>
              <button
                type="button"
                className="hover:translate-x-[2px] transition-all duration-200 h-full block px-4 py-2 font-semibold text-zinc-300  data-focus:text-zinc-50 data-focus:outline-hidden"
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
        className="hover:text-neutral-600 transition-all duration-400 focus:border-teal focus:outline-none focus:ring-1 font-semibold w-9/24 px-3  border-r-2 border-l-2 rounded-[36px] h-22/24"
      />

      <input
        type="text"
        placeholder="項目"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
        required
        className="hover:text-neutral-600 transition-all duration-400 focus:border-teal focus:outline-none focus:ring-1 font-semibold w-9/24 px-3 border-r-2 border-l-2 rounded-[36px] h-22/24"
      />

      <button
        type="submit"
        className="text-zinc-300 cursor-pointer hover:translate-y-[4px] transition-all duration-400 absolute flex justify-center items-center bg-neutral-700 rounded-full  w-[56px] h-[56px] -right-1 top-7 text-center
        "
      >
        <div className="text-2xl">+</div>
      </button>
    </form>
  );
}
