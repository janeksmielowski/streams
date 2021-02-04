import Collection from '../Collection';
import Collector from '../Collector';
import { GroupingByMap } from './types';

class Collectors {
    public static toArray<T>(): Collector<T, Array<T>> {
        return new ArrayCollector<T>();
    }

    public static groupingBy<T, K extends keyof T>(
        key: K
    ): Collector<T, GroupingByMap<T, K>> {
        return new GroupingByCollector(key);
    }
}

class ArrayCollector<T> implements Collector<T, Array<T>> {
    public collect(collection: Collection<T>): Array<T> {
        return collection as Array<T>;
    }
}

class GroupingByCollector<T, K extends keyof T>
implements Collector<T, GroupingByMap<T, K>> {
    private key: K;

    public constructor(key: K) {
        this.key = key;
    }

    public collect(collection: Collection<T>): GroupingByMap<T, K> {
        const map = new Map();
        collection.forEach(item => map.set(
            item[this.key], [
                ...(map.get(item[this.key]) || []),
                this.getItemWithoutKey(item, this.key)
            ]
        ));
        return map;
    }

    private getItemWithoutKey = (item: T, key: K) => {
        const { [key]: _, ...rest } = item;
        return rest;
    }
}

export default Collectors;
