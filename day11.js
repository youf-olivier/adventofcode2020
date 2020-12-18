const getData = require("./data.service");
const input = getData("./day11.txt");
const formatedInputs = input.split(/\n/).map(p => p.split``);

const littleInput = [
  "L.LL.LL.LL",
  "LLLLLLL.LL",
  "L.L.L..L..",
  "LLLL.LL.LL",
  "L.LL.LL.LL",
  "L.LLLLL.LL",
  "..L.L.....",
  "LLLLLLLLLL",
  "L.LLLLLL.L",
  "L.LLLLL.LL",
].map(p => p.split``);

const getSeats = (lines, numLine, idx) => [
  ...(numLine > 0 ? lines[numLine - 1].slice(Math.max(idx - 1, 0), idx + 2) : []),
  ...(idx > 0 ? [lines[numLine][idx - 1]] : []),
  ...(idx < lines.length - 1 ? [lines[numLine][idx + 1]] : []),
  ...(numLine < lines.length - 1 ? lines[numLine + 1].slice(Math.max(idx - 1, 0), idx + 2) : []),
];

const liveInLine = lines =>
  lines.map((line, idxLine) =>
    line.map((p, idx) => {
      const sidesSeats = getSeats(lines, idxLine, idx);
      if (p === "L") {
        return sidesSeats.filter(p => p === "#").length === 0 ? "#" : "L";
      } else if (p === "#") {
        return sidesSeats.filter(p => p === "#").length >= 4 ? "L" : "#";
      }
      return p;
    })
  );

const moteur = seats => {
  let prev = "";
  let cur = [...seats];
  do {
    prev = cur;
    cur = liveInLine(cur);
  } while (JSON.stringify(prev) !== JSON.stringify(cur));
  console.log("FINISHED : ", cur.flat().filter(p => p === "#").length);
};

moteur(littleInput);
moteur(formatedInputs);

// Part 2

const vectors = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

const isOnBoard = (x, y, board) => {
  return x >= 0 && x <= board.length - 1 && y >= 0 && y <= board.length;
};

const getSeatsInSight = (lines, row, col) => {
  let cmpt = 0;
  vectors.forEach(([vx, vy]) => {
    let x = vx + row;
    let y = vy + col;
    do {
      if (isOnBoard(x, y, lines)) {
        if (lines[x][y] === ".") {
          x += vx;
          y += vy;
        } else {
          cmpt += lines[x][y] === "#" ? 1 : 0;
          break;
        }
      } else {
        break;
      }
    } while (1);
  });
  return cmpt;
};

const liveInLineFar = lines =>
  lines.map((line, idxLine) =>
    line.map((p, idx) => {
      if (p === "L") {
        return getSeatsInSight(lines, idxLine, idx) === 0 ? "#" : "L";
      } else if (p === "#") {
        return getSeatsInSight(lines, idxLine, idx) >= 5 ? "L" : "#";
      }
      return p;
    })
  );

const getSeatsFar = seats => {
  let prev = "";
  let cur = [...seats];
  do {
    prev = cur;
    cur = liveInLineFar(cur);
  } while (JSON.stringify(prev) !== JSON.stringify(cur));
  console.log("FINISHED : ", cur.flat().filter(p => p === "#").length);
};

getSeatsFar(littleInput);
getSeatsFar(formatedInputs);
