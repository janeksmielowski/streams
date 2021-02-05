# Streams
JavaScript/TypeScript library for easy collections manipulation via stream, inspired by Java.

## Installation
```sh
yarn add @jeyz/streams
```

## Usage
Given the following example array of data:
```typescript
const cars: CarData[] = [
        { brand: "Audi", model: "A4", production: 2017, specs: { doors: 4, horsePower: 200 }},
        { brand: "Audi", model: "A6", production: 2021, specs: { doors: 4, horsePower: 235 }},
        { brand: "Audi", model: "A6", production: 2021, specs: { doors: 4, horsePower: 235 }},
        { brand: "BMW", model: "X5", production: 2016, specs: { doors: 5, horsePower: 240 }},
        { brand: "Mercedes", model: "C W205", production: 2017, specs: { doors: 4, horsePower: 190 }},
        { brand: "Tesla", model: "3", production: 2021, specs: { doors: 4, horsePower: 360 }},
    ];
```

We can transform the classic array instance to the stream form, pretty similar to this, known from Java - Stream:
```typescript
const carStream = Stream.of(cars);
```

Stream might be used in the following example processing:
```typescript
const threeMostPowerfulCars = carStream
    .filter(car => car.production > 2016)
    .distinct()
    .map(car => ({ name: `${car.brand} ${car.model}`, ...car.specs }))
    .sorted((car1, car2) => car1.horsePower < car2.horsePower ? 1 : -1)
    .limit(3)
    .collect(Collectors.toArray());

/** Gives Array(3)
 * 0: {name: "Mercedes C W205", doors: 4, horsePower: 190}
 * 1: {name: "Audi A4", doors: 4, horsePower: 200}
 * 2: {name: "Audi A6", doors: 4, horsePower: 235}
 */
```

You can also call use different collectors or extend `Collector` class and implement your own:
```typescript
const carsGroupedByBrand = carStream
    .map(car => ({ car.brand, car.model, car.production }))
    .collect(Collectors.groupingBy('brand'));

/** Gives Map(4)
 * "Audi" => [ "A4", "A6", "A6" ],
 * "BMW" => ["X5"],
 * "Mercedes" => ["C W205"],
 * "Tesla" => ["3"]
 */
```

## Stream
### `static builder()`
Returns a new `StreamBuilder`, which allows to create `Stream`, by appending single elements manually or append whole collection of elements. See below for more details.

### `static concat(aStream, bStream)`
Returns a new `Stream`, which consists of two streams given as arguments, concatenated in order. Both streams must use the same type of elements.

### `static empty()`
Returns a new `Stream` without any elements inside.

### `static of(collection)`
Returns a new `Stream`, built from `collection`.

### `allMatch(predicate)`
Returns `true` when all the elements in stream match given `predicate`. Otherwise returns `false`.

### `anyMatch(predicate)`
Returns `true` when at least one of the elements in stream match given `predicate`.

### `collect(collector)`
Collects stream elements using the `collector`. See below for more details.

### `count()`
Gives the number of elements in stream.

### `distinct()`
Returns a new `Stream` having no duplicate elements. All elements are compared via deep equality verification, which enables the usage with object values.

### `filter(filterFn)`
Returns a new `Stream` with only those elements, that match `filterFn` argument.

### `findFirst()`
Gives an `Optional` with first element in stream. For `Optional`, see below for more details.

### `flatMap(flatMapFn)`
Returns a new `Stream` with elements mapped by a given function and then flattened with depth 1.

### `forEach(forEachFn)`
Performs a given function on each element of stream. Does not return any value.

### `limit(maxSize)`
Returns a new `Stream` having only requested number of elements, starting from beginning of the stream.

### `map(mapFn)`
Returns a new `Stream` with elements mapped by a given function.

### `max(comparator)`
Gives an `Optional` with the maximum value in stream, based on a given `comparator` function, that decides about order. The function should decide between elements `a` and `b` and return one of them.

```typescript
const mostModernCar = carStream
    .max((a, b) => a.production > b.production ? a : b);

/** Gives Optional of
 * { brand: "Tesla", model: "3", production: 2021, specs: {...}}
```

### `min(comparator)`
Gives an `Optional` with the minimum value in stream, based on a given `comparator` function.

### `noneMatch(predicate)`
Returns `true` when none of the elements in stream match given `predicate`. Otherwise returns `false`.

### `peek(peekFn)`
Performs a given function on each element of stream. Returns `this`.

### `reduce(initValue, reduceFn)`
Returns an `Optional` with the reduced value, based on given reducer. The `initValue` argument specifies the initial value for accumulator.

```typescript
const averageHorsePower = carStream
    .map(car => car.specs.horsePower)
    .reduce(0, (prev, next) => prev + next)
    .orElse(0) / carStream.count();
```

### `skip(n)`
Returns a new `Stream` having only those elements of stream starting from `n` index.

### `sorted(sortFn)`
Returns a new `Stream` with all elements sorted by a given argument comparator:
- If the result is negative a is sorted before b,
- If the result is positive b is sorted before a,
- If the result is 0 no changes are done with the sort order of the two values.

## StreamBuilder
### `add(value)`
Returns a new `StreamBuilder` enhanced by a single value.

### `addAll(collection)`
Returns a new `StreamBuilder` enhanced by a collection.

### `build()`
Returns a `Stream` based on stream builder data.

## Collectors
### `static toArray()`
Returns a new array of elements from stream.

### `static groupingBy(key)`
Returns a new map of elements from stream, grouped by a given key.

## Optional
### `static empty()`
Returns an empty `Optional`.

### `static of(value)`
Returns an `Optional` from value.

### `get()`
Returns the value of optional.

### `isPresent()`
Returns `true` if value exists in optional. Otherwise returns `false`.

### `orElse(other)`
Returns the value of optional if exists. Otherwise returns `other`.

# Advanced usage
For easier process of creating stream from `Array` source, you can define a custom extension for Array prototype:

```typescript
// in topmost file of project
Array.prototype.stream = function() {
    return new Stream.of(this);
}

// in types declaration file (TypeScript only)
declare global {
    interface Array<T> {
        stream(): Stream<T>;
    }
}
```

From now, you can transform `Array` into `Stream` as below:

```typescript
const carStream = cars.stream();
```

# References
[Java Stream Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html)