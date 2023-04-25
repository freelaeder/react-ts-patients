import { useState, useEffect } from "react";

function useMaskIdNumber(idNumber: string, startIndex: number, endIndex: number): string {
    const [maskedIdNumber, setMaskedIdNumber] = useState<string>("");

    useEffect(() => {
        if (!idNumber) {
            setMaskedIdNumber("");
            return;
        }
        const maskedNumber = `${idNumber.substr(0, startIndex)}****${idNumber.substr(endIndex)}`;
        setMaskedIdNumber(maskedNumber);
    }, [idNumber, startIndex, endIndex]);

    return maskedIdNumber;
}

export default useMaskIdNumber;
