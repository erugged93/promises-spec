import { PromiseFn, OnFulfilledFn, OnRejectedFn } from "../util/types";

export class MyPromise {
  _state: "pending" | "fulfilled" | "rejected";
  _value: any;
  _reason: any;
  _queue: any[] = [];
  constructor(fn: PromiseFn) {
    // (resolve) => {
    //   resolve(1);
    // }
    this._state = "pending";
    fn(this._resolve, this._reject);
  }

  _resolve = (val: any) => {
    if (this._state === "pending") {
      this._state = "fulfilled";
      this._value = val;
      this._queue.map((callback) => process.nextTick(callback));
    }

    //
  };

  _reject = (val: any) => {
    if (this._state === "pending") {
      this._state = "rejected";
      this._reason = val;
      this._queue.map((callback) => process.nextTick(callback));
    }
    //
  };

  then = (onFulfilled?: OnFulfilledFn, onRejected?: OnRejectedFn) => {
    console.log("state", this._state);
    if (this._state === "pending") {
      this._queue.push(() => {
        if (this._state === "fulfilled" && typeof onFulfilled === "function") {
          onFulfilled(this._value);
        } else if (
          this._state === "rejected" &&
          typeof onRejected === "function"
        ) {
          onRejected(this._reason);
        }
      });
      return new MyPromise((onFulfilled, onRejected) => null);
    } else {
      if (this._state === "fulfilled" && typeof onFulfilled === "function") {
        return new MyPromise((onFulfilled) => {
          process.nextTick(() => onFulfilled(this._value));
        });
      } else if (
        this._state === "rejected" &&
        typeof onRejected === "function"
      ) {
        process.nextTick(() => onRejected(this._reason));
      }
    }
  };
}
