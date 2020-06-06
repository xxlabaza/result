
/*
 * Copyright 2020 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export type Result<T, E> = Success<T, E> | Failure<T, E>;

export class Success<T, E> {

  constructor (readonly value: T) { }

  isSuccess (): this is Success<T, E> {
    return true;
  }

  isFailure (): this is Failure<T, E> {
    return !this.isSuccess();
  }

  map<A> (callback: (result: T) => A): Result<A, E> {
    const nextResult = callback(this.value);
    return success(nextResult);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  mapError<U> (_: (error: E) => U): Result<T, U> {
    return success(this.value);
  }

  or (defaultValue: T): T {
    return this.value === undefined
           ? defaultValue // eslint-disable-line indent
           : this.value; // eslint-disable-line indent
  }

  orGet (supplier: () => T): T {
    return this.value === undefined
           ? supplier() // eslint-disable-line indent
           : this.value; // eslint-disable-line indent
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  orError (_?: (e: E) => Error): T {
    return this.value;
  }
}

export class Failure<T, E> {

  constructor (readonly error: E) {}

  isSuccess (): this is Success<T, E> {
    return false;
  }

  isFailure (): this is Failure<T, E> {
    return !this.isSuccess();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  map<A> (_: (result: T) => A): Result<A, E> {
    return failure(this.error);
  }

  mapError<U> (callback: (error: E) => U): Result<T, U> {
    const newError = callback(this.error);
    return failure(newError);
  }

  or (defaultValue: T): T {
    return defaultValue;
  }

  orGet (supplier: () => T): T {
    return supplier();
  }

  orError (callback?: (error: E) => Error): T {
    if (callback) {
      throw callback(this.error);
    }
    if (this.error instanceof Error) {
      throw this.error;
    }
    const message = `${this.error}`;
    throw new Error(message);
  }
}

export const success = <T, E>(value: T): Success<T, E> => new Success(value);

export const failure = <T, E>(error: E): Failure<T, E> => new Failure(error);
