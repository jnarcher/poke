export function sequentialArray(N: number, start: number = 0) : number[] {
    let arr = Array.from(Array(N).keys());
    arr = arr.map((val) => val + start);
    return arr;
}

export function clamp(val: number, max: number, min: number) : number {
    return Math.max(Math.min(val, max), min); 
}