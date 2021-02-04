import {
    StreamCompareFn,
    StreamForEachFn,
    StreamMapFn,
    StreamMatchFn,
    StreamReduceFn,
    StreamSortFn
} from './types';
import Collection from '../Collection';
import Collector from '../Collector';
import Optional from '../Optional';
import isEqual from 'lodash.isequal';

class Stream<T> {
    protected collection: Collection<T> = [];

    public static builder<C>(): StreamBuilder<C> {
        return new StreamBuilder<C>();
    }

    public static concat<C>(a: Stream<C>, b: Stream<C>): Stream<C> {
        return new Stream<C>([ ...a.collection, ...b.collection ]);
    }

    public static empty<C>(): Stream<C> {
        return new Stream<C>();
    }

    public static of<C>(collection: Collection<C>): Stream<C> {
        return new Stream<C>(collection);
    }

    protected constructor(collection: Collection<T> = []) {
        this.collection = collection;
    }

    public allMatch(predicate: StreamMatchFn<T>): boolean {
        return this.collection.every(predicate);
    }

    public anyMatch(predicate: StreamMatchFn<T>): boolean {
        return this.collection.some(predicate);
    }

    public collect<C>(collector: Collector<T, C>): C {
        return collector.collect(this.collection);
    }

    public count(): number {
        return this.collection.length;
    }

    public distinct(): Stream<T> {
        const newCollection: T[] = [];
        this.collection.forEach(oldValue => {
            if (newCollection.every(newValue => !isEqual(oldValue, newValue))) {
                newCollection.push(oldValue);
            }
        });
        return new Stream<T>(newCollection);
    }

    public filter(filterFn: StreamForEachFn<T>): Stream<T> {
        const newCollection = this.collection.filter(filterFn);
        return new Stream<T>(newCollection);
    }

    public findFirst(): Optional<T> {
        return Optional.of(this.collection[0]);
    }

    public flatMap<C>(flatMapFn: StreamMapFn<T, C>): Stream<C> {
        const newCollection = this.collection.flatMap(flatMapFn);
        return new Stream<C>(newCollection);
    }

    public forEach(forEachFn: StreamForEachFn<T>): void {
        this.collection.forEach(forEachFn);
    }

    public limit(maxSize: number): Stream<T> {
        const newCollection = this.collection.slice(0, maxSize);
        return new Stream<T>(newCollection);
    }

    public map<C>(mapFn: StreamMapFn<T, C>): Stream<C> {
        const newCollection = this.collection.map<C>(mapFn);
        return new Stream<C>(newCollection);
    }

    public max(comparator: StreamCompareFn<T>): Optional<T> {
        return Optional.of(this.collection.reduce(comparator));
    }

    public min(comparator: StreamCompareFn<T>): Optional<T> {
        return Optional.of(this.collection.reduce(comparator));
    }

    public noneMatch(predicate: StreamMatchFn<T>): boolean {
        return !this.collection.some(predicate);
    }

    public peek(peekFn: StreamForEachFn<T>): Stream<T> {
        this.collection.forEach(peekFn);
        return this;
    }

    public reduce<O>(
        initValue: O, reduceFn: StreamReduceFn<T, O>
    ): Optional<O> {
        const value = this.collection.reduce(reduceFn, initValue);
        return Optional.of(value);
    }

    public skip(n: number): Stream<T> {
        const newCollection = this.collection.slice(n);
        return new Stream<T>(newCollection);
    }

    public sorted(sortFn: StreamSortFn<T>): Stream<T> {
        const newCollection = this.collection.sort(sortFn);
        return new Stream<T>(newCollection);
    }
}

class StreamBuilder<T> {
    private collection: Collection<T> = [];

    public constructor(collection: Collection<T> = []) {
        this.collection = collection;
    }

    public add(value: T): StreamBuilder<T> {
        const newCollection = [ ...this.collection, value ];
        return new StreamBuilder<T>(newCollection);
    }

    public addAll(collection: Collection<T>): StreamBuilder<T> {
        const newCollection = [ ...this.collection, ...collection ];
        return new StreamBuilder<T>(newCollection);
    }

    public build(): Stream<T> {
        return Stream.of(this.collection);
    }
}

export default Stream;
