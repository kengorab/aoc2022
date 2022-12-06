const fs = require('fs')
const _ = require('lodash')

const realInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' })
const demoInput = `
mjqjpqmgbljsphdztnvjfqwrcgsmlb
`

function processInput(input) {
  return input
    .trim()
    .split('\n')
    .flatMap((l) => {
      return l.split('')
    })
}

const input = processInput(realInput)

function part1() {
  let res = 0
  const window = []
  for (const ch of input) {
    if (_.uniq(window).length === 4) return res
    if (window.length === 4) {
      window.splice(0, 1)
    }
    window.push(ch)
    res += 1
  }

  return res
}
console.log(part1()) // 1850

function part2() {
  let res = 0
  const window = []
  for (const ch of input) {
    if (_.uniq(window).length === 14) return res
    if (window.length === 14) {
      window.splice(0, 1)
    }
    window.push(ch)
    res += 1
  }

  return res
}
console.log(part2()) // 2823
