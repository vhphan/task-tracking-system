<template>
  <div style="margin-top: 80px; margin-left: 10px;">
    <q-btn fab icon="add_task" color="accent" @click="addTask"/>
  </div>
  <q-table
        :rows="tasks"
        :columns="columns"
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn dense round flat color="grey" @click="editRow(props)" icon="edit"></q-btn>
          <q-btn dense round flat color="grey" @click="deleteRow(props)" icon="delete"></q-btn>
        </q-td>
      </template>
    </q-table>

  <q-dialog ref="dialogRef" v-model="showAddTaskForm">
    <create-task/>

  </q-dialog>
</template>

<script>
import CreateTask from "./CreateTask.vue";
import {ref} from "vue";
import {apiNode} from "../plugins/http";
import {useAjaxTable} from "../composeables/ajaxTable";



export default {
  name: "Tasks",
  components: {CreateTask},
  setup() {

    const {rows: tasks, columns, rowToEdit, showEditDialog, editRow, deleteRow, updateRow, fetchData} = useAjaxTable("/tasks", 'task', {});
    fetchData();

    const showAddTaskForm = ref(false);
    return {
      showAddTaskForm,
      addTask: () => {
        console.log("add task");
        showAddTaskForm.value = true;
      },
      tasks,
      columns,
      editRow,
      deleteRow,
      updateRow,
      showEditDialog,
      rowToEdit,

    }

  },
}
</script>

<style scoped>

</style>