
export function urlParse() {
  let url = window.location.search
  let obj = {}
  let reg = /[?&][^?&]+=[^?&]+/g
  let arr = url.match(reg)
  if (arr) {
    arr.forEach((item) => {
      let o = item.substring(1).split('=')
      obj[decodeURIComponent(o[0])] = decodeURIComponent(o[1])
    })
  }
  return obj
}
