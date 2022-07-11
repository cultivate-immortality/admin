/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */

// 校验协议头
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */

// 校验用户名
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

// 校验手机号格式
export function validMobile(str) {
  // str是传递过来的手机号
  return /^1[3-9]\d{9}$/.test(str)
}
