"use client";
import Image from "next/image";
import {useRef} from "react";
import {ImageUpLoadProps} from "@/lib/type";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export default function ImageUpload({imageUrl, onImageChange}: ImageUpLoadProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // 파일 크기 검증
        if (file.size > MAX_FILE_SIZE) {
            alert("파일 크기는 5MB 이하여야 합니다.");
            return;
        }

        onImageChange(file);
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const buttonIcon = imageUrl ? "/assets/ic/Type=edit.svg" : "/assets/ic/Type=Plus.svg";
    const buttonAlt = imageUrl ? "edit" : "add";

    return (
        <div className="w-96 h-[311px] relative">
            {/* Dashed Border Box */}
            <div
                className="absolute inset-0 rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 overflow-hidden">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt="uploaded image"
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Image
                            src="/assets/ic/img.svg"
                            alt="image placeholder"
                            width={64}
                            height={64}
                            className="opacity-30"
                        />
                    </div>
                )}
            </div>

            {/* Edit/Add Button */}
            <button
                onClick={handleButtonClick}
                className="absolute right-6 bottom-6 rounded-full bg-slate-200 hover:bg-slate-300 transition-colors"
            >
                <Image
                    src={buttonIcon}
                    alt={buttonAlt}
                    width={64}
                    height={64}
                />
            </button>

            {/* Hidden File Input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
            />
        </div>
    );
}