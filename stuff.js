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

      const with_path = CONFIG.command.replace('FILEPATH', filepath)
      const with_timestamp = with_path.replace('TIMESTAMP', new Date().toISOString())
      console.log(`X: ${with_timestamp}`)
      exec(with_timestamp)
    })
  })



main()