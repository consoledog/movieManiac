import {useState} from "react";

export function Divider({children})
{
    const [isOpen, setIsOpen] = useState(true);

    return <div className="w-[42rem] max-w-[42rem] bg-background-500 rounder-[0.9rem] overflow-auto relative">
        <button
            className="absolute top-[0.8rem] right-[0.8rem] h-[2.4rem] aspect-[1] rounded-full border-none
            bg-background-900 text-text text-[1.4rem] font-bold cursor-pointer z-[999]"
            onClick={() => setIsOpen((open) => !open)}
        >
            {isOpen ? "📁" : "📂"}
        </button>
        {isOpen && children}
    </div>
}