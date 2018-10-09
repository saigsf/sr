import field from './field.json'
import form from './form.json'
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
