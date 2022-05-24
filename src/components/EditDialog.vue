<template>
  <q-dialog v-model="showEditDialog" @update:model-value="myEmit">
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

                <q-select v-if="key==='active'" v-model="rowToEdit[key]" :options="['true', 'false']"/>

                <q-input filled v-else-if="key.endsWith('date')" v-model="rowToEdit[key]" mask="date">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="rowToEdit[key]" mask="YYYY-MM-DD">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat/>
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>

                <q-input
                    v-else
                    dense
                    outlined v-model="rowToEdit[key]"
                    :disable="key===idColumn"/>


              </q-item-section>
            </q-item>

          </q-list>
        </q-form>

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

export default {
  name: 'edit-dialog',
  setup(props, {emit}) {

    return {
      myEmit(v) {
        emit('dialogUpdated', v)
      }
    }
  },
  emits: ['dialogUpdated'],
  props: {
    rowToEdit: {},
    showEditDialog: false,
    updateRow: {},
    idColumn: '',
  }
}
</script>
