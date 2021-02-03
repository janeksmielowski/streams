import Collection from '../Collection';
import Collector from '../Collector';

class Collectors {
    public static toArray<T>(): Collector<T, Array<T>> {
        return new ArrayCollector<T>();
    }

    public static groupingBy<T, K extends MapKey>(
        groupFn: GroupFn<T, K>
    ): Collector<T, Map<K, Array<T>>> {
        return new GroupingByCollector(groupFn);
    }
}

class ArrayCollector<T> implements Collector<T, Array<T>> {
    public collect(collection: Collection<T>): Array<T> {
        return collection as Array<T>;
    }
}

class GroupingByCollector<T, K extends MapKey>
implements Collector<T, Map<K, Array<T>>> {
    private groupFn: GroupFn<T, K>;

    public constructor(groupFn: GroupFn<T, K>) {
        this.groupFn = groupFn;
    }

    public collect(collection: Collection<T>): Map<K, Array<T>> {
        const map = new Map<K, Array<T>>();
        collection.forEach(value => {
            map.set(this.groupFn(value), [
                // eslint-disable-next-line no-extra-parens
                ...(map.get(this.groupFn(value)) || []),
                value
            ]);
        });
        return map;
    }
}

type GroupFn<T, K extends MapKey> = (value: T) => K;
type MapKey = number | string | symbol;

export default Collectors;
