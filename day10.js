const getData = require('./data.service');
const input = getData('./day10.input.txt');
const formatedInputs = input.split(/\n/).map(a => a / 1);
const test = [
  28,
  33,
  18,
  42,
  31,
  14,
  46,
  20,
  48,
  47,
  24,
  23,
  49,
  45,
  19,
  38,
  39,
  11,
  1,
  32,
  25,
  35,
  8,
  17,
  7,
  9,
  4,
  2,
  34,
  10,
  3,
];

const testCourt = [16, 10, 15, 5, 1, 11, 7, 19, 6, 12, 4];

// Part 1
const getPart1 = inputList => {
  const sortedList = [...inputList].sort((a, b) => a - b);
  return sortedList.reduce(
    (acc, curr, idx) => {
      const diff = curr - (idx === 0 ? 0 : sortedList[idx - 1]);
      return { ...acc, [diff]: acc[diff] + 1 };
    },
    { 1: 0, 3: 1 }
  );
};

console.log('#### PART 1');
console.log(getPart1(test));

const result = getPart1(formatedInputs);
console.log(result);
console.log(result[1] * result[3]);

//Part 2
console.log('#### PART 2');
const getNexts = (list, num) => list.filter(p => p > num && p <= num + 3);

const getNbPaths = (listInput, num, state) => {
  if (state[num]) {
    return state[num];
  }
  state[num] = getNexts(listInput, num).reduce((acc, cur) => acc + getNbPaths(listInput, cur, state), 0) || 1;
  return state[num];
};

const getPart2 = list => {
  const sortedList = [...list].sort((a, b) => a - b);
  return getNbPaths(sortedList, 0, {});
};

console.log(getPart2([1, 2, 4, 5, 6, 8, 9]));
console.log(getPart2(testCourt));
console.log(getPart2(test));
console.log(getPart2(formatedInputs));
