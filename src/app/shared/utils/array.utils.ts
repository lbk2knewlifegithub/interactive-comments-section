export function insert<T>(index: number, item: T, array: T[]) {
  return [...array.slice(0, index), item, ...array.slice(index + 1)];
}
