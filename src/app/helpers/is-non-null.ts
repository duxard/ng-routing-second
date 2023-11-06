import { isNull } from './is-null';

export function isNonNull<T>(value: T): value is NonNullable<T> {
  return !isNull(value);
}
