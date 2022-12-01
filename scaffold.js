const fs = require('fs')
const { format } = require('date-fns')

const day = format(new Date(), 'dd')

const dir = `./day${day}`
fs.mkdirSync(dir)

const template = `\
const fs = require('fs')
const _ = require('lodash')

const realInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' })
const demoInput = \`
\`

function processInput(input) {
  return input.trim().split('\\n').map(l => {
    // Process input
  })
}

function part1() {
  // Good luck!
}
console.log(part1())
`

fs.writeFileSync(`${dir}/index.js`, template)
fs.writeFileSync(`${dir}/input.txt`, '')
