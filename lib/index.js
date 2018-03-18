const Observable = require('rxjs/Rx').Observable;
const fs = require('fs-extra')
const path = require('path')
const glob = require('glob-promise')
const doctrine = require('doctrine')
const jsYaml = require('js-yaml');
const _ = require('lodash');

/**
 * Generates AsyncAPI definitions based on JSDoc of files of entry path
 * @param  {string} entryPaths       Entry path
 * @param  {string} definitionsFile Input asyncApi definition path
 * @param  {string} output          Output asyncApi specification path
 * @return {Promise<number>}        Exit code. 0 if success
 */
async function asyncApiJSDoc(entryPaths, definitionsFile, output) {
  const jsDocRegex = /\/\*\*([\s\S]*?)\*\//gm
  let apiDefinition = require(path.resolve(definitionsFile))

  let processingStream = Observable.from(entryPaths)
    .mergeMap(path => glob(path)) // Get all files per entry path
    .concatAll() // Flatten files into one array
    .mergeMap(filePath => fs.readFile(filePath, { encoding: 'utf8' })) // Read file contents
    .map(fileContent => fileContent.match(jsDocRegex)) // Get jsdoc docblocs
    .filter(docblocks => docblocks) // Filter out files without docblocks
    .concatAll() // Flatten docblocks
    .map(docblock => doctrine.parse(docblock, { unwrap: true })) // Parse docblocks into objects
    .map(jsdoc => jsdoc.tags) // Get tags
    .concatAll() // Flatten all tags
    .filter(tag => tag.title == 'asyncApi') // Check if title is "@asyncApi"
    .map(tag => jsYaml.safeLoad(tag.description)) // Load yaml within tag

  return new Promise((resolve, reject) => {
    processingStream.subscribe(
      (chunkOfAsyncApi) => { // Stream next
        apiDefinition = _.merge(apiDefinition, chunkOfAsyncApi)
      },
      (err) => { // Stream error
        console.log('Error when parsing AsyncApi jsdoc from files: ', err)
        reject(1)
      },
      async () => { // Stream complete
        if (output) {
          await fs.writeJson(output, apiDefinition, {spaces: 2, encoding: 'utf8'})
        } else {
          console.log(apiDefinition)
        }

        resolve(0)
      }
    )
  })
}

module.exports = asyncApiJSDoc
