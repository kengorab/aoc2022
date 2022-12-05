const fs = require('fs')
const _ = require('lodash')

const realInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' })
const demoInput = `
move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
`

/*
    [D]
[N] [C]
[Z] [M] [P]
 1   2   3
 */
const demoTowers = [['Z', 'N'], ['M', 'C', 'D'], ['P']]

/*
    [W]         [J]     [J]
    [V]     [F] [F] [S] [S]
    [S] [M] [R] [W] [M] [C]
    [M] [G] [W] [S] [F] [G]     [C]
[W] [P] [S] [M] [H] [N] [F]     [L]
[R] [H] [T] [D] [L] [D] [D] [B] [W]
[T] [C] [L] [H] [Q] [J] [B] [T] [N]
[G] [G] [C] [J] [P] [P] [Z] [R] [H]
 1   2   3   4   5   6   7   8   9

Use VIM magic to format 🤷
 */
const realTowers = [
  'GTRW'.split(''),
  'GCHPMSVW'.split(''),
  'CLTSGM'.split(''),
  'JHDMWRF'.split(''),
  'PQLHSWFJ'.split(''),
  'PJDNFMS'.split(''),
  'ZBDFGCSJ'.split(''),
  'RTB'.split(''),
  'HNWLC'.split(''),
]

function processInput(input) {
  return input
    .trim()
    .split('\n')
    .map((l) => {
      const [, num, , start, , end] = l.split(' ').map(_.parseInt)
      return [num, start, end]
    })
}

function part1() {
  const steps = processInput(realInput)
  const towers = _.cloneDeep(realTowers)

  for (const [num, from, to] of steps) {
    towers[to - 1].push(...towers[from - 1].splice(-num).reverse())
  }

  return towers.map((tower) => tower.pop()).join('')
}
console.log(part1()) // JCMHLVGMG

function part2() {
  const steps = processInput(realInput)
  const towers = _.cloneDeep(realTowers)

  for (const [num, from, to] of steps) {
    towers[to - 1].push(...towers[from - 1].splice(-num))
  }

  return towers.map((tower) => tower.pop()).join('')
}
console.log(part2()) // LVMRWSSPZ
