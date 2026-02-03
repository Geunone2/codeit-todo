"use client";

import Image from "next/image";
import {useRouter} from "next/navigation";
import {TodoListProps} from "@/lib/type";

// TODO/DONE 영역별 설정
const LIST_CONFIG = {
    TODO: {
        emptyImage: "/assets/img/TypeTodoSizeLarge.svg",
        emptyText: "할 일이 없어요.",
        emptySubText: "TODO를 새롭게 추가해주세요!",
        tagBg: "bg-lime-300",
        tagText: "text-green-700",
    },
    DONE: {
        emptyImage: "/assets/img/TypeDoneSizeLarge.svg",
        emptyText: "아직 다 한 일이 없어요.",
        emptySubText: "해야 할 일을 체크해보세요!",
        tagBg: "bg-green-700",
        tagText: "text-amber-300",
    },
} as const;

/**
 * 할 일 목록 컴포넌트
 * - TODO/DONE 영역별 스타일 적용
 * - 체크박스 클릭: 완료 상태 토글
 * - 아이템 클릭: 상세 페이지 이동
 */
export default function TodoList({title, items, onToggle}: TodoListProps) {
    const router = useRouter();
    const config = LIST_CONFIG[title];

    const handleItemClick = (itemId: number) => {
        router.push(`/items/${itemId}`);
    };

    const handleCheckboxClick = async (e: React.MouseEvent, itemId: number, currentStatus: boolean) => {
        e.stopPropagation();
        await onToggle(itemId, !currentStatus);
    };

    return (
        <section className="flex flex-col gap-4">
            {/* 타이틀 태그 */}
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
                            onClick={() => handleItemClick(item.id)}
                            className={`flex items-center gap-4 px-3 py-2.25 min-h-12.5 rounded-[27px] border-2 border-slate-900 cursor-pointer hover:opacity-80 transition-opacity ${
                                item.isCompleted ? "bg-violet-100" : "bg-white"
                            }`}
                        >
                            {/* 체크박스 아이콘 */}
                            <button
                                onClick={(e) => handleCheckboxClick(e, item.id, item.isCompleted)}
                                className="shrink-0"
                            >
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
                            </button>

                            <span
                                className={`text-base font-medium truncate ${item.isCompleted ? "line-through text-slate-800" : "text-slate-800"}`}>
                                {item.name}
                            </span>
                        </div>
                    ))}
                </div>
            ) : (
                /* Empty State */
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