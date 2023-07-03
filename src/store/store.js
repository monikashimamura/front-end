import { reactive } from 'vue'

export const store = reactive({
  //data
  user: {
    name: "李田所",
    uid: "114514",
    age: 24,
    password: "1919810",
    sex: 1,
    type: 1,
    introduction: "昏睡红茶代言人",
    phoneNumber: "114514",
    image: "../src/assets/logo.jpg"
  },
  url: 'http://127.0.0.1:10100',
  token: "notoken",
  cid: -1,



})

export default store