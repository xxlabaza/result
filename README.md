
# Overview

[![Build Status](https://travis-ci.com/xxlabaza/result.svg?branch=master)](https://travis-ci.com/xxlabaza/result)

`Result` - is a value that represents either a success or a failure, including an associated value in each case.

## Usage

> installation:
>
> ```bash
> $> npm install --save @xxlabaza/result
> ```

Create `Success` or `Failure` instances with the **success** and **failure** functions.

```typescript
import { success, failure } from '@xxlabaza/result'

// something awesome happend

const yesss = success(someAesomeValue)

// moments later ...

const mappedYes = yesss.map(doingSuperUsefulStuff)

// @xxlabaza/result uses type-guards to differentiate between Success and Failure instances
// Mode info: https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-differentiating-types
if (mappedYes.isSuccess()) {
  // using type guards, we can access an Success instance's `value` field
  doStuffWith(mappedYes.value)
} else {
  // because of type guards
  // typescript knows that mappedYes is an Failure instance and thus has a `error` field
  doStuffWith(mappedYes.error)
}
```

`Result` is defined as follows:

```typescript
type Result<T, E> = Success<T, E> | Failure<T, E>
```

`Ok<T, E>`: contains the success value of type `T`

`Err<T, E>`: contains the failure value of type `E`

## Development

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Building

To build the project, do the following:

```bash
$> npm run build
...
```

### Running the tests

To run the project's test, do the following:

```bash
$> npm test

...

Test Suites: 2 passed, 2 total
Tests:       12 passed, 12 total
Snapshots:   0 total
Time:        1.232 s, estimated 2 s
Ran all test suites.
```

## Changelog

To see what has changed in recent versions of the project, see the [changelog](./CHANGELOG.md) file.

## Contributing

Please read [contributing](./CONTRIBUTING.md) file for details on my code of conduct, and the process for submitting pull requests to me.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/appulse-projects/utils-java/tags).

## Authors

* **[Artem Labazin](https://github.com/xxlabaza)** - creator and the main developer

## License

This project is licensed under the Apache License 2.0 License - see the [license](./LICENSE) file for details
