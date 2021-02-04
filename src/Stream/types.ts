export type StreamCompareFn<T> = (
    previousValue: T, currentValue: T, currentIndex: number, array: T[]
) => T;

export type StreamForEachFn<T> = (value: T, index: number, array: T[]) => void;

export type StreamMapFn<T, C> = (value: T, index: number, array: T[]) => C;

export type StreamMatchFn<T> = (value: T, index: number, array: T[]) => unknown;

export type StreamReduceFn<T, C> = (
    previousValue: C, currentValue: T, currentIndex: number, array: T[]
) => C;

export type StreamSortFn<T> = (a: T, b: T) => number;
