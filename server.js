var express = require('express')
var path = require('path')
var app = express()
var server = require('http').Server(app)
var io = require('socket.io').listen(server)
var Tail = require('tail').Tail;
const argv = require('yargs')
.option('file', {
  alias: 'f',
  describe: 'the log file to read from'
})
.argv

const history = []

tail = new Tail(argv.file, {fromBeginning: true});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.use(express.static('.'))
// app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', function (socket) {
  console.log('a user connected')
  socket.emit('history', history)

  socket.on('disconnect', function () {
    console.log('user disconnected')
  })
})

server.listen(8081, function () {
  console.log(`Listening on ${server.address().port}`)
})


tail.on("line", function(data) {
  history.push(data)
  io.emit('line', data)
});
 
tail.on("error", function(error) {
  console.log('ERROR: ', error);
});


