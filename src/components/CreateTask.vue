<template>

  <div class="q-pa-md"
       style="min-width: 600px; max-width: 800px; background-color: white;">

    <q-form
        @submit.prevent="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
    >
      <q-input
          class="q-mt-md"
          outlined
          v-model="task.taskName"
          label="Task Name"
          hint="Enter task name"
          :rules="[val => !!val || 'Task name is missing']"
      />
      <q-input
          class="q-mt-md"
          outlined
          v-model="task.taskType"
          label="Task Type"
          hint="Enter task type"
          :rules="[val => !!val || 'Task type is missing']"
      />

      <q-editor
          class="q-mt-md"
          outlined
          v-model="task.taskDescription"
          placeholder="Enter task description"
          :rules="[val => !!val || 'Task description is missing']"
      />


      <q-card style="padding: 0;">
        <q-card-section>
          <q-card-section style="padding: 0;">
            <div class="text-h6">Planned Start/End</div>
            <div class="text-subtitle2">Selected: {{ startAndEnd }}</div>
          </q-card-section>
        </q-card-section>
        <q-card-section style="margin-top: 1px; padding: 0;">
          <q-date v-model="startAndEnd" range :options="dateOptionsFn"/>


        </q-card-section>
      </q-card>

      <div class="q-mt-md">
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm"/>
      </div>

    </q-form>

  </div>

</template>

<script>
import {computed, reactive} from "vue";
import {apiNode} from "../plugins/http";
import {useQuasar} from "quasar";

export default {
  name: "CreateTask",
  emits: ["submit", "reset"],
  setup(props, {emit}) {
    const $q = useQuasar();
    const task = reactive({
      taskName: "",
      taskType: "",
      taskDescription: "",
      taskPlanStartDate: null,
      taskPlanEndDate: null,
    })

    const startAndEnd = computed({
      get: () => ({
        from: task.taskPlanStartDate,
        to: task.taskPlanEndDate
      }),
      set: (value) => {
        if (value === null) {
          task.taskPlanStartDate = null;
          task.taskPlanEndDate = null;
          return;
        }
        task.taskPlanStartDate = value.from;
        task.taskPlanEndDate = value.to;
      }
    });

    const dateOptionsFn = (date) => {
      return date >= (new Date()).toISOString().slice(0, 10).replaceAll('-', '/');
    }

    return {
      dateOptionsFn,
      task,
      startAndEnd,
      onReset() {
        task.taskName = "";
        task.taskType = "";
        task.taskDescription = "";
        task.taskPlanStartDate = null;
        task.taskPlanEndDate = null;
      },
      onSubmit() {

        apiNode.post("/task", task).then(response => {
          console.log(response);
          $q.dialog({
            title: response.data.success ? "Success" : "Error",
            message: response.data.message,
            color: response.data.success ? "positive" : "negative"
          })
          emit('submit');
        })
      }
    }
  },

}
</script>

<style scoped>

</style>