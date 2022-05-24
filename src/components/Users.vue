<template>
  <div style="min-height: 50px;"></div>
  <q-table

      :rows="users"
      :columns="columns"
      title="Users"
      separator="cell"
  >
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn dense round flat color="grey" @click="editRow(props)" icon="edit"></q-btn>
        <q-btn dense round flat color="red" @click="()=>confirmDelete(props)" icon="delete"></q-btn>
      </q-td>
    </template>
  </q-table>
  <edit-dialog :row-to-edit="rowToEdit"
               :show-edit-dialog="showEditDialog" :update-row="updateRow"
               @dialogUpdated="myUpdate"
               id-column="id"
  />

</template>

<script>
import {useAjaxTable} from "../composeables/ajaxTable";
import EditDialog from "./EditDialog.vue";

export default {
  name: "Users",
  components: {EditDialog},
  setup() {

    const {
      columns,
      rows: users,
      showEditDialog,
      rowToEdit,
      editRow,
      deleteRow,
      updateRow,
      fetchData,
      confirmDelete
    } = useAjaxTable('/users', '/users', {})
    fetchData();

    return {
      users,
      columns,
      editRow,
      deleteRow,
      showEditDialog,
      rowToEdit,
      updateRow,
      myUpdate: (v) => {
        showEditDialog.value = v;
      },
      confirmDelete
    }
  }


}
</script>

