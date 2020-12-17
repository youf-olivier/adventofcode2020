const getData = require('./data.service');
const input = getData('./day9.input.txt');
const formatedInputs = input.split(/\n/).map(a => a / 1);

const isAddOf2Of = (val, arr) =>
  arr.reduce((acc, cur, idx) => acc || arr.some((p, idxp) => idxp !== idx && p + cur === val), false);

console.log(isAddOf2Of(15, [1, 2, 3, 4, 5]));
console.log(isAddOf2Of(9, [1, 2, 3, 4, 5]));
console.log(
  isAddOf2Of(14, [
    '1',
    '10',
    '41',
    '37',
    '24',
    '22',
    '35',
    '11',
    '49',
    '4',
    '48',
    '5',
    '46',
    '15',
    '7',
    '45',
    '6',
    '30',
    '12',
    '19',
    '33',
    '9',
    '50',
    '8',
    '13',
  ])
);
// Part 1, find the weakness
const getFault = listNumbers => {
  let pos = 25;
  while (1) {
    const subArr = listNumbers.slice(pos - 25, pos);
    const val = listNumbers[pos];
    if (!isAddOf2Of(val, subArr)) {
      console.log('FOUND');
      break;
    }
    if (pos === listNumbers.length) {
      console.error('NOT GOOD');
      break;
    }
    pos++;
  }
  return [listNumbers[pos], listNumbers.slice(pos - 25, pos)];
};

const [weakness, listRes] = getFault(formatedInputs);
console.log(weakness);
console.log(listRes);

// Part 2, the correct sum
const processing = (list, result) => {
  let startIndex = 0;
  let endIndex = 1;
  let sum;
  let subList = list.slice(startIndex, endIndex + 1);
  do {
    sum = subList.reduce((acc, cur) => acc + cur, 0);
    if (sum === result || endIndex === list.length) {
      break;
    }
    if (sum > result) {
      startIndex++;
    } else if (sum < result) {
      endIndex++;
    }
    subList = list.slice(startIndex, endIndex + 1);
  } while (1);
  return Math.max(...subList) + Math.min(...subList);
};

console.log(
  processing([35, 20, 15, 25, 47, 40, 62, 55, 65, 95, 102, 117, 150, 182, 127, 219, 299, 277, 309, 576], 127)
);

console.log(processing(formatedInputs, weakness));
