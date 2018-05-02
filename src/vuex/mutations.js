export default {
  vxaddCart (state, val) {
    state.vxfood.push(val)
    console.log(arguments)
  },
  vxdecrease (state, food) {
    state.vxfood.forEach((vatr, i) => {
      if (vatr.name === food.name) {
        state.vxfood.splice(i, 1)
      }
    })
  }
}
