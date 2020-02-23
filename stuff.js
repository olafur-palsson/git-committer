const fs = require('fs')
const process = require('process')
const { exec } = require('child_process')

gaze = require('gaze')


if (process.argv.length < 4) {
  throw Error('Need to provide pattern and command')
}

const CONFIG = {
  pattern: process.argv[2],
  command: process.argv[3]
}



const main = () =>
  console.log(CONFIG)

  gaze(CONFIG.pattern, function(err, watcher) {
    this.on('all', (event_type, filepath) => {

      const modified_command = CONFIG.command.replace('FILEPATH', filepath)
      console.log(`X: ${modified_command}`)
      exec(modified_command)
    })


  })




// const not_enough_args = ls =>
//     process.argv.length < ls.length


// const init = ({ config_file }) => {
//   const CONFIG = JSON.parse(fs.readFileSync(config_file))
//   Object.keys(CONFIG).watcher.forEach(itme =>
//     setup_watchers(item))
// }


// const setup_watchers = ({ patterns, ...settings }) => {
//   const watcher = new gaze.Gaze(patterns)
//   Object.keys(settings).forEach(event_type => {
//     watcher.on(key, () => {
//       const commands = settings[key]
//       commands.forEach(exec)
//     })
//   })
// }


main()