export type StreamCompareFn<T> = (a: T, b: T) => T;
export type StreamForEachFn<T> = (value: T) => void;
export type StreamMapFn<T, C> = (value: T) => C;
export type StreamMatchFn<T> = (value: T) => boolean;
export type StreamReduceFn<T, C> = (prev: C, next: T) => C;
export type StreamSortFn<T> = (a: T, b: T) => number;
