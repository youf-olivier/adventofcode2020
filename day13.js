const getData = require("./data.service");
const input = getData("./day13.txt");
const [timeInput, lineList] = input.split(/\n/);
const linesInput = lineList.split(",");

const [timeTest, linesTest] = [939, ["7", "13", "x", "x", "59", "x", "31", "19"]];

// Part 1

const getBestLine = (lines, timestamp) =>
  lines
    .filter(p => p !== "x")
    .map(p => ({
      line: p,
      timeToWait: p / 1 - (timestamp % (p / 1)),
    }))
    .sort((a, b) => a.timeToWait - b.timeToWait)[0];

const resTest = getBestLine(linesTest, timeTest);
const resP1 = getBestLine(linesInput, timeInput);
console.log("Best line test :", resTest);
console.log("result test :", resTest.line * resTest.timeToWait);
console.log("Result ", resP1);
console.log("result test :", resP1.line * resP1.timeToWait);

// Part 2
// Found on the Internet
const euclide = (b, n) => {
  while (b < 0) {
    b = parseInt(b) + parseInt(n);
  }
  var n0 = n;
  var b0 = b;
  var t0 = 0;
  var t = 1;
  var q = Math.floor(n0 / b0);
  var r = n0 - q * b0;
  while (r > 0) {
    temp = t0 - q * t;
    if (temp >= 0) {
      temp = temp % n;
    } else {
      temp = n - (-temp % n);
    }
    t0 = t;
    t = temp;
    n0 = b0;
    b0 = r;
    q = Math.floor(n0 / b0);
    r = n0 - q * b0;
  }
  if (b0 != 1) {
    return NaN;
  }
  return t;
};

//Euclide
const getEuclide = list =>
  list.map(([rest, modulo, Ni]) => [rest, modulo, Ni, euclide(Ni, modulo)]);

const getChineeseRest = list =>
  list.reduce((acc, [a, , b, c]) => acc + BigInt(a) * BigInt(b) * BigInt(c), 0n);

const GetNNi = (list, N) => list.map(([rest, mod]) => [rest, mod, N / mod]);
const prepareList = list =>
  list.map((num, idx) => (num !== "x" ? [num - idx, num] : "x")).filter(p => p !== "x");

const run = list => {
  // Prepare list
  const intLines = list.map(x => (x === "x" ? x : x / 1));
  const preparedList = prepareList(intLines);
  // [[rest, modulo], ...]
  console.log("[[rest, modulo], ...] =", preparedList);
  //N = m1*m2*...*mx
  const N = preparedList.reduce((acc, [, modulo]) => acc * modulo, 1);
  console.log("N:", N);
  //N^x
  const extendedList = GetNNi(preparedList, N);
  //Euclide
  const listEuclided = getEuclide(extendedList);
  //Result
  const result = getChineeseRest(listEuclided);
  console.log("Result = ", result % BigInt(N));
};

run([67, 7, "x", 59, 61]);
run(linesTest);
run(linesInput);
