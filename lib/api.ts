/* API 함수들 */

const BASE_URL = 'https://assignment-todolist-api.vercel.app/api';
const TENANT_ID = 'geunwon';

import type {
    postItemRequest,
    postItemResponse,
    getItemResponse,
    getItemDetailResponse,
    patchItemDetailRequest,
    patchItemDetailResponse,
    deleteItemResponse,
    imageResponse,
    PaginationParam,
} from './type';

/**
 * API 요청을 처리하는 공통 함수
 */
async function fetchAPI<T>(
    endpoint: string,
    options?: RequestInit
): Promise<T> {
    const response = await fetch(`${BASE_URL}/${TENANT_ID}${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
        },
        ...options,
    });

    if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

/**
 * 할 일 목록 조회 (GET)
 * @param params - page, pageSize (optional)
 */
export async function getItems(
    params?: PaginationParam
): Promise<getItemResponse[]> {
    const queryString = params
        ? `?${new URLSearchParams(params as Record<string, string>).toString()}`
        : '';

    return fetchAPI<getItemResponse[]>(`/items${queryString}`);
}

/**
 * 할 일 상세 조회 (GET)
 * @param itemId - 조회할 항목의 ID
 */
export async function getItemDetail(
    itemId: number
): Promise<getItemDetailResponse> {
    return fetchAPI<getItemDetailResponse>(`/items/${itemId}`);
}

/**
 * 할 일 추가 (POST)
 * @param data - 추가할 항목 데이터
 */
export async function postItem(
    data: postItemRequest
): Promise<postItemResponse> {
    return fetchAPI<postItemResponse>('/items', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

/**
 * 할 일 수정 (PATCH)
 * @param itemId - 수정할 항목의 ID
 * @param data - 수정할 데이터
 */
export async function patchItemDetail(
    itemId: number,
    data: Partial<patchItemDetailRequest>
): Promise<patchItemDetailResponse> {
    return fetchAPI<patchItemDetailResponse>(`/items/${itemId}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
    });
}

/**
 * 할 일 삭제 (DELETE)
 * @param itemId - 삭제할 항목의 ID
 */
export async function deleteItem(itemId: number): Promise<deleteItemResponse> {
    return fetchAPI<deleteItemResponse>(`/items/${itemId}`, {
        method: 'DELETE',
    });
}

/**
 * 이미지 업로드 (POST)
 * @param file - 업로드할 이미지 파일
 */
export async function uploadImage(file: File): Promise<imageResponse> {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`${BASE_URL}/${TENANT_ID}/images/upload`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error(`Image Upload Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
}