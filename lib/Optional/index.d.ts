import { OptionalValue } from './types';
declare class Optional<T> {
    private value;
    static empty<C>(): Optional<C>;
    static of<C>(value: OptionalValue<C>): Optional<C>;
    private constructor();
    get(): OptionalValue<T>;
    isPresent(): boolean;
    orElse(other: T): T;
}
export default Optional;
