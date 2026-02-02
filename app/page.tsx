"use client";

import Button from "@/components/common/Button";
import Header from "@/components/common/Header";
import Checkbox from "@/components/common/CheckBox";
import Search from "@/components/common/Search";
import Memo from "@/components/common/Memo";

export default function Home() {

    return (
        <>
            <Header/>
            <div className="flex items-center justify-center bg-slate-100 gap-4">
                <Button variant="add" onClick={() => console.log('추가 클릭')}/>
                <Button variant="delete" onClick={() => console.log('삭제 클릭')}/>
                <Button variant="complete" onClick={() => console.log('완료 클릭')}/>
            </div>
            <Checkbox variant="list" isCompleted={false} text="비타민 챙겨 먹기" onToggle={() => console.log("토글")}/>
            <Checkbox variant="detail" isCompleted={true} text="비타민 챙겨 먹기" onToggle={() => console.log("토글")}/>
            <Search onChange={() => console.log("변화")} value={""}/>
            <Memo
                value={"메모"}
                onChange={() => console.log("변화")}
                placeholder="메모를 입력해주세요."
            />
            {/*<ImageUpload imageUrl={"imageUrl"} onImageChange={() => console.log("이미지 추가")}/>*/}
        </>
    );
}
