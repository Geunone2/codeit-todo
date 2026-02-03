import TodoDetail from "@/components/todo/TodoDetail";

/**
 * 할 일 상세 페이지
 * Dynamic Route: /items/[itemId]
 */
export default async function ItemDetailPage({params}: { params: Promise<{ itemId: string }> }) {
    const {itemId} = await params;

    return <TodoDetail itemId={Number(itemId)}/>;
}