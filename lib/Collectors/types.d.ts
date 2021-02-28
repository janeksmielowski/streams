export declare type GroupingByMap<T, K extends keyof T> = Map<T[K], Array<Omit<T, K>>>;
