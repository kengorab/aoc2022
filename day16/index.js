const fs = require('fs')
const _ = require('lodash')

const realInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' })
const demoInput = `
Valve AA has flow rate=0; tunnels lead to valves DD, II, BB
Valve BB has flow rate=13; tunnels lead to valves CC, AA
Valve CC has flow rate=2; tunnels lead to valves DD, BB
Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE
Valve EE has flow rate=3; tunnels lead to valves FF, DD
Valve FF has flow rate=0; tunnels lead to valves EE, GG
Valve GG has flow rate=0; tunnels lead to valves FF, HH
Valve HH has flow rate=22; tunnel leads to valve GG
Valve II has flow rate=0; tunnels lead to valves AA, JJ
Valve JJ has flow rate=21; tunnel leads to valve II
`

function processInput(input) {
  return input
    .trim()
    .split('\n')
    .map((l) => {
      const [, valve, , , rate, , , , , ...valves] = l.split(' ')
      return { valve, rate: _.parseInt(rate.split('=')[1]), valves: valves.join().split(',').filter(Boolean) }
    })
}

function part1() {
  const data = processInput(realInput)
  const valves = _.keyBy(data, 'valve')

  function solve(valves) {
    const q = [[1, 'AA', 0, new Set()]]
    const seen = {}
    let best = 0

    const key = ([time, valve]) => `${time}__${valve}`

    while (q.length) {
      const current = q.shift()
      const [time, valve, score, opened] = current

      if ((seen[key(current)] || -1) >= score) continue
      seen[key(current)] = score

      if (time === 30) {
        best = Math.max(best, score)
        continue
      }

      if (valves[valve]?.rate > 0 && !opened.has(valve)) {
        opened.add(valve)
        const newScore = score + [...opened].reduce((acc, v) => acc + valves[v].rate, 0)
        q.push([time + 1, valve, newScore, new Set([...opened])])

        opened.delete(valve)
      }

      const newScore = score + [...opened].reduce((acc, v) => acc + valves[v].rate, 0)
      for (const opt of valves[valve].valves) {
        q.push([time + 1, opt, newScore, new Set([...opened])])
      }
    }

    return best
  }

  return solve(valves)
}
console.log(part1()) // 1896

function part2() {
  // 🤷
}
console.log(part2()) // 2576
