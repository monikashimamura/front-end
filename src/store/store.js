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
    img: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
  },
  url: 'http://127.0.0.1:10100',
  token: "notoken",
  cid: -1,
  searchText: ""



})

export default store