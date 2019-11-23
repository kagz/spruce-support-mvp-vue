<template>
  <v-app class="mx-auto overflow-hidden">
    <v-app-bar elevateOnScroll max-height="60" color="#000000" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="hidden-sm-and-up"></v-app-bar-nav-icon>


      <v-toolbar-title class="brand-name">
        <router-link to="/" tag="span" style="cursor: pointer">Spruce Support</router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <template v-if="$vuetify.breakpoint.smAndUp">
        <div v-for="item in menuItems" :key="item.title" :to="item.link">
          <v-btn icon :to="item.link">
            <v-icon>{{ item.icon }}</v-icon>
          </v-btn>
        </div>
        <v-btn 
        color="error"
        icon v-if="userIsAuthenticated" @click="onLogout">
          <v-icon left dark>exit_to_app</v-icon>
        </v-btn>
      </template>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" expand-on-hover absolute temporary>
      <v-list-item>
        <v-list-item-title v-if="userIsAuthenticated">John Leider</v-list-item-title>
        <v-list-item-title v-if="!userIsAuthenticated">Login To Create A Job</v-list-item-title>
        <v-btn icon @click.stop="mini = !mini">
          <v-icon v-if="userIsAuthenticated">mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="item in menuItems" :key="item.title" :to="item.link">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-btn 
      color="error"
      block v-if="userIsAuthenticated" text @click="onLogout">
        <v-icon 
        
        left dark>exit_to_app</v-icon>
      </v-btn>
    </v-navigation-drawer>

    <v-card-text>
      <main>
        <router-view></router-view>
      </main>
    </v-card-text>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: null,
      group: null,
      mini: true
    };
  },

  // watch: {
  //   group() {
  //     this.drawer = false;
  //   }
  // },
  computed: {
    menuItems() {
      let menuItems = [
        // { icon: "face", title: "Sign up", link: "/signup" },
        { icon: "lock_open", title: "Sign in", link: "/signin" }
      ];
      if (this.userIsAuthenticated) {
        menuItems = [
          {
            icon: "supervisor_account",
            title: "View Meetups",
            link: "/meetups"
          },
          { icon: "room", title: "Organize Meetup", link: "/meetup/new" },
          { icon: "person", title: "Profile", link: "/profile" }
        ];
      }
      return menuItems;
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>
<style lang="stylus" scoped>
.brand-name {
  color: #e6e6e6;
  font-size: 30px;
  font-weight: 200;
}
</style>