export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // payload新添加的商品，在添加商品前，先判断商品有没有该商品
      let oldProduct = context.state.cartList.find(function (item) {
        return item.iid === payload.iid
      })

      // 判断商品是否存在，来决定增加商品样式，还是增加同一个商品的数量
      if (oldProduct) {
        context.commit('addCounter', oldProduct)
        resolve('当前商品数量+1')
      } else {
        context.commit('addToCart', payload)
        resolve('增加一个新商品')
      }
    })
  }
}


// export default {
//   // mutations唯一的目的就是修改state中状态
//   // mytations中每个方法尽可能完成的事件比较单一一点
//   // 所以下面的判断写在action里面比较好
//   addCart(context, payload) {
//     // payload新添加的商品，在添加商品前，先判断商品有没有被添加了
//     // let oldProduct = null;
//     // 循环cartList,和传来的商品对比id,如果id相同，说明state已经有该商品，那就不需要重新添加商品，只需要将该商品的数量+1就行
//     // for (let item of state.cartList) {
//     //   if (item.iid === payload.iid) {
//     //     oldProduct = item
//     //   }
//     // }
//     // 方法二
//     // console.log(payload)
//     let oldProduct = context.state.cartList.find(function (item) {
//       return item.iid === payload.iid
//     })

//     // 判断商品是否存在，来决定增加商品样式，还是增加同一个商品的数量
//     if (oldProduct) {
//       // oldProduct.count += 1
//       context.commit('addCounter', oldProduct)
//     } else {
//       // payload.count = 1
//       // state.cartList.push(payload)
//       context.commit('addToCart', payload)
//     }
//   }
// }
