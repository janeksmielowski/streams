import { OptionalValue } from './types';

class Optional<T> {
    private value: OptionalValue<T>;

    public static empty<C>(): Optional<C> {
        return new Optional<C>();
    }

    public static of<C>(value: OptionalValue<C>): Optional<C> {
        return new Optional<C>(value);
    }

    private constructor(value: OptionalValue<T> = undefined) {
        this.value = value;
    }

    public get(): OptionalValue<T> {
        return this.value;
    }

    public isPresent(): boolean {
        return Boolean(this.value);
    }

    public orElse(other: T): T {
        return this.value || other;
    }
}

export default Optional;
