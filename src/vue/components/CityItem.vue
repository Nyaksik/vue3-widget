<script setup lang="ts">
import MenuIcon from '../../assets/menu.svg'
import DeleteIcon from '../../assets/delete.svg'

const props = defineProps<{ id: number, name: string, code: string, index: number }>()
const emit = defineEmits(['start', 'enter', 'end', 'delete'])
</script>

<template>
  <div
    ref="el"
    class="city"
    @dragenter="emit('enter', props.index)"
  >
    <div class="city__wrapper">
      <button
        type="button"
        class="btn"
        draggable="true"
        @dragstart="emit('start', $event, props.index)"
        @dragend="emit('end', props.index)"
      >
        <menu-icon />
      </button>

      <span>{{ props.name }}, {{ props.code }}</span>
    </div>

    <button
      type="button"
      class="btn"
      @click="emit('delete', props.index)"
    >
      <delete-icon />
    </button>
  </div>
</template>
