const fs = require('fs')
const _ = require('lodash')

const realInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' })
const demoInput = `
A Y
B X
C Z
`

const losesAgainst = {
  rock: 'scissors',
  paper: 'rock',
  scissors: 'paper',
}
const winsAgainst = {
  scissors: 'rock',
  rock: 'paper',
  paper: 'scissors',
}

const scores = {
  rock: 1,
  paper: 2,
  scissors: 3,
}

function score(opp, me) {
  if (opp === me) return 3 + scores[me]
  if (opp === losesAgainst[me]) return 6 + scores[me]
  if (me === losesAgainst[opp]) return scores[me]

  throw Error(`unreachable state: me=${me},them=${opp}`)
}

function part1() {
  const mapping = {
    A: 'rock',
    B: 'paper',
    C: 'scissors',
    X: 'rock',
    Y: 'paper',
    Z: 'scissors',
  }

  function processInput(input, mapping) {
    return input
      .trim()
      .split('\n')
      .map((l) => {
        const [opp, me] = l.split(' ')
        return [mapping[opp], mapping[me]]
      })
  }

  let myScore = 0

  for (const [opp, me] of processInput(realInput, mapping)) {
    myScore += score(opp, me)
  }

  return myScore
}
console.log(part1()) // 13484

function part2() {
  const mapping = {
    A: 'rock',
    B: 'paper',
    C: 'scissors',
  }

  function processInput(input, mapping) {
    return input
      .trim()
      .split('\n')
      .map((l) => {
        const [op, end] = l.split(' ')
        const opp = mapping[op]
        const me = end === 'X' ? losesAgainst[opp] : end === 'Y' ? opp : winsAgainst[opp]

        return [opp, me]
      })
  }

  let myScore = 0

  for (const [opp, me] of processInput(realInput, mapping)) {
    myScore += score(opp, me)
  }

  return myScore
}
console.log(part2()) // 13433
