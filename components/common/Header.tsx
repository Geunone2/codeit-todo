"use client"
import Image from "next/image";
import {useRouter} from "next/navigation";

/**
 * 전역 헤더 컴포넌트
 * - 반응형 로고 (모바일: Small, 태블릿+: Large)
 * - 로고 클릭 시 메인 페이지로 이동
 */
export default function Header() {
    const router = useRouter();

    // 로고 클릭 시 메인 페이지로 이동
    const handleLogoClick = () => {
        router.push("/");
    };

    return (
        <header className="w-full h-15 relative bg-white border-b border-slate-200">
            <button
                onClick={handleLogoClick}
                className="absolute top-2.5 left-6 lg:left-90"
            >
                {/* Mobile (< 844px): Small logo */}
                <Image
                    src="/assets/SizeSmall.svg"
                    alt="do it logo"
                    width={71}
                    height={40}
                    className="md:hidden"
                />
                {/* Tablet & Desktop (≥ 844px): Large logo */}
                <Image
                    src="/assets/SizeLarge.svg"
                    alt="do it logo"
                    width={151}
                    height={40}
                    className="hidden md:block"
                />
            </button>
        </header>
    );
}