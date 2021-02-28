import isEqual from 'lodash.isequal';

class Optional {
    constructor(value = undefined) {
        this.value = value;
    }
    static empty() {
        return new Optional();
    }
    static of(value) {
        return new Optional(value);
    }
    get() {
        return this.value;
    }
    isPresent() {
        return Boolean(this.value);
    }
    orElse(other) {
        return this.value || other;
    }
}

class Stream {
    constructor(collection = []) {
        this.collection = [];
        this.collection = collection;
    }
    static builder() {
        return new StreamBuilder();
    }
    static concat(a, b) {
        return new Stream([...a.collection, ...b.collection]);
    }
    static empty() {
        return new Stream();
    }
    static of(collection) {
        return new Stream(collection);
    }
    allMatch(predicate) {
        return this.collection.every(predicate);
    }
    anyMatch(predicate) {
        return this.collection.some(predicate);
    }
    collect(collector) {
        return collector.collect(this.collection);
    }
    count() {
        return this.collection.length;
    }
    distinct() {
        const newCollection = [];
        this.collection.forEach(oldValue => {
            if (newCollection.every(newValue => !isEqual(oldValue, newValue))) {
                newCollection.push(oldValue);
            }
        });
        return new Stream(newCollection);
    }
    filter(filterFn) {
        const newCollection = this.collection.filter(filterFn);
        return new Stream(newCollection);
    }
    findFirst() {
        return Optional.of(this.collection[0]);
    }
    flatMap(flatMapFn) {
        const newCollection = this.collection.flatMap(flatMapFn);
        return new Stream(newCollection);
    }
    forEach(forEachFn) {
        this.collection.forEach(forEachFn);
    }
    limit(maxSize) {
        const newCollection = this.collection.slice(0, maxSize);
        return new Stream(newCollection);
    }
    map(mapFn) {
        const newCollection = this.collection.map(mapFn);
        return new Stream(newCollection);
    }
    max(comparator) {
        return Optional.of(this.collection.reduce(comparator));
    }
    min(comparator) {
        return Optional.of(this.collection.reduce(comparator));
    }
    noneMatch(predicate) {
        return !this.collection.some(predicate);
    }
    peek(peekFn) {
        this.collection.forEach(peekFn);
        return this;
    }
    reduce(initValue, reduceFn) {
        const value = this.collection.reduce(reduceFn, initValue);
        return Optional.of(value);
    }
    skip(n) {
        const newCollection = this.collection.slice(n);
        return new Stream(newCollection);
    }
    sorted(sortFn) {
        const newCollection = this.collection.sort(sortFn);
        return new Stream(newCollection);
    }
}
class StreamBuilder {
    constructor(collection = []) {
        this.collection = [];
        this.collection = collection;
    }
    add(value) {
        const newCollection = [...this.collection, value];
        return new StreamBuilder(newCollection);
    }
    addAll(collection) {
        const newCollection = [...this.collection, ...collection];
        return new StreamBuilder(newCollection);
    }
    build() {
        return Stream.of(this.collection);
    }
}

class Collectors {
    static toArray() {
        return new ArrayCollector();
    }
    static groupingBy(key) {
        return new GroupingByCollector(key);
    }
}
class ArrayCollector {
    collect(collection) {
        return collection;
    }
}
class GroupingByCollector {
    constructor(key) {
        this.getItemWithoutKey = (item, key) => {
            const { [key]: _, ...rest } = item;
            return rest;
        };
        this.key = key;
    }
    collect(collection) {
        const map = new Map();
        collection.forEach(item => map.set(item[this.key], [
            ...(map.get(item[this.key]) || []),
            this.getItemWithoutKey(item, this.key)
        ]));
        return map;
    }
}

export default Stream;
export { Collectors, Optional, Stream };
