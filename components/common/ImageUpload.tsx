"use client";
import Image from "next/image";
import {useRef, useState} from "react";
import {ImageUpLoadProps} from "@/lib/type";
import TypeEditIcon from "@/public/assets/ic/TypeEdit.svg";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

/**
 * 이미지 업로드 컴포넌트
 * - 이미지 미리보기 (object-cover)
 * - 파일 검증: 5MB 이하, 영어 파일명만 허용
 * - 우측 하단 버튼: Plus (추가) ↔ Edit (수정)
 * - 로드 실패 시 placeholder 표시
 */

export default function ImageUpload({imageUrl, onImageChange}: ImageUpLoadProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imageError, setImageError] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // 파일 크기 검증 (5MB 이하)
        if (file.size > MAX_FILE_SIZE) {
            alert("파일 크기는 5MB 이하여야 합니다.");
            return;
        }

        // 파일명 영어 검증 (한글 파일명은 S3에서 403 에러 발생)
        const fileName = file.name;
        const fileNameWithoutExt = fileName.substring(0, fileName.lastIndexOf('.'));
        if (!/^[a-zA-Z0-9_-]+$/.test(fileNameWithoutExt)) {
            alert("파일 이름은 영어만 가능합니다.");
            return;
        }

        onImageChange(file);
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const buttonIcon = imageUrl ? "/assets/ic/TypeEdit.svg" : "/assets/ic/TypePlus.svg";
    const buttonAlt = imageUrl ? "edit" : "add";

    return (
        <div className="w-full h-77.75 relative">
            <div
                className="absolute inset-0 rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 overflow-hidden">
                {imageUrl && !imageError ? (
                    <Image
                        src={imageUrl}
                        alt="uploaded image"
                        fill
                        className="object-cover"
                        onError={() => setImageError(true)}
                        unoptimized
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