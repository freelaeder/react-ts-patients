export default function delayTwoSeconds(): Promise<void> {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, 2000);
    });
}
