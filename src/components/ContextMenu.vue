<script setup>
import { computed, watch, onMounted, onUnmounted, ref } from "vue"

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  x: {
    type: Number,
    default: 0
  },
  y: {
    type: Number,
    default: 0
  }
})

const emits = defineEmits(['update:modelValue'])

const style = computed(() => {
  return {
    left: props.x + 'px',
    top: props.y + 'px',
    display: props.modelValue?'block':'none'
  }
})

const contextmenuRef = ref()

function watchContextmenu(event){
  if(!contextmenuRef.value.contains(event.target) || event.button !== 0) emits('update:modelValue', false)
  window.removeEventListener('mousedown', watchContextmenu)
}

watch(() => props.modelValue, (val) => {
  if (val) {
    window.addEventListener('mousedown', watchContextmenu)
  } else {
    window.removeEventListener('mousedown', watchContextmenu)
  }
})

onMounted(() => {
  document.querySelector('body').appendChild(contextmenuRef.value)
})

onUnmounted(() => {
  window.removeEventListener('mousedown', watchContextmenu)
  if (contextmenuRef.value && contextmenuRef.value.parentNode) {
    contextmenuRef.value.parentNode.removeChild(contextmenuRef.value)
  }
})


</script>
<template>
  <div ref="contextmenuRef" class="custom-contextmenu" :style="style">
    <slot />
  </div>
</template>
<style lang="scss" scoped>
.custom-contextmenu {
  position: absolute;
  padding: 5px 0;
  z-index: 2018;
  background: #fff;
  border: 1px solid #cfd7e5;
  border-radius: 4px;
}
</style>