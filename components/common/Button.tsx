"use client"
import Image from "next/image";
import {ButtonProps, ButtonVariant} from "@/lib/type";

/**
 * variant별 버튼 설정 반환
 * @param variant - 버튼 종류 (add, delete, complete)
 * @param hasTodos - 할 일 존재 여부 (add 버튼 색상 결정)
 * @param isCompleted - 완료 여부 (complete 버튼 색상 결정)
 */
function getConfig(variant: ButtonVariant, hasTodos: boolean, isCompleted: boolean) {
    const configs = {
        add: {
            bgColor: hasTodos ? 'bg-slate-200' : 'bg-violet-600',
            textColor: hasTodos ? 'text-slate-900' : 'text-white',
            iconClass: hasTodos ? 'brightness-0' : '',
            icon: '/assets/ic/Property 1=plus.svg',
            text: '추가하기',
            isResponsive: true,
        },
        delete: {
            bgColor: 'bg-rose-500',
            textColor: 'text-white',
            iconClass: '',
            icon: '/assets/ic/X.svg',
            text: '삭제하기',
            isResponsive: false,
        },
        complete: {
            bgColor: isCompleted ? 'bg-lime-300' : 'bg-slate-200',
            textColor: 'text-slate-900',
            iconClass: '',
            icon: '/assets/ic/check.svg',
            text: '수정 완료',
            isResponsive: false,
        },
    };

    return configs[variant];
}

export default function Button({
                                   variant,
                                   onClick,
                                   disabled = false,
                                   hasTodos = true,
                                   isCompleted = false,
                               }: ButtonProps) {
    const config = getConfig(variant, hasTodos, isCompleted);
    const {isResponsive, bgColor, textColor, iconClass, icon, text} = config;

    const buttonSize = isResponsive ? 'w-14 h-14 md:w-[168px] md:h-14' : 'w-[168px] h-14';
    const shadowSize = isResponsive
        ? 'w-[52px] h-[52px] left-[2px] top-[2px] md:w-[164.35px] md:h-[52px] md:left-[2.15px] md:top-[2.5px]'
        : 'w-[164.35px] h-[52px] left-[2.15px] top-[2.5px]';
    const layerSize = isResponsive
        ? 'w-[52px] h-[52px] left-[-1px] top-[-1px] md:w-[164.35px] md:h-[52px] md:left-[-1.5px] md:top-[-1.5px]'
        : 'w-[164.35px] h-[52px] left-[-1.5px] top-[-1.5px]';

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${buttonSize} relative group`}
        >
            {/* 그림자 영역 */}
            <div className={`absolute rounded-3xl bg-slate-900 border-2 border-slate-900 ${shadowSize}`}/>

            {/* 배경 영역 */}
            <div className={`
                absolute rounded-3xl border-2 border-slate-900 
                ${bgColor} ${layerSize}
                transition-all duration-200
                ${disabled ? 'opacity-50' : 'group-hover:left-[0.5px] group-hover:top-[0.5px]'}
            `}/>

            {/* 내용 영역 */}
            <div className={`
                flex justify-center items-center absolute gap-1
                ${layerSize}
                pointer-events-none transition-all duration-200 z-10
                ${disabled ? '' : 'group-hover:left-[0.5px] group-hover:top-[0.5px]'}
            `}>
                <Image
                    src={icon}
                    alt={text}
                    width={16}
                    height={16}
                    className={`w-4 h-4 ${iconClass}`}
                />
                <p className={`text-base font-bold ${textColor} ${isResponsive ? 'hidden md:block' : ''}`}>
                    {text}
                </p>
            </div>
        </button>
    );
}