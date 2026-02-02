"use client"
import {InputProps} from "@/lib/type";

export default function Input({
                                  value,
                                  onChange,
                                  placeholder = "할 일을 입력해주세요.",
                                  onKeyDown
                              }: InputProps) {
    return (
        <div className="w-full h-14 relative">
            {/* Shadow */}
            <div
                className="w-full h-[52.5px] absolute left-0.75 top-[2.5px] rounded-3xl bg-slate-900 border-2 border-slate-900"/>

            {/* Background */}
            <div
                className="w-full h-[52.5px] absolute -left-px -top-px rounded-3xl bg-slate-100 border-2 border-slate-900"/>

            {/* Input */}
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder={placeholder}
                className="absolute -left-px -top-px w-full h-[52.5px] px-6 py-3 rounded-3xl bg-transparent border-2 border-transparent text-slate-900 text-base placeholder:text-slate-400 outline-none focus:border-slate-900 z-10"
            />
        </div>
    );
}