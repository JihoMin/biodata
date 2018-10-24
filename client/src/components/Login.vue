<template>
<div class="centered-container">
    <md-content class="md-elevation-3">

      <div class="title">
        <div class="md-title">Welcome!</div>
        <div class="md-body-1">bio</div>
      </div>

      <div class="form">
        <md-field>
          <label>ID</label>
          <md-input v-model="email" autofocus></md-input>
        </md-field>

        <md-field md-has-password>
          <label>Password</label>
          <md-input v-model="password" type="password"></md-input>
        </md-field>
      </div>

      <div class="actions md-layout md-alignment-center-space-between">
        <a href="/resetpassword">Reset password</a>
        <md-button class="md-raised md-primary" @click="reset()">Log in</md-button>
      </div>

      <div class="loading-overlay" v-if="loading">
        <md-progress-spinner md-mode="indeterminate" :md-stroke="2"></md-progress-spinner>
      </div>

    </md-content>
     <div class="background" />
  </div>

</template>

<script>
import App from '../App.vue'

export default {
  name: 'Login',
  data () {
    return {
      microPosts: [],
      error: ''
    }
  },
  methods: {
    reset () {
      console.log(App.data().isL)
      App.data().isL = true
      console.log(App.data().isL)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.centered-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 300px;
  .title {
    text-align: center;
    margin-bottom: 30px;
    width:300px;
    // img {
    //   margin-bottom: 16px;
    //   max-width: 80px;
    // }
  }
  .actions {
    .md-button {
      margin: 0;
    }
  }
  .form {
    margin-bottom: 60px;
  }
  md-content {
    z-index: 1;
    padding: 40px;
    width: 100%;
    max-width: 400px;
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
}
</style>
