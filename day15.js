const testInput = [0, 3, 6];
const finalInput = [5, 2, 8, 16, 18, 0, 1];

const playPart1 = (list, turnsNumber) => {
  let state = list.reduce((acc, cur, idx) => acc.set(cur, idx + 1), new Map());
  let lastNum = list[list.length - 1];
  for (let turn = list.length + 1; turn <= turnsNumber; turn++) {
    const prevNum = lastNum;
    const stateNum = state.get(lastNum);
    lastNum = stateNum && stateNum > 0 ? turn - 1 - stateNum : 0;
    state.set(prevNum, turn - 1);
  }
  console.log(lastNum);
};

playPart1(testInput, 2020);
playPart1(finalInput, 2020);
playPart1([0, 3, 6], 30000000);
playPart1(finalInput, 30000000);
