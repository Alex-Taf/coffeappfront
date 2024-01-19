<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="tw-mb-10">
    <div class="wrapper">
      <nav class="tw-flex tw-gap-4">
        <RouterLink to="/"><span class="tw-text-blue-400 tw-text-xl hover:tw-text-blue-200">Машинки</span></RouterLink>
        <RouterLink to="/about"><span class="tw-text-blue-400 tw-text-xl hover:tw-text-blue-200">Создать машинку</span></RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
