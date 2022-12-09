const fs = require('fs')
const _ = require('lodash')

const realInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' })
const demoInput = `
R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2
`
const demoInput2 = `
R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20
`

function processInput(input) {
  return input
    .trim()
    .split('\n')
    .map((l) => {
      const [dir, n] = l.split(' ')
      return [dir, parseInt(n, 10)]
    })
}

const moves = processInput(realInput)

const p = ([x, y]) => `${x},${y}`
const isAdj = ([hx, hy], [tx, ty]) => Math.abs(hx - tx) <= 1 && Math.abs(hy - ty) <= 1
const clamp = (number, lower, upper) => (number < lower ? lower : number > upper ? upper : number)

function part1() {
  const head = [0, 0]
  const tail = [0, 0]

  const tailVisited = new Set([p(tail)])

  for (const [dir, num] of moves) {
    if (dir === 'R' || dir === 'L') {
      for (let dx = 1; dx <= num; dx++) {
        head[0] += dir === 'L' ? -1 : 1

        if (!isAdj(head, tail)) {
          tail[0] += dir === 'L' ? -1 : 1
          tail[1] = head[1]
        }
        tailVisited.add(p(tail))
      }
    } else {
      for (let dy = 1; dy <= num; dy++) {
        head[1] += dir === 'U' ? -1 : 1

        if (!isAdj(head, tail)) {
          tail[1] += dir === 'U' ? -1 : 1
          tail[0] = head[0]
        }
        tailVisited.add(p(tail))
      }
    }
  }

  return tailVisited.size
}
console.log(part1()) // 6367

function part2() {
  const knots = _.range(0, 10).map(() => [0, 0])

  const tailVisited = new Set([`0,0`])
  for (const [dir, num] of moves) {
    for (let dx = 1; dx <= num; dx++) {
      // Move head
      if (dir === 'L' || dir === 'R') {
        knots[0][0] += dir === 'L' ? -1 : 1
      } else if (dir === 'U' || dir === 'D') {
        knots[0][1] += dir === 'U' ? -1 : 1
      }

      // Move knots wrt prev knot
      for (let k = 1; k < knots.length; k++) {
        if (!isAdj(knots[k - 1], knots[k])) {
          knots[k][0] += clamp(knots[k - 1][0] - knots[k][0], -1, 1)
          knots[k][1] += clamp(knots[k - 1][1] - knots[k][1], -1, 1)
        }
      }

      const tail = knots[knots.length - 1]
      tailVisited.add(p(tail))
    }
  }

  return tailVisited.size
}
console.log(part2()) // 2536
