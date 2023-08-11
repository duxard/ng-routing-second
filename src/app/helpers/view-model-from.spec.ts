import { TestScheduler } from 'rxjs/testing';
import { viewModelFrom } from './view-model-from';

describe('viewModelFrom', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toBe(expected);
    });
  });

  it('', () => {
    scheduler.run(({expectObservable, cold}) => {
      const o1 = cold('a|');
      const o2 = cold('a|');
      const viewModel = viewModelFrom({o1, o2});
      expectObservable(viewModel).toBe('a|', {a: {o1: 'a', o2: 'a'}})
    });
  });
});
