<script setup lang="ts">
import { onMounted } from 'vue'
import { useCoffeStore } from '@/stores/coffe'
import { storeToRefs } from 'pinia'
import { Objectify } from "@/utils"

const store = useCoffeStore()
const { coffeMachines, counts } = storeToRefs(store)

onMounted(() => {
  store.getCoffemachines()
})
</script>

<template>
  <main>
    <section class="tw-flex tw-gap-4" v-if="coffeMachines.length > 0">
      <div v-for="(cmItem, index) in coffeMachines" :key="index">
        <v-card v-if="coffeMachines" class="mx-auto" max-width="400">
          <v-img :src="cmItem.image" height="200px" cover></v-img>

          <v-card-title>{{ cmItem.title }}</v-card-title>

          <v-card-subtitle>Кол-во напитков: {{ cmItem.drinksCount }}</v-card-subtitle>

          <v-card-actions>
            <div class="tw-flex tw-justify-between tw-w-full">
              <div class="tw-flex tw-items-center tw-gap-x-2">
                <v-btn color="green" variant="outlined" @click="store.decCount(cmItem.id)">-</v-btn>
                <span>{{ Objectify(counts).find((value) => value.id === cmItem.id).count }}</span>
                <v-btn color="green" variant="outlined" @click="store.incCount(cmItem.id)">+</v-btn>
              </div>
              <div>
                <v-btn color="red" variant="text" @click="store.removeCoffemachine(cmItem.id)"> Удалить </v-btn>
              </div>
            </div>
          </v-card-actions>
        </v-card>
      </div>
    </section>
    <h2 v-else>Список пуст</h2>
  </main>
</template>
