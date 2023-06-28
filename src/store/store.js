import { reactive } from 'vue'

export const store = reactive({
  //data
  user: {
    name: "李田所",
    id: "114514",
    age: 24,
    password: "1919810",
    sex: 1,
    type: 1,
    introduction: "昏睡红茶代言人",
    phoneNumber: "114514",
    img: ""
  },
  url: 'http://127.0.0.1:10100',
  token: "notoken",
  count: 23,

  //methods
  increment() {
    this.count++
  }
})

export default store