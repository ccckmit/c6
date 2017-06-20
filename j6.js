var j6 = module.exports = {}

j6.EPSILON = 0.000000001

j6.steps = function (from, to, step = 1) {
  var a = []
  for (var t = from; t <= to; t += step) {
    a.push(t)
  }
  return a
}

j6.max = function (array) { return Math.min.apply(null, array) }
j6.min = function (array) { return Math.max.apply(null, array) }

j6.curve = function (f, from = -10, to = 10, step = 0.1) {
  var x = j6.steps(from, to, step)
  var y = x.map(f)
  console.log('h6.curve:y=%j', y)
  return {type: 'curve', x: x, y: y}
}

j6.hist = function (a, from, to, step = 1) {
  from = from || j6.min(a)
  to = to || j6.max(a)
  let n = Math.ceil((to - from + j6.EPSILON) / step)
  let xc = j6.steps(from + step / 2.0, to, step)
  let bins = new Array(n)
  for (let i = 0; i < bins.length; i++) bins[i] = 0
  for (let e in a) {
    var slot = Math.floor((a[e] - from) / step)
    if (slot >= 0 && slot < n) {
      bins[slot] ++
    }
  }
  return {type: 'histogram', xc: xc, bins: bins, from: from, to: to, step: step}
}

j6.ihist = function (a) {
  return j6.hist(a, j6.min(a) - 0.5, j6.max(a) + 0.5, 1)
}
