const fs = require('fs');
const dateUtility = require('../libraries/date-formatter');

const logsPath = __dirname + '/../logs/';
function log(err, req, fnName) {
  let ip;
  if(req) {
    ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  } else {
    ip = 'event';
  }
    const logObj = {
        time: dateUtility.readableDate(),
        client: ip,
        error: JSON.stringify(err),
        fn: fnName
    };

    fs.appendFile(logsPath + 'logs.txt', JSON.stringify(logObj) + '\r\n', (err) => {
        if(err) return;
    })
}

module.exports = {
    log: log
}
