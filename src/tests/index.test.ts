
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

import { Success, Failure, success, failure } from '../main';


describe('Result.Success', () => {
  it('Creates an Success value', () => {
    const okVal = success(12);

    expect(okVal.isSuccess()).toBe(true);
    expect(okVal.isFailure()).toBe(false);
    expect(okVal).toBeInstanceOf(Success);
  });

  it('Creates an Success value with null', () => {
    const okVal = success(null);

    expect(okVal.isSuccess()).toBe(true);
    expect(okVal.isFailure()).toBe(false);
    expect(okVal.value).toBe(null);
  });

  it('Creates an Success value with undefined', () => {
    const okVal = success(undefined);

    expect(okVal.isSuccess()).toBe(true);
    expect(okVal.isFailure()).toBe(false);
    expect(okVal.value).toBeUndefined();
  });
});

describe('Result.Failure', () => {
  it('Creates an Failure value', () => {
    const errVal = failure('I have you now.');

    expect(errVal.isSuccess()).toBe(false);
    expect(errVal.isFailure()).toBe(true);
    expect(errVal).toBeInstanceOf(Failure);
  });

  it('Skips `map`', () => {
    const errVal = failure('I am your father');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const mapper = jest.fn(_ => 'noooo');

    const hopefullyNotMapped = errVal.map(mapper);
    expect(hopefullyNotMapped.isFailure()).toBe(true);

    // for type guards, https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-differentiating-types
    if (hopefullyNotMapped.isFailure()) {
      expect(mapper).not.toHaveBeenCalled();
      expect(hopefullyNotMapped.error).toEqual(errVal.error);
    } else {
      throw new Error('What?');
    }
  });

  it('Maps over an Error', () => {
    const errVal = failure('Round 1, Fight!');

    const mapper = jest.fn((error: string) => error.replace('1', '2'));

    const mapped = errVal.mapError(mapper);
    expect(mapped.isFailure()).toBe(true);

    // for type guards, https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-differentiating-types
    if (mapped.isFailure()) {
      expect(mapper).toHaveBeenCalledTimes(1);
      expect(mapped.error).not.toEqual(errVal.error);
    } else {
      throw new Error('What?');
    }
  });
});
