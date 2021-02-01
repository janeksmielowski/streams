import Accumulator from '../Accumulator';

class Accumulators {
    public static sum(): Accumulator<number, number> {
        return new SumAccumulator();
    }
}

class SumAccumulator implements Accumulator<number, number> {
    public apply(prev: number, next: number): number {
        return prev + next;
    }
}

export default Accumulators;
