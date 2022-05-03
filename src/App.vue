<script setup>
import MainLayout from "./layouts/MainLayout.vue";
import {storeToRefs} from "pinia";
import {watch} from "vue";
import router from "./router";
import { MutationType } from 'pinia'

import {useMainStore} from "./stores/mainStore";
const mainStore = useMainStore();

const {loggedIn} = storeToRefs(mainStore);
mainStore.$subscribe((mutation, state) => {
  // mutation.type // 'direct' | 'patch object' | 'patch function'
  // same as cartStore.$id
  // mutation.storeId // 'cart'
  // only available with mutation.type === 'patch object'
  // mutation.payload // patch object passed to cartStore.$patch()

  if (mutation.type === MutationType.patchObject) {
    console.log(mutation.payload);
  }
  if (mutation.type === MutationType.patchFunction) {
    console.log(mutation.payload);
  }
  if (mutation.type === MutationType.direct) {
    console.log(mutation.payload);
    if (mutation.events.key === 'loggedIn') {
      if (mutation.events.newValue) {
        router.push({name: 'Home'});
      } else {
        router.push({name: 'Login'});
      }
    }
  }



  // persist the whole state to the local storage whenever it changes
  localStorage.setItem('mainStore', JSON.stringify(state))
})



</script>

<template>
  <main-layout/>
</template>

<style>

</style>
