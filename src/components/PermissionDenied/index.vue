<template>
  <div class="page page-404">
    <img class="img-404" src="./assets/403.png" alt="404">
    <p class="msg-404">抱歉，您的权限受限！</p>
    <Form
      v-if="isDev"
      ref="formInline"
      :model="formInline"
      :rules="ruleInline"
      inline>
      <FormItem prop="user">
        <Input type="text" v-model="formInline.user" placeholder="Username" />
          <Icon type="ios-person-outline" slot="prepend" />
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input type="text" v-model="formInline.password" placeholder="Password" />
          <Icon type="ios-lock-outline" slot="prepend" />
        </Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="logon">开发模式下登录</Button>
      </FormItem>
    </Form>
    <Button type="primary" @click="go">返回</Button>
  </div>
</template>

<script>
export default {
  name: 'PermissionDenied',
  data() {
    return {
      formInline: {
        user: 'jyhc',
        password: 'a11111111',
      },
      ruleInline: {
        user: [
          { required: true, message: '用户名！哥们！', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '密码！哥们！', trigger: 'blur' },
          { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' },
        ],
      },
    }
  },
  computed: {
    isDev() {
      return process.env.NODE_ENV === 'development'
    },
  },
  methods: {
    go() {
      this.$Message.info('TODO 尚无系统配置信息指向跳转路径')
    },
    logon() {
      this.$refs['formInline'].validate((valid) => {
        if (valid) {
          const { user, password } = this.formInline
          this.$router.replace(`/sso/logon?u=${user}&p=${password}`)
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.page-404{
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .img-404{
    width: 342px;
    height: 321px;
    transform: translateX(-20px);
  }
  .msg-404{
    font-size: 20px;
    color: #999999;
    margin: 16px 0 24px;
  }
}
</style>
