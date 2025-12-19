<template>
  <v-row dense>
    <v-col
      v-for="card in cards"
      :key="card.id"
      cols="12"
      md="4"
    >
      <v-card elevation="3" rounded="lg" class="card-wrapper">
        <v-card-title class="bg-primary text-white d-flex justify-space-between align-center">
          <span>{{ card.title }}</span>
          <v-btn
            icon
            variant="text"
            size="small"
            class="card-icon-btn"
            rounded="lg"
            @click="handleCardClick(card)"
          >
            <v-icon>mdi-dots-horizontal</v-icon>
          </v-btn>
        </v-card-title>
        
        <v-card-text class="card-content">
          <!-- Map container with padding and rounded corners -->
          <div class="map-container-wrapper">
            <MapDisplay 
              :locations="mapLocations" 
              :center="mapCenter"
              :zoom="mapZoom"
              class="embedded-map"
              @marker-click="handleMarkerClick"
            />
          </div>
        </v-card-text>
      </v-card>
    </v-col>

    <!-- Card Dialog -->
    <CardDialog
      v-model="showDialog"
      :card="selectedCard"
      :action="selectedAction"
      @close="handleDialogClose"
    />
  </v-row>
</template>

<script setup>
import { ref } from 'vue'
import CardDialog from '@/components/common/CardDialog.vue'
import MapDisplay from '@/components/common/MapDisplay.vue'

const cards = ref([
  { id: 1, title: 'Test Sankey' },
  { id: 2, title: 'Test Widget' },
  { id: 3, title: 'Test Bar' }
])

// Map data - same for all cards
const mapLocations = ref([
  {
    lat: 51.505,
    lng: -0.09,
    title: 'Location 1',
    popupContent: '<strong>Location 1</strong><br>Description here'
  },
  {
    lat: 51.51,
    lng: -0.1,
    title: 'Location 2',
    popupContent: '<strong>Location 2</strong><br>Another description'
  },
  {
    lat: 51.49,
    lng: -0.08,
    title: 'Location 3'
  }
])

const mapCenter = ref([51.505, -0.09])
const mapZoom = ref(13)

function handleMarkerClick(location) {
  console.log('Marker clicked:', location)
  // Handle marker click if needed
}

// Dialog state
const showDialog = ref(false)
const selectedCard = ref(null)
const selectedAction = ref('')

function handleCardClick(card) {
  selectedCard.value = card
  showDialog.value = true
}

function handleDialogClose() {
  selectedCard.value = null
  selectedAction.value = ''
}
</script>

<style scoped>
.card-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 450px; /* Slightly taller for better proportions */
}

.card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 16px; /* Add padding around the map container */
  background-color: #f8f9fa; /* Light background for contrast */
}

.map-container-wrapper {
  flex: 1;
  display: flex;
  background-color: white;
  border-radius: 12px; /* Rounded corners for the map container */
  overflow: hidden; /* Ensure map stays within rounded corners */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08); /* Subtle shadow for depth */
  border: 1px solid #e0e0e0; /* Light border around map */
  transition: all 0.3s ease;
}

.map-container-wrapper:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  transform: translateY(-1px);
}

.embedded-map {
  flex: 1;
  width: 100%;
  border-radius: 12px; /* Match container rounding */
}

.card-icon-btn {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  width: 32px;
  height: 32px;
  transition: background-color 0.2s ease;
  cursor: pointer;
}

.card-icon-btn:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

/* Ensure consistent card heights */
.v-col {
  display: flex;
}

.v-card {
  width: 100%;
}
</style>