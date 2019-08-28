<template>
  <div class="home">
    <h1>todos </h1>
    <div class="layout">
      <label class="lable"> <a-checkbox
        v-if="todoListAll.length > 0"
        :indeterminate="indeterminate"
        @change="onCheckAllChange"
        :checked="checkAll"/></label><input v-model="inputVal" @keyup.enter="addTodo" placeholder="What needs to be done?"/>
    </div>
    <ul style="margin:0">
      <template v-for="item in isShowList">
        <li :key="item.id">
          <div>
            <a-icon  class="lableRight" type="close" @click="deleteTodoById(item.id)" />
            <a-checkbox-group class="lable" style="margin-left: -45px;"
                :options="[{ value: item, label: '' }]"
                v-model="checkedList" @change="onChange(item)"
                />
            <input :value="item.todo" :class="[checkedList.findIndex(eleme => eleme.id === item.id) > -1 ? 'isOK' : '']" class="inputList"/>
          </div>
        </li>
      </template>
    </ul>
    <div class="bottom" v-if="todoListAll.length > 0">
      {{items.length}} items left
       <a-button class="button" @click="clickCheckAll">All</a-button>
       <a-button class="button" @click="clickCheckActive">Active</a-button>
       <a-button class="button" @click="clickCompleted">Completed</a-button>
       <a href="#" class="a" @click="clickClearCompleted">Clear Completed</a>
    </div>
  </div>
</template>

<script>
import uuid from 'uuid'
const todoListAll = []
const isShowList = []

export default {
  name: 'home',
  data () {
    return {
      inputVal: '',
      indeterminate: false,
      checkAll: false,
      checkedList: [],
      todoListAll,
      isShowList
    }
  },
  computed: {
    items () {
      return this.todoListAll.filter(item => !item.isOK)
    }
  },
  methods: {
    // 添加任务
    addTodo () {
      if (!this.inputVal) return
      const todo = {
        id: uuid(),
        todo: this.inputVal,
        isOK: false
      }
      this.todoListAll.push(todo)
      this.inputVal = ''
      this.checkAll = false
      this.clickCheckAll()
      console.log(this.checkedList)
    },
    // 选中时事件
    onChange (todo) {
      this.todoListAll.find(item => item.id === todo.id).isOK = !this.todoListAll.find(item => item.id === todo.id).isOK
      const isOKList = this.todoListAll.filter(item => item.isOK)
      this.checkAll = isOKList.length === this.todoListAll.length
    },
    // 全选事件
    onCheckAllChange (e) {
      Object.assign(this, {
        checkedList: e.target.checked ? this.todoListAll : [],
        indeterminate: false,
        checkAll: e.target.checked
      })
      if (e.target.checked) {
        this.todoListAll.map(item => {
          item.isOK = true
          return item
        })
      } else {
        this.todoListAll.map(item => {
          item.isOK = false
          return item
        })
      }
    },
    // 删除事件
    deleteTodoById (id) {
      this.todoListAll.splice(this.todoListAll.findIndex(item => item.id === id), 1)
    },
    // 点击查看全部任务
    clickCheckAll () {
      this.isShowList = this.todoListAll
    },
    // 点击查看未完成任务
    clickCheckActive () {
      this.isShowList = this.todoListAll.filter(item => !item.isOK)
      this.checkAll = false
    },
    // 清除完成了的任务
    clickClearCompleted () {
      this.todoListAll = this.todoListAll.filter(item => !item.isOK)
      this.isShowList = this.todoListAll
      this.checkAll = false
    },
    // 点击查看完成任务
    clickCompleted () {
      this.isShowList = this.todoListAll.filter(item => item.isOK)
      this.checkAll = true
    }
  }
}
</script>

<style scoped lang="less">
h1 {
  text-align: center;
  font-size: 100px;
  color: #EAD7D7;
  margin: 0;
}
.layout {
  margin: auto;
  width: 550px;
  border: 1px solid #EDEDED;
  >input{
    width:90%;
    height: 60px;
    border: none;
    outline: none;
    appearance: none;
    padding: 0;
    vertical-align: middle;
    font-size: 20px;
  }
}

ul {
  list-style-type: none;
  padding: 0;
  >li {
    width: 550px;
    height: 60px;
    line-height: 60px;
    font-size: 20px;
    margin: auto;
    border: 1px solid #EDEDED;
    text-indent: 30px;
    padding: 0;
  }
  >li:hover .lableRight {
    display: inline-block
  }
}
.lable {
    height: 60px;
    width: 8%;
    display: inline-block;
    text-align: center;
    line-height: 60px;
    float: left;
}
.lableRight{
  height: 60px;
  width: 8%;
  line-height: 60px;
  float: right;
  margin-right: 15px;
  display: none;
}
.inputList {
  width: 81%;
  border: none;
  outline: none;
  appearance: none;
  padding: 0;
  vertical-align: middle;
  font-size: 20px;
  float: left;
  height: 58px;
  margin-left: 45px;
}
.isOK {
  text-decoration: line-through;
  color: #D9D9D9
}
.bottom{
  height: 50px;
  width: 550px;
  margin: auto;
  line-height: 50px;
}
.button{
  margin-left: 30px;
}
.a {
  color: #777777;
  float: right;
}
</style>
