"use client"
import Header from "@/components/common/Header";

interface ContainerProps {
    children: React.ReactNode;
}

/**
 * 전역 레이아웃 컨테이너
 * - 모든 페이지에 Header 적용
 */
export default function Container({children}: ContainerProps) {
    return (
        <>
            <Header/>
            <main>
                {children}
            </main>
        </>
    );
}