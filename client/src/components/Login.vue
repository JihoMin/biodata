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
        <div class="md-body-1">bio</div>
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
