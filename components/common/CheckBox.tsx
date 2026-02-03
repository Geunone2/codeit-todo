"use client"
import Image from "next/image";
import {CheckboxProps} from "@/lib/type";

/**
 * 재사용 가능한 체크박스 컴포넌트
 * - list variant: 왼쪽 정렬, 완료 시 취소선
 * - detail variant: 중앙 정렬, 항상 밑줄
 * - 아이콘만 클릭 가능 (이벤트 버블링 차단)
 */
export default function Checkbox({
                                     isCompleted,
                                     text,
                                     onToggle,
                                     variant = "list",
                                     editable = false,
                                     onTextChange
                                 }: CheckboxProps) {

    // varient 및 완료 상태에 따른 스타일 계산
    const bgColor = isCompleted ? 'bg-violet-100' : 'bg-white';
    const iconSrc = isCompleted
        ? '/assets/ic/Property1Frame2610233.svg'
        : '/assets/ic/Property1Default.svg';

    const containerClass = variant === "list"
        ? 'absolute left-3 inset-y-0'
        : 'absolute inset-0 justify-center';

    const textStyle = variant === "list"
        ? (isCompleted ? 'line-through' : '')
        : 'underline';

    // 이벤트 버블링 방지 (상세 페이지 이동 차단)
    const handleIconClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onToggle();
    };

    return (
        <div
            className={`w-full h-12.5 relative rounded-[27px] border-2 border-slate-900 ${bgColor}`}
        >
            <div className={`flex items-center gap-4 ${containerClass} ml-2`}>
                {/* 체크박스 아이콘 */}
                <button
                    onClick={handleIconClick}
                    className="shrink-0">
                    <Image
                        src={iconSrc}
                        alt="checkbox"
                        width={32}
                        height={32}
                        className="w-8 h-8"
                    />
                </button>

                {/* 할 일 텍스트 (편집 가능/불가능) */}
                {editable && onTextChange ? (
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => onTextChange(e.target.value)}
                        className={`flex-1 bg-transparent text-base text-slate-800 ${textStyle} outline-none`}
                        placeholder="할 일 제목"
                    />
                ) : (
                    <p className={`text-base text-slate-800 ${textStyle}`}>
                        {text}
                    </p>
                )}
            </div>
        </div>
    );
}