const fs = require('fs')
const _ = require('lodash')

const realInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' })
const demoInput = `
Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1
`

function processInput(input) {
  return input
    .trim()
    .split('\n\n')
    .map((m, idx) => {
      const monkeyLines = m.split('\n')
      const startingItems = monkeyLines[1].split(': ')[1].split(',').map(_.parseInt)
      const opText = monkeyLines[2].split('new = ')[1]
      const test = parseInt(monkeyLines[3].split('divisible by ')[1], 10)
      const ifTrue = parseInt(monkeyLines[4].split('throw to monkey ')[1], 10)
      const ifFalse = parseInt(monkeyLines[5].split('throw to monkey ')[1], 10)

      return {
        idx,
        items: startingItems,
        opText,
        operation(old) {
          return eval(this.opText) // yikes
        },
        test,
        ifTrue,
        ifFalse,
        numInspected: 0,
      }
    })
}

function part1() {
  const monkeys = processInput(realInput)

  function round() {
    for (const monkey of monkeys) {
      while (monkey.items.length) {
        monkey.numInspected += 1

        let item = monkey.items.shift()
        item = monkey.operation(item)
        item = Math.floor(item / 3)
        const dest = item % monkey.test === 0 ? monkey.ifTrue : monkey.ifFalse
        monkeys[dest].items.push(item)
      }
    }
  }

  for (let i = 0; i < 20; i++) {
    round()
  }

  const [m0, m1] = _.sortBy(monkeys, (m) => -m.numInspected)
  return m0.numInspected * m1.numInspected
}
console.log(part1()) // 113232

function part2() {
  const monkeys = processInput(realInput)

  const mod = monkeys.reduce((acc, m) => acc * m.test, 1)

  function round() {
    for (const monkey of monkeys) {
      while (monkey.items.length) {
        monkey.numInspected += 1

        let item = monkey.items.shift()
        item = monkey.operation(item)
        item %= mod
        const dest = item % monkey.test === 0 ? monkey.ifTrue : monkey.ifFalse
        monkeys[dest].items.push(item)
      }
    }
  }

  for (let i = 0; i < 10000; i++) {
    round()
  }

  const [m0, m1] = _.sortBy(monkeys, (m) => -m.numInspected)
  return m0.numInspected * m1.numInspected
}
console.log(part2()) // 29703395016
