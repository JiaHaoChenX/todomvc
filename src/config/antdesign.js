import { Button, message, Checkbox, Icon } from 'ant-design-vue'
import Vue from 'vue'

Vue.use(Icon)
Vue.use(Button)
Vue.use(Checkbox)

Vue.prototype.$message = message
message.config({
  duration: 2,
  maxCount: 1
})
