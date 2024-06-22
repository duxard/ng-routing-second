````
transform<T, R, V extends unknown[]>(value: T, mapper: TMapper<[T, ...V], R>, ...args: V): R {
    return mapper(value, ...args);
}
export type TMapper<T extends unknown[], G> = (...args: T) => G;
````
