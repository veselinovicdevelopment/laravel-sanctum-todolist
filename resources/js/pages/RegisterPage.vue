<template>
  <div class="row mt-5">
    <div class="col-12 col-md-6 offset-md-3">
      <div class="card">
        <div class="card-header">Register</div>
        <div class="card-body">
          <div class="mb-3">
            <label for="loginEmail" class="form-label">Email address</label>
            <input
              type="email"
              class="form-control"
              id="loginEmail"
              v-model="user.email"
            />
          </div>
          <div class="mb-3">
            <label for="loginPassword" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              id="loginPassword"
              v-model="user.password"
            />
          </div>
          <div class="d-flex flex-column align-items-center">
            <button
              class="btn btn-primary mb-3"
              @click="register"
              :disabled="processing"
            >
              {{ processing ? "Please wait" : "Register" }}
            </button>
            <router-link :to="{ name: 'login' }"
              >Already have an account?</router-link
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
  data: function () {
    return {
      user: {
        email: null,
        password: null,
      },
      processing: false,
    };
  },

  methods: {
    ...mapActions("auth", ["sendRegisterRequest"]),

    register() {
      this.processing = true;
      this.sendRegisterRequest(this.user)
        .then(() => {
          this.processing = false;
          this.$router.push({ path: "/auth/todo-dashboard" });
        })
        .catch(({ response: { data } }) => {
          this.$vToastify.removeToast();
          this.$vToastify.setSettings({
            withBackdrop: false,
            position: "top-right",
            errorDuration: 2000,
          });
          this.$vToastify.error("Register failed, try again!");
        })
        .finally(() => {
          this.processing = false;
        });
    },
  },
};
</script>
