<template>
  <div id="login">
    <h1>Welcome!</h1>
    <input type="text" name="username"  placeholder="Username"/>
    <br />
    <input type="password" name="password"  placeholder="Password"/>
    <br />
    <!-- Lost your password? <button type ="button" >Login</button> -->
    <div class="form-block form__actions">
                <router-link to="/password-reset">Lost your password?</router-link>
                <button class="button button--green form__submit">Login</button>
            </div>
  </div>
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
</style>
