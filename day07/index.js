const fs = require('fs')

const realInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' })
const demoInput = `
$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k
`

class Dir {
  files = []
  dirs = []
  size = 0

  constructor(name, parent = null) {
    this.name = name
    this.parent = parent
  }

  changeDirectory(dest) {
    if (dest === '..') {
      return this.parent
    }

    const d = this.dirs.find((d) => d.name === dest)
    if (!d) throw new Error('Expected node to have already been visited')
    return d
  }

  addChildDir(name) {
    this.dirs.push(new Dir(name, this))
  }

  addFile(name, size) {
    this.files.push([name, size])
  }

  calcSize() {
    let sum = 0
    for (const [, size] of this.files) {
      sum += size
    }
    for (const dir of this.dirs) {
      sum += dir.calcSize()
    }

    return (this.size = sum)
  }
}

function processInput(input) {
  let root = null
  let pwd = null

  const lines = input.trim().split('\n')
  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    i += 1

    if (!line.startsWith('$')) throw new Error(`Expected cmd line, got: ${line}`)

    const [, cmd, arg] = line.split(' ')
    switch (cmd) {
      case 'cd':
        if (arg === '/') {
          root = new Dir('/')
          pwd = root
        } else {
          pwd = pwd.changeDirectory(arg)
        }
        break
      case 'ls':
        while (lines[i] && !lines[i].startsWith('$')) {
          const line = lines[i].split(' ')
          i += 1

          if (line[0] === 'dir') {
            pwd.addChildDir(line[1])
          } else {
            pwd.addFile(line[1], parseInt(line[0], 10))
          }
        }
        break
      default:
        throw new Error(`Unexpected command: ${cmd}`)
    }
  }

  return root
}

function flatten(root) {
  return [root].concat(root.dirs.flatMap(flatten))
}

const root = processInput(realInput)
root.calcSize()
const allDirs = flatten(root)

function part1() {
  return allDirs.filter((dir) => dir.size <= 100_000).reduce((acc, dir) => acc + dir.size, 0)
}
console.log(part1()) // 1490523

function part2() {
  const totalDiskSpace = 70000000
  const minRequiredSpace = 30000000
  const needToFree = root.size - (totalDiskSpace - minRequiredSpace)

  const deletionCandidates = allDirs.map((dir) => dir.size).filter((size) => size > needToFree)
  return Math.min(...deletionCandidates)
}
console.log(part2()) // 12390492
