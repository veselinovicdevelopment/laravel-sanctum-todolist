<template>
  <div class="row mt-5">
    <div class="col-12 col-md-6 offset-md-3">
      <div class="card">
        <div class="card-header">Login</div>
        <div class="card-body">
          <div class="mb-3">
            <label for="loginEmail" class="form-label">Email address</label>
            <input
              type="email"
              v-model="auth.email"
              class="form-control"
              id="loginEmail"
            />
          </div>
          <div class="mb-3">
            <label for="loginPassword" class="form-label">Password</label>
            <input
              type="password"
              v-model="auth.password"
              class="form-control"
              id="loginPassword"
            />
          </div>
          <div class="d-flex flex-column align-items-center">
            <button
              :disabled="processing"
              @click="login"
              class="btn btn-primary mb-3"
            >
              {{ processing ? "Please wait" : "Login" }}
            </button>
            <router-link :to="{ name: 'register' }"
              >Don't have an account?</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "login",
  data: function () {
    return {
      auth: {
        email: null,
        password: null,
      },
      processing: false,
    };
  },
  methods: {
    ...mapActions("auth", ["sendLoginRequest"]),

    login: function () {
      this.processing = true;
      this.sendLoginRequest(this.auth)
        .then(() => {
          this.processing = false;
        })
        .catch((e) => {
          this.$vToastify.removeToast();
          this.$vToastify.setSettings({
            withBackdrop: false,
            position: "top-right",
            errorDuration: 2000,
          });
          this.$vToastify.error("Login failed, please try again");
        })
        .finally(() => {
          this.processing = false;
        });
    },
  },
};
</script>
