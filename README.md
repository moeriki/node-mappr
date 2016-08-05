**NOTE** WIP, not published yet

# MAPPR

MAPPR is a tiny (2,5kb) JavaScript util to assist with POJO (Plain Old JavaScript Object) to POJO mapping.

**Advantages**

* pure functions = testable to the bone

## Usage

MAPPR exposes three utility functions.

**ES5**

```javascript
var mappr = require('mappr');
var createMapper = mappr.createMapper;
var composeMappers = mappr.composeMappers;
```

**ES2015**

```javascript
import { createMapper, composeMappers } from 'mappr';
```

### createMapper

```
createMapper(mapper:string|object|function, ...formatters:function):function
```

`createMapper` allows you to create a mapper function based on a mapper object.

**String getters**

In its most basic usage a mapper object lists its destination keys (`name`, `familyName`) as properties accompanied by string getters (`'firstName'`, `'lastName'`).

```javascript
var mapUser = createMapper({
  name: 'firstName',
  familyName: 'lastName'
});

var user = mapUser({
  firstName: 'Jane',
  lastName: 'Doe'
});

// user = {
//   name: 'Jane',
//   familyName: 'Doe'
// }
```

You can easily map from and to nested properties.

```javascript
var mapUser = createMapper({
  username: {
    name: 'user.name.first'
  }
});

var user = mapUser({
  user: {
    name: {
      first: 'Jane'
    },
  }
});

// user = {
//   username: {
//     name: 'Jane'
//   }
// }
```

*Note: getting a nested property from the source object uses [lodash.get](https://lodash.com/docs#get) internally.*

**Custom getters**

In the above examples we used string getters to map values one-on-one from a source property to a destination property.

If you need more flexibility for your destination value you can use a custom getter; a function that receives one argument, namely the source object.

```javascript
var mapPerson = createMapper({
  name: function (src) {
    return src.firstName + ' ' + src.lastName;
  }
});

var result = mapPerson({
  firstName: 'Jane',
  lastName: 'Doe',
});

// result = {
//   name: 'Jane Doe',
// }
```

**Additional formatting**

`createMapper` accepts additional functions as rest parameters. Use this to format the output of your mapper.

```javascript
var user = { name: 'John H. Benjamin' };
var mapName = createMapper(
  'name',
  function (name) { return name.toUpperCase(); },
  function (name) { return name.split('').reverse().join(''); },
);
var name = mapName(user);
// name = 'NIMAJNEB .H NHOJ'
```

### composeMappers

```
composeMappers(...mapper:object):function
```

`composeMappers` allows you to combine multiple mappers together and merge their result into one object.

```javascript
var mapName = createMapper({
  name: 'user.firstName',
  familyName: 'user.lastName',
});

var mapAddress = createMapper({
  address: function (src) {
    return src.user.street + ' ' + src.user.streetNumber;
  }
});

var mapUser = composeMappers(mapName, mapAddress);

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

## Advanced usage

**ES2015**

It *almost* goes without saying ES2015 makes everything nicer.

```javascript
const mapper = createMapper({
  name: (src) => `${src.firstName} ${src.lastName}`
});

const user = mapUser({ firstName: 'Jane', lastName: 'Doe' });

// user = {
//   name: 'Jane Doe'
// }
```

**Custom getters and FP**

Allowing the usage of custom getter functions makes an FP library such as [lodash/fp](https://github.com/lodash/lodash/wiki/FP-Guide) a great *(read: essential)* addition to MAPPR.

```javascript
var _ = require('lodash/fp');

var mapUser = composeMappers(
  _.pick(['firstName', 'lastName']),
  {
    articles: _.flow([
      _.get('posts'),
      _.map(_.pick(['title', 'upvoteCount'])),
    ])
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

**Mapping arrays to arrays**

`// TODO` `lodash-fp/map`

**Mapping arrays to objects**

`// TODO` `lodash-fp/reduce` probably?

**Mapping objects to arrays**

`// TODO` `lodash-fp/reduce`, `lodash-fp/map`, `lodash-fm/mapValues` probably?

## TODO

* better, more varied examples
* map data conditionally
