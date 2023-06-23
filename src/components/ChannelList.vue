<script setup lang="ts">
import { currentGuild } from '../state';
import Channel from './Channel.vue';
</script>

<template>
    <div class="channel-list">
        <Channel v-for="channel in currentGuild?.channels.filter((ch: any) => ch.type === 0)" :channel="channel"
            :key="channel.id" />
    </div>
</template>

<style scoped>
.channel-list {
    display: flex;
    flex-direction: column;
    width: 280px;
    min-width: 280px;
    height: 100%;
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    background: #212121;
    border-right: 1px solid #3f3f3f;
    box-shadow: 0 0 20px #181818;
}

.channel-list::-webkit-scrollbar {
    display: none;
}
</style>