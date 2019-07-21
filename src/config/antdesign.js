import { Button, message } from 'ant-design-vue'
import Vue from 'vue'

Vue.use(Button)

Vue.prototype.$message = message
message.config({
  duration: 2,
  maxCount: 1
})
