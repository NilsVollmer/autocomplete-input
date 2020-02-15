import { fuzzyFindAndSort, fuzzyHighlight } from './index';
import { MATCHERS_ARRAY } from '../constants';

const fuzzysort = require('fuzzysort');

describe('fuzzyFindAndSort()', () => {
  test('should return fuzzy matched and sorted array of suggestions', () => {
    const expectedResult = fuzzysort.go(MATCHERS_ARRAY[1], MATCHERS_ARRAY).sort((a,b) => a.score > b.score);;
    expect(fuzzyFindAndSort(MATCHERS_ARRAY[1])).toEqual(expectedResult);
  });
});

test('fuzzyHighlight() returns the matched string with b tags as highlights', () => {
  const suggestions = fuzzysort.go(MATCHERS_ARRAY[1], MATCHERS_ARRAY);
  expect(fuzzyHighlight(suggestions[0])).toBe('<b>Apple</b>');
});
