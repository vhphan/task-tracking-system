<template>
  <div class="absolute-center">
    <q-card class="my-card">
      <q-card-section class="bg-primary text-white">
        <div class="text-h6">Task Tracking System</div>
        <div class="text-subtitle2">Prototype</div>
      </q-card-section>

      <q-separator/>

      <q-card-section>
        <q-card-section style="padding: 0; margin: 0;">
          <div style="padding: 0; margin: 0;" class="text-h6">About</div>
        </q-card-section>
        <p >
          This is a prototype of a task tracking system.
        </p>
        <p>
          To report a bug or request features/enhancements, send email to: <a href="mailto:vee.huen.phan@ericsson.com">Vee
          H.
          Phan</a>
        </p>

        <q-separator/>
        <q-card-section style="padding: 0; margin-top: 20px;">
          <q-item style="padding: 0; margin: 0;" class="text-h6">Database Structure</q-item>
        </q-card-section>
        <q-card-section style="padding: 0; margin: 0;" class="text-white">
          <q-btn class="bg-primary text-white q-ma-md">
            <a class="text-white" target="_blank"
               :href="jGraphLink">
              JGraph </a>
          </q-btn>
          <q-btn class="bg-primary text-white">
            <a class="text-white" target="_blank"
               :href="graphVizLink">Graphviz</a>
          </q-btn>
        </q-card-section>
      </q-card-section>

<!--      <q-card-section>-->
<!--        <q-separator/>-->
<!--        <p style="margin-top: 20px;">-->
<!--          Dev stack:-->
<!--        </p>-->
<!--        <ul>-->
<!--          <li>-->
<!--            Node.js/Express-->
<!--          </li>-->
<!--          <li>-->
<!--            Vue.js/Quasar-->
<!--          </li>-->
<!--        </ul>-->

<!--      </q-card-section>-->
    </q-card>
  </div>
</template>

<script>
import {graphVizLink, jGraphLink} from "../utils/constants";

export default {
  name: "About",
  setup(){
    return {
      graphVizLink: graphVizLink,
      jGraphLink: jGraphLink,
    }
  }
}
</script>
