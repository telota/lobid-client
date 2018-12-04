# lobid-client

## Installation

Using npm

```sh
npm install lobid-client
```

Using yarn

```sh
yarn add lobid-client
```

## Import

Using `esm` syntax:

```js
import LobidClient from 'lobid-client';
// or
import { searchGnd } from 'lobid-client';
```

Using `commonjs` syntax:

```js
const LobidClient = require('lobid-client');
// or
const { searchGnd } = require('lobid-client');
```

## Usage

The search is asynchronous and returns a Promise. You can await it in an asynchronous function or resolve it yourself.

### Basic usage

Depending on how you imported the function you can use:

```js
LobidClient.searchGnd('Twain');
//or
searchGnd('Twain');
```

### Default Parameters

If not specified otherwise, the `searchGnd` function will always use the following query parameters:

* `size=100` - Return 100 items
* `format=json` - Return JSON data

### Using async/await

```js
async function performQuery() {
  const result = await LobidClient.searchGnd('Twain');
}
```

### Resolving yourself

```js
LobidClient.search('Twain')
  .then((response)) => {
    console.log(response.data);
  };
```

### Using Parameters

You can pass in additional query options by passing in a `queryOptions` object.

The following example matches all GND entries with **Twain** in the field `preferredName` and where the matched entries match the type `Person`.

```js
const queryOptions = {
  field: 'preferredName',
  filter: {
    type: 'Person'
  }
}

searchGnd('Twain', queryOptions);
```

The queryOptions are handled using the following interface:

```ts

export interface LobidGndQueryOptions {
  query?: string; // optional defaults to '*' but is usually overwritten by the first parameter in searchGnd()
  field?: string; // optional, match the query string to a given field, e.g. 'preferredName'
  filter?: KeyValuePair; // optional, apply additional matches, e.g. { type: 'Person', 'gender.label': 'Unbekannt'}
  size?: number; // optional, number of matches to return, defaults to 100
  from?: number; // optional, use for pagination, return all matches after a given number
  format?: string; // optional, defaults to 'json'. Other formats are not supported and will be overwritten with json
  formatFields?: string[]; // optional, list of fields that should be returned, e.g. ['preferredName', 'professionOrOccupation']
}
```

Example for utilizing all available queryOptions.

```js
import { searchGnd } from 'lobid-client';

const queryOptions = {
  field: 'preferredName',
  filter: {
    type: 'Person',
    'gender.label': 'Unbekannt'
  },
  size: 50,
  from: 2,
  format: 'json',
  formatFields: ['preferredName', 'professionOrOccupation'];
}

searchGnd('Twain', queryOptions)
  .then((response)) => {
    console.log(response.data);
  };
```