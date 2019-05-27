# get-directory

Package that permit you to import every directory and files in a given path.

---

## Usage

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

module.exports = require('get-directory')(__dirname);
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

---

## Options

### Custom path

```Javascript
require('get-directory')('path of the folder (Required)');
```

### Custom files types

```Javascript
require('get-directory')(__dirname, ['.js', '.ts']); // default is ['.js']
```

# License

[MIT](https://github.com/AnatoleLucet/get-directory/blob/master/LICENSE)
