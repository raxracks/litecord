<script setup lang="ts">
import { currentChannel } from '../state';

defineProps<{ channel: any }>();
</script>

<template>
    <div :class="{ channel: true, selected: currentChannel === channel }" @click="() => currentChannel = channel">
        # {{ channel.name }}
    </div>
</template>

<style scoped>
.channel {
    text-overflow: ellipsis;
    padding: 8px 20px;
    cursor: pointer;
    white-space: nowrap;
    width: 100%;
    box-sizing: border-box;
    overflow-x: clip;
}

.selected {
    border-left: 3px solid #7676ff;
    padding: 8px 17px;
    background: linear-gradient(90deg, #434343, transparent);
}
</style>