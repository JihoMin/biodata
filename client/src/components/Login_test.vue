<template>
  <div class = "centered-container">
    <!-- <div>
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
    </div> -->
    <md-content class="md-elevation-3">

      <div class="title">
        <div class="md-title">Bio Data Lab</div>
        <div class="md-body-1">Login</div>
      </div>

      <div class="form">
        <md-field>
          <label>E-mail</label>
          <md-input v-model="uid" autofocus></md-input>
        </md-field>

        <md-field md-has-password>
          <label>Password</label>
          <md-input v-model="password" type="password"></md-input>
        </md-field>
      </div>

      <div class="actions md-layout md-alignment-center-space-between">
        <md-button class="md-raised md-primary" @click="auth">Log in</md-button>
      </div>

      <div class="loading-overlay" v-if="loading">
        <md-progress-spinner md-mode="indeterminate" :md-stroke="2"></md-progress-spinner>
      </div>

    </md-content>
    <!-- <div class="background" /> -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'LoginT',
  data: () => ({
    uid: '',
    password: '',
    loading: false,
    login1: {
      email: '',
      password: ''
    }
    // isAuth: false
  }),
  methods: {
    ...mapActions(['login']),
    async auth () {
      // your code to login user
      // this is only for example of loading
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

<style>
.centered-container {
  display: inline-block;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100vh;
}
.title {
  text-align: center;
  margin-bottom: 30px;
}
.md-button {
  margin: 0;
}
.form {
  margin-bottom: 60px;
}
.md-content {
  z-index: 1;
  padding: 40px;
  width: 100%;
  /* max-width: 400px; */
  position: relative;
}
.loading-overlay {
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
}
.alert-danger p{
  color: red;
}
</style>
