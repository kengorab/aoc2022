const fs = require('fs')
const _ = require('lodash')

const realInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' })
const demoInput = `
498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9
`

const p = (x, y) => `${x},${y}`

function drawMap({ map, bounds }) {
  for (let y = 0; y <= bounds[3]; y++) {
    let row = ''
    for (let x = bounds[0]; x <= bounds[1]; x++) {
      if (map[p(x, y)]) {
        row += map[p(x, y)]
      } else {
        row += '.'
      }
    }
    console.log(row)
  }

  console.log()
}

function drawLine(map, [x1, y1], [x2, y2]) {
  if (x1 === x2) {
    for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
      map[p(x1, y)] = '#'
    }
  } else if (y1 === y2) {
    for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
      map[p(x, y1)] = '#'
    }
  } else throw new Error(`Cannot draw diagonal line: ${[x1, y1]}, ${[x2, y2]}`)
}

function processInput(input) {
  const map = {}

  input
    .trim()
    .split('\n')
    .forEach((l) => {
      const points = l.split(' -> ').map((p) => p.split(',').map(_.parseInt))
      for (let p = 1; p < points.length; p++) {
        drawLine(map, points[p - 1], points[p])
      }
      return map
    })

  const points = Object.keys(map).map((p) => p.split(',').map(_.parseInt))
  const bounds = points.reduce(
    (acc, p) => [Math.min(acc[0], p[0]), Math.max(acc[1], p[0]), Math.min(acc[2], p[1]), Math.max(acc[3], p[1])],
    [points[0][0], points[0][0], points[0][1], points[0][1]]
  )

  console.log(bounds)

  return { map, bounds }
}

function dropSand(map, bounds) {
  let [x, y] = [500, 0]

  while (true) {
    if (x < bounds[0] || y > bounds[3]) {
      return true
    } else if (!map[p(x, y + 1)]) {
      y += 1
    } else if (!map[p(x - 1, y + 1)]) {
      x -= 1
      y += 1
    } else if (!map[p(x + 1, y + 1)]) {
      x += 1
      y += 1
    } else {
      map[p(x, y)] = 'o'
      return false
    }
  }
}

function part1() {
  const { map, bounds } = processInput(realInput)

  let numSand = 0
  while (!dropSand(map, bounds)) {
    numSand += 1
  }
  return numSand
}
console.log(part1()) // 1078

function part2() {
  const { map, bounds } = processInput(realInput)
  bounds[0] -= 1000
  bounds[1] += 1000
  bounds[3] += 2
  drawLine(map, [bounds[0], bounds[3]], [bounds[1], bounds[3]])

  let numSand = 0
  while (map[p(500, 0)] !== 'o') {
    dropSand(map, bounds)
    numSand += 1
  }
  return numSand
}
console.log(part2()) // 30157
