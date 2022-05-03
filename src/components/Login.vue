<template>
  <div class="q-pa-md absolute-center"
       style="min-width: 600px; max-width: 800px; background-color: rgba(206,212,206,0.35);">

    <div v-if="!loggedIn">

      <q-header

          class="full-width q-pa-md q-ma-md"
          style="left: 0;"
      >LOGIN
      </q-header>


      <q-form class="q-pa-lg q-mt-lg"
              @submit.prevent="onSubmit"
      >

        <q-input
            class="q-mt-lg "

            outlined
            v-model="email"
            label="Email"
            hint="Enter your email address"
            :rules="[val => !!val || 'Email is missing', isValidEmail]"
        />
        <q-input
            class="q-mt-lg"
            outlined
            v-model="password"
            type="password"
            label="Password"
            hint="Enter your password"
            :rules="[val => !!val || 'Password is missing']"
        />
        <div>
          <q-btn
              class="q-mt-lg"
              label="Submit" type="submit" color="primary"/>

        </div>


      </q-form>

    </div>

    <div v-else>
      <div>
         You are logged in....
      </div>
      <div>
        <q-btn
            class="q-mt-lg"
            label="Logout"
            @click="logout"
            color="primary"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";
import {apiNode} from "../plugins/http";
import {useNotify} from "../composeables/notify";
import {setCookie} from "../utils/myFunctions";
import {useQuasar} from "quasar";
import {useMainStore} from "../stores/mainStore";
import {storeToRefs} from "pinia";

export default {
  name: "Login",
  setup() {
    const email = ref(null);
    const password = ref(null);
    const $q = useQuasar();
    const mainStore = useMainStore();
    const {loggedIn} = storeToRefs(mainStore);
    const {showError} = useNotify();
    return {
      loggedIn,
      email,
      password,
      isValidEmail(val) {
        const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
        return emailPattern.test(val) || 'Invalid email';
      },
      onSubmit() {
        console.log(email.value, password.value);

        apiNode.post('login', {
          email: email.value,
          password: password.value
        }).then(res => {
          console.log(res.data);
          if (res.data.apiKey) {
            setCookie('apiKey', res.data.apiKey, 7);
            if (res.data.success) {
              $q.dialog({
                title: 'Success',
                message: 'You have successfully logged in',
                color: 'positive',
              });
              mainStore.loggedIn = true;
            }


          } else {
            showError('Invalid email or password');
          }

        }).catch(err => {
          console.log(err);
          showError(err.message);
        });
      },
      logout() {
        mainStore.loggedIn = false;
        setCookie('apiKey', null, -1);
      }
    }
  },

}
</script>

<style scoped>

</style>