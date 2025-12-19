<template>
  <v-app-bar
    color="#F5F5F7"
    elevation="0"
    height="150"
    app
    fixed
  >
    <v-container fluid class="pa-0">

      <!-- ================= First Row ================= -->
      <v-row no-gutters align="center" class="px-4 py-3">
        <v-col>
          <h1 class="text-h6 font-weight-medium text-grey-darken-4">
            Overview
          </h1>
        </v-col>

        <v-col cols="auto">
          <div class="d-flex align-center ga-2">
            <v-btn icon variant="text" size="small" rounded="lg" class="top-icon-btn">
              <v-icon>mdi-arrow-expand</v-icon>
            </v-btn>

            <v-btn icon variant="text" size="small" rounded="lg" class="top-icon-btn">
              <v-icon>mdi-moon-waning-crescent</v-icon>
            </v-btn>

            <v-btn icon variant="text" size="small" rounded="lg" class="top-icon-btn">
              <v-icon>mdi-lock-outline</v-icon>
            </v-btn>

            <div class="d-flex align-center ga-2 ml-2">
              <span class="text-body-1">Hello, Demo</span>
              <v-btn icon variant="text" size="small" rounded="lg" class="top-icon-btn">
                <v-icon>mdi-account-circle-outline</v-icon>
              </v-btn>
            </div>
          </div>
        </v-col>
      </v-row>

      <!-- ================= Second Row ================= -->
      <v-row no-gutters align="center" class="px-4 pb-3">
        <v-col>
          <div class="d-flex align-center ga-2">

            <!-- Left Arrow -->
            <v-btn icon size="small" variant="text">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>

            <!-- ===== Tabs List ===== -->
            <div class="d-flex align-center ga-2">
              <div
                v-for="tab in tabs"
                :key="tab.id"
                class="tab-item"
                :class="{ 'tab-active': tab.id === activeTabId }"
                @click="selectTab(tab.id)"
              >
                <span class="tab-label">
                  {{ tab.name }}
                </span>

                <!-- Edit -->
                <v-btn
                  icon
                  size="x-small"
                  variant="text"
                  color="secondary"
                  class="tab-icon-btn"
                  @click="$emit('edit-template')"
                >
                  <v-icon size="16">mdi-pencil</v-icon>
                </v-btn>

                <!-- Add -->
                <v-btn
                  icon
                  size="x-small"
                  variant="text"
                  color="secondary"
                  class="tab-icon-btn"
                 @click="$emit('add-widget')"
                >
                  <v-icon size="16">mdi-plus-circle-outline</v-icon>
                </v-btn>
              </div>

            </div>

            <!-- Right Arrow -->
            <v-btn icon size="small" variant="text">
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </div>
        </v-col>

        <v-col cols="auto">
          <div class="d-flex align-center ga-2">
            <v-btn
              icon
              variant="outlined"
              size="large"
              rounded="lg"
              class="action-btn"
            >
              <v-icon>mdi-gesture-tap</v-icon>
            </v-btn>

            <v-btn
              icon
              variant="outlined"
              size="large"
              rounded="lg"
              class="action-btn"
            >
              <v-icon>mdi-menu</v-icon>
            </v-btn>

            <v-btn
            class="add-template-btn"
            size="large"
            variant="flat"
            color="secondary"
            @click="$emit('add-template')"
          >
            ADD TEMPLATE
            <v-icon end>mdi-plus</v-icon>
          </v-btn>

          <v-btn
            icon
            variant="outlined"
            size="large"
            rounded="lg"
            class="action-btn"
          >
            <v-icon>mdi-selection-drag</v-icon>
          </v-btn>
          </div>
        </v-col>
      </v-row>

    </v-container>
  </v-app-bar>
</template>
<script setup>
import { ref } from 'vue'
const emit = defineEmits(['edit-template', 'add-widget'])
const tabs = ref([
  { id: 1, name: 'Demo' },
  { id: 2, name: 'test' },
  { id: 3, name: 'Add Template' },
])

const activeTabId = ref(1)

function selectTab(id) {
  activeTabId.value = id
}

function editTab(tab) {
  console.log('Edit tab:', tab)
}

function addFromTab(tab) {
  console.log('Add from tab:', tab)
}

</script>
<style scoped>
  .v-app-bar {
  border-bottom: 1px solid #e0e0e0;
}


.tab-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
  background-color: transparent;
  transition: background-color 0.2s ease;
}

.tab-item:hover {
  background-color: #d9e2f8;
}

.tab-active {
  background-color: #c5cae9;
}


.tab-label {
  font-weight: 500;
  color: #000; 
  transition: color 0.2s ease;
}

.tab-active .tab-label {
  color: var(--v-theme-secondary);
}


.tab-icon-btn {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s ease;
}

.tab-item:hover .tab-icon-btn {
  opacity: 1;
  pointer-events: auto;
}

.tab-active .tab-icon-btn {
  opacity: 1;
  pointer-events: auto;
}

.tab-icon-btn:hover {
  background-color: rgba(0, 0, 0, 0.08);
}


.top-icon-btn {
  background-color: #ccd8f0;
  border-radius: 6px;
  width: 32px;
  height: 32px;
}

.action-btn,
.add-template-btn {
  border-color: #0138b6 !important;
  color: #0138b6;
  height: 48px;
  min-width: 48px;
  border-radius: 6px;
}

.add-template-btn {
  padding: 0 16px;
  font-weight: 600;
}

</style>