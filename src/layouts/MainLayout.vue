<template>
  <q-layout view="lHh lpR lFf">

    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer"/>

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          Title
        </q-toolbar-title>
        <q-tabs align="left">
          <q-route-tab :to="`${baseUrl}register`" label="Register"/>
          <q-route-tab v-if="!loggedIn" :to="`${baseUrl}login`" label="Login"/>
          <q-route-tab v-else @click="loggedIn=false">Log Out</q-route-tab>
        </q-tabs>
        <q-avatar v-if="loggedIn" color="purple" text-color="white" icon="person">
          <q-tooltip>
            {{ user['first_name'] }}
          </q-tooltip>

        </q-avatar>
      </q-toolbar>
    </q-header>

    <q-drawer v-if="loggedIn" v-model="leftDrawerOpen" side="left" bordered>
      <side-bar/>
    </q-drawer>

    <q-page-container>
      <q-page>
        <router-view/>
      </q-page>
    </q-page-container>


  </q-layout>


</template>

<script>
import {ref} from 'vue'
import SideBar from "../components/SideBar.vue";
import {useMainStore} from "../stores/mainStore";
import {storeToRefs} from "pinia";

export default {
  name: 'MainLayout',
  components: {SideBar},
  setup() {
    const leftDrawerOpen = ref(false)
    const baseUrl = import.meta.env.BASE_URL;
    const mainStore = useMainStore()
    const {loggedIn, user} = storeToRefs(mainStore)

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      baseUrl,
      loggedIn,
      user

    }
  }
}
</script>