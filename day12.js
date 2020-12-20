const getData = require("./data.service");
const input = getData("./day12.txt");
const formatedInputs = input.split(/\n/);

const vectors = [
  [0, 1], //N
  [1, 0], //E
  [0, -1], //S
  [-1, 0], //W
];

const initialState = {
  coordinates: [0, 0],
  // [n, e]
  vectorIdx: 1,
};

// Part 1

const moveTo = (coordinates, vectorIdx, distance) =>
  coordinates.map((num, idx) => num + vectors[vectorIdx][idx] * distance);

const changeVector = (vectorIdx, right, degree) =>
  (vectorIdx + (((right ? 1 : -1) * degree + 360) % 360) / 90) % 4;

const move = (state, instruction) => {
  const direction = instruction[0];
  const value = instruction.slice(1, 4) / 1;
  const { coordinates, vectorIdx } = state;
  switch (direction) {
    case "L":
      return { ...state, vectorIdx: changeVector(vectorIdx, false, value) };
    case "R":
      return { ...state, vectorIdx: changeVector(vectorIdx, true, value) };
    case "F":
      return { ...state, coordinates: moveTo(coordinates, vectorIdx, value) };
    case "N":
      return { ...state, coordinates: moveTo(coordinates, 0, value) };
    case "E":
      return { ...state, coordinates: moveTo(coordinates, 2, value) };
    case "S":
      return { ...state, coordinates: moveTo(coordinates, 1, value) };
    case "W":
      return { ...state, coordinates: moveTo(coordinates, 3, value) };
    default:
      return state;
  }
};

const finalPosition = formatedInputs.reduce(move, initialState);

console.log(finalPosition);
console.log(
  "solution : ",
  Math.abs(finalPosition.coordinates[0]) + Math.abs(finalPosition.coordinates[1])
);

// Part 2
const initialState2 = {
  ship: [0, 0],
  // [n, e]
  waypoint: [10, 1],
};

const turnWaypoint = ([x, y], angle) =>
  ({
    90: [y, -x],
    180: [-x, -y],
    270: [-y, x],
  }[angle]);

const moveShipTo = ([x, y], [vx, vy], steps) => [x + steps * vx, y + steps * vy];

const moveP2 = (state, instruction) => {
  const direction = instruction[0];
  const value = instruction.slice(1, 4) / 1;
  const { ship, waypoint } = state;
  switch (direction) {
    case "L":
      return { ...state, waypoint: turnWaypoint(waypoint, (-value + 360) % 360) };
    case "R":
      return { ...state, waypoint: turnWaypoint(waypoint, value) };
    case "F":
      return { ...state, ship: moveShipTo(ship, waypoint, value) };
    case "N":
      return { ...state, waypoint: moveTo(waypoint, 0, value) };
    case "E":
      return { ...state, waypoint: moveTo(waypoint, 1, value) };
    case "S":
      return { ...state, waypoint: moveTo(waypoint, 2, value) };
    case "W":
      return { ...state, waypoint: moveTo(waypoint, 3, value) };
    default:
      return state;
  }
};

const finalPosition2 = formatedInputs.reduce(moveP2, initialState2);

console.log(finalPosition2);
console.log("solution : ", Math.abs(finalPosition2.ship[0]) + Math.abs(finalPosition2.ship[1]));
