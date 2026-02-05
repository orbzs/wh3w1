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
        className="w-3/24 relative inline-block border-r-2 border-l-2 rounded-[24px] "
      >
        <MenuButton className=" inline-flex w-5/4 item-center gap-x-1.5  bg-white/10 px-3 text-sm font-semibold  inset-ring-1 inset-ring-white/5 hover:text-neutral-700 h-1/2">
          {type === "expense" ? "支出" : "收入"}
          <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 " />
        </MenuButton>

        <MenuItems
          transition
          className="absolute -left-10 z-10 mt-2 w-32 origin-top-right rounded-[36px] bg-neutral-700 outline-1 -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
        >
          <div className="py-1 flex flex-col">
            <MenuItem>
              <button
                type="button"
                className="h-full block px-4 py-2 text-sm text-gray-300  data-focus:text-white data-focus:outline-hidden"
                onClick={setExButton}
              >
                支出
              </button>
            </MenuItem>
            <MenuItem>
              <button
                type="button"
                className="h-full block px-4 py-2 text-sm text-gray-300  data-focus:text-white data-focus:outline-hidden"
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
        className="w-9/24 px-3 caret-(--color-big) border-r-2 border-l-2 rounded-[36px] h-22/24"
      />

      <input
        type="text"
        placeholder="項目"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
        required
        className="w-9/24 px-3 border-r-2 border-l-2 rounded-[36px] caret-(--color-big) h-22/24"
      />

      <button
        type="submit"
        className="absolute flex justify-center items-center bg-neutral-700 rounded-full  w-[56px] h-[56px] -right-1 top-7 text-center
        "
      >
        +
      </button>
    </form>
  );
}
