const fs = require('fs')
const _ = require('lodash')

const realInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' })
const demoInput = `
Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3
`

function processInput(input) {
  return input
    .trim()
    .split('\n')
    .map((l) => {
      const [s, b] = l.replace('Sensor at', '').split(': ')
      const sensor = s.split(', ').map((c) => parseInt(c.split('=')[1]))
      const beacon = b
        .replace('closest beacon is at ')
        .split(', ')
        .map((c) => parseInt(c.split('=')[1]))
      const D = dist(sensor, beacon)
      return { sensor, beacon, D }
    })
}

const p = (x, y) => `${x},${y}`

function dist([x1, y1], [x2, y2]) {
  return Math.abs(x2 - x1) + Math.abs(y2 - y1)
}

function part1() {
  // const ROW = 10
  const ROW = 2000000
  const data = processInput(realInput)
  const sensors = new Set(data.map(({ sensor }) => p(...sensor)))
  const beacons = new Set(data.map(({ beacon }) => p(...beacon)))

  const rowCoverage = new Set()

  for (const { sensor, beacon } of data) {
    const D = dist(sensor, beacon)

    const [x, y] = sensor
    for (let dy = -D; dy <= D; dy++) {
      if (y + dy !== ROW) continue

      for (let dx = -D; dx <= D; dx++) {
        if (dist([x, y], [x + dx, y + dy]) <= D) {
          if (!beacons.has(p(x + dx, y + dy)) && !sensors.has(p(x + dx, y + dy))) {
            rowCoverage.add(p(x + dx, y + dy))
          }
        }
      }
    }
  }

  return rowCoverage.size
}
console.log(part1()) // 5525847

function part2() {
  const data = processInput(realInput)

  function perimeter({ sensor, D }) {
    const [x, y] = sensor
    const left = [x - (D + 1), y]
    const right = [x + (D + 1), y]

    const points = []

    const addPt = (x, y) => {
      if (0 <= x && x <= 4000000 && 0 <= y && y <= 4000000) {
        points.push([x, y])
      }
    }

    for (let d = 0; d <= D + 1; d++) {
      addPt(left[0] + d, left[1] - d)
      addPt(right[0] - d, right[1] - d)

      addPt(left[0] + d, left[1] + d)
      addPt(right[0] - d, right[1] + d)
    }

    return points
  }

  for (const datum of data) {
    const outsidePerimeterPoints = perimeter(datum)

    const [hiddenPoint] = outsidePerimeterPoints
      .map((point) => {
        const canAnySensorSee = data.some(({ sensor, D }) => dist(sensor, point) <= D)
        if (!canAnySensorSee) return point
      })
      .filter(Boolean)
    if (hiddenPoint) {
      const [x, y] = hiddenPoint
      return x * 4000000 + y
    }
  }
}
console.log(part2()) // 13340867187704
