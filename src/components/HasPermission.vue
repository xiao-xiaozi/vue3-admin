<script setup>
import { useUserStore } from '@/stores/user';

const { code } = defineProps({
  code: {
    type: String,
    required: true
  }
})

const userStore = useUserStore()
const permissionCodes = computed(() => userStore.permissionCode)
const hasCode = computed(() => {
  return permissionCodes.value.includes(code)
})

</script>
<template>
  <slot v-if="hasCode" />
</template>