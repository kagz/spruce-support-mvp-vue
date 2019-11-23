<template>
  <div>
    <div>
      <div class="middle-box text-center loginscreen animated fadeInDown">
        <div>
          <div>
            <h1 class="logo-name">Spruce</h1>
          </div>
          <h3>Welcome to Spruce Support</h3>

          <p>Create an account.</p>
          <v-layout row v-if="error">
            <v-flex xs12 sm6 offset-sm3>
              <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
            </v-flex>
          </v-layout>
          <form class="m-t" role="form" @submit.prevent="onSignup">
            <div class="form-group">
              <input
                type="email"
                class="form-control"
                placeholder="Username"
                name="email"
                label="Mail"
                id="email"
                v-model="email"
                required
              />
            </div>
            <div class="form-group">
              <input
                type="password"
                class="form-control"
                placeholder="Password"
                required
                name="password"
                label="Password"
                id="password"
                v-model="password"
              />
            </div>
            <div class="form-group">
              <input
              class="form-control"
                placeholder="Confirm Password"
                name="confirmPassword"
                label="Confirm Password"
                id="confirmPassword"
                v-model="confirmPassword"
                type="password"
                :rules="[comparePasswords]"
              />
            </div>
            <button type="submit" class="btn btn-primary block full-width m-b">Register</button>

            <p class="text-muted text-center">
              <small>Have an account?</small>
            </p>
            <a class="btn btn-sm btn-white btn-block"  >
            
            <router-link
            to="/signin" 
            >Login </router-link>
            </a>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: ""
    };
  },
  computed: {
    comparePasswords() {
      return this.password !== this.confirmPassword
        ? "Passwords do not match"
        : "";
    },
    user() {
      return this.$store.getters.user;
    },
    error() {
      return this.$store.getters.error;
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push("/");
      }
    }
  },
  methods: {
    onSignup() {
      this.$store.dispatch("signUserUp", {
        email: this.email,
        password: this.password
      });
    },
    onDismissed() {
      this.$store.dispatch("clearError");
    }
  }
};
</script>
<style lang="stylus" scoped>
.middle-box {
  max-width: 400px;
  z-index: 100;
  margin: 0 auto;
  padding-top: 40px;
}

.lockscreen.middle-box {
  width: 200px;
  padding-top: 110px;
}

.loginscreen.middle-box {
  width: 300px;
}

.loginColumns {
  max-width: 800px;
  margin: 0 auto;
  padding: 100px 20px 20px 20px;
}

.passwordBox {
  max-width: 460px;
  margin: 0 auto;
  padding: 100px 20px 20px 20px;
}

.logo-name {
  color: #e6e6e6;
  font-size: 80px;
  font-weight: 800;
  letter-spacing: -10px;
  margin-bottom: 0px;
}

.middle-box h1 {
  font-size: 170px;
}

.wrapper .middle-box {
  margin-top: 140px;
}

.lock-word {
  z-index: 10;
  position: absolute;
  top: 110px;
  left: 50%;
  margin-left: -470px;
}

.lock-word span {
  font-size: 100px;
  font-weight: 600;
  color: #e9e9e9;
  display: inline-block;
}

.lock-word .first-word {
  margin-right: 160px;
}
</style>