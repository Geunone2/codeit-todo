"use client";

import {useCallback, useState} from "react";
import {getItemDetailResponse} from "@/lib/type";
import {deleteItem, getItemDetail, patchItemDetail, uploadImage} from "@/lib/api";

/**
 * 할 일 상세 페이지 훅
 * - 상세 데이터 조회/수정/삭제
 * - 이미지 업로드, 메모 수정, 완료 토글
 */
export default function useTodoDetails(itemId: number) {
    const [todo, setTodo] = useState<getItemDetailResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // 상세 데이터 불러오기
    const fetchTodoDetail = useCallback(async () => {
        try {
            setIsLoading(true);
            const data = await getItemDetail(itemId);
            setTodo(data);
        } catch (err) {
            console.error(err);
            alert("할 일 정보를 불러오는 데 실패했습니다.");
        } finally {
            setIsLoading(false);
        }
    }, [itemId]);

    // 이미지 업로드
    const uploadTodoImage = useCallback(async (file: File) => {
        try {
            const res = await uploadImage(file);
            setTodo((prev) => prev ? {...prev, imageUrl: res.url} : null);
            return res.url;
        } catch (err) {
            console.error(err);
            alert("이미지를 업로드하는 데 실패했습니다.")
            return null;
        }
    }, []);

    // 제목 업데이트
    const updateName = useCallback((name: string) => {
        setTodo((prev) => prev ? {...prev, name} : null);
    }, []);

    // 메모 업데이트
    const updateMemo = useCallback((memo: string) => {
        setTodo((prev) => prev ? {...prev, memo} : null);
    }, []);

    // 완료 상태 토글
    const toggleComplete = useCallback(() => {
        setTodo((prev) => prev ? {...prev, isCompleted: !prev.isCompleted} : null);
    }, []);

    // 수정 저장
    const saveTodo = useCallback(async () => {
        if (!todo) return false;

        try {
            await patchItemDetail(itemId, {
                name: todo.name,
                memo: todo.memo || undefined,
                imageUrl: todo.imageUrl || undefined,
                isCompleted: todo.isCompleted
            });
            return true;
        } catch (err) {
            console.error(err);
            alert("할 일 내용을 수정하는 데 실패했습니다. 다시 시도해주세요.");
            return false;
        }
    }, [itemId, todo])

    // 삭제
    const deleteTodo = useCallback(async () => {
        try {
            await deleteItem(itemId);
            return true;
        } catch (err) {
            console.error(err);
            alert("할 일 내용을 삭제하는 데 실패했습니다. 다시 시도해주세요.");
            return false;
        }
    }, [itemId]);

    return {
        todo,
        isLoading,
        fetchTodoDetail,
        uploadTodoImage,
        updateName,
        updateMemo,
        toggleComplete,
        saveTodo,
        deleteTodo
    }
}