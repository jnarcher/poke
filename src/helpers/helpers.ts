export function squentialArray(N: number) : number[] {
    return Array.from(Array(N).keys());
}

export function clamp(val: number, max: number, min: number) : number {
    return Math.max(Math.min(val, max), min); 
}