"use client";
import { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

type RowsType = "expense" | "income";

interface NewRow {
  type: RowsType;
  amount: number;
  content: string;
}

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
    <div className="flex">
      <form className="flex items-center" onSubmit={handleSubmit}>
        <Menu as="div" className="relative inline-block">
          <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white/10 px-3 py-2 text-sm font-semibold  inset-ring-1 inset-ring-white/5 hover:bg-white/20">
            {type === "expense" ? "支出" : "收入"}
            <ChevronDownIcon
              aria-hidden="true"
              className="-mr-1 size-5 text-gray-400"
            />
          </MenuButton>

          <MenuItems
            transition
            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-800 outline-1 -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
          >
            <div className="py-1">
              <MenuItem>
                <button
                  type="button"
                  className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden"
                  onClick={setExButton}
                >
                  支出
                </button>
              </MenuItem>
              <MenuItem>
                <button
                  type="button"
                  className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden"
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
        />

        <input
          type="text"
          placeholder="項目"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          required
        />

        <button type="submit" className="bg-green-300">
          新增紀錄
        </button>
      </form>
    </div>
  );
}
