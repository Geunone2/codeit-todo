"use client"
import {useState, useCallback} from "react";
import {getItems, postItem, patchItemDetail} from "@/lib/api";
import {getItemResponse} from "@/lib/type";

/**
 * 할 일 목록 페이지 훅
 * - 목록 조회/추가/완료 토글
 * - 낙관적 업데이트 (실패 시 롤백)
 * - TODO/DONE 자동 분리
 */
export function useTodos() {
    const [todos, setTodos] = useState<getItemResponse[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // 목록 불러오기
    const fetchTodos = useCallback(async () => {
        try {
            setIsLoading(true);
            const data = await getItems();
            setTodos(data);
        } catch (err) {
            console.error(err);
            alert("할 일 목록을 불러오는데 실패했습니다.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    // 할 일 추가
    const addTodo = useCallback(async (name: string) => {
        try {
            const newTodo = await postItem({name});
            setTodos((prev) => [newTodo, ...prev]);
            return true;
        } catch (err) {
            console.error(err);
            alert("할 일 추가에 실패했습니다.");
            return false;
        }
    }, []);

    // 완료 상태 토글
    const toggleTodo = useCallback(async (itemId: number, isCompleted: boolean) => {
        // 즉시 UI 업데이트
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === itemId ? {...todo, isCompleted} : todo
            )
        );

        try {
            await patchItemDetail(itemId, {isCompleted});
        } catch (err) {
            // 실패 시 롤백
            setTodos((prev) =>
                prev.map((todo) =>
                    todo.id === itemId ? {...todo, isCompleted: !isCompleted} : todo
                )
            );
            console.error(err);
            alert("완료 상태 변경에 실패했습니다.");
        }
    }, []);

    // Todo/Done 분리
    const todoList = todos.filter((todo) => !todo.isCompleted);
    const doneList = todos.filter((todo) => todo.isCompleted);

    return {
        todos,
        todoList,
        doneList,
        isLoading,
        fetchTodos,
        addTodo,
        toggleTodo,
    };
}