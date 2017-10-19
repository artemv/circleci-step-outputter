import test from 'ava';
import m from '..';

test(async function(t) {
  const data = await m({repoSlug: "artemv/test-lib", buildNum: 2, step: 'test'});
  t.is(data, []);
});
