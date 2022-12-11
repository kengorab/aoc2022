const fs = require('fs')
const _ = require('lodash')

const realInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' })
const demoInput = `
addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop
`

function processInput(input) {
  return input
    .trim()
    .split('\n')
    .map((l) => {
      const [op, val] = l.split(' ')
      return op === 'addx' ? [op, _.parseInt(val)] : [op]
    })
}

const instrs = processInput(realInput)

function part1() {
  let X = 1
  let IP = 0

  let pending = null
  let cycle = 0

  let signalSum = 0

  while (cycle < 220) {
    cycle += 1

    if (cycle === 20 || (cycle - 20) % 40 === 0) {
      signalSum += X * cycle
    }

    let instr
    if (pending) {
      instr = pending
      pending = null
    } else {
      instr = instrs[IP]
      IP += 1

      if (instr[0] === 'addx') {
        pending = instr
        continue
      }
    }

    if (instr[0] === 'addx') {
      X += instr[1]
    } else {
      // noop
    }
  }

  return signalSum
}
console.log(part1()) // 16880

function part2() {
  let X = 1
  let IP = 0

  let pending = null
  let cycle = 0

  const CRT = _.range(0, 240).map(() => ' ')
  let crtPos = -1

  while (IP < instrs.length) {
    cycle += 1
    crtPos = (crtPos + 1) % 240

    if (X - 1 <= crtPos % 40 && crtPos % 40 <= X + 1) {
      CRT[crtPos] = '#'
    }

    let instr
    if (pending) {
      instr = pending
      pending = null
    } else {
      instr = instrs[IP]
      IP += 1

      if (instr[0] === 'addx') {
        pending = instr
        continue
      }
    }

    if (instr[0] === 'addx') {
      X += instr[1]
    } else {
      // noop
    }
  }

  for (const line of _.chunk(CRT, 40)) {
    console.log(line.join(''))
  }
}
part2() // RKAZAJBR
