import { shuffleArray } from './arrayShuffle';

// import { test, expect } from 'jest';

test('shuffleArray shuffles array', () => {
  const originalArray = [1, 2, 3, 4, 5];
  const shuffledArray = shuffleArray(originalArray);

  expect(shuffledArray).toHaveLength(5);
  expect(shuffledArray).not.toEqual(originalArray);
  expect(new Set(shuffledArray)).toEqual(new Set(originalArray));
});

test('shuffleArray returns new array', () => {
  const originalArray = [1, 2, 3];
  const shuffledArray = shuffleArray(originalArray);

  expect(shuffledArray).not.toBe(originalArray);
});

test('shuffleArray handles empty array', () => {
  const emptyArray: any[] = [];
  const shuffledEmptyArray = shuffleArray(emptyArray);

  expect(shuffledEmptyArray).toEqual([]);
});
