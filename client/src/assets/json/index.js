import field from './field.json'
import form from './form.json'
import search from './search.json'
/**
 *获取模块字段
 *
 * @export
 * @param {*} str
 * @returns
 */
export function getField (str) {
  return field[str]
}
/**
 *获取form字段
 *
 * @export
 * @param {*} str
 * @returns
 */
export function getFormField (str, cstr) {
  return form[str][cstr]
}
/**
 *获取搜索字段
 *
 * @export
 * @param {*} str
 * @param {*} cstr
 * @returns
 */
export function getSearchField (str, cstr) {
  return search[str][cstr]
}
