const getData = require('./data.service');
const input = getData('./day8.input.txt');

const formatedInputs = input.split(/\n/);

const reducer = (prevState, operation, value) => {
  switch (operation) {
    case 'nop':
      return {
        ...prevState,
        pos: prevState.pos + 1,
        history: [...prevState.history, prevState.pos + 1],
      };
    case 'acc':
      return {
        ...prevState,
        acc: eval(`${prevState.acc}${value}`),
        pos: prevState.pos + 1,
        history: [...prevState.history, prevState.pos + 1],
      };
    case 'jmp':
      const newPos = eval(`${prevState.pos}${value}`);
      return {
        ...prevState,
        pos: newPos,
        history: [...prevState.history, newPos],
      };
  }
  return state;
};

const hasDoublon = array => array.length !== [...new Set(array)].length;

const moteur = inputs => {
  let state = {
    acc: 0,
    pos: 0,
    history: [0],
    finished: false,
  };
  while (1) {
    const [operation, value] = inputs[state.pos].split(' ');
    state = reducer(state, operation, value);
    if (hasDoublon(state.history)) {
      break;
    }
    if (state.pos === inputs.length) {
      state = { ...state, finished: true };
      break;
    }
  }
  return state;
};

const finalState = moteur(formatedInputs);
console.log('FINISHED');
console.log(finalState);

// PART 2
// On remonte l'historique et opn change les nop/jpm un par un jusqu'a trouver le bon

let copyInput = [...formatedInputs];

const switchOpe = ope => (ope.includes('jmp') ? ope.replace('jmp', 'nop') : ope.replace('nop', 'jmp'));

const switchOpeInArray = (inputs, position) => [
  ...inputs.slice(0, position),
  switchOpe(inputs[position]),
  ...inputs.slice(position + 1),
];

let historyPosition = finalState.history.length - 1;
switchOpeInArray(copyInput, finalState.history[historyPosition]);
let fixedState;

while (1) {
  fixedState = moteur(copyInput);
  if (fixedState.finished || historyPosition === 0) {
    break;
  } else {
    // On remet l'opération comme elle etait
    copyInput = switchOpeInArray(copyInput, fixedState.history[historyPosition]);
    // On recule
    historyPosition--;
    // Et on réitère
    copyInput = switchOpeInArray(copyInput, fixedState.history[historyPosition]);
  }
}

console.log('historyPosition', historyPosition);
console.log(fixedState);
