<template>
  <div v-if="modelValue" class="dialog-wrapper">
    <div class="dialog-backdrop" @click="closeDialog"></div>
    <div class="dialog-container">
      <v-card class="dialog-card">
        <!-- Header -->
        <v-toolbar :color="primaryColor" dark>
          <v-toolbar-title>{{ getDialogTitle }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-card-text class="pt-6">
          <!-- Live Data Toggle -->
          <div class="d-flex align-center mb-6">
            <v-switch
              v-model="formData.liveData"
              :color="primaryColor"
              hide-details
              density="compact"
              class="me-2"
            ></v-switch>
            <span class="me-2">Live Data</span>
            <v-icon size="small" color="grey">mdi-information-outline</v-icon>
          </div>

          <!-- Widget Name -->
          <div class="mb-6">
            <label class="text-subtitle-2 font-weight-bold mb-2 d-block">
              Widget Name*
            </label>
            <v-text-field
              v-model="formData.widgetName"
              variant="solo"
              flat
              bg-color="#f5f5f5"
              density="comfortable"
              hide-details
            ></v-text-field>
          </div>

          <!-- Assets -->
          <div class="mb-6">
            <div class="d-flex justify-space-between align-center mb-2">
              <label class="text-subtitle-2 font-weight-bold">Assets*</label>
              <span class="text-caption text-grey">{{ formData.selectedAssets.length }}/117 tags</span>
            </div>
            <v-select
              v-model="formData.selectedAssets"
              :items="assetOptions"
              placeholder="Select asset"
              variant="solo"
              flat
              bg-color="#f5f5f5"
              density="comfortable"
              multiple
              hide-details
            >
              <template v-slot:selection="{ item, index }">
                <v-chip
                  v-if="index < 2"
                  closable
                  @click:close="removeAsset(item.value)"
                  :color="chipColor"
                  size="small"
                  class="me-2"
                >
                  {{ item.title }}
                </v-chip>
              </template>
            </v-select>
          </div>

          <!-- Fields and Units -->
          <div class="mb-6">
            <div class="d-flex justify-space-between align-center mb-2">
              <label class="text-subtitle-2 font-weight-bold">Fields and Units*</label>
              <span class="text-caption text-grey">{{ formData.selectedFields.length }}/1 tags</span>
            </div>
            <v-select
              v-model="formData.selectedFields"
              :items="fieldOptions"
              placeholder="Select Fields and Units"
              variant="solo"
              flat
              bg-color="#f5f5f5"
              density="comfortable"
              multiple
              hide-details
            >
              <template v-slot:selection="{ item }">
                <v-chip
                  closable
                  @click:close="removeField(item.value)"
                  :color="chipColor"
                  size="small"
                  class="me-2"
                >
                  {{ item.title }}
                </v-chip>
                <span class="text-caption ms-2">bool</span>
              </template>
            </v-select>
          </div>

          <!-- Time Frame -->
          <div class="mb-4">
            <label class="text-subtitle-2 font-weight-bold mb-2 d-block">
              Time Frame*
            </label>
            <v-select
              v-model="formData.timeFrame"
              :items="timeFrameOptions"
              variant="solo"
              flat
              bg-color="#f5f5f5"
              density="comfortable"
              hide-details
              clearable
            ></v-select>
          </div>
        </v-card-text>

        <!-- Footer Actions -->
        <v-card-actions class="px-6 pb-6">
          <v-btn
            v-if="action === 'delete'"
            variant="outlined"
            :color="primaryColor"
            @click="handleDelete"
          >
            Delete
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            variant="text"
            :color="primaryColor"
            @click="closeDialog"
          >
            Cancel
          </v-btn>
          <v-btn
            :color="primaryColor"
            variant="flat"
            @click="saveDialog"
          >
            {{ getSaveButtonText }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  card: {
    type: Object,
    default: () => ({})
  },
  action: {
    type: String,
    default: 'edit'
  }
})

const emit = defineEmits(['update:modelValue', 'save', 'close', 'delete'])

const primaryColor = '#0138b6'
const chipColor = '#b3d9ff'

const formData = ref({
  liveData: true,
  widgetName: '',
  selectedAssets: [],
  selectedFields: [],
  timeFrame: ''
})

const assetOptions = [
  { title: 'Incident Occurence', value: 'incident' },
  { title: 'Temperature Sensor', value: 'temp' },
  { title: 'Pressure Gauge', value: 'pressure' },
  { title: 'Flow Meter', value: 'flow' },
  { title: 'Level Indicator', value: 'level' }
]

const fieldOptions = [
  { title: 'Button', value: 'button' },
  { title: 'Slider', value: 'slider' },
  { title: 'Toggle', value: 'toggle' },
  { title: 'Input', value: 'input' }
]

const timeFrameOptions = [
  'Last 24 hours',
  'Last 7 days',
  'Last 30 days',
  'Last 90 days',
  'Custom Range'
]

// Computed properties
const getDialogTitle = computed(() => {
  const titles = {
    edit: 'EDIT WIDGET',
    duplicate: 'DUPLICATE WIDGET',
    delete: 'DELETE WIDGET'
  }
  return titles[props.action] || 'WIDGET SETTINGS'
})

const getSaveButtonText = computed(() => {
  const texts = {
    edit: 'Save',
    duplicate: 'Duplicate',
    delete: 'Confirm Delete'
  }
  return texts[props.action] || 'Save'
})

// Watch for card prop changes to update form
watch(() => props.card, (newCard) => {
  if (newCard) {
    formData.value = {
      liveData: true,
      widgetName: newCard.title || '',
      selectedAssets: ['Incident Occurence'],
      selectedFields: ['Button'],
      timeFrame: 'Last 24 hours'
    }
  }
}, { immediate: true })

// Methods
const removeAsset = (asset) => {
  formData.value.selectedAssets = formData.value.selectedAssets.filter(a => a !== asset)
}

const removeField = (field) => {
  formData.value.selectedFields = formData.value.selectedFields.filter(f => f !== field)
}

const closeDialog = () => {
  emit('update:modelValue', false)
  emit('close')
}

const saveDialog = () => {
  emit('save', formData.value)
  closeDialog()
}

const handleDelete = () => {
  emit('delete', props.card)
  closeDialog()
}
</script>

<style scoped>
.dialog-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
}

.dialog-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.dialog-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 48px 20px;
  overflow-y: auto;
}

.dialog-card {
  width: 100%;
  max-width: 700px;
  margin: auto 0;
  position: relative;
  z-index: 1;
}

/* For small screens */
@media (max-width: 600px) {
  .dialog-container {
    padding: 0;
    align-items: stretch;
  }
  
  .dialog-card {
    margin: 0;
    max-width: 100%;
    min-height: 100vh;
    border-radius: 0;
  }
}

/* Prevent body scroll when dialog is open */
body.dialog-open {
  overflow: hidden;
}

.v-toolbar-title {
  font-weight: 500;
  font-size: 1rem;
}
</style>

<script>
// Add body class when dialog opens
import { watch } from 'vue'

export default {
  watch: {
    modelValue(newVal) {
      if (newVal) {
        document.body.classList.add('dialog-open')
      } else {
        document.body.classList.remove('dialog-open')
      }
    }
  }
}
</script>