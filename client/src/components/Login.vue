<template>
  <!-- <div id="login">
    <h1>Welcome!</h1>
    <input type="text" name="username"  placeholder="Username"/>
    <br />
    <input type="password" name="password"  placeholder="Password"/>
    <br />
    <div class="form-block form__actions">
                <router-link to="/password-reset">Lost your password?</router-link>
                <button class="button button--green form__submit">Login</button>
            </div>
  </div> -->
  <!-- <div class = "container">
    <div class ="panel panel-primary">
      <div class ="panel-heading">
        <h3 class = "panel-title">Welcome</h3>
      </div>
      <div class="panel-body">
        <form>
          <div class ="form-group">
            <label for="email" class="control-label sr-only"></label>
            <input type="email" class="form-control" id="email"  placeholder="Email">
          </div>
          <div class ="form-group">
            <label for="password" class="control-label sr-only"></label>
            <input type="password" class="form-control" id="password"  placeholder="Password">
          </div>
          <button class="btn btn-primary pull-right">Sign In</button>
        </form>
      </div>
    </div>
  </div> -->
<div class="centered-container">
    <md-content class="md-elevation-3">

      <div class="title">
        <div class="md-title">Welcome!</div>
        <div class="md-body-1">Build beautiful apps with Material Design and Vue.js</div>
      </div>

      <div class="form">
        <md-field>
          <label>E-mail</label>
          <md-input v-model="email" autofocus></md-input>
        </md-field>

        <md-field md-has-password>
          <label>Password</label>
          <md-input v-model="password" type="password"></md-input>
        </md-field>
      </div>

      <div class="actions md-layout md-alignment-center-space-between">
        <a href="/resetpassword">Reset password</a>
        <md-button class="md-raised md-primary" @click="auth">Log in</md-button>
      </div>

      <div class="loading-overlay" v-if="loading">
        <md-progress-spinner md-mode="indeterminate" :md-stroke="2"></md-progress-spinner>
      </div>

    </md-content>
     <div class="background" />
  </div>

</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      microPosts: [],
      error: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .md-content{
    width: 300px;
    height: 100%;
  }
</style>
