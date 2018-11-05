<template>
  <div id="app">
    <header>
      <title>BioData</title>
    </header>
    <md-app>
      <md-app-toolbar class="md-dense md-primary">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <md-button class="md-icon-button" @click="showNavigation = true">
              <md-icon>menu</md-icon>
            </md-button>
          </div>
          <div class="md-toolbar-section-end">
            <md-button class="md-button" v-if="getIsAuth" @click="onClickLogout">
              Logout
            </md-button>
            <md-button class="md-button" v-else @click.prevent="onClickLogin">
              Login
            </md-button>
          </div>
        </div>
        <div class="md-toolbar-row md-toolbar-offset">
          <h3 class="md-title">Bio Data Website</h3>
        </div>
      </md-app-toolbar>
      <md-app-drawer :md-active.sync="showNavigation">
        <md-toolbar class="md-transparent" md-elevation="0">
          <span class="md-title">Bio Data</span>
        </md-toolbar>
        <md-list>
          <md-list-item>
            <md-icon>home</md-icon>
            <span class="md-list-item-text">Home</span>
          </md-list-item>
          <md-list-item>
            <md-icon>sentiment_satisfied_alt</md-icon>
            <span class="md-list-item-text">
              <router-link to="/LoginT">Login</router-link>
            </span>
          </md-list-item>
          <!-- <md-list-item>
            <md-icon>search</md-icon>
            <span class="md-list-item-text" >
              <router-link to="/search">데이터 조회하기(HIGBP)</router-link>
            </span>
          </md-list-item> -->
          <md-list-item>
            <md-icon>search</md-icon>
            <span class="md-list-item-text" >
              <router-link to="/searchSNU">데이터 조회하기(병원)</router-link>
            </span>
          </md-list-item>
          <md-list-item>
            <md-icon>create</md-icon>
            <span class="md-list-item-text">
              <router-link to="/Upload">데이터 입력하기</router-link>
            </span>
          </md-list-item>
          <md-list-item v-if="isAdmin">
            <md-icon>error</md-icon>
            <span class="md-list-item-text">계정 관리</span>
          </md-list-item>
          <!-- <md-list-item>
            <md-icon>create</md-icon>
            <span class="md-list-item-text">
              <router-link to="/me">me</router-link>
            </span>
          </md-list-item> -->
        </md-list>
      </md-app-drawer>
      <md-app-content>
        <!-- {{getIsAuth}}, {{getUid}}, {{getAccessToken}} -->
        <router-view/>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',
  data () {
    return {
      showNavigation: false,
      isAuth: false
    }
  },
  computed: {
    ...mapGetters([
      'getErrorState',
      'getIsAuth',
      'getUid',
      'getAccessToken'
    ]),
    isAdmin () {
      if (this.getUid === 'admin') {
        return true
      }
    }
    // isAuth () {
    //   if (this.getIsAuth === true) {
    //     return true
    //   } else {
    //     return false
    //   }
    // }
  },
  methods: {
    ...mapActions([
      'logout'
    ]),
    onClickLogout () {
      this.logout()
      this.greet()
      this.$router.push({
        name: 'LoginT'
      })
    },
    onClickLogin () {
      this.$router.push({
        name: 'LoginT'
      })
    },
    greet: function () {
      console.log('getIsAuth: ', this.getIsAuth)
      console.log('localstoraga: ', localStorage.isAuth)
      this.isAuth = this.getIsAuth
      // this.$nextTick(function () {
      //   // DOM이 이제 갱신됨
      //   // `this` 가 현재 인스턴스에 바인딩 됨
      //   this.isAuth = this.getIsAuth
      // })
      // this.$set(this.isAuth, this.getIsAuth)
    }
  },
  created () {
    this.greet()
  },
  changed () {
    this.greet()
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
.md-title {
  font-size: 20px;
}
.md-app {
  min-height: 800px;
  height: 100%;
}
.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}
</style>
