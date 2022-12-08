const fs = require('fs')
const _ = require('lodash')

const realInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' })
const demoInput = `
30373
25512
65332
33549
35390
`

function processInput(input) {
  return input
    .trim()
    .split('\n')
    .map((l) => {
      return l.split('').map(_.parseInt)
    })
}

const rows = processInput(realInput)
if (rows.length !== rows[0].length) throw new Error('Expected square')
const D = rows.length

function part1() {
  const visible = new Set([])
  for (let x = 0; x < D; x++) {
    visible.add(`${x},0`)
    visible.add(`0,${x}`)
    visible.add(`${D - 1},${x}`)
    visible.add(`${x},${D - 1}`)
  }

  for (let y = 1; y < D - 1; y++) {
    const row = rows[y]

    for (let x = 1; x < D - 1; x++) {
      const tree = row[x]
      if (tree > Math.max(...row.slice(0, x))) {
        visible.add(`${x},${y}`)
      }
      if (tree > Math.max(...row.slice(x + 1))) {
        visible.add(`${x},${y}`)
      }
    }
  }

  for (let x = 1; x < D - 1; x++) {
    const col = _.range(0, D).map((y) => rows[y][x])
    for (let y = 1; y < D - 1; y++) {
      const tree = rows[y][x]
      if (tree > Math.max(...col.slice(0, y))) {
        visible.add(`${x},${y}`)
      }
      if (tree > Math.max(...col.slice(y + 1))) {
        visible.add(`${x},${y}`)
      }
    }
  }

  return visible.size
}
console.log(part1()) // 1798

function part2() {
  let max = 0

  for (let y = 0; y < D; y++) {
    for (let x = 0; x < D; x++) {
      const tree = rows[y][x]

      let score = 1
      let tally = 0

      for (let y_ = y - 1; y_ >= 0; y_--) {
        tally += 1
        if (rows[y_][x] >= tree) break
      }
      score *= tally
      tally = 0

      for (let y_ = y + 1; y_ < D; y_++) {
        tally += 1
        if (rows[y_][x] >= tree) break
      }
      score *= tally
      tally = 0

      for (let x_ = x - 1; x_ >= 0; x_--) {
        tally += 1
        if (rows[y][x_] >= tree) break
      }
      score *= tally
      tally = 0

      for (let x_ = x + 1; x_ < D; x_++) {
        tally += 1
        if (rows[y][x_] >= tree) break
      }
      score *= tally

      max = Math.max(max, score)
    }
  }

  return max
}
console.log(part2()) // 259308
