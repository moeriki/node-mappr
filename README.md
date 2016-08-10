# mappr

`mappr` is a tiny JavaScript utility to assist with object to object mapping.

## Usage

`mappr` is exposed as a function.

```javascript
var mappr = require('mappr');

mappr( … );
mappr.compose( … );
```

**ES Module**

```javascript
import mappr, { compose } from 'mappr';

mappr( … );
compose( … ); // or mappr.compose
```

## Basics

```
mappr(...string|object|function):function
```

Create a mapper function by invoking `mappr` with one or more arguments. Mappers can be strings, objects, or functions.

**Strings**

```javascript
var getName = mappr('user.name');

var name = getName({ user: { name: 'Jane' } });

// name = 'Jane'
```

String mappers are created by passing a string to `mappr`. This creates a mapper function that will retrieve nested JSON data using the provided string.

*Note:  uses [lodash.get](https://lodash.com/docs#get) internally*

**Objects**

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

**Functions**

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

### Advanced

**Chaining**

`mappr` takes one or more arguments. When more arguments are provided the results are chained. The output of the preceding function is provided as the input of the following function.

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

**Composing**

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

var mapUser = compose(mapName, mapAddress);

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

**Lodash FP**

`mappr` is meant to be a companion piece to [lodash/fp](https://github.com/lodash/lodash/wiki/FP-Guide). Or is it the other way around?

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

It *almost* goes without saying ES2015 makes everything nicer.

```javascript
const mapper = mappr({
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

## Examples

**Mapping arrays to arrays**

`// TODO` `lodash-fp/map`

**Mapping arrays to objects**

`// TODO` `lodash-fp/reduce` probably?

**Mapping objects to arrays**

`// TODO` `lodash-fp/reduce`, `lodash-fp/map`, `lodash-fm/mapValues` probably?

## TODO

* better, more varied examples
* write Medium article because it's 2016
