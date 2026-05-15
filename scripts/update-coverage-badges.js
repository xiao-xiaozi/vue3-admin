import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const summaryPath = resolve('coverage/coverage-summary.json')
const readmePath = resolve('README.md')

const summary = JSON.parse(readFileSync(summaryPath, 'utf-8'))
const { statements, branches, functions, lines } = summary.total

const color = (pct) => {
  if (pct >= 80) return 'brightgreen'
  if (pct >= 60) return 'green'
  if (pct >= 40) return 'yellow'
  return 'orange'
}

const badges = [
  `![Statements](https://img.shields.io/badge/statements-${statements.pct}%25-${color(statements.pct)})`,
  `![Branches](https://img.shields.io/badge/branches-${branches.pct}%25-${color(branches.pct)})`,
  `![Functions](https://img.shields.io/badge/functions-${functions.pct}%25-${color(functions.pct)})`,
  `![Lines](https://img.shields.io/badge/lines-${lines.pct}%25-${color(lines.pct)})`,
].join('\n')

const readme = readFileSync(readmePath, 'utf-8')
const updated = readme.replace(
  /^\[!\[Statements\].*\n\[!\[Branches\].*\n\[!\[Functions\].*\n\[!\[Lines\].*/m,
  badges
)

write(readmePath, updated)
console.log(`Coverage badges updated: statements=${statements.pct}% branches=${branches.pct}% functions=${functions.pct}% lines=${lines.pct}%`)
