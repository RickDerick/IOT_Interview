<template>
  <v-app>
    <Sidebar />
    <AppBar 
    @edit-template="openEditTemplateDialog"
    @add-widget="openAddWidgetDialog" 
    @add-template="openAddTemplateDialog"
    />

    <v-main>
      <div class="content-wrapper">
        <router-view />
        <EditTemplateDialog 
          v-model="showEditTemplateDialog" 
          :template-name="selectedTemplateName"
          @save="handleSaveTemplate"
          @delete="handleDeleteTemplate"
        />
        
        <AddWidgetDialog 
          v-model="showAddWidgetDialog" 
          @widget-selected="handleWidgetSelected"
        />
        <AddTemplate ref="addTemplateDialogRef" />
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
import Sidebar from '@/components/layout/Sidebar.vue'
import AppBar from '@/components/layout/AppBar.vue'
import EditTemplateDialog from '@/components/common/EditTemplateDialog.vue'
import AddWidgetDialog from '@/components/common/AddWidgetDialog.vue'
import AddTemplate from '@/components/common/AddTemplate.vue'
import { ref } from 'vue'

const showEditTemplateDialog = ref(false)
const showAddWidgetDialog = ref(false)
const selectedTemplateName = ref('')
const addTemplateDialogRef = ref(null)

// Open dialogs from AppBar events
const openEditTemplateDialog = (templateName = '') => {
  selectedTemplateName.value = templateName
  showEditTemplateDialog.value = true
}

const openAddWidgetDialog = () => {
  showAddWidgetDialog.value = true
}

// Handle dialog actions
const handleSaveTemplate = (data) => {
  console.log('Save template:', data)
  // Implement save logic
}

const openAddTemplateDialog = () => {
  if (addTemplateDialogRef.value) {
    addTemplateDialogRef.value.openDialog()
  }
}

const handleDeleteTemplate = () => {
  console.log('Delete template')
  // Implement delete logic
}

const handleWidgetSelected = (widget) => {
  console.log('Widget selected:', widget)
  // Implement widget addition logic
}
</script>

<style scoped>
.content-wrapper {
  padding: 24px;
  height: calc(100vh - 120px);
  overflow-y: auto;
}
</style>