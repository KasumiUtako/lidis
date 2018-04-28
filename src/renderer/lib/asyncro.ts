// Rewrite asyncro in Typescript.

// util.ts

/**
 * Invoke an async transform function on each item in the given Array in
 * parallel, returning the resulting Array of mapped/transformed items.
 * @param array Invoke an async transform function on each item in the
 * given Array in parallel, returning the resulting Array of
 * mapped/transformed items.
 * > This is an asynchronous, parallelized version of Array.prototype.map().
 * @param mapper Async function, gets passed (value, index, array),
 * returns the new value.
 * @returns Array resulting mapped/transformed values.
 */
export function map<T, U>(
  array: T[],
  mapper: (value: T, index: number, array: T[]) => PromiseLike<U>
): Promise<U[]> {
  return Promise.all(array.map(mapper));
}

interface filterType<T> {
  (
    array: T[],
    filterer: (value: T, index: number, array: T[]) => PromiseLike<any>
  ): Promise<T[]>;
}

function baseMap<T>(operation: 'filter'): filterType<T> {
  return async (list, predicate) => {
    let mapped = await map(list, predicate);
    return list[operation]((v, i) => mapped[i]);
  };
}

// asyncro.ts

export const filter = baseMap('filter');
