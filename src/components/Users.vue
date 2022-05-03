<template>
  <h3>Users</h3>
  <q-table
      :rows="users"
      :columns="columns"
  >
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn dense round flat color="grey" @click="editRow(props)" icon="edit"></q-btn>
        <q-btn dense round flat color="grey" @click="deleteRow(props)" icon="delete"></q-btn>
      </q-td>
    </template>
  </q-table>
  <q-dialog v-model="showEditDialog">
    <q-card style="width: 600px; max-width: 60vw">
      <q-card-section>
        <q-btn round flat dense icon="close" class="float-right" color="grey-8" v-close-popup></q-btn>
        <div class="text-h6">Update Row</div>
      </q-card-section>
      <q-separator inset></q-separator>
      <q-card-section class="q-pt-none">
        <q-form class="q-gutter-md">
          <q-list>
            <q-item v-for="([key, value]) in Object.entries(rowToEdit)">
              <q-item-section>
                <q-item-label class="q-pb-xs">{{ key }}</q-item-label>
                <q-input dense outlined v-model="rowToEdit[key]"/>
              </q-item-section>
            </q-item>

          </q-list>
        </q-form>
        {{rowToEdit}}
      </q-card-section>
      <q-card-section>
        <q-card-actions align="right">
          <q-btn
              flat
              label="Cancel"
              color="warning"
              dense
              v-close-popup
          ></q-btn>
          <q-btn
              flat
              label="OK"
              color="primary"
              dense
              v-close-popup
              @click="updateRow"
          ></q-btn>
        </q-card-actions>
      </q-card-section>
    </q-card>
  </q-dialog>

</template>

<script>
import {apiNode} from "../plugins/http";
import {ref} from "vue";

export default {
  name: "Users",


  setup() {
    const users = ref([]);
    const columns = ref([]);

    apiNode.get('/users').then(res => {
      users.value = res.data;
      columns.value = Object.keys(res.data[0]).map(k => ({
        name: k,
        label: k,
        field: k
      }));
      columns.value.push({
        name: 'actions',
        label: 'Actions',
        field: 'actions',
        sortable: false,
        width: '100px'
      });
    });
    const rowToEdit = ref({});
    const showEditDialog = ref(false);

    const editRow = (props) => {
      console.log(props);
      rowToEdit.value = props.row;
      showEditDialog.value = true;
    };

    const deleteRow = (props) => {
      console.log(props);
    };

    const updateRow = () => {
      console.log(rowToEdit.value);
      apiNode.put('/users/' + rowToEdit.value.id, rowToEdit.value).then(res => {
        console.log(res);
      });
    };

    return {
      users,
      columns,
      editRow,
      deleteRow,
      showEditDialog,
      rowToEdit,
      updateRow
    }
  }


}
</script>

<style scoped>

</style>