<script setup lang="ts">
import { data, showServerList } from "../state";
import Server from "./Server.vue";
</script>

<template>
    <div :class="{ 'server-list': true, 'undismissable': true, hidden: !showServerList }">
        <Server v-for="guild in data?.guilds" :guild="guild" :key="guild.id" />
    </div>
</template>

<style scoped>
.server-list {
    display: flex;
    flex-direction: row;
    overflow-y: scroll;
    position: absolute;
    background: #141414;
    border: 1px solid #3c3c3c;
    border-radius: 10px;
    flex-wrap: wrap;
    padding: 10px;
    top: 10px;
    left: 68px;
    -ms-overflow-style: none;
    scrollbar-width: none;
    justify-content: flex-start;
    box-shadow: 0 0 7px 0px black;
    width: calc((48px + 12px) * 6);
    max-height: 70%;
    transition: 0.2s;
    z-index: 10;
}

.server-list::-webkit-scrollbar {
    display: none;
}

.hidden {
    visibility: hidden;
    opacity: 0;
}
</style>
