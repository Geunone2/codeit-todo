"use client";
import Header from "@/components/common/Header";
import useTodos from "@/hooks/useTodos";
import {useEffect} from "react";
import TodoForm from "@/components/todo/TodoForm";
import TodoList from "@/components/todo/TodoList";

export default function Home() {

    const {todos, todoList, doneList, fetchTodos, addTodo} = useTodos();

    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Header/>
            <main className="max-w-7xl mx-auto px-4 md:px-6 mt-6 md:mt-10 flex flex-col gap-10">
                {/* 폼 영역 */}
                <TodoForm onAdd={addTodo} hasTodos={todos.length > 0}/>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-6">
                    {/* 할 일 목록 (TODO) */}
                    <TodoList title="TODO" items={todoList}/>

                    {/* 완료된 목록 (DONE) */}
                    <TodoList title="DONE" items={doneList}/>
                </div>
            </main>
        </div>
    );
}
