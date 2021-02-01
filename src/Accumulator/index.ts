interface Accumulator<T, O> {
    apply(prev: O, next: T): O;
}

export default Accumulator;
