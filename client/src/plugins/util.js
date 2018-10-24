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

/**
 *获取cookie
 *
 * @export
 * @param {*} name
 * @returns
 */
export function getCookie (name) {
  var arr
  var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  arr = document.cookie.match(reg)
  if (arr) {
    return arr[2]
  } else {
    return null
  }
}

/**
 *设置cookie
 *
 * @export
 * @param {*} cname
 * @param {*} value
 * @param {*} expiredays
 */
export function setCookie (cname, value, expiredays) {
  var exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays)
  console.log(exdate)
  document.cookie = cname + '=' + escape(value) + ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
}

/**
 *删除cookie
 *
 * @export
 * @param {*} name
 */
export function delCookie (name) {
  var exp = new Date()
  exp.setTime(exp.getTime() - 1)
  var cval = getCookie(name)
  if (cval !== null) document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
}
/**
 *时间格式化
 *
 * @export
 * @param {*} fmt
 * @param {*} date
 * @returns
 */
export function dateFtt (fmt, date) {
  var o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}
/**
 *px转rem
 * @export
 * @param {*} px
 * @returns
 */
export function px2rem (px) {
  return px / 100 + 'rem'
}

/**
 *获取随机数
 *
 * @export
 * @param {*} min
 * @param {*} max
 * @returns
 */
export function random (min, max) {
  if (!max) {
    min = 0
    max = min
  }
  return Math.random() * (max - min) + min
}
/**
 *通过ID冒泡排序
 *
 * @export
 * @param {*} arr
 * @returns
 */
export function bubbleSortById (arr) {
  var i = arr.length
  var j
  var tempExchangVal
  while (i > 0) {
    for (j = 0; j < i - 1; j++) {
      if (arr[j].id > arr[j + 1].id) {
        tempExchangVal = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = tempExchangVal
      }
    }
    i--
  }
  return arr
}
