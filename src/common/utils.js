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
