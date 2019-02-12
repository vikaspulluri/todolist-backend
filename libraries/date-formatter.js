const moment = require('moment');

function formatDate() {
    return moment();
}
function readableDate() {
    return moment().format('MMMM Do YYYY, h:mm:ss a');
}
function duration(startTime) {
    var duration = moment.duration(end.diff(startTime));
    return duration.asHours();
}

module.exports = {
    formatDate: formatDate,
    readableDate: readableDate,
    duration: duration
}