/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
export function find (list, f) {
  return list.filter(f)[0]
}

/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
export function deepCopy (obj, cache = []) {
  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // if obj is hit, it is in circular structure
  const hit = find(cache, c => c.original === obj)
  if (hit) {
    return hit.copy
  }

  const copy = Array.isArray(obj) ? [] : {}
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy
  })

  Object.keys(obj).forEach(key => {
    copy[key] = deepCopy(obj[key], cache)
  })

  return copy
}

/**
 * forEach for object
 */
export function forEachValue (obj, fn) {
  Object.keys(obj).forEach(key => fn(obj[key], key))
}

export function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

export function isPromise (val) {
  return val && typeof val.then === 'function'
}

export function assert (condition, msg) {
  if (!condition) throw new Error(`[vuex] ${msg}`)
}

// 获取cookie、
export function getCookie (name) {
  var arr
  var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  if (arr === document.cookie.match(reg)) return (arr[2])
  else return null
}

// 设置cookie,增加到vue实例方便全局调用
export function setCookie (cname, value, expiredays) {
  var exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays)
  document.cookie = cname + '=' + escape(value) + ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
}

// 删除cookie
export function delCookie (name) {
  var exp = new Date()
  exp.setTime(exp.getTime() - 1)
  var cval = getCookie(name)
  if (cval !== null) document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
}

// js判断屏幕横竖屏：
export function orient () {
  if (window.orientation === 0 || window.orientation === 180) {
    $('body').attr('class', 'portrait') // 当竖屏的时候为body增加一个class
    // orientation = 'portrait'
    return false
  } else if (window.orientation === 90 || window.orientation === -90) {
    $('body').attr('class', 'landscape') // 当横屏的时候为body移除这个class
    // orientation = 'landscape'
    return false
  }
}

// 获取布局
export function getLayout () {
  var width = $(window).width()
  // console.log(width)
  if (width <= 375) {
    return 'HM'
  } else if (width <= 768) {
    return 'HMF'
  } else {
    return 'HAMF'
  }
}
