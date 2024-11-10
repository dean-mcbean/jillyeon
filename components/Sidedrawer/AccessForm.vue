<!-- FormSection.vue -->
<template>
  <v-sheet class="bg-light-grey">
    <v-row>
      <v-col>
        <div class="form-header">
          <a
            href="https://www.urbanintelligence.co.nz/"
            class="ui-logo"
          ><img
            :src="config.public.CLOUDFRONT_URL + 'logos/urbanintelligence/logo-full.png'"
          ></a>
          <div
            class="reset-button"
            @click="resetForm"
          >
            Reset all
          </div>
        </div>
        <div class="form-container">
          <v-col>
            <v-label>Area</v-label>
            <v-select
              variant="outlined"
              density="compact"
              disabled
            />
          </v-col>
          <v-col>
            <v-label>Amenity</v-label>
            <v-select
              v-model="formStore.selectedDestinationType"
              :items="availableDestinationTypeLabels"
              variant="outlined"
              density="compact"
            />
          </v-col>
          <v-col>
            <v-label>Mode</v-label>
            <v-btn-toggle
              v-model="formStore.selectedTransportMode"
              :rounded="false"
              style="gap: 8px"
              color="primary"
              base-color="grey"
              mandatory
              height="44"
            >
              <template
                v-for="item in availableTransportModes"
                :key="item.value"
              >
                <v-btn
                  rounded="pill"
                  :value="item.value"
                  :icon="item.icon"
                  width="40"
                  height="40"
                  :text="item.title"
                />
              </template>
            </v-btn-toggle>
          </v-col>
          <v-col>
            <v-label>Demographic</v-label>
            <v-select
              v-model="formStore.selectedDemographic"
              :items="availableDemographics"
              density="compact"
              variant="outlined"
            />
          </v-col>
          <v-col
            v-if="formStore.selectedTransportMode == 'pt'"
          >
            <v-label>Time of Day</v-label>
            <v-select
              v-model="formStore.selectedTimeOfDay"
              :items="availableTimeOfDay"
              density="compact"
              variant="outlined"
            />
          </v-col>
          <v-col
            v-if="formStore.selectedTransportMode == 'pt'"
          >
            <v-label>Day of Week</v-label>
            <v-select
              v-model="formStore.selectedWeekday"
              :items="availableWeekdays"
              density="compact"
              variant="outlined"
            />
          </v-col>
        </div>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script setup>
const config = useRuntimeConfig()
const formStore = useFormStore()

// Orders options by their order in the labels objects
// Default value is the first available option in these objects
const destinationTypeLabels = {
  supermarket: 'Supermarket',
  park: 'Park',
  school: 'School',
  hospital: 'Hospital',
  restaurant: 'Restaurant',
}

const timeOfDayLabels = {
  morning: 'Morning',
  afternoon: 'Afternoon',
  evening: 'Evening',
}

const transportModeLabels = {
  walking: 'Walking',
  cycling: 'Cycling',
  driving: 'Driving',
  pt: 'Public Transport',
}
const transportModeIcons = {
  walking: 'mdi-walk',
  cycling: 'mdi-bike',
  driving: 'mdi-car',
  pt: 'mdi-bus',
}

const demographicLabels = {
  European: 'European',
  Asian: 'Asian',
  Māori: 'Māori',
  Pacific: 'Pacific',
  Other: 'Other',
}

const weekdayLabels = {
  Monday: 'Monday',
  Tuesday: 'Tuesday',
  Wednesday: 'Wednesday',
  Thursday: 'Thursday',
  Friday: 'Friday',
  Saturday: 'Saturday',
  Sunday: 'Sunday',
}

// Helper function to map available options to labels
const mapToLabels = (available, labels, icons = null) => {
  return Object.entries(labels).flatMap(([key, label]) => {
    if (available.includes(key)) return [{
      title: label || key,
      value: key,
      icon: icons ? icons[key] : null,
    }]
    return []
  })
}

const availableDestinationTypeLabels = computed(() => {
  return mapToLabels(
    formStore.availableDestinationTypes,
    destinationTypeLabels,
  )
})

const availableTimeOfDay = computed(() => {
  return mapToLabels(formStore.availableTimeOfDay, timeOfDayLabels)
})

const availableTransportModes = computed(() => {
  return mapToLabels(formStore.availableTransportModes, transportModeLabels, transportModeIcons)
})

const availableDemographics = computed(() => {
  return mapToLabels(formStore.availableDemographics, demographicLabels)
})

const availableWeekdays = computed(() => {
  return mapToLabels(formStore.availableWeekdays, weekdayLabels)
})

onMounted(async () => {
  await nextTick()

  // Initialize the form
  await formStore.fetchFormOptions()

  // Set default values
  formStore.selectedDestinationType = Object.keys(destinationTypeLabels)[0]
  formStore.selectedTransportMode = Object.keys(transportModeLabels)[0]
  formStore.selectedTimeOfDay = Object.keys(timeOfDayLabels)[0]
  formStore.selectedTransportMode = Object.keys(transportModeLabels)[0]
  formStore.selectedDemographic = Object.keys(demographicLabels)[0]
  formStore.selectedWeekday = Object.keys(weekdayLabels)[0]
})

const resetForm = () => {
  formStore.selectedDestinationType = Object.keys(destinationTypeLabels)[0]
  formStore.selectedTransportMode = Object.keys(transportModeLabels)[0]
  formStore.selectedTimeOfDay = Object.keys(timeOfDayLabels)[0]
  formStore.selectedTransportMode = Object.keys(transportModeLabels)[0]
  formStore.selectedDemographic = Object.keys(demographicLabels)[0]
  formStore.selectedWeekday = Object.keys(weekdayLabels)[0]
}
</script>

<style lang="scss" scoped>
.v-sheet {
  box-shadow: 0px -2px 4px 4px rgba(0, 0, 0, 0.25);
  z-index: 100;

  >.v-row {
    padding-bottom: 0;

    >.v-col {
      padding: 12px 16px 8px 16px;
    }
  }
}
.v-row {
  padding: 16px;
}
.ui-logo {
  height: 40px;

  img {
    flex-grow: 0;
    width: auto;
    height: 40px;
  }
}
.form-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0px 24px;

  & > .v-col {
    flex: 1 1 160px;
    padding: 0;
  }
}
.form-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: 16px;
}
.v-label {
  color: #2D3648;
  font-feature-settings: 'calt' off;
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px; /* 106.667% */
  letter-spacing: -0.15px;
  opacity: 1;
}
</style>

<style lang="scss">
.v-select .v-field__overlay {
  background-color: rgb(var(--v-theme-background));
}
.v-btn-group .v-btn {
  --v-activated-opacity: 0 !important;
}
.v-field .v-field__outline {
  color: rgb(var(--v-theme-primary)) !important;
  --v-field-border-opacity: 1;
}
.v-field {
  font-size: 14px !important;
  color: rgb(var(--v-theme-primary));
}
.reset-button {
  color: rgb(var(--v-theme-primary));
  font-size: 14px;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: -0.15px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
}
</style>
