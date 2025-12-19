<template>
  <v-dialog v-model="dialogModel" max-width="800px" persistent>
    <v-card>
      <!-- Header -->
      <v-card-title class="dialog-header d-flex justify-space-between align-center">
        <span class="text-h6 font-weight-regular">EDIT TEMPLATE</span>
        <v-btn
          icon
          variant="text"
          @click="closeDialog"
          size="small"
          color="white"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="pa-8">
        <!-- Template Name -->
        <div class="mb-4">
          <label class="text-subtitle-1 font-weight-bold mb-2 d-block">
            Template Name<span class="text-error">*</span>
          </label>
          <v-text-field
            v-model="templateName"
            variant="solo"
            flat
            hide-details
            bg-color="#F5F5F7"
            density="comfortable"
            class="custom-text-field"
          />
        </div>

        <!-- Widget Count -->
        <div class="mb-8">
          <span class="text-body-1">Includes {{ widgetCount }} Widgets</span>
        </div>

        <!-- Action Buttons -->
        <div class="d-flex justify-space-between align-center mb-8">
          <v-btn
            variant="outlined"
            color="#0138b6"
            prepend-icon="mdi-delete-outline"
            @click="deleteTemplate"
            class="text-none"
          >
            Delete Template
          </v-btn>

          <div class="d-flex gap-3">
            <v-btn
              variant="text"
              color="#0138b6"
              @click="closeDialog"
              class="text-none"
            >
              Cancel
            </v-btn>
            <v-btn
              color="#0138b6"
              @click="saveTemplate"
              class="text-none"
            >
              Save
            </v-btn>
          </div>
        </div>

        <!-- Divider -->
        <v-divider class="mb-8"></v-divider>

        <!-- Share This Template -->
        <div class="d-flex justify-space-between align-center">
          <div class="d-flex align-center gap-3">
            <v-icon size="24" color="black">mdi-account</v-icon>
            <span class="text-body-1 font-weight-medium">Share This Template</span>
          </div>
          <v-switch
            v-model="shareTemplate"
            color="#0138b6"
            hide-details
            density="compact"
            inset
          />
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  templateName: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'save', 'delete'])

// Local state
const dialogModel = ref(false)
const templateName = ref('')
const widgetCount = ref(6)
const shareTemplate = ref(false)

// Watch for prop changes
watch(() => props.modelValue, (val) => {
  dialogModel.value = val
})

watch(() => props.templateName, (val) => {
  templateName.value = val
})

// Watch local dialog state and emit changes
watch(dialogModel, (val) => {
  emit('update:modelValue', val)
})

// Actions
const deleteTemplate = () => {
  emit('delete')
  closeDialog()
}

const saveTemplate = () => {
  emit('save', {
    name: templateName.value,
    widgets: widgetCount.value,
    shared: shareTemplate.value
  })
  closeDialog()
}

const closeDialog = () => {
  dialogModel.value = false
}
</script>

<style scoped>
.dialog-header {
  background-color: #0138b6;
  color: white;
  padding: 16px 24px;
}

.custom-text-field :deep(.v-field) {
  border-radius: 8px;
}

.gap-3 {
  gap: 12px;
}
</style>