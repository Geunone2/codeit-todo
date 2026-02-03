"use client";
import {useRouter} from "next/navigation"
import useTodoDetails from "@/hooks/useTodoDetail";
import {useEffect} from "react";
import Button from "@/components/common/Button";
import ImageUpload from "@/components/common/ImageUpload";
import Memo from "@/components/common/Memo";
import Checkbox from "@/components/common/CheckBox";
import {TodoDetailProps} from "@/lib/type";

/**
 * 할 일 상세 페이지 컴포넌트
 * - 할 일 제목, 이미지, 메모 표시 및 수정
 * - 완료 상태 토글
 * - 수정 완료 / 삭제 기능
 */
export default function TodoDetail({itemId}: TodoDetailProps) {
    const router = useRouter();
    const {
        todo,
        isLoading,
        fetchTodoDetail,
        updateMemo,
        toggleComplete,
        uploadTodoImage,
        saveTodo,
        deleteTodo
    } = useTodoDetails(itemId);

    // 초기 데이터 로드
    useEffect(() => {
        fetchTodoDetail();
    }, [fetchTodoDetail]);

    const handleImage = async (file: File | null) => {
        if (!file) return;
        await uploadTodoImage(file);
    };

    const handleSave = async () => {
        const success = await saveTodo();
        if (success) {
            alert("할 일 내용이 수정되었습니다.");
            router.refresh();
        }
    };

    const handleDelete = async () => {
        if (!confirm("정말 삭제하시겠습니까?")) return;

        const success = await deleteTodo();
        if (success) {
            alert("정상적으로 삭제되었습니다!");
            router.push("/");
        }
    };

    if (isLoading || !todo) {
        return <div className="flex justify-center items-center min-h-screen">로딩 중...</div>;
    }

    return (
        <div className="container mx-auto px-6 py-8 max-w-300">
            {/* 제목 영역 */}
            <div className="mb-8">
                <Checkbox
                    variant="detail"
                    isCompleted={todo.isCompleted}
                    text={todo.name}
                    onToggle={toggleComplete}
                />
            </div>

            {/* 이미지 + 메모 영역 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <ImageUpload
                    imageUrl={todo.imageUrl}
                    onImageChange={handleImage}
                />
                <Memo
                    value={todo.memo || ""}
                    onChange={updateMemo}
                    placeholder="메모를 입력해주세요."
                />
            </div>

            {/* 버튼 영역 */}
            <div className="flex justify-center lg:justify-end gap-4">
                <Button
                    variant="complete"
                    onClick={handleSave}
                    isCompleted={todo.isCompleted}
                />
                <Button
                    variant="delete"
                    onClick={handleDelete}
                />
            </div>
        </div>
    )
}