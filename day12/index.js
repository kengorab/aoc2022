const fs = require('fs')
const _ = require('lodash')

const realInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' })
const demoInput = `
Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi
`

function processInput(input) {
  const lines = input.trim().split('\n')
  const H = lines.length
  const W = lines[0].length

  const grid = {}
  lines.forEach((l, y) => l.split('').forEach((v, x) => (grid[p(x, y)] = v)))

  return { W, H, grid }
}

const p = (x, y) => `${x},${y}`

function solve(startAt = ['S']) {
  const { W, H, grid } = processInput(realInput)

  const q = []
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const g = grid[p(x, y)]
      if (startAt.includes(g)) q.push([x, y, 0, 'a'])
    }
  }
  const visited = new Set(q.map(([x, y]) => p(x, y)))

  function push(x, y, d, a) {
    if (!grid[p(x, y)]) return
    if (visited.has(p(x, y))) return

    const b = grid[p(x, y)].replace('E', 'z')
    if (b.charCodeAt(0) > a.charCodeAt(0) + 1) return

    visited.add(p(x, y))
    q.push([x, y, d + 1, b])
  }

  while (q.length) {
    const [x, y, d, a] = q.shift()
    if (grid[p(x, y)] === 'E') return d

    push(x + 1, y, d, a)
    push(x - 1, y, d, a)
    push(x, y + 1, d, a)
    push(x, y - 1, d, a)
  }
}

function part1() {
  return solve(['S'])
}
console.log(part1()) // 497

function part2() {
  return solve(['S', 'a'])
}
console.log(part2()) // 492
