<template>
  <div class="q-pa-md absolute-center"
       style="min-width: 600px; max-width: 800px; background-color: rgba(206,212,206,0.35);">
    <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
    >
      <q-input
          class="q-mt-md"
          outlined
          v-model="email"
          label="Email"
          hint="Enter your email address"
          :rules="[val => !!val || 'Email is missing', isValidEmail]"
      />

      <q-input
          class="q-mt-md"
          outlined
          v-model="firstName"
          label="First Name"
          hint="First Name"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-input
          class="q-mt-md"
          outlined
          v-model="lastName"
          label="Last Name"
          hint="Last Name"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-select
          class="q-mt-md"
          outlined
          v-model="userType"
          :options="[
          {label: 'ADMIN', value: 'admin'}          ,
          {label: 'PM', value: 'pm'},
          {label: 'DT', value: 'dt'},
          ]"
          hint="User Type"
          label="User Type"
          :rules="[val => !!val || 'Select User Type']"
          @update:model-value="onUserTypeChange"

      />
      <q-select
          v-if="userType && (userType.value === 'pm' || userType.value === 'dt')"
          class="q-mt-md"
          outlined
          v-model="aspId"
          :options="asps"
          label="Select ASP for this resource"
          hint="Select ASP the resource is belongs to"
      />

      <q-select
          v-if="userType && userType.value === 'pm'"
          class="q-mt-md"
          outlined
          v-model="adminId"
          :options="admins"
          label="Select Admin for this PM"
          hint="Select Admin the PM is assigned to"
      />

      <q-select
          v-if="userType && userType.value === 'dt'"
          class="q-mt-md"
          outlined
          v-model="pmId"
          :options="pms"
          label="Select PM for this DT"
          hint="Select PM the DT is assigned to"
      />

      <q-editor
          class="q-mt-md"
          v-model="remarks"
          outlined
      />

      <div class="q-mt-md">
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm"/>
      </div>
    </q-form>
  </div>
</template>

<script>
import {useQuasar} from "quasar";
import {ref} from "vue";
import {apiNode} from "../plugins/http";
import {useNotify} from "../composeables/notify";

export default {
  name: "Register",
  setup() {

    const $q = useQuasar();
    const email = ref(null);
    const firstName = ref(null);
    const lastName = ref(null);
    const userType = ref(null);
    const remarks = ref('');
    const {showError} = useNotify();
    const admins = ref([]);
    const adminId = ref(null);
    const pms = ref([]);
    const pmId = ref(null);
    const asps = ref([]);
    const aspId = ref(null);

    const getAdmins = async () => {
      const {data} = await apiNode.get('/admins');
      admins.value = data.data.map(admin => ({
        label: admin['first_name'] + ' ' + admin['last_name'],
        value: admin.id
      }));
    };

    const getPms = async () => {
      const {data} = await apiNode.get('/pms');
      pms.value = data.data.map(pm => ({
        label: pm['first_name'] + ' ' + pm['last_name'],
        value: pm.id
      }));
    };

    const getAsps = async () => {
      const {data} = await apiNode.get('/asps');
      asps.value = data.data.map(asp => ({
        label: asp['name'],
        value: asp.id
      }));
    };

    return {
      aspId,
      asps,
      getAsps,
      pms,
      pmId,
      getPms,
      admins,
      adminId,
      getAdmins,
      email,
      firstName,
      lastName,
      userType,
      remarks,
      onSubmit() {
        let postData = {
          email: email.value,
          firstName: firstName.value,
          lastName: lastName.value,
          userType: userType.value.value,
          remarks: remarks.value
        };
        if (userType.value.value === 'pm') {
          postData['aspId'] = aspId.value.value;
          postData['adminId'] = adminId.value.value;
        } else if (userType.value.value === 'dt') {
          postData['aspId'] = aspId.value.value;
          postData['pmId'] = pmId.value.value;
        }

        apiNode.post(
            'user',
            postData
        ).then(res => {
          console.log(res);
          $q.dialog({
            title: 'Success!',
            message: 'User Created Successfully',
            color: 'positive',
          })
        }).catch(err => {
          console.log(err);
          showError(err.message);
        })

      },
      onReset() {
        firstName.value = null;
        lastName.value = null;
        email.value = null;
        userType.value = null;
      },
      isValidEmail(val) {
        const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
        return emailPattern.test(val) || 'Invalid email';
      },
      onUserTypeChange(selectedUserType) {
        console.log(userType);
        if (selectedUserType.value === 'pm') {
          getAdmins();
        }
        if (selectedUserType.value === 'dt') {
          getPms();
        }
        if (['pm', 'dt'].includes(selectedUserType.value)) {
          getAsps();
        }
      }


    }
  }
}
</script>

<style scoped>

</style>