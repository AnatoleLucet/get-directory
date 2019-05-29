# [@anatole-lucet/get-directory](https://www.npmjs.com/package/@anatole-lucet/get-directory)

Package that permit you to import every directory and files in a given path.

---

## Installation

```
npm i -s @anatole-lucet/get-directory
```

## Usage

#### Simple usage :

- index.js
- auth/
  - login.js
  - register.js

```Javascript
// index.js

const auth = require('@anatole-lucet/get-directory')(module); // You need to pass the 'module' global variable.
// By default this will take every files & directories in './', see the options below for more informations.

console.log(auth);
/* {
 *   auth: {
 *     login: 'login s export',
 *     register: 'register s export'
 *   }
 * }
 */
```


#### Simple exemple :

- server.js
- controllers/
  - index.js
  - auth/
    - login.js
    - register.js
  - posts/
    - index.js
  - comment/
    - index.js
    - add/
      - addOne.js
      - addTwo.js

```Javascript
// controllers/index.js

module.exports = require('@anatole-lucet/get-directory')(module);
```

```Javascript
// server.js

const { auth, posts, comment } = require('./controllers');


// Full object :

console.log(require('./controllers'));
/* {
 *   auth: { login: 'login s export',  register: 'register s export' }
 *   posts: 'post s export' // If there is just one index the index is assigned to the folder
 *   comment: {
 *     index: 'index s export',
 *     add: {
 *       addOne: 'addOne s export',
 *       addTwo: 'addTwo s export'
 *     }
 *   }
 * }
 */
```

**Do not try to import a file with this package if the file in question use and export it.**

---

## Options

You can give some options in an object.

#### Custom files extensions

```Javascript
require('@anatole-lucet/get-directory')(module, { extensions: ['.js', '.ts'] }); // Default is ['.js']
```

#### Blacklist

```Javascript
require('@anatole-lucet/get-directory')(module, { blacklist: ['register.js', 'comment'] });
```

#### Custom Path

```Javascript
require('@anatole-lucet/get-directory')(module, { path: './auth' }); // Default is './'
```

# License

[MIT](https://github.com/AnatoleLucet/get-directory/blob/master/LICENSE)
