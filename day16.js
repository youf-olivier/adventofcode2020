const getData = require("./data.service");
const input = getData("./day16.txt");
const splitedInput = input.split(/\n\n/);

//format inputs
const ticketInput = splitedInput[1]
  .split(/\n/)[1]
  .split(",")
  .map(p => p / 1);
const nearbyTicketsRaw = splitedInput[2].split(/\n/);
nearbyTicketsRaw.shift();
const nearbyTicketsInput = nearbyTicketsRaw.map(p => p.split(",").map(p => p / 1));
const rulesInput = splitedInput[0].split(/\n/).reduce((allRules, rule) => {
  const splitted = rule.split(": ");
  const vals = splitted[1].match(/\d+-\d+/g).map(p => p.split("-").map(p => p / 1));
  return { ...allRules, [splitted[0]]: vals };
}, {});

// console.log(nearbyTicketsInput);
// console.log(rulesInput);
// console.log(ticketInput);

//Tests
const ticketTest = [7, 1, 14];
const rulesTest = {
  class: [
    [1, 3],
    [5, 7],
  ],
  row: [
    [6, 11],
    [33, 44],
  ],
  seat: [
    [13, 40],
    [45, 50],
  ],
};
const nearbyTicketsTest = [
  [7, 3, 47],
  [40, 4, 50],
  [55, 2, 20],
  [38, 6, 12],
];

// Part 1
console.log("##### Part1");
const validField = (field, rules) =>
  Object.values(rules).some(
    ([r1, r2]) => (field >= r1[0] && field <= r1[1]) || (field >= r2[0] && field <= r2[1])
  );

const validTicket = (ticket, rules) =>
  ticket.reduce((acc, field) => acc + (validField(field, rules) ? 0 : field), 0);

const scanTickets = (tickets, rules) =>
  tickets.reduce((acc, ticket) => acc + validTicket(ticket, rules), 0);

console.log(scanTickets(nearbyTicketsTest, rulesTest));
console.log(scanTickets(nearbyTicketsInput, rulesInput));

// Part 2
console.log("##### PART 2 ");
const getValidTickets = (tickets, rules) =>
  tickets.filter(ticket => ticket.every(field => validField(field, rules)));

// for each field in ticket, give a list of valid rules
const getListValidRules = (ticket, rules) =>
  ticket.map(field =>
    Object.keys(rules).filter(
      key =>
        (field >= rules[key][0][0] && field <= rules[key][0][1]) ||
        (field >= rules[key][1][0] && field <= rules[key][1][1])
    )
  );

// the merge is complet when allFields hasJust one rule;
const isMergeComplete = mergedRules => mergedRules.every(p => p.length === 1);

// Intersection
const intersection = (arrA, arrB) => arrA.filter(x => arrB.includes(x));

// MErge two list of found rules
const mergeRulesField = (L1, L2) => L1.map((field, idx) => intersection(field, L2[idx]));

const getRulesOrder = (tickets, rules) => {
  const validTickets = getValidTickets(tickets, rules);
  let mergedRules = [];
  // for Each ticket, we list rules can be apply on each field
  for (let idTicket = 0; idTicket < validTickets.length; idTicket++) {
    const ticket = validTickets[idTicket];
    const ticketRules = getListValidRules(ticket, rules);
    mergedRules = idTicket > 0 ? mergeRulesField(ticketRules, mergedRules) : [...ticketRules];
  }
  return mergedRules;
};

//console.log(getRulesOrder(nearbyTicketsInput, rulesInput));

// Find every signle rule for each field
const findAll = RulesOrderTicket => {
  let listCopy = [...RulesOrderTicket];
  let singleField = listCopy.filter(p => p.length === 1)[0][0];

  while (!isMergeComplete(listCopy)) {
    const fieldToFilter = singleField;
    listCopy = listCopy.map(p => {
      const res = p.length > 1 ? p.filter(f => f !== fieldToFilter) : p;
      if (p.length === 2) {
        singleField = res[0];
      }
      return res;
    });
  }
  return listCopy.flat();
};

//console.log(findAll(getRulesOrder(nearbyTicketsInput, rulesInput)));

const getResult = (field, ticket) => {
  const listIndex = field.reduce((acc, f, idx) => (/departure/.test(f) ? [idx, ...acc] : acc), []);
  const res = ticket.filter((p, idx) => listIndex.includes(idx));
  return res.reduce((a, b) => a * b, 1);
};

console.log(getResult(findAll(getRulesOrder(nearbyTicketsInput, rulesInput)), ticketInput));
