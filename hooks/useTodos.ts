/* 목록 조회 / 추가 / 토글 훅 */
"use client";

import {useCallback, useState} from "react";
import {getItemResponse} from "@/lib/type";
import {getItems, postItem} from "@/lib/api";

export default function useTodos() {
    const [todos, setTodos] = useState<getItemResponse[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // 할 일 목록 불러오기
    const fetchTodos = useCallback(async () => {
        try {
            setIsLoading(true);
            const data = await getItems();
            setTodos(data);
        } catch (err) {
            console.error(err);
            alert("할 일 목록을 불러오는 데 실패했습니다.");
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

    const todoList = todos.filter((todo) => !todo.isCompleted);
    const doneList = todos.filter((todo) => todo.isCompleted);

    return {
        todos,
        todoList,
        doneList,
        isLoading,
        fetchTodos,
        addTodo,
    };

}