<template>
  <div class="vld-parent">
    <loading :active.sync="isLoading" :is-full-page="true" />
    <h3>Todo Dashboard</h3>

    <div class="card">
      <div class="card-header">Todos</div>
      <div class="card-body">
        <table class="table table-stripe table-bordered table-responsive">
          <thead>
            <tr>
              <th>No</th>
              <th style="width: 50%">Description</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <template v-if="untouched.length > 0">
              <tr v-for="(item, index) in untouched" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ item.description }}</td>
                <td>
                  <button class="btn btn-info" @click.prevent="complete(item)">
                    Complete
                  </button>
                </td>
                <td>
                  <button class="btn btn-danger" @click.prevent="remove(item)">
                    Delete
                  </button>
                </td>
              </tr>
            </template>
            <template v-else>
              <tr>
                <td colspan="4" class="text-center">List is empty</td>
              </tr>
            </template>
          </tbody>
        </table>
        <h4 class="mt-5">Add new item here</h4>
        <div class="form-group">
          <div class="row">
            <div class="col-md-6">
              <label for="new-item">Description</label>
              <input
                type="text"
                v-model="newItem"
                class="form-control"
                id="new-item"
              />
            </div>
          </div>
        </div>
        <button class="btn btn-outline-dark mt-4" @click="add()">Add</button>
      </div>
    </div>

    <div class="card mt-5">
      <div class="card-header">Completed Todos</div>
      <div class="card-body">
        <table class="table table-stripe table-bordered table-responsive">
          <thead>
            <tr>
              <th>No</th>
              <th style="width: 50%">Description</th>
              <th>Date / Time</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <template v-if="completed.length > 0">
              <tr v-for="(item, index) in completed" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ item.description }}</td>
                <td>{{ item.completed_at }}</td>
                <td>
                  <button class="btn btn-danger" @click.prevent="remove(item)">
                    Delete
                  </button>
                </td>
              </tr>
            </template>
            <template v-else>
              <tr>
                <td colspan="4" class="text-center">List is empty</td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  components: {
    Loading,
  },
  data: function () {
    return {
      todos: [],
      newItem: "",
      isLoading: false,
    };
  },
  computed: {
    untouched: function () {
      return this.todos.reduce((acc, cur) => {
        if (!cur.completed_at) {
          return [...acc, cur];
        } else return acc;
      }, []);
    },
    completed: function () {
      return this.todos.reduce((acc, cur) => {
        if (cur.completed_at) {
          return [...acc, cur];
        } else return acc;
      }, []);
    },
  },
  mounted: function () {
    axios.get("/api/todos").then(({ data }) => {
      this.todos = data;
    });
  },
  methods: {
    complete(item) {
      this.isLoading = true;
      axios.put("/api/todos/" + item.id).then(({ data }) => {
        this.todos = data;
        this.isLoading = false;
      });
    },
    remove(item) {
      this.isLoading = true;
      axios.delete("/api/todos/" + item.id).then(({ data }) => {
        this.todos = data;
        this.isLoading = false;
      });
    },
    add() {
      if (this.newItem == "") {
        this.$vToastify.removeToast();
        this.$vToastify.setSettings({
          withBackdrop: false,
          position: "top-right",
          errorDuration: 2000,
        });
        this.$vToastify.error("Description cannot be empty");
        return;
      }
      this.isLoading = true;
      axios
        .post("/api/todos", { description: this.newItem })
        .then(({ data }) => {
          this.todos = data;
          this.newItem = "";
          this.isLoading = false;
        });
    },
  },
};
</script>
