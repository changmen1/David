<template>
  <v-footer height="40" app>
    <a v-for="item in items" :key="item.title" :href="item.href" :title="item.title"
      class="d-inline-block mx-2 social-link" rel="noopener noreferrer" target="_blank">
      <v-icon :icon="item.icon" :size="item.icon === '$vuetify' ? 24 : 16" />
    </a>
    <!-- David-zxl版权所有© WX <zxl1907395787> -->
    <div class="text-caption text-disabled" style="position: absolute; right: 16px;">
      &copy; 2024-{{ (new Date()).getFullYear() }} <span class="d-none d-sm-inline-block">David-ZXL</span>
    </div>
  </v-footer>
</template>

<script setup>
import { ref } from 'vue';
const items = ref([
  {
    title: 'Vuetify Documentation',
    icon: `$vuetify`,
    href: 'https://www.nbdavid.com/',
  },
])
</script>

<style scoped lang="sass">
  .social-link :deep(.v-icon)
    color: rgba(var(--v-theme-on-background), var(--v-disabled-opacity))
    text-decoration: none
    transition: .2s ease-in-out

    &:hover
      color: rgba(25, 118, 210, 1)
</style>
