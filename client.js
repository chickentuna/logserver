var socket = io();


// const allLineEls = []

function append(line) {
  const [_, timestamp, severity, account, message] = line.split(/(\[.*\]) (\[.*\]) (?:<(.*)> )?(.*)/)
  let el
  if (line === '') {
    el = $(`<p class="line"><br></p>`)
  } else {
    el = $(`<p class="line">`).text(line)
  }
  if (severity && severity.includes('ERROR')) {
    el.addClass('error')
  }
  $('#lines').append(el)
  // allLineEls.push(el)
}

socket.on('line', function(line) {
  append(line)
})

socket.on('history', function(history) {
  history.forEach(line => {
    append(line)
  })
})
