<template>
  <div>
    <div>
      <h2>Log In</h2>
      <div class="alert-danger" v-if="getErrorState">
        <p></p>
      </div>
      <form @submit="onSubmit">
          <input placeholder="Enter your ID" v-model="uid">
          <input placeholder="Enter your password" v-model="password" type="password">
          <button type="submit">Login</button>
          <div class="alert-danger" v-if="errors.has('password')"></div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Login',
  data: () => ({
    uid: '',
    password: ''
    // isAuth: false
  }),
  methods: {
    ...mapActions(['login']),
    async onSubmit () {
      this.$validator.validateAll()
      if (!this.errors.any()) {
        try {
          console.log(this.uid, this.password)
          let loginResult = await this.login({email: this.uid, password: this.password})
          console.log(loginResult)
          if (loginResult) {
            alert('로그인 되었습니다')
            this.goToPages()
          } else {
            alert('아이디와 비밀번호가 맞는지 확인해주세요.')
          }
        } catch (err) {
          console.log('hi', err)
        }
      } else {
        console.log('validate err')
      }
    },
    goToPages () {
      this.$router.push({
        name: 'SearchSNU'
      })
    }
  },
  computed: {
    ...mapGetters([
      'getErrorState',
      'getIsAuth',
      'getUID'
    ])
  }
  // created () {
  //   this.isAuth = this.getIsAuth
  // }
}
</script>

<style scoped>

.alert-danger p{
  color: red;
}
</style>
