"use client"
import Image from "next/image";

export default function Header() {
    const handleLogoClick = () => {
        window.location.reload();
    };

    return (
        <header className="w-full h-[60px] relative bg-white border-b border-slate-200">
            <button
                onClick={handleLogoClick}
                className="absolute top-2.5 left-6 lg:left-[360px]"
            >
                {/* Mobile: Small logo */}
                <Image
                    src="/assets/Size=Small.svg"
                    alt="do it logo"
                    width={71}
                    height={40}
                    className="md:hidden"
                />
                {/* Tablet & Desktop: Large logo */}
                <Image
                    src="/assets/Size=Large.svg"
                    alt="do it logo"
                    width={151}
                    height={40}
                    className="hidden md:block"
                />
            </button>
        </header>
    );
}