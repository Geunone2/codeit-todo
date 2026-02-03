"use client"
import Image from "next/image";
import {MemoProps} from "@/lib/type";

/**
 * 메모 작성 컴포넌트
 * - 노트 스타일 배경 (줄무늬 이미지)
 * - 텍스트 중앙 정렬
 * - 내부 스크롤 (overflow-y-auto)
 * - 자동 줄바꿈 (word-break: break-all)
 */
export default function Memo({
                                 value,
                                 onChange,
                                 placeholder = "메모를 입력해주세요."
                             }: MemoProps) {
    return (
        <div className="w-full h-77.75 relative overflow-hidden rounded-3xl">
            {/* 배경 영역 */}
            <Image
                src="/assets/img/memo.svg"
                alt="memo background"
                width={696}
                height={311}
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* 제목 */}
            <p className="absolute left-1/2 -translate-x-1/2 top-6 text-base font-bold text-center text-amber-800 pointer-events-none">
                Memo
            </p>

            {/* 메모 입력 영역 */}
            <div className="absolute left-8 right-8 top-20 bottom-8 overflow-hidden">
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="w-full h-full p-4 bg-transparent text-slate-800 text-base text-center placeholder:text-slate-400 outline-none resize-none overflow-y-auto overflow-x-hidden"
                    style={{
                        wordBreak: 'break-all',
                        overflowWrap: 'break-word'
                    }}
                />
            </div>
        </div>
    );
}