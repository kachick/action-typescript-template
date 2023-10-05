import { performance } from 'node:perf_hooks';
import { wait } from './wait.ts';
import test from 'node:test';
import assert from 'node:assert';

void test('wait 100 ms', async () => {
  performance.mark('start');
  await wait(100);
  performance.mark('end');
  // The void typing looks like a wrong definition of @types/node
  const measure: unknown = performance.measure('Wait duration', 'start', 'end');
  // Also PerformanceMeasure looks not defined https://github.com/DefinitelyTyped/DefinitelyTyped/blame/be3a5a945efa53010eb2ed7fc35bcd46038909b0/types/node/v16/perf_hooks.d.ts
  if (!(measure && typeof measure === 'object' && 'duration' in measure && typeof measure.duration === 'number')) {
    throw Error('Performance API does incorrectly work');
  }
  assert(measure.duration >= 99);
  assert(measure.duration < 150);
});
