## Function that maps one type to another

```
function isNull(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}
function isNonNull<T>(value: T): value is NonNullable<T> {
  return !isNull(value);
}
interface User {
  name: string;
  id?: string;
}
interface UserWithId {
  name: string;
  userId: string;
}

// 1 - probably bad example
function getUsersWithIds(data: User[]): UserWithId[] {
    return data.filter((x): x is User & { id: string } => !!x.id).map((x) => ({
        name: x.name,
        userId: x.id
    }))
}

// 2 - good example
function getUsersWithIds2(data: User[]): UserWithId[] {
    return data.reduce((a: UserWithId[], v: User) => {
      a.push({
        name: v.name,
        userId: v.id ?? 'default_id'
      });
      return a;
    }, []);
}
```

## Type represents one of the array values

````
export const SELECT_OPERATORS = [
    EOperator.Is,
    EOperator.IsNot,
    EOperator.IsPresent,
    EOperator.IsNotPresent,
] as const;
export type TSelectOperator = (typeof SELECT_OPERATORS)[number];
````
