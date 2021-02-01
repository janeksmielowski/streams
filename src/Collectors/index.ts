import Collection from '../Collection';
import Collector from '../Collector';

class Collectors {
    public static toArray<T>(): Collector<T, Array<T>> {
        return new ArrayCollector<T>();
    }
}

class ArrayCollector<T> implements Collector<T, Array<T>> {
    public collect(collection: Collection<T>) {
        return collection as Array<T>;
    }
}

export default Collectors;
