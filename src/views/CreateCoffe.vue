<script setup lang="ts">
import { $host } from '@/http'
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

const options = reactive({
  title: '',
  image: 'http://localhost:7000/type1.jpg',
  size: {
    select: 'small',
    items: [
      { name: 'Малая', value: 'small' },
      { name: 'Большая', value: 'middle' },
      { name: 'Средняя', value: 'large' }
    ]
  },
  drinksCount: {
    select: 6,
    items: [6, 8, 12]
  }
})

const rules = {
    title: { required }
}

const v$ = useVuelidate(rules, options)

function changeImg(value: string) {
  switch (value) {
    case 'small':
      options.image = 'http://localhost:7000/type1.jpg'
      break
    case 'middle':
      options.image = 'http://localhost:7000/type2.jpg'
      break
    case 'large':
      options.image = 'http://localhost:7000/type3.jpg'
      break
    default:
      break
  }
}

async function create() {
  const prepareData = {
    title: options.title,
    image: options.image,
    size: options.size.select,
    drinksCount: options.drinksCount.select
  }

  await $host.post('/coffemachines', prepareData)
}

function clear() {
  v$.value.$reset()
  options.title = ''
}
</script>

<template>
  <section class="tw-flex">
    <form @submit.prevent="create" class="tw-w-[600px]">
      <section class="tw-flex">
        <div class="tw-flex-1">
          <v-text-field v-model="options.title" label="Название"></v-text-field>

          <v-select
            v-model="options.size.select"
            :items="options.size.items"
            item-title="name"
            item-value="value"
            label="Размер"
            single-line
            v-on:update:model-value="changeImg(options.size.select)"
          ></v-select>
        </div>

        <img :src="options.image" class="tw-w-[200px] tw-h-[200px]" />
      </section>

      <v-select
        v-model="options.drinksCount.select"
        :items="options.drinksCount.items"
        label="Кол-во напитков"
      ></v-select>

      <v-btn class="me-4" color="blue" variant="outlined" type="submit">
        Добавить в хранилище
      </v-btn>

      <v-btn color="red" variant="flat" @click="clear"> Очистить </v-btn>
    </form>
  </section>
</template>
