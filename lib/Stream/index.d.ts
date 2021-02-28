import { StreamCompareFn, StreamForEachFn, StreamMapFn, StreamMatchFn, StreamReduceFn, StreamSortFn } from './types';
import Collection from '../Collection';
import Collector from '../Collector';
import Optional from '../Optional';
declare class Stream<T> {
    protected collection: Collection<T>;
    static builder<C>(): StreamBuilder<C>;
    static concat<C>(a: Stream<C>, b: Stream<C>): Stream<C>;
    static empty<C>(): Stream<C>;
    static of<C>(collection: Collection<C>): Stream<C>;
    protected constructor(collection?: Collection<T>);
    allMatch(predicate: StreamMatchFn<T>): boolean;
    anyMatch(predicate: StreamMatchFn<T>): boolean;
    collect<C>(collector: Collector<T, C>): C;
    count(): number;
    distinct(): Stream<T>;
    filter(filterFn: StreamForEachFn<T>): Stream<T>;
    findFirst(): Optional<T>;
    flatMap<C>(flatMapFn: StreamMapFn<T, C>): Stream<C>;
    forEach(forEachFn: StreamForEachFn<T>): void;
    limit(maxSize: number): Stream<T>;
    map<C>(mapFn: StreamMapFn<T, C>): Stream<C>;
    max(comparator: StreamCompareFn<T>): Optional<T>;
    min(comparator: StreamCompareFn<T>): Optional<T>;
    noneMatch(predicate: StreamMatchFn<T>): boolean;
    peek(peekFn: StreamForEachFn<T>): Stream<T>;
    reduce<O>(initValue: O, reduceFn: StreamReduceFn<T, O>): Optional<O>;
    skip(n: number): Stream<T>;
    sorted(sortFn: StreamSortFn<T>): Stream<T>;
}
declare class StreamBuilder<T> {
    private collection;
    constructor(collection?: Collection<T>);
    add(value: T): StreamBuilder<T>;
    addAll(collection: Collection<T>): StreamBuilder<T>;
    build(): Stream<T>;
}
export default Stream;
