const fs = require('fs')
const _ = require('lodash')

const realInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' })
const demoInput = `
2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8
`

function processInput(input) {
  return input
    .trim()
    .split('\n')
    .map((l) => {
      const [first, second] = l.split(',')
      return [first.split('-').map(_.parseInt), second.split('-').map(_.parseInt)]
    })
}
const intervals = processInput(realInput)

function part1() {
  let overlapping = 0
  for (const [i1, i2] of intervals) {
    const [i1Start, i1End] = i1
    const [i2Start, i2End] = i2

    if ((i1Start >= i2Start && i1End <= i2End) || (i2Start >= i1Start && i2End <= i1End)) {
      overlapping += 1
    }
  }

  return overlapping
}
console.log(part1()) // 500

function part2() {
  let overlapping = 0
  for (const [i1, i2] of intervals) {
    const [i1Start, i1End] = i1
    const [i2Start, i2End] = i2

    if ((i2Start <= i1Start && i1Start <= i2End) || (i1Start <= i2Start && i2Start <= i1End)) {
      overlapping += 1
    }
  }

  return overlapping
}
console.log(part2()) // 815
