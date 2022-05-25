<template>
  <q-scroll-area class="fit">
    <q-list>

      <template v-for="(menuItem, index) in menuList" :key="index">
        <q-item clickable :active="menuItem.label === 'Outbox'" v-ripple>
          <q-item-section avatar>
            <q-icon :name="menuItem.icon"/>
          </q-item-section>
          <q-item-section>
            <q-item :to="menuItem.to">{{ menuItem.label }}</q-item>
          </q-item-section>
        </q-item>
        <q-separator :key="'sep' + index" v-if="menuItem.separator"/>
      </template>

    </q-list>
  </q-scroll-area>
</template>

<script>
export default {
  name: "SideBar",
  setup() {
    const baseUrl = import.meta.env.BASE_URL;

    const menuList = [
      {
        icon: 'group',
        label: 'Users',
        separator: true,
        to: `${baseUrl}users`
      },

      // {
      //   icon: 'settings',
      //   label: 'Settings',
      //   separator: true,
      //   to: `${baseUrl}settings`
      // },

      {
        icon: 'task',
        label: 'Tasks',
        separator: true,
        to: `${baseUrl}tasks`
      },
      {
        icon: 'info',
        label: 'About',
        separator: true,
        to: `${baseUrl}about`
      },

    ]

    return {
      menuList,
      baseUrl,
    }
  }
}

</script>

<style scoped>

</style>