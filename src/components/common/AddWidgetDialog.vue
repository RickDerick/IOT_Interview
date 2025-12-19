<template>
  <div v-if="dialogModel" class="dialog-wrapper">
    <div class="dialog-backdrop" @click="closeDialog"></div>
    <div class="dialog-container">
      <v-card class="dialog-card">
        <!-- Header -->
        <v-card-title class="dialog-header d-flex align-center justify-space-between">
          <span class="text-h6 font-weight-regular">ADD WIDGET</span>
          <v-btn
            icon
            variant="text"
            size="small"
            @click="closeDialog"
          >
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <!-- Widget Grid -->
        <v-card-text class="pa-6">
          <v-row>
            <v-col
              v-for="widget in widgets"
              :key="widget.id"
              cols="12"
              sm="6"
              md="4"
            >
              <v-card
                class="widget-card pa-4"
                variant="flat"
                @click="selectWidget(widget)"
              >
                <div class="d-flex align-start">
                  <v-icon :icon="widget.icon" size="24" class="mr-3 mt-1" />
                  <div>
                    <div class="text-subtitle-1 font-weight-medium mb-1">
                      {{ widget.name }}
                    </div>
                    <div class="text-body-2 text-medium-emphasis">
                      {{ widget.description }}
                    </div>
                  </div>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>

        <!-- Footer -->
        <v-card-actions class="pa-6 pt-0">
          <v-spacer />
          <v-btn
            color="#0138b6"
            variant="flat"
            @click="handleNext"
          >
            Next
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'widget-selected'])

// Local state
const dialogModel = ref(false)
const selectedWidget = ref(null)

const widgets = ref([
  {
    id: 'value',
    name: 'Value',
    icon: 'mdi-numeric-1-box-outline',
    description: 'Display numerical values of assets'
  },
  {
    id: 'map',
    name: 'Map',
    icon: 'mdi-map-marker-outline',
    description: 'Point assets on a satellite map or a layout image'
  },
  {
    id: 'line-chart',
    name: 'Line Chart',
    icon: 'mdi-chart-line',
    description: 'Display data on a line graph'
  },
  {
    id: 'gauge',
    name: 'Gauge',
    icon: 'mdi-gauge',
    description: 'Display data on a relative scale'
  },
  {
    id: 'text',
    name: 'Text',
    icon: 'mdi-format-text',
    description: 'Add and display your notes on your dashboard'
  },
  {
    id: 'bar-chart',
    name: 'Bar Chart',
    icon: 'mdi-chart-bar',
    description: 'Display data on a bar graph'
  },
  {
    id: 'image',
    name: 'Image',
    icon: 'mdi-image-outline',
    description: 'Set an image on your dashboard'
  },
  {
    id: 'intensity',
    name: 'Intensity',
    icon: 'mdi-grid',
    description: 'Display patterned data'
  },
  {
    id: 'line-bar-chart',
    name: 'Line - Bar Chart',
    icon: 'mdi-chart-bar-stacked',
    description: 'Display data on a line-bar graph'
  },
  {
    id: 'notification',
    name: 'Notification',
    icon: 'mdi-bell-outline',
    description: 'Display notifications of alerts for assets'
  },
  {
    id: 'table',
    name: 'Table',
    icon: 'mdi-table',
    description: 'Display asset details'
  },
  {
    id: 'pie-chart',
    name: 'Pie Chart',
    icon: 'mdi-chart-pie',
    description: 'Display relative sizes of data on a circular graph'
  },
  {
    id: 'sankey',
    name: 'Sankey Diagram',
    icon: 'mdi-chart-sankey',
    description: 'Analyze flows and relations of an assets'
  },
  {
    id: 'scatter-chart',
    name: 'Scatter Chart',
    icon: 'mdi-chart-scatter-plot',
    description: 'Visualize the distribution and correlation between two variables using a scatter plot'
  }
])

// Watch for prop changes
watch(() => props.modelValue, (val) => {
  dialogModel.value = val
  if (val) {
    document.body.classList.add('dialog-open')
  } else {
    document.body.classList.remove('dialog-open')
  }
})

// Watch local dialog state and emit changes
watch(dialogModel, (val) => {
  emit('update:modelValue', val)
  if (!val) {
    document.body.classList.remove('dialog-open')
  }
})

const selectWidget = (widget) => {
  // Deselect if already selected
  if (selectedWidget.value && selectedWidget.value.id === widget.id) {
    selectedWidget.value = null
  } else {
    selectedWidget.value = widget
  }
  
  // Visual feedback for selection
  document.querySelectorAll('.widget-card').forEach(card => {
    card.classList.remove('selected')
  })
  
  // Highlight selected widget
  const widgetElements = document.querySelectorAll('.widget-card')
  widgets.value.forEach((w, index) => {
    if (w.id === widget.id) {
      widgetElements[index]?.classList.add('selected')
    }
  })
}

const handleNext = () => {
  if (selectedWidget.value) {
    emit('widget-selected', selectedWidget.value)
  }
  closeDialog()
}

const closeDialog = () => {
  dialogModel.value = false
  selectedWidget.value = null
  // Remove selection highlights
  document.querySelectorAll('.widget-card').forEach(card => {
    card.classList.remove('selected')
  })
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
  max-width: 1200px;
  margin: auto 0;
  position: relative;
  z-index: 1;
}

.dialog-header {
  background-color: #0138b6;
  color: white;
  padding: 16px 24px;
}

.widget-card {
  background-color: #f5f5f7;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  height: 100%;
  border: 2px solid transparent;
}

.widget-card:hover {
  background-color: #e8e8eb;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.widget-card.selected {
  border-color: #0138b6;
  background-color: #e8f0ff;
  box-shadow: 0 4px 12px rgba(1, 56, 182, 0.2);
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
</style>