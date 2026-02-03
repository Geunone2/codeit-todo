import type {NextConfig} from "next";

/**
 * Next.js 설정
 * - S3 이미지 도메인 허용 (외부 이미지 로드)
 */
const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'sprint-fe-project.s3.ap-northeast-2.amazonaws.com',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
