import { defineStore } from 'pinia'
import { $host } from '@/http'
import { Objectify } from '@/utils'

export const useCoffeStore = defineStore('coffe', {
  state: () => ({
    coffeMachinesArr: [],
    countsArr: []
  }),
  getters: {
    coffeMachines: (state) => state.coffeMachinesArr,
    counts: (state) => state.countsArr,
  },
  actions: {
    async getCoffemachines() {
      const result = await $host.get('/coffemachines')
      this.coffeMachinesArr = result.data.map((value) => value)

      if (!localStorage.getItem('counts')) {
        const counts = result.data.map((value) => {
          return {
            id: value.id,
            count: 0
          }
        })

        localStorage.setItem('counts', JSON.stringify(counts))

        this.countsArr = counts
      } else {
        const counts = JSON.parse(localStorage.getItem('counts'))
        result.data.forEach((value) => {
          if (!counts.find((finded) => finded.id === value.id)) {
            counts.push({
              id: value.id,
              count: 0
            })
          }
        })

        this.countsArr = counts
      }
    },
    async removeCoffemachine(id: number) {
      const result = await $host.delete(`/coffemachines/${id}`)

      const filteredMachines = this.coffeMachinesArr.filter((value) => value.id !== id)
      this.coffeMachinesArr = filteredMachines

      const filteredCounts = this.countsArr.filter((value) => value.id !== id)
      this.countsArr = filteredCounts

      localStorage.removeItem('counts')
      localStorage.setItem('counts', JSON.stringify(Objectify(filtered)))
    },
    incCount(id: number) {
      this.countsArr.find((value) => value.id === id).count++
      localStorage.removeItem('counts')
      localStorage.setItem('counts', JSON.stringify(Objectify(this.countsArr)))
    },
    decCount(id: number) {
      if (this.countsArr.find((value) => value.id === id).count > 0) {
        this.countsArr.find((value) => value.id === id).count--
        localStorage.removeItem('counts')
        localStorage.setItem('counts', JSON.stringify(Objectify(this.countsArr)))
      }
    },
  }
})
