// 用于实现切换效果的钩子函数
// src/hooks/useToggle.ts
import { useCallback, useState } from "react";

export default function useToggle(
    initialValue = false
): [boolean, () => void] {
    const [state, setState] = useState(initialValue);
    const toggle = useCallback(() => {
        setState((state) => !state);
    }, []);
    return [state, toggle];
}