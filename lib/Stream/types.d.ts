export declare type StreamCompareFn<T> = (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T;
export declare type StreamForEachFn<T> = (value: T, index: number, array: T[]) => void;
export declare type StreamMapFn<T, C> = (value: T, index: number, array: T[]) => C;
export declare type StreamMatchFn<T> = (value: T, index: number, array: T[]) => unknown;
export declare type StreamReduceFn<T, C> = (previousValue: C, currentValue: T, currentIndex: number, array: T[]) => C;
export declare type StreamSortFn<T> = (a: T, b: T) => number;
