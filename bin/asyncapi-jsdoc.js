#!/usr/bin/env node

const program = require('commander')
const asyncApiJSDoc = require('../')
const packg = require('../package.json')

program
  .version(packg.version)
  .usage('[options] <path ...>')
  .option('-d, --definition [asyncApiDef.js]', 'Input asyncApi definition.')
  .option('-o, --output [asyncApiSpec.json]', 'Output asyncApi specification.')
  .parse(process.argv)

if (!program.args.length) {
  program.outputHelp()
  process.exit()
}

asyncApiJSDoc(
  program.args,
  program.definition || 'asyncApiDef.js',
  program.output
).then((exitCode) => {
  process.exit(exitCode)
})
