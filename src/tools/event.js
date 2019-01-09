let t_domId = 0
let t_fnId = 0
let cache = {
  // 1: {
  //  events: {
  //      click: [{
  //          evenName: 'click',
  //          handler: fn,
  //      }],
  //      mouseover: []
  //  }
  // }
}
window.t_cache = cache

let obj = {
  event_bind (elem, even, fn, useCapture) {
    useCapture = useCapture || false

    let elem_t_domId = elem.t_domId = elem.t_domId || ++t_domId
    let elem_data = cache[elem_t_domId] = cache[elem_t_domId] || {}

    if (!elem_data.events) {
      elem_data.events = {}
      // elem_data.el = elem;
    }

    let even_fns = elem_data.events[even] = (elem_data.events[even] || [])

    if (!fn.t_fnId) {
      fn.t_fnId = ++t_fnId
    }

    let even_fn = { handler: fn, evenName: even, useCapture: useCapture }
    even_fns.push(even_fn)

    elem.addEventListener(even, fn, useCapture)
  },
  event_unbind (elem, even, fn, useCapture) {
    useCapture = useCapture || false
    let elem_t_domId = elem.t_domId
    if (!elem_t_domId || !cache[elem_t_domId] || !cache[elem_t_domId]['events'] || !cache[elem_t_domId]['events'][even]) return

    let events = cache[elem_t_domId]['events']
    let even_fns = events[even]
    for (let i = 0; i < even_fns.length; ++i) {
      let even_fn = even_fns[i]
      if (even_fn.handler.t_fnId === fn.t_fnId) {
        even_fns.splice(i--, 1)
      }
    }
    for (let key in events) {
      if (!events[key].length) {
        delete events[key]
      }
    }
    if (!Object.keys(events).length) delete cache[elem_t_domId]
    elem.removeEventListener(even, fn, useCapture)
  },
  event_unbindAll (elem) {
    let elem_t_domId = elem.t_domId

    if (!elem_t_domId || !cache[elem_t_domId] || !cache[elem_t_domId]['events']) return

    let events = cache[elem_t_domId]['events']

    for (let key in events) {
      let fns = events[key]
      fns && fns.length && fns.forEach((fn, i) => {
        elem.removeEventListener(fn.evenName, fn.handler, fns.useCapture)
      })
    }
    delete cache[elem_t_domId]
  }
}

export default obj
