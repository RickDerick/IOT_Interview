<template>
  <v-dialog v-model="dialog" max-width="900px" persistent>
    <v-card class="add-template-dialog">
      <!-- Header -->
      <v-card-title class="dialog-header d-flex align-center justify-space-between">
        <span class="text-h6 font-weight-regular">ADD TEMPLATE</span>
        <v-btn icon variant="text" @click="closeDialog" color="white">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <!-- Content -->
      <v-card-text class="pa-8">
        <div class="mb-4">
          <label class="text-subtitle-1 font-weight-bold mb-2 d-block">
            Template Name*
          </label>
          <v-text-field
            v-model="templateName"
            placeholder="Enter template name"
            variant="solo"
            flat
            bg-color="grey-lighten-4"
            hide-details
            density="comfortable"
            class="custom-text-field"
          />
        </div>
      </v-card-text>

      <!-- Footer -->
      <v-card-actions class="px-8 pb-6 justify-end">
        <v-btn
          variant="text"
          color="#0138b6"
          @click="closeDialog"
          class="text-none font-weight-medium"
        >
          Cancel
        </v-btn>
        <v-btn
          color="#0138b6"
          variant="flat"
          @click="createTemplate"
          :disabled="!templateName.trim()"
          class="text-none font-weight-medium px-8"
        >
          Create
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const dialog = ref(false)
const templateName = ref('')

const openDialog = () => {
  dialog.value = true
}

const closeDialog = () => {
  dialog.value = false
  templateName.value = ''
}

const createTemplate = () => {
  if (templateName.value.trim()) {
    console.log('Creating template:', templateName.value)
    // Handle template creation logic here
    closeDialog()
  }
}

defineExpose({
  openDialog
})
</script>

<style scoped>
.dialog-header {
  background-color: #0138b6;
  color: white;
  padding: 16px 24px;
}

.custom-text-field :deep(.v-field) {
  border-radius: 4px;
  font-size: 15px;
}

.custom-text-field :deep(.v-field__input) {
  padding: 20px 16px;
  min-height: 56px;
}

.custom-text-field :deep(input::placeholder) {
  color: #bbb;
  opacity: 1;
}
</style>
