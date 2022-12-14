const fs = require('fs')
const _ = require('lodash')

const realInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' })
const demoInput = `
[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]
`

function processInput(input) {
  return input
    .trim()
    .split('\n\n')
    .map((pair) => {
      return pair.split('\n').map((p) => eval(p))
    })
}

function compare(l, r) {
  if (_.isNumber(l) && _.isNumber(r)) {
    if (l < r) return 1
    if (l > r) return -1
    return 0
  }

  if (_.isArray(l) && _.isArray(r)) {
    let i = 0
    while (true) {
      const li = l[i]
      const ri = r[i]
      // if (!li && ri) return 1
      if (i >= l.length && i < r.length) return 1
      // if (li && !ri) return -1
      if (i < l.length && i >= r.length) return -1
      // if (!li && !ri) break
      if (i >= l.length && i >= r.length) break

      const res = compare(li, ri)
      if (res) return res

      i += 1
    }

    return 0
  }

  if (_.isNumber(l)) return compare([l], r)
  if (_.isNumber(r)) return compare(l, [r])
}

function part1() {
  const pairs = processInput(realInput)
  let sum = 0
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i]
    // console.log('pair', pair)

    const res = compare(pair[0], pair[1])
    if (res === 1) sum += i + 1
    if (res === 1) console.log('Right Order')
    if (res === -1) console.log('Wrong Order')
    if (res === 0) {
      console.log(pair)
      throw new Error('Unknown')
    }
  }

  return sum
  // console.log(compare([1, 1, 3, 1, 1], [1, 1, 5, 1, 1]))
}
// console.log(part1()) // 5760

function part2() {
  const allPackets = processInput(realInput).flat(1)
  allPackets.push([[2]], [[6]])

  const sorted = allPackets.sort((a, b) => compare(b, a))
  return (sorted.findIndex((v) => _.isEqual(v, [[2]])) + 1) * (sorted.findIndex((v) => _.isEqual(v, [[6]])) + 1)
}

console.log(part2())
