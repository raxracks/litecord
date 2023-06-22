<script setup lang="ts">
import { pinned } from "../state";
import Server from "./Server.vue";
</script>

<template>
    <Server v-for="guild in pinned" :guild="guild" :key="guild.id" />
</template>