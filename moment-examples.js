var moment = require('moment');
var now = moment();


console.log(now.format());
console.log(now.format('X'));
console.log(now.valueOf());

var timestamp = 1449909693647;
var timestampMoment = moment.utc(timestamp);
timestampMoment.local();
console.log(timestampMoment.format('h:mm:ssa'));
// console.log(now.format('dddd, MMMM Do YYYY, h:mm:ss a'));