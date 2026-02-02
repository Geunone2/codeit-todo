"use client";

import Image from "next/image";
import {TodoListProps} from "@/lib/type";

const LIST_CONFIG = {
    TODO: {
        emptyImage: "/assets/img/Type=Todo, Size=Large.svg",
        emptyText: "할 일이 없어요.",
        emptySubText: "TODO를 새롭게 추가해주세요!",
        tagBg: "bg-lime-300",
        tagText: "text-green-700",
    },
    DONE: {
        emptyImage: "/assets/img/Type=Done, Size=Large.svg",
        emptyText: "아직 다 한 일이 없어요.",
        emptySubText: "해야 할 일을 체크해보세요!",
        tagBg: "bg-green-700",
        tagText: "text-amber-300",
    },
} as const;

export default function TodoList({title, items}: TodoListProps) {
    const config = LIST_CONFIG[title];

    return (
        <section className="flex flex-col gap-4">
            {/* 타이틀 태그 - config에서 색상을 가져옴 */}
            <div className="w-fit">
                <div
                    className={`flex justify-center items-center gap-2.5 px-6.75 pt-1 pb-1.75 rounded-[23px] ${config.tagBg}`}>
                    <p className={`text-lg font-bold text-center ${config.tagText}`}>
                        {title}
                    </p>
                </div>
            </div>

            {/* 목록 영역 */}
            {items.length > 0 ? (
                <div className="flex flex-col gap-4">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className={`flex items-center gap-4 px-3 py-2.25 min-h-12.5 rounded-[27px] border-2 border-slate-900 ${
                                item.isCompleted ? "bg-violet-100" : "bg-white"
                            }`}
                        >
                            {/* 체크박스 로직 (생략 - 기존과 동일) */}
                            <div className="shrink-0 cursor-pointer">
                                {item.isCompleted ? (
                                    <div
                                        className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center border-2 border-slate-900">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M4 8.14286L6.90909 11L12 6" stroke="#FEFCE8" strokeWidth="2.5"
                                                  strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-yellow-50 border-2 border-slate-900"/>
                                )}
                            </div>

                            <span
                                className={`text-base font-medium truncate ${item.isCompleted ? "line-through text-slate-800" : "text-slate-800"}`}>
                                {item.name}
                            </span>
                        </div>
                    ))}
                </div>
            ) : (
                /* Empty State - config의 값을 사용 */
                <div className="flex flex-col items-center justify-center py-20 px-4 min-h-75">
                    <Image
                        src={config.emptyImage}
                        alt="empty"
                        width={240}
                        height={240}
                        className="w-48 h-48 md:w-60 md:h-60 mb-6 opacity-40"
                    />
                    <div className="text-center">
                        <p className="text-slate-400 font-bold text-base">
                            {config.emptyText}
                        </p>
                        <p className="text-slate-400 font-bold text-base">
                            {config.emptySubText}
                        </p>
                    </div>
                </div>
            )}
        </section>
    );
}