const fs = require('fs')
const _ = require('lodash')

const realInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' })
const demoInput = `
vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
`

function score(ch) {
  if ('a' <= ch && ch <= 'z') {
    return ch.charCodeAt(0) - 'a'.charCodeAt(0) + 1
  } else {
    return ch.charCodeAt(0) - 'A'.charCodeAt(0) + 27
  }
}

function part1() {
  const rucksacks = realInput
    .trim()
    .split('\n')
    .map((l) => {
      return [l.substring(0, l.length / 2), l.substring(l.length / 2, l.length)]
    })

  let sum = 0
  for (const [l, r] of rucksacks) {
    const [ch] = _.intersection(l.split(''), r.split(''))

    sum += score(ch)
  }

  return sum
}
console.log(part1()) // 8105

function part2() {
  const groups = _.chunk(
    realInput
      .trim()
      .split('\n')
      .map((l) => l.split('')),
    3
  )

  let sum = 0
  for (const group of groups) {
    const [ch] = _.intersection(...group)
    sum += score(ch)
  }

  return sum
}
console.log(part2()) // 2363
