import test from 'ava';
import m from '..';

test(async t => {
  const data = await m({repoSlug: "artemv/test-lib", buildNum: 2, step: 'test'});
  t.true(data[0].length > 0);
});
