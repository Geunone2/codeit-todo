/* 추가 폼 컴포넌트 */
"use client";
import {useState} from "react";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import {TodoFormProps} from "@/lib/type";

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
                <Input
                    value={inputValue}
                    onChange={setInputValue}
                    onKeyDown={handleKeyDown}
                    placeholder="할 일을 입력해주세요"
                />
            </div>
            <div className="shrink-0">
                <Button variant="add" onClick={handleSubmit} disabled={isSubmitting} hasTodos={hasTodos}/>
            </div>
        </div>
    );
}