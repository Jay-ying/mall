// 封装防抖函数debounce，由于监听30张图片都加载完会很消耗性能，所以利用防抖函数解决问题
// export default {
//   debounce(fnc, delay) {
//     let timer = null;
//     return function (...args) {
//       if (timer) clearTimeout(timer)
//       timer = setTimeout(() => {
//         fnc.apply(this, args)
//       }, delay)
//     }
//   }
// } 

export function debounce(fnc, delay) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fnc.apply(this, args)
    }, delay)
  }
}

// 正则表达式(字符串匹配利器)
export function formatDate(date, fmt) {
  // 1.获取年份
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  };

  // 2.获取
  // M+ 表示一个或者多个M
  // M* 表示0个或者多个M
  // M? 表示0个或者一个M
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };

  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }

  return fmt;
};

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};
