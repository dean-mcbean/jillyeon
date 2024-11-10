import { defineStore } from 'pinia'

type OptionCombination = {
  transport_mode: string
  destination_type: string
  demographic: string
  weekday: string
  time: string
}

export const useFormStore = defineStore({
  id: 'formStore',
  state: () => ({
    selectedTransportMode: '',
    selectedDestinationType: '',
    selectedDemographic: '',
    selectedWeekday: '',
    selectedTimeOfDay: '',
    availableTransportModes: [] as string[],
    availableDestinationTypes: [] as string[],
    availableDemographics: [] as string[],
    availableWeekdays: [] as string[],
    availableTimeOfDay: [] as string[],
  }),
  actions: {
    setSelectedTransportMode(transportMode: string) {
      this.selectedTransportMode = transportMode
    },
    setSelectedDestinationType(destinationType: string) {
      this.selectedDestinationType = destinationType
    },
    setSelectedDemographic(demographic: string) {
      this.selectedDemographic = demographic
    },
    setSelectedWeekday(weekday: string) {
      this.selectedWeekday = weekday
    },
    setSelectedTimeOfDay(timeOfDay: string) {
      this.selectedTimeOfDay = timeOfDay
    },
    async fetchFormOptions() {
      const config = useRuntimeConfig()
      console.log(config)
      const response = await fetch(`${config.public.BASE_API_URL}/access/form_values`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
      const data = await response.json() as OptionCombination[]
      this.availableTransportModes = Array.from(new Set(data.map(d => d.transport_mode))).filter(Boolean)
      this.availableDestinationTypes = Array.from(new Set(data.map(d => d.destination_type))).filter(Boolean)
      this.availableDemographics = Array.from(new Set(data.map(d => d.demographic))).filter(Boolean)
      this.availableWeekdays = Array.from(new Set(data.map(d => d.weekday))).filter(Boolean)
      this.availableTimeOfDay = Array.from(new Set(data.map(d => d.time))).filter(Boolean)

      this.selectedTransportMode = this.availableTransportModes[0]
      this.selectedDestinationType = this.availableDestinationTypes[0]
      this.selectedDemographic = this.availableDemographics[0]
      this.selectedWeekday = this.availableWeekdays[0]
      this.selectedTimeOfDay = this.availableTimeOfDay[0]
    },
  },
})
