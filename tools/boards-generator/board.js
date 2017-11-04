var href = window.location.href

function ls(key, value) {
  if (value === undefined) {
    var v = localStorage[key]
    try {
      v = JSON.parse(v)
    } catch (ignore) {}
    return v
  } else {
    localStorage[key] = JSON.stringify(value)
  }
}

if (href.indexOf('http://m.newsmth.net/section') == 0) {
  // init
  if (href == 'http://m.newsmth.net/section') {
    ls('boards', [])
    ls('sections', [])
  }

  var sections = ls('sections')
  var boards = ls('boards')

  var as = document.querySelectorAll('.slist.sec a')
  for (var i = 0; i != as.length; ++i) {
    var a = as[i]
    if (a.pathname.indexOf('/section/') == 0) {
      sections.push(a.href)
    } else if (a.pathname.indexOf('/board/') == 0) {
      // board
      boards.push({
        name: a.pathname.match(/\/([^\/]+$)/)[1],
        cnName: a.innerHTML
      })
    }
  }

  var next = sections.shift()

  // save sections & boards
  ls('sections', sections)
  ls('boards', boards)

  if (next) {
    window.location = next
  } else {
    console.log(JSON.stringify(boards))
  }
}
