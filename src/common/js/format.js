export function format_s_to_ms (seconds) {
  var m,s
  m = Math.floor(Math.floor(seconds)/60)
  s = Math.floor(seconds) % 60
  m += ''
  s += ''
  m = m.length==1 ? '0' + m : m
  s = s.length==1 ? '0' + s : s
  return m + ':' + s
}