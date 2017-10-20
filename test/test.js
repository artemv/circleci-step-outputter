import test from 'ava';
import m from '..';

test(async t => {
  const data = await m({repoSlug: "artemv/circleci-step-outputter", buildNum: 2, step: 'test'});
  t.true(data[0].length > 0);
});
