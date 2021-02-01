import Collection from '../Collection';

interface Collector<T, C> {
    collect(collection: Collection<T>): C;
}

export default Collector;
