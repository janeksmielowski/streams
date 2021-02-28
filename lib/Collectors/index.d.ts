import Collector from '../Collector';
import { GroupingByMap } from './types';
declare class Collectors {
    static toArray<T>(): Collector<T, Array<T>>;
    static groupingBy<T, K extends keyof T>(key: K): Collector<T, GroupingByMap<T, K>>;
}
export default Collectors;
