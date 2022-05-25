<template>
  <q-layout view="lHh lpR lFf">

    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer"/>

        <q-toolbar-title>
          {{ currentRoute }}
        </q-toolbar-title>
        <q-toolbar-title>
          Alpha Version {{ version }}
        </q-toolbar-title>
        <q-tabs align="left">
          <q-route-tab :to="`${baseUrl}register`" label="Register"/>
          <q-route-tab v-if="!loggedIn" :to="`${baseUrl}login`" label="Login"/>
          <q-route-tab v-else @click="logout">Log Out</q-route-tab>
        </q-tabs>
        <q-avatar v-if="loggedIn" color="purple" text-color="white" icon="person">
          <q-tooltip>
            {{ user['first_name'] }}
            {{ user['user_type'] }}
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
import {computed, ref, watch} from 'vue'
import SideBar from "../components/SideBar.vue";
import {useMainStore} from "../stores/mainStore";
import {storeToRefs} from "pinia";
import {useRoute} from "vue-router";
import router from "../router";
import {getCookie} from "../utils/myFunctions";
import {apiNode} from "../plugins/http";
import {setUserInitial} from "../composeables/auth";

export default {
  name: 'MainLayout',
  components: {SideBar},
  setup() {
    const version = __APP_VERSION__;
    const leftDrawerOpen = ref(false)
    const baseUrl = import.meta.env.BASE_URL;
    const mainStore = useMainStore()
    const {loggedIn, user} = storeToRefs(mainStore);
    const currentRoute = computed(() => {
      return useRoute().name
    });

    watch(() => loggedIn, () => {
      if (!loggedIn.value) {
        router.push({name: 'Login'})
      }
    })

    const apiKey = getCookie('apiKey');
    console.log(apiKey);
    if (apiKey && !loggedIn.value) {
      apiNode.post('loginUserWithApiKey',
          {
            apiKey
          }
      ).then(res => {
        setUserInitial(res, mainStore);
      });
    }

    return {
      version,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      baseUrl,
      loggedIn,
      user,
      currentRoute,
      logout() {
        loggedIn.value = false;
        router.push({name: 'Login'});
      }
    }
  }
}
</script>