# markdown-it-raw-table
## Feature
`td` count is NOT adjusted to `th` count when using this plugin.

For example,
```
| abc | def |
| --- | --- |
| bar |
| bar | baz | boo |
```
is rendered as

<table>
  <thead>
    <tr>
      <th>abc</th>
      <th>def</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>bar</td>
    </tr>
    <tr>
      <td>bar</td>
      <td>baz</td>
      <td>boo</td>
    </tr>
  </tbody>
</table>

```
<table>
  <thead>
    <tr>
      <th>abc</th>
      <th>def</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>bar</td>
    </tr>
    <tr>
      <td>bar</td>
      <td>baz</td>
      <td>boo</td>
    </tr>
  </tbody>
</table>
```

instead of

<table>
  <thead>
    <tr>
      <th>abc</th>
      <th>def</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>bar</td>
      <td></td>
    </tr>
    <tr>
      <td>bar</td>
      <td>baz</td>
    </tr>
  </tbody>
</table>

### Advantage of this version
This version works well with [markdown-it-attrs](https://github.com/sup39/markdown-it-attrs) plugin.

#### rowspan and colspan
This version works well with `rowspan` and `colspan`
because it does not append extraneous `td`.

For example,
```
| h1 | h2 | h3 | h4 |
| --- | --- | --- | --- |
| x11 | x12 | x13 {rowspan=2} | x14 |
| x21 {colspan=2} | x24 |
```
is rendered as

<table>
  <thead>
    <tr>
      <th>h1</th>
      <th>h2</th>
      <th>h3</th>
      <th>h4</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>x11</td>
      <td>x12</td>
      <td rowspan="2">x13</td>
      <td>x14</td>
    </tr>
    <tr>
      <td colspan="2">x21</td>
      <td>x24</td>
    </tr>
  </tbody>
</table>

```
<table>
  <thead>
    <tr>
      <th>h1</th>
      <th>h2</th>
      <th>h3</th>
      <th>h4</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>x11</td>
      <td>x12</td>
      <td rowspan="2">x13</td>
      <td>x14</td>
    </tr>
    <tr>
      <td colspan="2">x21</td>
      <td>x24</td>
    </tr>
  </tbody>
</table>
```
which is intended,

instead of

<table>
  <thead>
    <tr>
      <th>h1</th>
      <th>h2</th>
      <th>h3</th>
      <th>h4</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>x11</td>
      <td>x12</td>
      <td rowspan="2">x13</td>
      <td>x14</td>
    </tr>
    <tr>
      <td colspan="2">x21</td>
      <td>x24</td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>

```
<table>
  <thead>
    <tr>
      <th>h1</th>
      <th>h2</th>
      <th>h3</th>
      <th>h4</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>x11</td>
      <td>x12</td>
      <td rowspan="2">x13</td>
      <td>x14</td>
    </tr>
    <tr>
      <td colspan="2">x21</td>
      <td>x24</td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>
```

which produces extraneous `td` because it tries to
make `th` count (=4) equal to `td` count in the second `tr` in `tbody`.

#### markdown-it-attrs for tr
This version prevents extra tokens like `{.class}` being eliminating,
which makes [markdown-it-attrs](https://github.com/sup39/markdown-it-attrs) for `tr` possible.

For example,

```
| h1 | h2 |
| -- | -- |
| x1 {.c3} | x2 | {.c1}
| x3 | x4 {.c4} | {.c2}
```

is rendered as

```
<table>
  <thead>
    <tr>
      <th>h1</th>
      <th>h2</th>
    </tr>
  </thead>
  <tbody>
    <tr class="c1">
      <td class="c3">x1</td>
      <td>x2</td>
    </tr>
    <tr class="c2">
      <td>x3</td>
      <td class="c4">x4</td>
    </tr>
  </tbody>
</table>
```

## Usage
```js
const md = require('markdown-it')();
const mrt = require('@sup39/markdown-it-raw-table');
md.use(mrt);

md.parse(`
| abc | def |
| --- | --- |
| bar |
| bar | baz | boo |
`);
```
