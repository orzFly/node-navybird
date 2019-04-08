import { Resolvable } from '../helpers/resolvable';
import { GenericPromise, getPromiseConstructor } from '../helpers/getPromiseConstructor';
import { reduce } from './reduce';

/**
 * Iterate over an array, or a promise of an array, which contains promises (or a mix of promises and values) with the given iterator function with the signature (item, index, value) where item is the resolved value of a respective promise in the input array.
 * Iteration happens serially. If any promise in the input array is rejected the returned promise is rejected as well.
 *
 * Resolves to the original array unmodified, this method is meant to be used for side effects.
 * If the iterator function returns a promise or a thenable, the result for the promise is awaited for before continuing with next iteration.
 */
export function eachSeries<R, U>(
  iterable: Resolvable<Iterable<Resolvable<R>>>,
  iterator: (item: R, index: number, arrayLength: number) => Resolvable<U>
): GenericPromise<R[]> {
  const Promise = getPromiseConstructor(this);
  const ret: R[] = [];

  return Promise.resolve(
    reduce(
      iterable,
      function eachSeriesReducer(a, b, i, length) {
        return Promise.resolve(iterator(b, i, length)).then(
          function eachSeriesMapperCallback(val) {
            ret.push(b);
          }
        );
      },
      {}
    ).then(function eachSeriesResult() {
      return ret
    })
  );
};
