<template>
  <v-sheet class="px-2 pt-2">
    <v-row>
      <v-col class="text-h4">
        Access for all of New Zealand
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-subtitle-1">
        The <b>{{ formStore.selectedDemographic }}</b> demographic's access to the nearest <b>{{ formStore.selectedDestinationType }}</b> by <b>{{ formStore.selectedTransportMode }}</b>{{
          formStore.selectedTransportMode === 'pt'
            ? ` (on ${formStore.selectedWeekday} ${formStore.selectedTimeOfDay})`
            : ''
        }}
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script lang="ts" setup>
const formStore = useFormStore()
</script>

<style scoped>

</style>
