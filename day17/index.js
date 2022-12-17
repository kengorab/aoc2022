const fs = require('fs')
const _ = require('lodash')

const realInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' })
const demoInput = `
>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>
`

const p2s = (x, y) => `${x},${y}`
const blocks = [
  // - piece
  [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
  ],
  // + piece
  [
    [1, 0],
    [0, 1],
    [1, 1],
    [2, 1],
    [1, 2],
  ],
  // _| piece
  [
    [0, 0],
    [1, 0],
    [2, 0],
    [2, 1],
    [2, 2],
  ],
  // | piece
  [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
  ],
  // [] piece
  [
    [0, 0],
    [1, 0],
    [0, 1],
    [1, 1],
  ],
]

function translate(block_, { dx = 0, dy = 0 }) {
  const block = _.cloneDeep(block_)
  for (const cell of block) {
    cell[0] = cell[0] + dx
    cell[1] = cell[1] + dy
  }
  return block
}

function processInput(input) {
  return input.trim().split('')
}

function draw(room, H, W = 7) {
  for (let y = H; y >= 0; y--) {
    if (y === 0) {
      console.log(_.repeat('_', W))
      break
    }

    let row = ''
    for (let x = 0; x < W; x++) {
      if (room.has(p2s(x, y))) {
        row += '#'
      } else {
        row += '.'
      }
    }
    console.log(row)
  }
  console.log()
}

function part1() {
  const moves = processInput(realInput)
  const room = new Set([])
  let b = 0
  let m = 0

  const spawnL = 2 // 2 units from left wall
  let highestPoint = 0

  function dropBlock() {
    const B = _.cloneDeep(blocks[b])
    b = (b + 1) % blocks.length

    let block = translate(B, { dx: spawnL, dy: highestPoint + 4 })

    while (true) {
      const move = moves[m]
      m = (m + 1) % moves.length

      let block_ = translate(block, { dx: move === '<' ? -1 : 1 })
      const leftEdge = Math.min(...block_.map(([x]) => x))
      const rightEdge = Math.max(...block_.map(([x]) => x))
      const collisionX = leftEdge < 0 || rightEdge > 6 || block_.some(([x, y]) => room.has(p2s(x, y)))
      if (!collisionX) {
        block = block_
      }

      block_ = translate(block, { dy: -1 })
      const botEdge = Math.min(...block_.map(([, y]) => y))
      const collisionY = botEdge <= 0 || block_.some(([x, y]) => room.has(p2s(x, y)))
      if (collisionY) {
        block.forEach(([x, y]) => room.add(p2s(x, y)))
        const topEdge = Math.max(...block.map(([, y]) => y))

        highestPoint = Math.max(topEdge, highestPoint)
        break
      } else {
        block = block_
      }
    }
  }

  for (let i = 0; i < 2022; i++) {
    dropBlock()
  }

  return highestPoint
}
console.log(part1()) // 3197

// part2: 1568513119571 (math)
