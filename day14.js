const getData = require("./data.service");
const input = getData("./day14.txt");
const instructionsInput = input.split(/\n/);

const instructionsTest = [
  "mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X",
  "mem[8] = 11",
  "mem[7] = 101",
  "mem[8] = 0",
];

// Part 1

const initialState = {
  mask: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  memory: {},
};

const getMaskedValue = (mask, value) =>
  parseInt(
    value.toString(2).padStart(36, "0").split``
      .map((cur, idx) => (mask[idx] === "X" ? cur : mask[idx]))
      .join(""),
    2
  );

// console.log(getMaskedValue("XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X", 11)); //73
// console.log(getMaskedValue("XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X", 101)); //101
// console.log(getMaskedValue("XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X", 0)); // 64

const instructionReducer = (state, { instruction, value }) => {
  switch (instruction) {
    case "mask":
      return { ...state, mask: value };
    case "mem":
      return {
        ...state,
        memory: { ...state.memory, [value.address]: getMaskedValue(state.mask, value.content) },
      };
    default:
      return state;
  }
};

const extractInstruction = line => {
  const [instruction, value] = line.split(" = ");
  return instruction === "mask"
    ? { instruction, value }
    : {
        instruction: "mem",
        value: { content: value / 1, address: instruction.match(/(\d+)/g)[0] / 1 },
      };
};

// console.log(extractInstruction("mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X"));
// console.log(extractInstruction("mem[8] = 11"));

const runProgram = lines =>
  lines.reduce((state, line) => instructionReducer(state, extractInstruction(line)), initialState);

const sumState = ({ memory }) => Object.values(memory).reduce((acc, cur) => acc + cur, 0);

const runPart1 = lines => console.log(sumState(runProgram(lines)));

runPart1(instructionsTest);
runPart1(instructionsInput);

// Part 2

const programTest = [
  "mask = 000000000000000000000000000000X1001X",
  "mem[42] = 100",
  "mask = 00000000000000000000000000000000X0XX",
  "mem[26] = 1",
];

const getMaskedAddress = (mask, address) =>
  address.toString(2).padStart(36, "0").split``
    .map((cur, idx) => (mask[idx] === "0" ? cur : mask[idx]))
    .join("");

const generateCombination = maskedAddress => {
  if (maskedAddress == "") return [""];
  const currentBit = maskedAddress[0];
  const subList = generateCombination(maskedAddress.slice(1));
  return currentBit === "X"
    ? [...subList.map(add => `1${add}`), ...subList.map(add => `0${add}`)]
    : [...subList.map(add => `${currentBit}${add}`)];
};

const getAllAddresses = (mask, address) => {
  const maskedAddress = getMaskedAddress(mask, address);
  return generateCombination(maskedAddress).map(binaryAdd => parseInt(binaryAdd, 2));
};

// console.log(getAllAddresses("011X11111X11100XX11XX10XX000X0000100", 44086));

const writeToMemory = (state, address, value) => {
  const newState = { ...state };
  getAllAddresses(newState.mask, address).forEach(address => (newState.memory[address] = value));
  return newState;
};

const programReducer = (state, { instruction, value }) => {
  console.log("Programme : ", instruction, value);
  switch (instruction) {
    case "mask":
      return { ...state, mask: value };
    case "mem":
      return writeToMemory(state, value.address, value.content);
    default:
      return state;
  }
};

const runProgramP2 = lines =>
  lines.reduce((state, line) => programReducer(state, extractInstruction(line)), initialState);

// console.log(runProgramP2(programTest));
const runPart2 = lines => console.log(sumState(runProgramP2(lines)));

// runPart2(programTest);
runPart2(instructionsInput);
