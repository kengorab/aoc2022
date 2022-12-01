const fs = require('fs')

const realInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' })
const demoInput = `
1000
2000
3000

4000

5000
6000

7000
8000
9000

10000
`

function processInput(input) {
  return input
    .trim()
    .split('\n\n')
    .map((group) => {
      return group
        .trim()
        .split('\n')
        .reduce((acc, l) => acc + parseInt(l, 10), 0)
    })
}

const calories = processInput(realInput).sort((a, b) => b - a)

function part1() {
  return calories[0]
}
console.log(part1()) // 70764

function part2() {
  return calories.slice(0, 3).reduce((acc, i) => acc + i)
}
console.log(part2()) // 203905
