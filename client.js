var socket = io();

function append(line) {
  const [_, timestamp, severity, account, message] = line.split(/(\[.*\]) (\[.*\]) (?:<(.*)> )?(.*)/)
  let el
  if (line === '') {
    el = $(`<p class="line"><br></p>`)
  } else {
    let linkMatch = /(https:\/\/[^ ]+)/.exec(line)
    if (linkMatch) {
      el = $(`<p class="line">`).text(line)
      const escaped = el.innerHTML
      el.html(el.html().replace(/(https:\/\/[^ ]+)/, `<a href="$1">$1</a>`))
    } else {
      el = $(`<p class="line">`).text(line)
    }    
  }
  if (severity && severity.includes('ERROR')) {
    el.addClass('error')
  }
  $('#lines').append(el)
}

socket.on('line', function(line) {
  append(line)
})

socket.on('history', function(history) {
  history.forEach(line => {
    append(line)
  })
})
