<template>
  <v-app
    class="mx-auto overflow-hidden"
   height="100%"
 
  >
    <v-system-bar color="deep-purple darken-3"></v-system-bar>

    <v-app-bar
    max-height ="60"
      color="deep-purple accent-4"
      dark
    
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title
      >
       <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">Spruce Support</router-link>
      </v-toolbar-title>
      </v-toolbar-title>

      <v-spacer></v-spacer>

  <template v-if="$vuetify.breakpoint.smAndUp"
  
  
  
  >
<div
 v-for="item in menuItems"
           :key="item.title"
          :to="item.link"


>
    <v-btn icon 
    :to="item.link"
    >
          <v-icon>{{ item.icon }}</v-icon>
        </v-btn>
        
</div>
  
      
     
      </template>


    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      bottom
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
        
<v-list>
        <v-list-item
          v-for="item in menuItems"
           :key="item.title"
          :to="item.link"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

        </v-list-item-group>
      </v-list>
     <v-btn
      block
          v-if="userIsAuthenticated"
          flat
          @click="onLogout">
          <v-icon left dark>exit_to_app</v-icon>
          Logout

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
    data () {
      return {
         drawer: false,
      group: null,
      }
    },

       watch: {
      group () {
        this.drawer = false
      },
    },
    computed: {
      menuItems () {
        let menuItems = [
          {icon: 'face', title: 'Sign up', link: '/signup'},
          {icon: 'lock_open', title: 'Sign in', link: '/signin'}
        ]
        if (this.userIsAuthenticated) {
          menuItems = [
            {icon: 'supervisor_account', title: 'View Meetups', link: '/meetups'},
            {icon: 'room', title: 'Organize Meetup', link: '/meetup/new'},
            {icon: 'person', title: 'Profile', link: '/profile'}
          ]
        }
        return menuItems
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      }
    },
    methods: {
      onLogout () {
        this.$store.dispatch('logout')
      }
    }
  }
</script>
