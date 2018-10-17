<template>
  <div></div>
</template>

<script>
export default {
  name: 'MyConfirm',
  props: {
    type: {
      type: String,
      default: 'warning'
    },
    title: {
      type: String,
      default: '提示信息'
    },
    content: {
      type: String,
      default: '此操作将永久删除该文件, 是否继续?'
    },
    tip: {
      type: String,
      default: '如果是请点击“确定”，否则点击“取消”'
    },
    successMsg: {
      type: String,
      default: '操作成功!'
    },
    infoMsg: {
      type: String,
      default: '已取消操作'
    }
  },
  data () {
    return {}
  },
  methods: {
    // 确认
    confirm () {
      var _this = this
      this.$confirm('<p>' + _this.content + '</p><span>' + _this.tip + '</span>', _this.title, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: _this.type,
        dangerouslyUseHTMLString: true
      }).then(() => {
        // this.$message({
        //   type: 'success',
        //   message: _this.successMsg
        // })
        this.$emit('ok')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: _this.infoMsg
        })
        this.$emit('cancle')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/base/variables.scss';
@import '@/assets/base/mixins.scss';
</style>
