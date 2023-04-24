// src/shared/Image/index.tsx
import React, { useState } from "react";

interface Props {
    // 图片地址
    url: string;
    // 图片说明
    alt: string;
}

// 图片加载失败后展示的图片的样式
const errorStyle: React.CSSProperties = {
    width: "50%",
    height: "50%",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
};

export default function Image({ url, alt }: Props) {
    // 标记图片是否加载失败
    const [error, setError] = useState(false);
    // 如果标记为false, 加载目标图片
    if (!error)
        return (
            <img
                src={url}
                alt={alt}
                onError={({ currentTarget }) => {
                    setError(true);
                    currentTarget.style.cssText = "";
                }}
            />
        );
    // 否则渲染用于提示用户图片加载失败的图片
    return (
        <img
            src={require("@icons/user/break.svg").default}
            alt="图片加载失败"
            style={errorStyle}
        />
    );
}