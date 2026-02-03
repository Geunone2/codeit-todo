"use client";
import {useState} from "react";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import {TodoFormProps} from "@/lib/type";

/**
 * 할 일 추가 폼 컴포넌트
 * - 입력값 검증 (빈 문자열 방지)
 * - Enter 키 지원
 * - 중복 제출 방지
 * - 성공 시 입력창 초기화
 */
export default function TodoForm({onAdd, hasTodos}: TodoFormProps) {
    const [inputValue, setInputValue] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        const trimmedValue = inputValue.trim();

        if (!trimmedValue) {
            alert("할 일을 입력해주세요.");
            return;
        }

        setIsSubmitting(true);
        const success = await onAdd(trimmedValue);
        setIsSubmitting(false);

        if (success) {
            setInputValue("");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !isSubmitting) {
            handleSubmit();
        }
    };

    return (
        <div className="flex gap-2 md:gap-4 items-start w-full h-16">
            <div className="grow">
                {/* 입력창 */}
                <Input
                    value={inputValue}
                    onChange={setInputValue}
                    onKeyDown={handleKeyDown}
                    placeholder="할 일을 입력해주세요"
                />
            </div>
            {/* 추가 버튼 */}
            <div className="shrink-0">
                <Button variant="add" onClick={handleSubmit} disabled={isSubmitting} hasTodos={hasTodos}/>
            </div>
        </div>
    );
}