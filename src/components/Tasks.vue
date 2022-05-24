<template>
  <div style="margin-top: 80px; margin-left: 10px;">
    <q-btn fab icon="add" color="accent" @click="addTask"/>
  </div>
  <q-table
      :rows="tasks"
      :columns="columns"
      separator="cell"
      title="Tasks"
  >
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn dense round flat color="grey" @click="editRow(props)" icon="edit"></q-btn>
        <q-btn dense round flat color="red" @click="()=>confirmDelete(props)" icon="delete"></q-btn>
      </q-td>
    </template>
  </q-table>

  <q-dialog ref="dialogRef" v-model="showAddTaskForm">
    <create-task @submit="taskSubmitted"/>
  </q-dialog>

  <edit-dialog
      :row-to-edit="rowToEdit"
      :show-edit-dialog="showEditDialog"
      :update-row="updateRow"
      id-column="id"
      @dialogUpdated="myUpdate"
  />

</template>

<script>
import CreateTask from "./CreateTask.vue";
import {ref} from "vue";
import {useAjaxTable} from "../composeables/ajaxTable";
import EditDialog from "./EditDialog.vue";


export default {
  name: "Tasks",
  components: {EditDialog, CreateTask},
  setup() {
    const {
      columns,
      rows: tasks,
      showEditDialog,
      rowToEdit,
      editRow,
      deleteRow,
      updateRow,
      fetchData,
      confirmDelete
    } = useAjaxTable("/tasks", 'task', {
      'dateColumns': ['task_plan_start_date', 'task_plan_end_date', 'created_date'],
    });
    fetchData();

    const showAddTaskForm = ref(false);
    const showEditTaskForm = ref(false);

    return {
      showAddTaskForm,
      showEditTaskForm,
      confirmDelete,
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
      myUpdate: (v) => {
        showEditDialog.value = v;
      },
      taskSubmitted: () => {
        showAddTaskForm.value = false
        fetchData();
      }

    }

  },
}
</script>

<style scoped>

</style>