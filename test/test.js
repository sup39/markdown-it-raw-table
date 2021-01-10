const assert = require('assert');
const mdi = require('markdown-it');
const mrt = require('..');

const fs = require('fs');
const path = require('path');
const rawCases =
  fs.readFileSync(path.join(__dirname, 'cases/tables.txt')).toString();

describe('Raw Table', () => {
  const md = mdi().use(mrt);
  const elms = rawCases.split(/\n\.\n/);
  for (let i=2; i<elms.length; i+=3) {
    const title = elms[i-2].trim();
    it(title, () => {
      assert.equal(md.render(elms[i-1]), elms[i]+'\n');
    });
  }
});
