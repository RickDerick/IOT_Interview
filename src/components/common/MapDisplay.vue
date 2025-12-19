<template>
  <div class="map-container">
    <div ref="mapContainer" class="leaflet-map"></div>
    <div v-if="loading" class="map-loading">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Import marker images
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

const props = defineProps({
  locations: {
    type: Array,
    default: () => []
  },
  center: {
    type: Array,
    default: () => [51.505, -0.09]
  },
  zoom: {
    type: Number,
    default: 13
  }
})

const mapContainer = ref(null)
const map = ref(null)
const markers = ref([])
const loading = ref(true)

// Fix Leaflet icon issue
onMounted(() => {
  // Fix for default marker icons
  delete L.Icon.Default.prototype._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
  })
  
  // Initialize map
  initMap()
})

const initMap = () => {
  if (mapContainer.value) {
    map.value = L.map(mapContainer.value).setView(props.center, props.zoom)
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(map.value)
    
    loading.value = false
    
    // Add initial markers if locations provided
    if (props.locations.length > 0) {
      addMarkers(props.locations)
    }
  }
}

// Function to add markers
const addMarkers = (locations) => {
  // Clear existing markers
  clearMarkers()
  
  locations.forEach(location => {
    if (location.lat && location.lng) {
      const marker = L.marker([location.lat, location.lng])
        .addTo(map.value)
        .bindPopup(location.title || 'Location')
      
      if (location.popupContent) {
        marker.bindPopup(location.popupContent)
      }
      
      markers.value.push(marker)
    }
  })
  
  // Fit bounds if multiple markers
  if (locations.length > 1) {
    const group = L.featureGroup(markers.value)
    map.value.fitBounds(group.getBounds().pad(0.1))
  } else if (locations.length === 1) {
    map.value.setView([locations[0].lat, locations[0].lng], props.zoom)
  }
}

// Clear all markers
const clearMarkers = () => {
  markers.value.forEach(marker => {
    marker.remove()
  })
  markers.value = []
}

// Watch for location changes
watch(() => props.locations, (newLocations) => {
  if (map.value && newLocations) {
    addMarkers(newLocations)
  }
}, { deep: true })

// Cleanup
onBeforeUnmount(() => {
  if (map.value) {
    map.value.remove()
  }
})
</script>

<style scoped>
.map-container {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 400px;
}

.leaflet-map {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  z-index: 1;
}

.map-loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}
</style>