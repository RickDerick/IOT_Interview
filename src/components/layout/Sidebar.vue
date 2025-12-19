<template>
  <v-navigation-drawer
   permanent width="260"
    color="#091638"
    >
    <!-- Logo section -->
    <div class="logo-section pa-6">
      <div class="d-flex align-center">
        <v-icon color="white" size="28" class="mr-2">mdi-hexagon-multiple</v-icon>
        <span class="text-h6 font-weight-bold text-white">SKYSENS</span>
      </div>
    </div>
    
    <!-- Navigation items -->
    <v-list nav class="px-2 py-12">
      <v-list-item
        v-for="item in menuItems"
        :key="item.title"
        :value="item.title"
        :active="item.active"
        :prepend-icon="item.icon"
        :title="item.title"
        class="mb-2 menu-item"
        rounded="lg"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue'

const menuItems = ref([
  { title: 'Overview', icon: 'mdi-view-dashboard', active: true },
  { title: 'Notifications', icon: 'mdi-bell', active: false },
  { title: 'Assets', icon: 'mdi-broadcast', active: false },
  { title: 'Rules', icon: 'mdi-file-tree', active: false },
])
</script>

<style scoped>

:deep(.v-list-item) {
  color: rgba(255, 255, 255, 0.7) !important;
}

:deep(.v-list-item--active) {
  background-color: #2563eb !important;
  color: white !important;
}

:deep(.v-list-item--active .v-list-item__prepend .v-icon) {
  color: white !important;
}

:deep(.v-list-item__prepend .v-icon) {
  color: rgba(255, 255, 255, 0.7) !important;
}

:deep(.v-list-item:hover) {
  background-color: rgba(255, 255, 255, 0.05) !important;
}
</style>