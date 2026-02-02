"use client"
import Image from "next/image";
import {CheckboxProps} from "@/lib/type";

export default function Checkbox({
                                     isCompleted,
                                     text,
                                     onToggle,
                                     variant = "list"
                                 }: CheckboxProps) {
    // 스타일 계산
    const bgColor = isCompleted ? 'bg-violet-100' : 'bg-white';
    const iconSrc = isCompleted
        ? '/assets/ic/Property 1=Frame 2610233.svg'
        : '/assets/ic/Property 1=Default.svg';

    const containerClass = variant === "list"
        ? 'absolute left-3 inset-y-0'
        : 'absolute inset-0 justify-center';

    const textStyle = variant === "list"
        ? (isCompleted ? 'line-through' : '')
        : 'underline';

    return (
        <button
            onClick={onToggle}
            className={`w-full h-[50px] relative rounded-[27px] border-2 border-slate-900 ${bgColor}`}
        >
            <div className={`flex items-center gap-4 ${containerClass}`}>
                {/* Checkbox Icon */}
                <Image
                    src={iconSrc}
                    alt="checkbox"
                    width={32}
                    height={32}
                    className="w-8 h-8 flex-shrink-0"
                />

                {/* Text */}
                <p className={`text-base text-slate-800 ${textStyle}`}>
                    {text}
                </p>
            </div>
        </button>
    );
}