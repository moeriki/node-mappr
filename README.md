<p align="center">
  <h3 align="center">mappr</h3>
  <p align="center">A tiny JavaScript utility to assist with Functional object mapping.<p>
  <p align="center">
    <a href="https://www.npmjs.com/package/mappr">
      <img src="https://img.shields.io/npm/v/mappr.svg" alt="npm version">
    </a>
    <a href="https://travis-ci.org/Moeriki/node-mappr">
      <img src="https://travis-ci.org/Moeriki/node-mappr.svg?branch=master" alt="Build Status"></img>
    </a>
    <a href="https://coveralls.io/github/Moeriki/node-mappr?branch=master">
      <img src="https://coveralls.io/repos/github/Moeriki/node-mappr/badge.svg?branch=master" alt="Coverage Status"></img>
    </a>
    <a href="https://david-dm.org/moeriki/node-mappr">
      <img src="https://david-dm.org/moeriki/node-mappr/status.svg" alt="dependencies Status"></img>
    </a>
    <a href="https://snyk.io/test/github/moeriki/node-mappr">
      <img src="https://snyk.io/test/github/moeriki/node-mappr/badge.svg" alt="Known Vulnerabilities"></img>
    </a>
  </p>
</p>

---

*   [Install](#install)
*   [Why?](#why)
*   [Usage](#usage)
*   [Basics](#basics)
    *   [Strings](#strings)
    *   [Objects](#objects)
    *   [Functions](#functions)
*   [Advanced](#advanced)
    *   [Chaining](#chaining)
    *   [Composing](#composing)
    *   [Combining](#combining)

<a name="install"></a>
## Install

```sh
npm install --save mappr
```

<a name="why"></a>
## Why?

By following principles of functional programming, your code contains less bugs, and is more easily testable. The two important pillars here are [immutability](https://wikipedia.org/wiki/Special:Search/immutability) and [pure functions](https://en.wikipedia.org/wiki/Pure_function).

Object mapping is a frequent, often badly implemented, problem in coding. Different APIs use different data structures etc...

`mappr` will help you write good functional data mapping functions.

**Resources**

*   [Functional programming](https://en.wikipedia.org/wiki/Functional_programming) (Wikipedia)
*   [Functional programming should be your 1 priority](https://medium.com/@jugoncalves/functional-programming-should-be-your-1-priority-for-2015-47dd4641d6b9#.ak14bl1a8)
*   [Why functional languages?](https://stackoverflow.com/questions/36504/why-functional-languages)

<a name="usage"></a>
## Usage

`mappr` is exposed as a function.

```javascript
var mappr = require('mappr');

mappr( … );
mappr.compose( … );
```

**ES Module**

```javascript
import mappr from 'mappr/es';

mappr( … );
mappr.compose( … );
```

<a name="basics"></a>
## Basics

```
mappr(...string|object|function):function
```

Create a mapper function by invoking `mappr` with one or more arguments. Mappers can be strings, objects, or functions.

<a name="strings">**Strings**</a>

```javascript
var getName = mappr('user.name');

var name = getName({ user: { name: 'Jane' } });

// name = 'Jane'
```

String mappers are created by passing a string to `mappr`. This creates a mapper function that will retrieve nested JSON data using the provided string.

*Note:  uses [lodash.get][1] internally*

<a name="#objects">**Objects**</a>

```javascript
var getUser = mappr({
    name: 'data.firstName'
});

var user = getUser({ data: { firstName: 'Jane' } });

// user = { name: 'Jane' }
```

An object mapper is created by passing an object into `mappr`. This creates a mapper function that will construct a JSON object. The object keys will be used as-is, the values will be parsed recursively by `mappr`.

This means the following two examples are exactly the same in execution.

```javascript
var getUser = mappr({
    name: 'user.firstName'
});
```

```javascript
var getUser = mappr({
    name: mappr('user.firstName')
});
```

This is just FYI. You'll never have to write the latter.

<a name="#functions">**Functions**</a>

Lastly a function mapper create a function, that executes a function.

```javascript
var getUserName = mappr(function (name) {
  return name.firstName + ' ' + name.lastName;
});

var username = getUserName({
    firstName: 'Jane',
    lastName: 'Doe'
});

// username = 'Jane Doe'
```

By itself not very useful. Its power stems from composing it with other mappers.

<a name="advanced"></a>
## Advanced

<a name="chaining">**Chaining**</a>

`mappr` takes one or more arguments. When more arguments are provided the results are chained. The output of the preceding function is provided as the input of the proceding function.

```javascript
var getUsername = mappr(
    'user.name',
    function trim(userName) {
        return userName.trim();
    },
    function toUpper(userName) {
        return userName.toUpperCase();
    }
)

var username = getUsername({ user: { name: '  Jane  ' } });

// username = 'JANE'
```

<a name="composing">**Composing**</a>

```
mappr.compose(...string|object|function):function
```

`compose` allows you to combine multiple mappers together and merge their results into one object.

```javascript
var mapName = mappr({
  name: 'user.firstName',
  familyName: 'user.lastName',
});

var mapAddress = mappr({
  address: function (src) {
    return src.user.street + ' ' + src.user.streetNumber;
  }
});

var mapUser = mappr.compose(mapName, mapAddress);

var user = mapUser({
  user: {
    firstName: 'Jane',
    lastName: 'Doe',
    street: 'Barstreet',
    streetNumber: '18'
  }
});

// user = {
//   name: 'Jane',
//   familyName: 'Doe',
//   address: 'Barstreet 18'
// }
```

<a name="combining">**Combining**</a>

`mappr` quickly gets very powerful when combining with other FP libraries. Here is an example when used with [Lodash FP][2].

```javascript
var _ = require('lodash/fp');

var mapUser = mappr.compose(
  _.pick(['firstName', 'lastName']),
  {
    articles: mappr('posts', _.map(_.omit(['id']))),
  }
);

var user = mapUser({
  firstName: 'Jane'
  lastName: 'Doe',
  gender: 'female',
  posts: [
    { id: '1', title: 'My Post 1', upvoteCount: 123 },
    { id: '2', title: 'My Post 2', udpateCount: 456 }
  ]
});

// user = {
//   firstName: 'Jane',
//   lastName: 'Doe',
//   articles: [
//     { title: 'My Post 1', upvoteCount: 123 },
//     { title: 'My Post 2', upvoteCount: 456 }
//   ]
// }
```

**ES2015**

ES2015 makes everything nicer.

```javascript
const mapUser = mappr({
  name: (src) => `${src.firstName} ${src.lastName}`
});

const user = mapUser({
    firstName: 'Jane',
    lastName: 'Doe'
});

// user = {
//   name: 'Jane Doe'
// }
```

[1]: https://lodash.com/docs#get
[2]: https://github.com/lodash/lodash/wiki/FP-Guide
