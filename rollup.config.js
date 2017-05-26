import fs from 'fs'
import json from 'rollup-plugin-json'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'

const packageInfo = JSON.parse(fs.readFileSync('package.json', 'utf8'))

const preamble = `/** 
 * @name ${packageInfo.name}
 * @version ${packageInfo.version}
 * @description ${packageInfo.description}
 * @see ${packageInfo.homepage}
 * @tutorial https://github.com/${packageInfo.repository}
 * @author ${packageInfo.author.name} <${packageInfo.author.email}> (${packageInfo.author.url})
 * @license ${packageInfo.license}
 */
`

export default {
  entry: 'src/base-query.js',
  indent: '\t',
  sourceMap: true,
  plugins: [
    json(),
    commonjs({
      exclude: [ 'node_modules/node-fetch/**' ]
    }),
    resolve()
  ],
  context: 'global', // required for whatwg-fetch module
  targets: [
    {
      format: 'umd',
      banner: preamble,
      moduleName: 'bq', // and global object name in browser environment
      dest: 'build/base-query.js'
    }
  ],
  onwarn (warning) {
    // skip eval warnings (bluebird module uses eval)
    if (warning.code === 'EVAL') return
    // log everything else
    console.warn(warning.message)
  }
}
