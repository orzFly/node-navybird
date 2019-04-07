import { map, ConcurrencyOption } from './functions/map';
import { delay } from './functions/delay';

/**
 * @$TypeExpand typeof map
 * @$$Eval (str) => str.replace(/GenericPromise/g, "Navybird")
 */
type NavybirdMap = <R, U>(iterable: Iterable<R | PromiseLike<R>> | PromiseLike<Iterable<R | PromiseLike<R>>>, mapper: (item: R, index: number) => U | PromiseLike<U>, opts: ConcurrencyOption) => Navybird<U[]>

/**
 * @$TypeExpand typeof delay
 * @$$Eval (str) => str.replace(/GenericPromise/g, "Navybird")
 */
type NavybirdDelay = { <R>(ms: number, value: R | PromiseLike<R>): Navybird<R>; (ms: number): Navybird<void>; }

export class Navybird<T> extends Promise<T> {
  static map: NavybirdMap = map as any
  static delay: NavybirdDelay = delay as any
}