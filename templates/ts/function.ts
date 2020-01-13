import * as test from "../util/test";
import {
  Deferred,
  PromiseFn,
  APlusPromise,
  OnResolveFn,
  OnRejectFn
} from "../util/types";

function myPromise(fn: PromiseFn): APlusPromise {
  function resolve(val: any) {
    // TODO
  }

  function reject(val: any) {
    // TODO
  }

  fn(resolve, reject);

  return {
    then(onFulfilled: OnResolveFn, onRejected: OnRejectFn) {
      let deferred = {} as Deferred;
      deferred.promise = myPromise((resolve, reject) => {
        deferred.resolve = resolve;
        deferred.reject = reject;
      });
      // TODO
      return deferred.promise;
    }
  };
}

test.testFunction(myPromise);
