// PostToolUse hook: lint any JS/TS/Vue file the agent just wrote or edited.
// Exit code 2 sends ESLint's report back to the agent so it can fix the problems.
import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import path from 'node:path'

const input = JSON.parse(readFileSync(0, 'utf8'))
const filePath = input.tool_input?.file_path
const projectDir = process.env.CLAUDE_PROJECT_DIR || input.cwd

if (!filePath || !/\.(js|mjs|cjs|ts|vue)$/.test(filePath)) process.exit(0)
if (path.relative(projectDir, filePath).startsWith('..')) process.exit(0)

try {
  execFileSync(
    path.join(projectDir, 'node_modules/.bin/eslint'),
    ['--no-warn-ignored', '--no-error-on-unmatched-pattern', filePath],
    { cwd: projectDir, encoding: 'utf8', stdio: 'pipe' }
  )
} catch (error) {
  process.stderr.write(`ESLint found problems in ${filePath}:\n${error.stdout || error.message}`)
  process.exit(2)
}
