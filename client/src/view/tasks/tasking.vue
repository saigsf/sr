<template>
  <div class="list">
    <MyForm :form="form" @submit="submit" @cancle="cancle"></MyForm>
  </div>
</template>

<script>
export default {
  name: 'Tasking',
  data () {
    return {
      form: {
        title: '',
        ref: 'form1',
        showTitle: false,
        labelWidth: '120px',
        labelPositon: 'right',
        width: 40,
        column: 1,
        formItem: [
          {
            type: 'radio',
            name: 'username',
            label: '请选择用户:',
            // width: '80',
            value: '',
            options: [
              {
                label: '张三'
              },
              {
                label: '王五'
              },
              {
                label: '李四'
              }
            ]
          },
          {
            type: 'select',
            name: 'TCUModel',
            label: '选择TCU型号:',
            width: '80',
            value: '',
            options: [
              {
                label: '张三1',
                value: '张三1'
              },
              {
                label: '张三2',
                value: '张三2'
              },
              {
                label: '张三3',
                value: '张三3'
              }
            ]
          },
          {
            type: 'select',
            name: 'file',
            label: '选择文件:',
            width: '80',
            value: '',
            options: [
              {
                label: '张三1',
                value: '张三1'
              },
              {
                label: '张三2',
                value: '张三2'
              },
              {
                label: '张三3',
                value: '张三3'
              }
            ]
          },
          {
            type: 'date',
            name: 'startTime',
            value: '',
            width: '80',
            formate: 'yyyy-MM-dd',
            label: '任务开始时间:'
          },
          {
            type: 'date',
            name: 'endTime',
            value: '',
            width: '80',
            formate: 'yyyy-MM-dd',
            label: '任务结束时间:'
          }
        ]
      }
    }
  },
  methods: {
    submit (form) {
      console.log(form)
    },
    cancle (form) {
      console.log(form)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/base/variables.scss';
.form {
  padding-left: 200px;
  padding-top: 40px;
}
</style>
