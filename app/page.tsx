"use client"
import {useEffect} from "react";
import TodoForm from "@/components/todo/TodoForm";
import TodoList from "@/components/todo/TodoList";
import {useTodos} from "@/hooks/useTodos";

/**
 * 할 일 목록 메인 페이지
 * - 할 일 추가 폼
 * - TODO/DONE 목록 표시
 * - 체크박스 클릭 시 완료 상태 토글
 */

export default function Home() {
    const {todoList, doneList, isLoading, fetchTodos, addTodo, toggleTodo} = useTodos();

    // 초기 데이터 로드
    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    if (isLoading) {
        return <div className="flex justify-center items-center min-h-screen">로딩 중...</div>;
    }

    return (
        <>
            <div className="container mx-auto px-6 py-8 max-w-300">
                {/* 할 일 추가 폼 */}
                <TodoForm onAdd={addTodo} hasTodos={todoList.length + doneList.length > 0}/>

                {/* TODO/DONE 목록 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <TodoList title="TODO" items={todoList} onToggle={toggleTodo}/>
                    <TodoList title="DONE" items={doneList} onToggle={toggleTodo}/>
                </div>
            </div>
        </>
    );
}